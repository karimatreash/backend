import express, { Router, Request, Response } from "express";
import { conn } from "../connection";
import { SQL } from "../moduls/api";

const app = express();

const all_products = app.get('/allproduct', (req: Request, res: Response) => {
    
    conn.query(SQL.PRODUCT, (err, result) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.length == 0) {
            return res.status(200).json({ message: "No products found" });
        }
        res.status(200).json({pruduct: result});
    });
});

export default all_products;
