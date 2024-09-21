import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../Components/ProductCard";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Pagination from "../../Components/Pagination";
import NoDataImg from "../../assets/no-data.avif";
import Notification from "../../Components/Notification";

const ProductList = ({ sortByPrice, searchQuery, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [isError, setIsError] = useState(false);
  const [notificationData, setNotificationData] = useState({
    type: "success",
    message: "",
    duration: 3000,
  });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/product`
        );
        if (response.data.length === 0) {
          setIsError(true);
        } else {
          setProducts(response.data);
          setIsError(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsError(true);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/product/${id}`
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      setShowNotification(true);
      setNotificationData({
        type: "success",
        message: "Product deleted successfully",
        duration: 3000,
      });
    } catch (error) {
      setShowNotification(true);
      setNotificationData({
        type: "error",
        message: "Error deleting product",
        duration: 3000,
      });
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortByPrice) {
      return a.price - b.price;
    }
    return 0;
  });

  const handleAddToCart = (product) => {
    setShowNotification(true);
    addToCart(product);
    setNotificationData({
      type: "success",
      message: "Product added to the cart successfully",
      duration: 3000,
    });
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <h1 className="mb-4">Product List</h1>
      {isError || products.length === 0 ? (
        <div className="d-flex flex-column align-items-center">
          <img
            src={NoDataImg}
            alt="No Data"
            height={400}
            width={400}
            className="img-fluid mb-4"
          />
          <Alert variant="danger">
            No products available or failed to load products. Please try again
            later.
          </Alert>
        </div>
      ) : (
        <>
          <Row>
            {currentProducts?.map((product, index) => (
              <Col xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductCard
                  id={product._id}
                  title={product.title}
                  imageSrc={product.image}
                  description={product.description}
                  onDelete={handleDelete}
                  price={product.price}
                  onAddToCart={() => handleAddToCart(product)}
                />
              </Col>
            ))}
          </Row>
          {currentProducts.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default ProductList;
