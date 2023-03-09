import request from 'supertest';
import app from '../../server';

let demoToken: string;

beforeAll(async () => {
    demoToken = await createDemoToken();
    await createTestProducts();
    await createTestOrders();
});

const createDemoToken = async (): Promise<string> => {
    return (await request(app).post('/users/demoUser').expect(201)).body;
};

const createTestProducts = async (): Promise<unknown> => {
    return await request(app)
        .post('/products')
        .send({
            name: 'Test product',
            price: 0,
            category: 'Test',
        })
        .auth(demoToken, { type: 'bearer' })
        .expect(201);
    await request(app)
        .post('/products')
        .send({
            name: 'Test product 2',
            price: 0,
            category: 'Test',
        })
        .auth(demoToken, { type: 'bearer' })
        .expect(201);
};

const createTestOrders = async (): Promise<unknown> => {
    return await request(app)
        .post('/orders')
        .auth(demoToken, { type: 'bearer' })
        .send({
            user_id: 1,
            products: [
                {
                    product_id: 1,
                    quantity: 4,
                },
            ],
        })
        .expect(201);
    await request(app)
        .post('/orders')
        .auth(demoToken, { type: 'bearer' })
        .send({
            user_id: 1,
            products: [
                {
                    product_id: 1,
                    quantity: 8,
                },
            ],
        })
        .expect(201);
};
describe('GET /orders', () => {
    it('should respond with 401 if called without auth token', (done): void => {
        request(app).get('/orders').expect(401, done);
    });
    it('should respond with 200', (done): void => {
        request(app)
            .get('/orders')
            .set('Authorization', 'Bearer ' + demoToken)
            .expect(200, done);
    });
});
describe('POST /orders', () => {
    it('should respond with 401 if called without auth token', (done): void => {
        request(app).post('/orders').expect(401, done);
    });
    it('should create an order', (done): void => {
        request(app)
            .post('/orders')
            .auth(demoToken, { type: 'bearer' })
            .send({
                user_id: 1,
                products: [
                    {
                        product_id: 1,
                        quantity: 4,
                    },
                ],
            })
            .expect(201, done);
    });
});
describe('POST /orders', () => {
    it('should respond with 401 if called without auth token', (done): void => {
        request(app).post('/orders').expect(401, done);
    });
    it('should create an order', (done): void => {
        request(app)
            .post('/orders')
            .auth(demoToken, { type: 'bearer' })
            .send({
                user_id: 1,
                products: [
                    {
                        product_id: 1,
                        quantity: 4,
                    },
                ],
            })
            .expect(201, done);
    });

    it('should respond with 500 if called with incorrect data', (done): void => {
        request(app)
            .post('/orders')
            .auth(demoToken, { type: 'bearer' })
            .send({
                user_id: 1,
                products: [
                    {
                        product_id: null,
                        quantity: null,
                    },
                ],
            })
            .expect(500, done);
    });
    it('should create an order', (done): void => {
        request(app)
            .post('/orders')
            .auth(demoToken, { type: 'bearer' })
            .send({
                user_id: 1,
                products: [
                    {
                        product_id: 1,
                        quantity: 4,
                    },
                ],
            })
            .expect(201, done);
    });

    it('should respond with 500 if called with incorrect data', (done): void => {
        request(app)
            .post('/orders')
            .auth(demoToken, { type: 'bearer' })
            .send({
                user_id: 1,
                products: [
                    {
                        product_id: null,
                        quantity: null,
                    },
                ],
            })
            .expect(500, done);
    });
});
describe('GET /orders/:id', () => {
    it('should respond 401 if called without auth token', (done) => {
        request(app).get('/orders/1').expect(401, done);
    });
    it('should respond 200', (done) => {
        request(app).get('/orders/1').auth(demoToken, { type: 'bearer' }).expect(200, done);
    });

    it('should respond 404 if order does not exist', (done) => {
        request(app).get('/orders/1000').auth(demoToken, { type: 'bearer' }).expect(404, done);
    });
});
describe('GET /orders/:id/products', () => {
    it('should respond with 401 if called without auth token', (done): void => {
        request(app).get('/orders/1/products').expect(401, done);
    });
    it('should respond with 200 if authenticated', (done): void => {
        request(app).get('/orders/1/products').auth(demoToken, { type: 'bearer' }).expect(200, done);
    });

    it('should respond with 404 if order does not exist', (done): void => {
        request(app).get('/orders/1000/products').auth(demoToken, { type: 'bearer' }).expect(404, done);
    });
});
describe('GET /orders/ordersByUser/:id', () => {
    it('should respond with 401 if called without auth token', (done) => {
        request(app).get('/orders/ordersByUser/1').expect(401, done);
    });

    it('should respond with 200', (done) => {
        request(app).get('/orders/ordersByUser/1').auth(demoToken, { type: 'bearer' }).expect(200, done);
    });

    it('should respond with 404 if order does not exist', (done) => {
        request(app).get('/orders/ordersByUser/1000').auth(demoToken, { type: 'bearer' }).expect(404, done);
    });
});
describe('POST /orders/:id/product', () => {
    it('should respond with 401 if called without auth token', (done) => {
        request(app).post('/orders/1/product').expect(401, done);
    });
    it('should respond with 201', (done) => {
        request(app)
            .post('/orders/1/product')
            .auth(demoToken, { type: 'bearer' })
            .send({
                product_id: 2,
                quantity: 8,
            })
            .expect(201, done);
    });
});

it('should respond with 401 if called without auth token', () => {
    request(app).post('/orders/1/product').expect(401);
});

it('should respond with 201', () => {
    request(app)
        .post('/orders/1/product')
        .auth(demoToken, { type: 'bearer' })
        .send({
            product_id: 2,
            quantity: 8,
        })
        .expect(201);
});

it('should respond with 500 if order does not exist', () => {
    request(app).post('/orders/1000/product').auth(demoToken, { type: 'bearer' }).expect(500);
});
describe('DELETE /orders/:id', () => {
    it('should respond with 401 if not authenticated', (done) => {
        request(app).delete('/orders/2').expect(401, done);
    });
    it('should respond with 200 if authenticated and order exists', (done) => {
        request(app).delete('/orders/2').auth(demoToken, { type: 'bearer' }).expect(200, done);
    });

    it('should respond with 500 if order does not exist', (done) => {
        request(app).delete('/orders/1000').auth(demoToken, { type: 'bearer' }).expect(500, done);
    });
});
