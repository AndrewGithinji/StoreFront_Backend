import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../server';
import { UserDB } from '../../models/user';

type UserJWT = {
    id: unknown;
    user: UserDB;
    iat: number;
};

let demoToken: string;
let demoUser: UserJWT;

const { DEMO_USER_PASSWORD } = process.env;

beforeAll(async () => {
    demoToken = (await request(app).post('/users/demoUser').expect(201)).body;
    demoUser = jwt.decode(demoToken) as UserJWT;
});

describe('GET /users', () => {
    it('should respond with 401 if called without auth token', () => {
        request(app).get('/users').expect(401);
    });

    it('should respond with 200', () => {
        request(app).get('/users').auth(demoToken, { type: 'bearer' }).expect(200);
    });
});
describe('POST /users', () => {
    it('should respond with 401 if called without auth token', (done): void => {
        request(app).post('/users').expect(401, done);
    });
    it('should create a user', (done): void => {
        request(app)
            .post('/users')
            .auth(demoToken, { type: 'bearer' })
            .send({
                first_name: 'Luke',
                last_name: 'Skywalker',
                email: 'luke.skywalker@jedi-acedmy.com',
                password: 'theforceiswithme',
            })
            .expect(201, done);
    });
});
it('should respond with 500 if called with incorrect data', (done) => {
    request(app)
        .post('/users')
        .auth(demoToken, { type: 'bearer' })
        .send({
            first_name: 'Luke',
            email: 'luke.skywalker@jedi-acedmy.com',
            password: 'theforceiswithme',
        })
        .expect(500, done);
});
describe('PUT /users/:id', () => {
    it('should respond with 401 if called without auth token', (done): void => {
        request(app).put('/users/1').expect(401, done);
    });
});
it('should respond with 401 if called without auth token', () => {
    request(app).put('/users/1').expect(401);
});

it('should update a user', async () => {
    const encodedJWT = (
        await request(app)
            .post('/users')
            .auth(demoToken, { type: 'bearer' })
            .send({
                first_name: 'Dath',
                last_name: 'Vader',
                email: 'darth.vader@thedarkside.com',
                password: 'empireneedsme',
            })
            .expect(201)
    ).body;
    const userJWT = jwt.decode(encodedJWT) as UserJWT;
    await request(app)
        .put(`/users/${userJWT.user.id}`)
        .auth(encodedJWT, { type: 'bearer' })
        .send({
            first_name: 'Darth',
            last_name: 'Vader',
            email: 'darth.vader@thedarkside.com',
            password: 'empireneedsyou',
        })
        .expect(200);
});
it('should respond with 500 if called incorrectly', (done) =>
    request(app)
        .put(`/users/${demoUser.id}`)
        .auth(demoToken, { type: 'bearer' })
        .send({
            first_name: 'John',
            email: 'john.doe@test.com',
        })
        .expect(500, done));
describe('GET /users/:id', () => {
    it('should respond with 401 if called without auth token', (done) => {
        request(app).get('/users/1').expect(401, done);
    });

    it('should respond with 200', (done) => {
        request(app).get('/users/1').auth(demoToken, { type: 'bearer' }).expect(200, done);
    });

    it('should respond with 404 if user does not exist', (done) => {
        request(app).get('/users/1000').auth(demoToken, { type: 'bearer' }).expect(404, done);
    });
});
it('should respond with 200', (done): void => {
    request(app)
        .post('/users/login')
        .send({
            email: 'john.doe@test.com',
            password: DEMO_USER_PASSWORD,
        })
        .expect(200, done);
});
it('should respond with 500 if user does not exist', (done) => {
    request(app)
        .post('/users/login')
        .send({
            email: 'luke.skywalker@jedi.com',
            password: 'theforceiswithme',
        })
        .expect(500, done);
});
it('should respond with 500 if credentials are wrong', (done): void => {
    request(app)
        .post('/users/login')
        .send({
            email: 'john.doe@test.com',
            password: '1234',
        })
        .expect(500, done);
});
it('should respond with 401 if called without auth token', (done): void => {
    request(app).delete('/users/1').expect(401, done);
});

it('should respond with 200', async (): Promise<void> => {
    const userJWT = jwt.decode(`encryptedJWT`) as UserJWT;
    await request(app).delete(`users/${userJWT.user.id}`).auth(`encryptedJWT`, { type: 'bearer' }).expect(200);
});
it('should respond with 401 if other user tries to delete', async (): Promise<void> => {
    const response = await request(app).post('/users').auth(demoToken, { type: 'bearer' }).send({
        first_name: 'Darth',
        last_name: 'Vader',
        email: 'darth.vader@thedarkside.com',
        password: 'empireneedsyou',
    });
    const userJWT = jwt.decode(response.body) as UserJWT;
    await request(app).delete(`users/${userJWT.user.id}`).auth(demoToken, { type: 'bearer' }).expect(401);
});
