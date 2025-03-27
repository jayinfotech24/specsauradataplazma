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
import { createWallpaper, updateWallpaper, deleteWallpaper } from'../controllers/wallpaper.controller.js';
import { createVideo, updateVideo, deleteVideo } from'../controllers/video.controller.js';
import { createCategory, updateCategory, deleteCategory } from'../controllers/categories.controller.js';
import { createCart, updateCart, deleteCart, getAllCartforuser } from "../controllers/cart.controller.js";
import { createPrescription, updatePrescription, deletePrescription } from "../controllers/prescription.controller.js";
import { createOrder, updateOrder, getOrderById, getOrders, deleteOrder, getAllOders } from "../controllers/order.controller.js";


const globalRoute = express.Router();

// REFERENCE ROUTE
globalRoute.get("/reference",getReference);

// OTP ROUTE
globalRoute.post("/request",requestOTP);
globalRoute.post("/verify",verifyOTP);

// USER ROUTE
globalRoute.get("/user/all",authMiddleware,getAllUsers);
globalRoute.get("/user/:id",authMiddleware,getUserByID);
globalRoute.delete("/user/:id",authMiddleware,deleteUser);
globalRoute.patch("/user/update",authMiddleware,updateUser);
globalRoute.post("/user/create",createUser);

// PRODUCT ROUTES
globalRoute.get("/products/all",getAllProducts);
globalRoute.post("/product",authMiddleware,createProduct);
globalRoute.delete("/product/:id",authMiddleware,deleteProduct);
globalRoute.patch("/product/:id",authMiddleware,updateProduct);

// PAYMENT ROUTE 
globalRoute.post("/createPaymentOrder",authMiddleware,createRazorOrder);
globalRoute.post("/varifyPayment",authMiddleware,varifyPayment);

// Wallpaper, Categories, Video
globalRoute.post("/wallpaper",authMiddleware,createWallpaper);
globalRoute.post("/category",authMiddleware,createCategory);
globalRoute.post("/video",authMiddleware,createVideo);

globalRoute.patch("/wallpaper/:id",authMiddleware,updateWallpaper);
globalRoute.patch("/category/:id",authMiddleware,updateCategory);
globalRoute.patch("/video/:id",authMiddleware,updateVideo);

globalRoute.delete("/wallpaper/:id",authMiddleware,deleteWallpaper);
globalRoute.delete("/category/:id",authMiddleware,deleteCategory);
globalRoute.delete("/video/:id",authMiddleware,deleteVideo);

// CART ROUTES
globalRoute.post('/cart',authMiddleware,createCart);
globalRoute.patch('/cart/:id',authMiddleware,updateCart);
globalRoute.delete('/cart/:id',authMiddleware,deleteCart);
globalRoute.get('/cart/:id',authMiddleware,getAllCartforuser);

// PRESCRIPTION ROUTES
globalRoute.post('/presc',authMiddleware,createPrescription);
globalRoute.patch('/presc/:id',authMiddleware,updatePrescription);
globalRoute.delete('/presc/:id',authMiddleware,deletePrescription);

// ORDER ROUTES
globalRoute.post('/order',authMiddleware,createOrder);
globalRoute.get('/orders',authMiddleware,getOrders);
globalRoute.get('/order/:id',authMiddleware,getOrderById);
globalRoute.patch('/order/:id',authMiddleware,updateOrder);
globalRoute.delete('/order/:id',authMiddleware,deleteOrder);
globalRoute.get('/order/all',authMiddleware,getAllOders);

// File Upload
globalRoute.post('/upload', upload.single('file'), uploadFile);

// CONTACt ROUTE
globalRoute.post("/contact",createContact);


export default globalRoute;