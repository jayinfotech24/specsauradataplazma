import express from "express";
import { requestOTP } from "../controllers/otp.controller.js";
import { verifyOTP } from "../controllers/auth.controller.js";
import { getAllUsers,getUserByID,createUser,updateUser, deleteUser } from "../controllers/user.controller.js"
import { getReference } from "../controllers/ref.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/product.controller.js";
import { createContact } from "../controllers/contact.controller.js";
import { upload, uploadFile } from '../controllers/file.controller.js';
import { varifyPayment, createRazorOrder } from '../controllers/payment.controller.js';


const globalRoute = express.Router();

// REFERENCE ROUTE
globalRoute.get("/reference",getReference);

// OTP ROUTE
globalRoute.post("/request",requestOTP);
globalRoute.post("/verify",verifyOTP);

// USER ROUTE
globalRoute.get("/all",authMiddleware,getAllUsers);
globalRoute.get("/:id",authMiddleware,getUserByID);
globalRoute.delete("/:id",authMiddleware,deleteUser);
globalRoute.put("/update",authMiddleware,updateUser);
globalRoute.post("/create",createUser);

// PRODUCT ROUTES
globalRoute.get("/products/all",getAllProducts);
globalRoute.post("/product",authMiddleware,createProduct);
globalRoute.delete("/product/:id",authMiddleware,deleteProduct);
globalRoute.put("/product/:id",authMiddleware,updateProduct);

// PAYMENT ROUTE 
globalRoute.post("/createPaymentOrder",authMiddleware,createRazorOrder);
globalRoute.post("/varifyPayment",authMiddleware,varifyPayment);

// File Upload
globalRoute.post('/upload', upload.single('file'), uploadFile);

// CART ROUTES


// CONTACt ROUTE
globalRoute.post("/contact",createContact);


export default globalRoute;