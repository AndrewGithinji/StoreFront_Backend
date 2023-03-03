import { Product, ProductDB } from './../models/product';
import express, { Request, Response } from 'express';
import { ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/VerifyAuthToken';

const productStore = new ProductStore();
const productRouter = express.Router();

// Handler
const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productStore.index();
        res.json(products);
    } catch (e) {
        res.status(500).send(e);
    }
};
const getProduct = async (req: { params: { id: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; send: { (arg0: unknown): void; new(): any; }; }; }) => {
    try {
        const product = await productStore.show(parseInt(req.params.id));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
const updateProduct = async (req: { params: { id: string; }; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; send: { (arg0: unknown): void; new(): any; }; }; }) => {
    try {
        const product_id = parseInt(req.params.id);
        const newProduct = req.body;

        if (!newProduct.category || !newProduct.name || !newProduct.price) {
            throw new Error('Missing product properties');
        }

        const existingProduct = await productStore.show(product_id);

        if (existingProduct) {
            const updatedProduct = await productStore.update(product_id, newProduct);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).send('Could not update product, id not found');
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
const addProduct = async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; send: { (arg0: unknown): void; new(): any; }; }; }) => {
    try {
        const newProduct = req.body;
        const createdProduct = await productStore.create(newProduct);
        res.status(201).json(createdProduct);
    } catch (e) {
        res.status(500).send(e);
    }
};
const deleteProduct = async (req: { params: { id: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; send: { (arg0: unknown): void; new(): any; }; }; }) => {
    try {
        const product_id = parseInt(req.params.id);
        const deletedProduct = await productStore.delete(product_id);
        res.status(200).json(deletedProduct);
    } catch (e) {
        res.status(500).send(e);
    }
};

// Routes
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProduct);
productRouter.put('/:id', verifyAuthToken, updateProduct);
productRouter.post('/', verifyAuthToken, addProduct);
productRouter.delete('/:id', verifyAuthToken, deleteProduct);

export default productRouter;
