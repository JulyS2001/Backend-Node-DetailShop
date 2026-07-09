import express from 'express';
import { createProduct, getAllProducts, getProductById, deleteProduct } from '../controllers/products.controller.js';
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/create", verifyToken ,createProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;