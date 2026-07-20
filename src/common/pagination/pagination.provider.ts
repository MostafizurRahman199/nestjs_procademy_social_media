import { Injectable } from '@nestjs/common';
import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { PaginatedResult } from './interfaces/pagination.interface';

@Injectable()
export class PaginationProvider {

  /**
   * A generic pagination method that works with ANY TypeORM entity.
   * 
   * @param repository - The TypeORM repository for the specific entity (e.g., userRepository, tweetRepository).
   * @param paginationQuery - The DTO containing 'page' and 'limit' from the user's request.
   * @param options - Additional TypeORM options (like 'where' clauses, 'relations', or 'order').
   * @returns A standardized PaginatedResult containing both the data and metadata.
   */


  async paginate<T extends ObjectLiteral>(
    repository: Repository<T>,
    paginationQuery: PaginationQueryDto,
    options?: FindManyOptions<T>,
  ): Promise<PaginatedResult<T>> {

    // 1. Extract page and limit from the query, providing safe defaults if they are missing.
    const { page = 1, limit = 20 } = paginationQuery;

    // 2. Ensure the page and limit are safe numbers to prevent database crashes.
    // - Math.max(1, page) ensures we never request page 0 or negative pages.
    const safePage = Math.max(1, page);
    
    // - Math.min(...) ensures we cap the limit at a maximum of 100 items per request, preventing huge data loads.
    const safeLimit = Math.min(Math.max(1, limit), 100);

    // 3. Query the database using TypeORM's findAndCount method.
    // This returns an array: [data, totalNumberOfItems]
    const [data, itemCount] = await repository.findAndCount({
      ...options, // Spread any extra options like 'where' or 'relations' passed in
      skip: (safePage - 1) * safeLimit, // Calculate how many records to skip (e.g., page 2 with limit 20 skips 20)
      take: safeLimit, // Tell the database exactly how many records to retrieve
    });

    // 4. Calculate pagination metadata based on the database results
    // Math.ceil rounds up (e.g., 21 items with a limit of 20 = 2 pages)
    const pageCount = Math.ceil(itemCount / safeLimit);
    
    // There is a previous page if our current page is greater than 1
    const hasPreviousPage = safePage > 1;
    
    // There is a next page if our current page is less than the total page count
    const hasNextPage = safePage < pageCount;

    // 5. Return the standardized structured response
    return {
      data,
      meta: {
        page: safePage,
        limit: safeLimit,
        itemCount,
        pageCount,
        hasPreviousPage,
        hasNextPage, 
      },
    };
  }
}
