import Razorpay from "razorpay";
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../constants/api.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createRazorOrder = async (req, res) => {
    const { amount } = req.body;
    const receiptId = `rcpt_${uuidv4().slice(0, 30)}`;

    const options = {
        amount: amount * 100, // Amount in paise (₹1 = 100 paise)
        currency: 'INR',
        receipt: receiptId,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message, status: 500 });
    }
}

export const varifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        res.status(200).json({ status: 200, message: SUCCESS_MESSAGE.PAYMENT_VARIFIED });
    } else {
        res.status(400).json({ message: ERROR_MESSAGE.INVALID_SIGNATURE, status: 400 });
    }
}
