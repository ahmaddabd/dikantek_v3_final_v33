import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './roles/user_role.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async login(user: any) {
    const userRoles = await this.userRoleRepository.find({ where: { user: user.id }, relations: ['role'] });
    const roles = userRoles.map(userRole => userRole.role.name);

    const payload = { username: user.username, sub: user.id, roles };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
