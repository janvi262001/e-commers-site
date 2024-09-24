import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../store/reducer/product";
import { addToCart } from "../../store/reducer/cart";
import ProductCard from "../../Components/ProductCard";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Pagination from "../../Components/Pagination";
import NoDataImg from "../../assets/no-data.avif";
import Notification from "../../Components/Notification";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, searchQuery, sortByPrice, isError, status } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [notificationData, setNotificationData] = useState({
    type: "success",
    message: "",
    duration: 3000,
  });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setNotificationData({
      type: "success",
      message: "Product deleted successfully",
      duration: 3000,
    });
    setShowNotification(true);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setNotificationData({
      type: "success",
      message: "Product added to cart successfully",
      duration: 3000,
    });
    setShowNotification(true);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = sortByPrice
    ? filteredProducts.sort((a, b) => a.price - b.price)
    : filteredProducts;

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
            No products available or failed to load products.
          </Alert>
        </div>
      ) : (
        <>
          <Row>
            {currentProducts.map((product) => (
              <Col xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard
                  id={product._id}
                  title={product.title}
                  imageSrc={product.image}
                  description={product.description}
                  onDelete={() => handleDelete(product._id)}
                  price={product.price}
                  onAddToCart={() => handleAddToCart(product)}
                />
              </Col>
            ))}
          </Row>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        </>
      )}
    </Container>
  );
};

export default ProductList;
