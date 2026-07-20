import { Injectable } from '@nestjs/common';
import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { PaginatedResult } from './interfaces/pagination.interface';

@Injectable()
export class PaginationProvider {
  async paginate<T extends ObjectLiteral>(
    repository: Repository<T>,
    paginationQuery: PaginationQueryDto,
    options?: FindManyOptions<T>,
  ): Promise<PaginatedResult<T>> {
    const { page = 1, limit = 20 } = paginationQuery;

    const safePage = Math.max(1, page);
    const safeLimit = Math.min(Math.max(1, limit), 100); // cap at 100 items

    const [data, itemCount] = await repository.findAndCount({
      ...options,
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
    });

    const pageCount = Math.ceil(itemCount / safeLimit);
    const hasPreviousPage = safePage > 1;
    const hasNextPage = safePage < pageCount;

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
