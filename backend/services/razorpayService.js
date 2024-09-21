import Razorpay from 'razorpay';
import { config } from 'dotenv';
config(); // Load environment variables

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createOrder = async (amount) => {
  try {
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `order_rcptid_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw new Error('Error creating Razorpay order');
  }
};
