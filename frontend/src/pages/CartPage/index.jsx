import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../store/reducer/cart";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import emptyCartImg from "../../assets/empty-cart.png";
import Notification from "../../Components/Notification";
import paymentSuccessfulImg from "../../assets/payment-successful.png";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const [notificationData, setNotificationData] = useState({
    type: "success",
    message: "",
    duration: 3000,
  });
  const [showNotification, setShowNotification] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handleCheckout = async () => {
    try {
      const orderResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/create-order`,
        {
          amount: cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2),
        }
      );

      const { id: order_id, amount } = orderResponse.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Test Transaction",
        image: "https://yourlogo.com/logo.png",
        order_id: order_id,
        handler: function (response) {
          setPaymentSuccessful(true);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in checkout:", error);
      setNotificationData({
        type: "error",
        message: "Error in checkout",
        duration: 3000,
      });
      setShowNotification(true);
    }
  };

  return (
    <Container className="mt-4">
      {showNotification && (
        <Notification
          message={notificationData?.message}
          type={notificationData?.type}
          duration={notificationData?.duration}
          resetNotificationData={() => setShowNotification(false)}
        />
      )}
      {paymentSuccessful ? (
        <div className="text-center">
          <img
            src={paymentSuccessfulImg}
            alt="Empty Cart"
            height={400}
            width={400}
            className="img-fluid mb-4"
          />
          <p>
            Thank you for your purchase. Your order has been placed
            successfully.
          </p>
          <a href="/" className="btn btn-success mt-3">
            Continue Shopping
          </a>
        </div>
      ) : (
        <>
          <h1 className="text-center mb-4">Your Cart</h1>
          {cartItems.length === 0 ? (
            <div className="text-center">
              <img
                src={emptyCartImg}
                alt="Empty Cart"
                height={400}
                width={400}
                className="img-fluid mb-4"
              />
              <p>
                Your cart is empty. Looks like you haven't added any products
                yet!
              </p>
              <p>Don't miss out on our amazing products. Start shopping now!</p>
              <a href="/" className="btn btn-success mt-1">
                Go to Home and Shop
              </a>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <Table striped bordered hover className="text-center">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <img
                            src={item.image}
                            alt="Product"
                            height={100}
                            width={100}
                          />
                        </td>
                        <td>${item.price}</td>
                        <td>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              dispatch(decrementQuantity(item._id))
                            }
                            disabled={item.quantity === 1}
                          >
                            -
                          </Button>
                          {item.quantity}
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              dispatch(incrementQuantity(item._id))
                            }
                          >
                            +
                          </Button>
                        </td>
                        <td>${item.price * item.quantity}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => dispatch(removeFromCart(item._id))}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Row className="justify-content-end mb-2">
                <Col xs={12} md={6} lg={4} className="text-end">
                  <p className="fw-bold">
                    Total: $
                    {cartItems
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </p>
                  <Button
                    variant="success"
                    onClick={handleCheckout}
                    className="w-100"
                  >
                    Proceed to Checkout
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default CartPage;
