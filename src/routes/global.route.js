import express from "express";
import { requestOTP } from "../controllers/otp.controller.js";
import { verifyOTP } from "../controllers/auth.controller.js";
import { getAllUsers,getUserByID,createUser,updateUser, deleteUser, getUserInfo } from "../controllers/user.controller.js"
import { getReference, getDashboardData } from "../controllers/ref.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { createProduct, deleteProduct, getAllProducts, updateProduct,getProduct } from "../controllers/product.controller.js";
import { createContact } from "../controllers/contact.controller.js";
import { upload, uploadFile, uploadMultiple, uploadMultipleFiles } from '../controllers/file.controller.js';
import { varifyPayment, createRazorOrder } from '../controllers/payment.controller.js';
import { createWallpaper, updateWallpaper, deleteWallpaper, getAllwallpapers,getWallpaperByID } from'../controllers/wallpaper.controller.js';
import { createVideo, updateVideo, deleteVideo, getAllVideos, getVideoByID } from'../controllers/video.controller.js';
import { createCategory, updateCategory, deleteCategory, getAllcategory, getCategoryByID } from'../controllers/categories.controller.js';
import { createCart, updateCart, deleteCart, getAllCartforuser, getSingleCart, deleteManyCarts,getManyCarts } from "../controllers/cart.controller.js";
import { createPrescription, updatePrescription, deletePrescription, getPrescription } from "../controllers/prescription.controller.js";
import { createOrder, updateOrder, getOrderById, getOrders, deleteOrder, getAllOrders } from "../controllers/order.controller.js";
import { createBlog, updateBlog, deleteBlog, getAllBlogs, getSingleBlog } from "../controllers/blog.controller.js";
import { adminLogin } from "../controllers/admin.controller.js";

const globalRoute = express.Router();

// REFERENCE ROUTE
globalRoute.get("/reference",getReference);
globalRoute.get("/dashboard",authMiddleware,getDashboardData);

// OTP ROUTE
globalRoute.post("/request",requestOTP);
globalRoute.post("/verify",verifyOTP);

// USER ROUTE
globalRoute.get("/user/info",authMiddleware,getUserInfo);
globalRoute.get("/user/all",authMiddleware,getAllUsers);
globalRoute.get("/user/:id",authMiddleware,getUserByID);
globalRoute.delete("/user/:id",authMiddleware,deleteUser);
globalRoute.patch("/user/update",authMiddleware,updateUser);
globalRoute.post("/user/create",createUser);

// PRODUCT ROUTES
globalRoute.get("/products/all",getAllProducts);
globalRoute.post("/product",createProduct);
globalRoute.get("/product/:id",getProduct);
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
globalRoute.delete('/cart/',authMiddleware,deleteManyCarts);
globalRoute.get('/cart/all/:id',authMiddleware,getAllCartforuser);
globalRoute.get('/cart/:id',authMiddleware,getSingleCart);
globalRoute.get('/cart/',authMiddleware,getManyCarts);

// PRESCRIPTION ROUTES
globalRoute.post('/presc',authMiddleware,createPrescription);
globalRoute.patch('/presc/:id',authMiddleware,updatePrescription);
globalRoute.delete('/presc/:id',authMiddleware,deletePrescription);
globalRoute.get('/presc/:id',authMiddleware, getPrescription);

// ORDER ROUTES
globalRoute.post('/order',authMiddleware,createOrder);
globalRoute.get('/orders/user/:id',authMiddleware,getOrders);
globalRoute.get('/order/all',authMiddleware,getAllOrders);
globalRoute.get('/order/:id',authMiddleware,getOrderById);
globalRoute.patch('/order/:id',authMiddleware,updateOrder);
globalRoute.delete('/order/:id',authMiddleware,deleteOrder);

// BLOG ROUTE
globalRoute.get('/blog',getAllBlogs);
globalRoute.get('/blog/:id',getSingleBlog);
globalRoute.post('/blog',authMiddleware,createBlog);
globalRoute.patch('/blog/:id',authMiddleware,updateBlog);
globalRoute.delete('/blog/:id',authMiddleware,deleteBlog);

// File Upload
globalRoute.post('/upload', upload.single('file'), uploadFile);
globalRoute.post('/upload-multiple', uploadMultiple, uploadMultipleFiles);

// CONTACt ROUTE
globalRoute.post("/contact",createContact);

// get Request Calls 

globalRoute.get("/wallpaper/:id",getWallpaperByID);
globalRoute.get("/video/:id",getVideoByID);


globalRoute.get("/wallpaper",getAllwallpapers);

globalRoute.get("/category",getAllcategory);
globalRoute.get("/category/:id",getCategoryByID);

globalRoute.get("/video", getAllVideos);

// Admin Routes 
globalRoute.post("/admin/login", adminLogin);

export default globalRoute;