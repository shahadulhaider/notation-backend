
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Note {
    id: string;
    content: string;
    author: User;
    favoriteCount: number;
    favoritedBy?: User[];
    created: string;
    updated: string;
}

export abstract class IQuery {
    abstract notes(): Note[] | Promise<Note[]>;

    abstract note(id: string): Note | Promise<Note>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(username: string): User | Promise<User>;

    abstract me(): User | Promise<User>;
}

export abstract class IMutation {
    abstract addNote(content: string): Note | Promise<Note>;

    abstract editNote(id: string, content: string): Note | Promise<Note>;

    abstract removeNote(id: string): boolean | Promise<boolean>;

    abstract toggleFavorite(id: string): Note | Promise<Note>;

    abstract register(email: string, username: string, password: string): Auth | Promise<Auth>;

    abstract login(username: string, password: string): Auth | Promise<Auth>;
}

export class User {
    id: string;
    email: string;
    username: string;
    avatar?: string;
    created: string;
    updated: string;
}

export class Auth {
    id: string;
    username: string;
    token: string;
}
