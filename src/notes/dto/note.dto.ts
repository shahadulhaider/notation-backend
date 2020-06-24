import { IsNotEmpty, IsString } from 'class-validator';
import { UserRO } from 'src/users/dto/user.dto';

export class NoteDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class NoteRO {
  id: string;
  content: string;
  created: Date;
  updated: Date;
  author: UserRO;
  favoriteCount: number;
  favoritedBy?: UserRO[];
}
