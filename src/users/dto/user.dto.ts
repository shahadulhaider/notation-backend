import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AuthPayload {
  id: string;
  username: string;
}

export class UserRO {
  id: string;
  email: string;
  username: string;
  avatar: string;
  created: Date;
  updated: Date;
}

export class AuthRO {
  id: string;
  username: string;
  token: string;
}
