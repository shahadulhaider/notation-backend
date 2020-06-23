import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AuthPayload,
  AuthRO,
  LoginDto,
  RegisterDto,
  UserRO,
} from './dto/user.dto';
import { User } from './user.entity';
import { gravatar } from '../util/gravatar';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwt: JwtService,
  ) {}

  createToken(payload: AuthPayload): string {
    return this.jwt.sign(payload);
  }

  async findAll() {
    return this.userRepo.find();
  }

  async getUser(username: string): Promise<UserRO> {
    const user = await this.userRepo.findOne({ username });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async register(userData: RegisterDto): Promise<AuthRO> {
    const { username, email } = userData;
    let user = await this.userRepo.findOne({ username });

    if (user) {
      throw new ConflictException('User already exists!');
    }

    const avatar = gravatar(email);
    user = this.userRepo.create(userData);
    user.avatar = avatar;

    await this.userRepo.save(user);

    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = this.createToken(payload);

    return { ...payload, token };
  }

  async login(loginDate: LoginDto): Promise<AuthRO> {
    const { username, password } = loginDate;
    const user = await this.userRepo.findOne({ username });

    if (!user) {
      throw new NotFoundException('Wrong credentials');
    }

    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = this.createToken(payload);

    return { ...payload, token };
  }
}
