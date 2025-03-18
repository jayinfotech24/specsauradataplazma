import express from "express";
import { requestOTP } from "../controllers/otpController.js";
import { verifyOTP } from "../controllers/authController.js";
import { getAllUsers,getUserByID,createUser,updateUser, deleteUser } from "../controllers/userController.js"
import { getReference } from "../controllers/referenceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/productController.js";
import { createContact } from "../controllers/contactController.js";
import { upload, uploadFile } from '../controllers/fileController.js';


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
globalRoute.post("/create",createUser);
globalRoute.put("/update",updateUser);

// PRODUCT ROUTES
globalRoute.get("/products/all",getAllProducts);
globalRoute.post("/product",authMiddleware,createProduct);
globalRoute.delete("/product/:id",authMiddleware,deleteProduct);
globalRoute.put("/product/:id",authMiddleware,updateProduct);

// File Upload
globalRoute.post('/upload', upload.single('file'), uploadFile);

// CART ROUTES


// CONTACt ROUTE
globalRoute.post("/contact",createContact);


export default globalRoute;