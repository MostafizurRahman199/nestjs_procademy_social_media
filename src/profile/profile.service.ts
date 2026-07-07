import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(Profile)
        private profileRepository:Repository<Profile>
    ){}

    async getAllProfiles(){
        return await this.profileRepository.find();
    }
}
