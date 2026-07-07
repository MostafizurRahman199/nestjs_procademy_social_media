import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(Profile)
        private profileRepository:Repository<Profile>
    ){}




    
    async getAllProfiles(){
        return await this.profileRepository.find();
    }





    async updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
        const profile = await this.profileRepository.findOne({ where: { id } });
        if (!profile) {
            throw new NotFoundException(`Profile with ID ${id} not found`);
        }
        
        await this.profileRepository.update(id, updateProfileDto);
        const updatedProfile = await this.profileRepository.findOne({ where: { id } });
        
        return { 
            message: 'Profile updated successfully', 
            data: updatedProfile 
        };
    }







    async deleteProfile(id: number) {
        const profile = await this.profileRepository.findOne({ where: { id } });
        if (!profile) {
            throw new NotFoundException(`Profile with ID ${id} not found`);
        }
        
        await this.profileRepository.delete(id);
        
        return { 
            message: 'Profile deleted successfully', 
            data: profile 
        };
    }
}
