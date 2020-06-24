import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/users/auth.guard';
import { User } from 'src/users/user.entity';
import { NoteDto, NoteRO } from './dto/note.dto';
import { NotesService } from './notes.service';

@Resolver('Notes')
export class NotesResolver {
  constructor(private notesService: NotesService) {}

  @Query()
  async notes(): Promise<NoteRO[]> {
    return this.notesService.findAll();
  }

  @Query()
  async note(@Args('id') id: string): Promise<NoteRO> {
    return this.notesService.read(id);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async addNote(
    @Args('content') content: string,
    @Context('user') user: User,
  ): Promise<NoteRO> {
    const { id: userId } = user;
    const data: NoteDto = { content };

    return await this.notesService.create(userId, data);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async editNote(
    @Args('id') id: string,
    @Args('content') content: string,
    @Context('user') user: User,
  ): Promise<NoteRO> {
    const { id: userId } = user;
    const data: NoteDto = { content };

    return await this.notesService.update(id, data, userId);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async removeNote(
    @Args('id') id: string,
    @Context('user') user: User,
  ): Promise<boolean> {
    const { id: userId } = user;
    return this.notesService.delete(id, userId);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async toggleFavorite(
    @Args('id') id: string,
    @Context('user') user: User,
  ): Promise<NoteRO> {
    const { id: userId } = user;
    return this.notesService.toggleFavorite(id, userId);
  }
}
