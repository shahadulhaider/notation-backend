
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class User {
    id: string;
    email: string;
}

export abstract class IQuery {
    abstract user(): User | Promise<User>;
}
