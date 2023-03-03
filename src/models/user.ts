import { PoolClient } from 'pg';
import client from '../database';
import bcrypt from 'bcrypt';

export interface User {
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
}

export interface UserDB extends User {
    readonly id: number;
}
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class UserStore {
    async index(): Promise<UserDB[]> {
        try {
            const connection: PoolClient = await client.connect();
            const sql = 'SELECT * FROM users;';
            const users: UserDB[] = (await connection.query(sql)).rows;
            return users.map(({ password, ...rest }) => rest);
        } catch (err) {
            throw new Error(Cannot get users ${ err });
        } finally {
            connection.release();
        }
    }
async function getUserById({ id }: { id: number; }): Promise<UserDB> {
    const connection = await client.connect();
    try {
        const sql = 'SELECT * FROM users WHERE id = $1';
        const result = await connection.query(sql, [id]);
        const [user] = result.rows;
        return { ...user, password: undefined };
    } catch (error) {
        throw new Error(`Could not find user with id ${id}. Error: ${error}`);
    } finally {
        connection.release();
    }
}

async function createUser(user: User): Promise<UserDB> {
    const connection = await client.connect();
    try {
        const existingUserSQL = 'SELECT * from users where email=$1';
        const SQL = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
        if (!BCRYPT_PASSWORD || !SALT_ROUNDS) {
            throw new Error('Missing environment variable: BCRYPT_PASSWORD or SALT_ROUNDS');
        }

        if (!user.first_name || !user.last_name || !user.email || !user.password) {
            throw new Error('Missing user properties');
        }

        const existingUser = (await connection.query(existingUserSQL, [user.email])).rows[0];
        if (existingUser) {
            return existingUser;
        }
    } finally {
        connection.release();
    }
}
     async create(user: User): Promise<UserDB>, {
    const connection: PoolClient = await client.connect(),
    try {
        const hash = bcrypt.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS)),
        const sqlValues = [user.first_name, user.last_name, user.email, hash];
        const createdUser: UserDB = (await connection.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *;', sqlValues)).rows[0],
        return createdUser;
    } catch(err) {
        throw new Error(Could not create new user: ${ user.first_name } ${ user.last_name }.Error: ${ err });
    } finally {
        connection.release();
    }
}
async function updateUser(id, user) {
    try {
        const connection = await client.connect();
        const sql = user.password
            ? `UPDATE users SET first_name=$1, last_name=$2, email=$3, password=$4 WHERE id=$5 RETURNING *`
            : `UPDATE users SET first_name=$1, last_name=$2, email=$3 WHERE id=$4 RETURNING *`;

        const missingVar = !BCRYPT_PASSWORD ? 'BCRYPT_PASSWORD' : !SALT_ROUNDS ? 'SALT_ROUNDS' : null;
        if (missingVar) {
            throw new Error(`Missing environment variable: ${missingVar}`);
        }

        if (!user.first_name || !user.last_name || !user.email) {
            throw new Error('Missing user properties');
        }

        const hash = bcrypt.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
        const sqlValues = user.password
            ? [user.first_name, user.last_name, user.email, hash, id]
            : [user.first_name, user.last_name, user.email, id];
        const updatedUser = (await connection.query(sql, sqlValues)).rows[0];

        return updatedUser;
    } catch (err) {
        throw new Error(`Could not update user ${user.email}. Error: ${err}`);
    } finally {
        connection.release();
    }
}
          async delete (id: number): Promise<UserDB>, {
    const connection = await client.connect(),
    try {
        await connection.query('BEGIN'),
        const deletedUser = (await connection.query('DELETE FROM users WHERE id=$1 RETURNING *', [id])).rows[0];
        await connection.query('COMMIT');
        return deletedUser;
    } catch(err) {
        await connection.query('ROLLBACK');
        throw new Error(`Could not delete user with id ${id}. Error: ${err}`);
    } finally {
        connection.release();
    }
}
        async authenticate(email: string, password: string): Promise<UserDB | null>, {
    const connection: PoolClient = await client.connect();
    try {
        const user: UserDB = (await connection.query('SELECT * FROM users where email=($1);', [email])).rows[0];
        if(!user) throw new Error('User not found');
        return bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password || '') ? user : null;
    } catch(err) {
        throw new Error(`Failed to authenticate user: ${err}`);
    } finally {
        connection.release();
    }
}








function authenticate(email: any, string: any, password: any, string1: any) {
    throw new Error('Function not implemented.');
}
