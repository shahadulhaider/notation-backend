import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { NoteDto, NoteRO } from './dto/note.dto';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private notesRepo: Repository<Note>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  async findAll(): Promise<NoteRO[]> {
    return await this.notesRepo.find({
      relations: ['author', 'favoritedBy'],
    });
  }

  async read(id: string): Promise<NoteRO> {
    return await this.notesRepo.findOne(id, {
      relations: ['author', 'favoritedBy'],
    });
  }

  async create(userId: string, data: NoteDto): Promise<NoteRO> {
    const user = await this.usersRepo.findOne(userId);
    const note = this.notesRepo.create({ ...data, author: user });

    await this.notesRepo.save(note);
    return note;
  }

  async update(id: string, data: NoteDto, userId: string): Promise<NoteRO> {
    const note = await this.notesRepo.findOne(id, {
      relations: ['author', 'favoritedBy'],
    });

    if (!note) {
      throw new NotFoundException();
    }

    if (note.author.id !== userId) {
      throw new ForbiddenException("You don't have permision to edit the note");
    }

    return await this.notesRepo.save({ ...note, ...data });
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const note = await this.notesRepo.findOne(id, {
      relations: ['author', 'favoritedBy'],
    });

    if (!note) {
      throw new NotFoundException();
    }

    if (note.author.id !== userId) {
      throw new ForbiddenException(
        "You don't have permission to delete the note",
      );
    }

    try {
      await this.notesRepo.remove(note);
      return true;
    } catch (error) {
      return false;
    }
  }
  async toggleFavorite(id: string, userId: string): Promise<NoteRO> {
    const note = await this.notesRepo.findOne(id, {
      relations: ['author', 'favoritedBy'],
    });

    if (!note) {
      throw new NotFoundException();
    }

    const user = await this.usersRepo.findOne(userId);
    const favorited = note.favoritedBy.some((f) => f.id === userId);

    if (favorited) {
      // filter out from favoritedBy array, decrease favoriteCount
      note.favoritedBy = note.favoritedBy.filter((fav) => fav.id !== user.id);
      note.favoriteCount -= 1;
      await this.notesRepo.save(note);

      return note;
    } else {
      //  push to favoritedBy array, increase favoriteCount
      note.favoritedBy.push(user);
      note.favoriteCount += 1;
      await this.notesRepo.save(note);

      return note;
    }
  }
}
