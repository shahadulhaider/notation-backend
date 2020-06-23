import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthRO, UserRO } from './dto/user.dto';
import { User } from './user.entity';

@Resolver('Users')
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query()
  async users() {
    return await this.userService.findAll();
  }

  @Query()
  async user(username: string) {
    return this.userService.getUser(username);
  }

  @Query()
  @UseGuards(AuthGuard)
  async me(@Context('user') user: User) {
    const { username } = user;
    return this.userService.getUser(username);
  }

  @Mutation()
  async register(
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const userData = { email, username, password };
    return await this.userService.register(userData);
  }

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return await this.userService.login({ username, password });
  }
}
