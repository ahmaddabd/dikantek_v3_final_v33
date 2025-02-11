import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/roles/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['Admin'])
  @Get('manage-users')
  async manageUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['Admin', 'Store Owner'])
  @Get('profile')
  async getProfile() {
    return { message: 'Profile data' };
  }
}
