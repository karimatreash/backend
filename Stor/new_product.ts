// // import Product
// //  from "../moduls/pruduct";
// //  async function createProduct() {
// //     try{
// //         await Product.sync({force:true});
// //         const newProduct = await Product.create({
// //             name:'test',
// //             descriptions:'test2',
// //             price:22.8

// import express, { Router,Request, Response  } from "express";
// import Product from "../moduls/pruduct";
// // 
// //         })
// //         console.log('Created Product :',newProduct.toJSON())
// //     }catch (error){
// //         console.error('Error creating product:', error)
// //     }
    
// //  }
// //  createProduct()
// const r = express.Router()
// r.post('/products', async (req: Request, res: Response) => {
//     const { name, descriptions, price } = req.body;

//     try {
//         const newProduct = await Product.create({ name, descriptions, price });
//         res.status(201).json(newProduct);
//     } catch (error) {
//         console.error('Error creating product:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });