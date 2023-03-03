import request from 'supertest';
import app from '../../server';

let demoToken: string;

beforeAll(async () => {
demoToken = (await request(app).post('/users/demoUser').expect(201)).body;
await request(app)
.post('/products')
.send({ name: 'Test product', price: 0, category: 'Test' })
.auth(demoToken, { type: 'bearer' })
.expect(201);
});

describe('GET /products', () => {
    it('should respond with 200', (done): void => {
    request(app).get('/products').expect(200, done);
    });
    });
    
    describe('GET /products/:id', () => {
    it('should respond with 200', (done): void => {
    request(app).get('/products/1').expect(200, done);
    });
    it('should respond with 404 if product does not exist', (done): void => {
        request(app).get('/product/1000').expect(404, done);
    });
});
describe('POST /products', () => {
    it('should respond with 401 if called without auth token', (done): void => {
    request(app).post('/products').expect(401, done);
    });
    
    it('should create a product', (done): void => {
    request(app)
    .post('/products')
    .send({ name: 'Test product 2', price: 0, category: 'Test' })
    .auth(demoToken, { type: 'bearer' })
    .expect(201, done);
    });
    });
    describe('POST /products', () => {
        it('should respond with 401 if called without auth token', (done): void => {
        request(app).post('/products').expect(401, done);
        });
        it('should create a product', (done): void => {
        request(app)
        .post('/products')
        .send({
        name: 'Test product 2',
        price: 0,
        category: 'Test',
        })
        .auth(demoToken, { type: 'bearer' })
        .expect(201, done);
        });
        it('should respond with 500 if called incorrect', (done): void => {
        request(app)
        .post('/products')
        .send({
        name: 'Test product 2',
        })
        .auth(demoToken, { type: 'bearer' })
        .expect(500, done);
        });
        });
        
        describe('PUT /products/:id', () => {
        it('should respond with 401 if called without auth token', (done): void => {
        request(app).put('/products/1').expect(401, done);
        });
        });
        describe('PUT /products/:id', () => {
            it('should update a product', async () => {
            const { body } = await request(app)
            .put('/products/1')
            .send({
            name: 'Test product 1',
            price: 0,
            category: 'Test',
            })
            .auth(demoToken, { type: 'bearer' })
            .expect(200)
            expect(body).toEqual({
            id: 1,
            name: 'Test product 1',
            price: 0,
            category: 'Test',
            });
            });
            });
            
            it('should respond with 401 if called without auth token', (done): void => {
            request(app).put('/products/1').expect(401, done);
            });
            
            it('should respond with 401 if other user tries to update', async (): Promise<void> => {
            const result = (
            await request(app)
            .put('/products/1')
            .send({
            name: 'Test product 1',
            price: 0,
            category: 'Test',
            })
            .auth(demoToken, { type: 'bearer' })
            .expect(401)
            ).body;
            });
            
            it('should respond with 500 if called incorrect', (done): void => {
                request(app)
                .put('/products/1')
                .send({
                name: 'Test product 1',
                })
                .auth(demoToken, { type: 'bearer' })
                .expect(500, done);
                });

                describe('DELETE /products/:id', () => {
                    it('should respond with 401 if called without auth token', (done) => {
                    request(app).delete('/products/1').expect(401, done);
                    });
                    it('should respond with 200', async () => {
                        const product = await request(app)
                            .post('/products')
                            .send({
                                name: 'Test product 2',
                                price: 0,
                                category: 'Test',
                            })
                            .auth(demoToken, { type: 'bearer' })
                            .expect(201);
                    
                        await request(app)
                            .delete(`/products/${product.body.id}`)
                            .auth(demoToken, { type: 'bearer' })
                            .expect(200);
                    });
                });

                describe('DELETE /products/:id', (): void => {
                    it('should respond with 200', (done): void => {
                        request(app).delete('/products/1').auth(demoToken, { type: 'bearer' }).expect(200, done);
                    });
                });
                