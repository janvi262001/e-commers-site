import { Card, Button } from 'react-bootstrap';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ id,title, imageSrc, description, onDelete, onAddToCart, price }) => {
  return (
    <Card className="my-3 p-2 shadow">
      <div className="w-100" style={{ height: '320px' }}>
        <Card.Img
          variant="top"
          src={imageSrc}
          alt="Card image"
          className="img-fluid w-100 h-100"
          style={{ objectFit: 'fill' }}
        />
      </div>
      <Card.Body>
        <Card.Text className="text-truncate fw-bold" style={{ maxHeight: '4.5em', overflow: 'hidden' }}>
          {title}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex flex-column gap-2 justify-content-between align-items-center">
      <Card.Text className="float-left fw-bold">
          ${price}
        </Card.Text>
        <small className="text-muted">
          {description?.length > 100 ? description.slice(0, 100) + '...' : description}
        </small>
        <div className='d-flex w-100 justify-content-between '>
          <Button variant="outline-success  w-100" onClick={onAddToCart} className="me-2">
            <FaShoppingCart /> Add to Cart
          </Button>
          <Button variant="outline-danger" onClick={() => onDelete(id)}>
            <FaTrash />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
