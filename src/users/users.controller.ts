import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findUsers() {
    return await this.usersService.findAll();
  }

  //   @Post()
  //   async register(@Body('email') email: string) {
  //     return await this.usersService.register(email);
  //   }
}
