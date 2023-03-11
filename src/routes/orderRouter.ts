import { OrderStore, OrderProduct, OrderProductDB, OrderDB } from './../models/order';
import express, { Request, Response } from 'express';
import verifyAuthToken from '../middleware/VerifyAuthToken';

const orderStore = new OrderStore();
const orderRouter = express.Router();

const handleError = (res: Response, e: unknown): void => {
    res.status(500).send(e);
};

const handleSuccess = (res: Response, data: unknown, statusCode = 200): void => {
    res.status(statusCode).json(data);
};


const handleRequest = async (fn: (req: Request) => Promise<unknown>): Promise<(req: Request, res: Response) => Promise<void>> => {
    return async (req: Request, res: Response) => {
        try {
            const result = await fn(req);
            handleSuccess(res, result);
        } catch (e) {
            handleError(res, e);
        }
    }
};

// Handler
const addProductToOrder = handleRequest(async (req: Request) => {
    const orderProduct: OrderProduct = req.body;
    const order_id: number = parseInt(req.params['id'], 10);
    const createdOrderProduct: OrderProductDB = await orderStore.addProductToOrder(order_id, orderProduct);
    if (!createdOrderProduct) {
        throw new Error('Could not add product to order');
    }
    return createdOrderProduct;
});

const createOrder = handleRequest(async (req: Request) => {
    const user_id: number = req.body.user_id;
    const products: OrderProduct[] = req.body.products;

    if (!user_id || !products || !products.length) {
        throw new Error('Invalid request. Please provide a user_id and a products array');
    }

    const orderProducts: OrderProductDB[] = await orderStore.createOrder(user_id, products);

    if (!orderProducts) {
        throw new Error('Could not create order');
    }

    return orderProducts;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllOrders = handleRequest(async (_req: Request) => {
    return await orderStore.getAllOrders();
});

const getOrder = handleRequest(async (req: Request) => {
    const order_id: number = parseInt(req.params['id'], 10);
    const order: OrderDB = await orderStore.getOrder(order_id);
    if (!order) {
        throw new Error(`Could not find order ${order_id}`);
    }
    return order;
});

const getProductsFromOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = parseInt(req.params['id']);
        const products = await orderStore.getProductsFromOrder(orderId);
        if (!products || !products.length) {
            res.status(404).send(`Could not find products for order ${ orderId }`);
            return;
        }
        res.json(products);
    } catch (e) {
        res.status(500).send(e);
    }
};


const getOrdersByUser = async (req: Request, res: Response): Promise<void> => {
    const user_id = parseInt(req.params['id'], 10);
    try {
        const orders = await orderStore.getOrdersByUser(user_id);
        if (!orders || !orders.length) {
            res.status(404).send(`Could not find orders for user ${user_id}`);
        } else {
            res.json(orders);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};


const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    const order_id = parseInt(req.params['id'], 10);
    try {
        const deletedOrder = await orderStore.deleteOrder(order_id);
        res.json(deletedOrder);
    } catch (e) {
        res.status(500).send(e);
    }
};


// Routes
orderRouter.post('/:id/product', verifyAuthToken, addProductToOrder);
orderRouter.post('/', verifyAuthToken, createOrder);
orderRouter.get('/:id', verifyAuthToken, getOrder);
orderRouter.get('/:id/products', verifyAuthToken, getProductsFromOrder);
orderRouter.get('/', verifyAuthToken, getAllOrders);
orderRouter.get('/ordersByUser/:id', verifyAuthToken, getOrdersByUser);
orderRouter.delete('/:id', verifyAuthToken, deleteOrder);

export default orderRouter