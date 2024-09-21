import { createOrder } from '../services/razorpayService.js';

export const createOrderController = async (req, res) => {
  const { amount } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    const order = await createOrder(amount);
    return res.status(200).json(order);
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return res.status(500).json({ error: 'Order creation failed' });
  }
};
