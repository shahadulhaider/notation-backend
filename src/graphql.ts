
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
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

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(username: string): User | Promise<User>;

    abstract me(): User | Promise<User>;
}

export abstract class IMutation {
    abstract register(email: string, username: string, password: string): Auth | Promise<Auth>;

    abstract login(username: string, password: string): Auth | Promise<Auth>;
}
