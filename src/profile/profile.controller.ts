import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {

    constructor(private readonly profileService:ProfileService){}


    
    @Get()
    getAllProfiles(){
        return this.profileService.getAllProfiles();
    }

    @Patch(':id')
    updateProfile(@Param('id', ParseIntPipe) id: number, @Body() updateProfileDto: UpdateProfileDto) {
        return this.profileService.updateProfile(id, updateProfileDto);
    }

    @Delete(':id')
    deleteProfile(@Param('id', ParseIntPipe) id: number) {
        return this.profileService.deleteProfile(id);
    }


}
