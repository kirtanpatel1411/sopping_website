import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartslice/cartslice";
import { Snackbar } from "@mui/material";
import { CartContext } from "../context/cartcontext";
import { useContext, useState, useEffect } from "react";
import { fetchProduct } from "../features/product/productslice";
import { useTheme } from "@mui/material/styles";
import "../App.scss";
import { useMediaQuery } from "@mui/material";

/**
 * This is a functional component that displays a product details page.
 * @returns function
 */
const Product = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { open, handleOpen, handleClose } = useContext(CartContext);
  const [open1, setOpen1] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.selectedProduct);
  const allProducts = useSelector((state) => state.product.products.products);
  const { id } = useParams();

  useEffect(() => {
    if (!allProducts) {
      dispatch(fetchProduct());
    }

    if (allProducts && !products) {
      const selectedProduct = allProducts.find(
        (product) => product._id === parseInt(id)
      );
      if (selectedProduct) {
        dispatch({ type: "product/setProducts", payload: selectedProduct });
      }
    }
  }, [dispatch, id, allProducts, products]);

  if (!products) {
    return (
      <div className="contain">
        <p>Loading...</p>
        <Link to="/" className="btn btn-link">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(products));
    handleOpen();
    setOpen1(true);
    setTimeout(() => {
      handleClose();
      setOpen1(false);
    }, 1000);
  };

  return (
    <>
      <div className="product-container">
        <Link to="/" className="btn btn-link mb-4">
          ← Back to Products
        </Link>
        <div className="product-con">
          {products ? (
            <div
              key={id}
              className="product"
              style={{
                color: theme.palette.primary.main,
                display: isMobile ? "contents" : "flex",
                paddingTop: "70px",
                paddingLeft: "70px",
              }}
            >
              <div
                className="product-image"
                style={{
                  width: isMobile ? "300px" : "500px",
                  height: isMobile ? "300px" : "500px",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  src={`http://localhost:5000/${products.image}`}
                  alt="product image"
                />
              </div>
              <div
                className="product-info"
                style={{
                  Width: isMobile ? "100%" : "50%",
                  marginLeft: isMobile ? "20px" : "20px",
                  // display: isMobile ? "contents" : "flex",
                }}
              >
                <h1
                  className="product-title"
                  style={{
                    fontSize: isMobile ? "30px" : "50px",
                  }}
                >
                  {products.title}
                </h1>
                <p
                  className="product-des"
                  style={{
                    fontSize: isMobile ? "25px" : "30px",
                  }}
                >
                  {products.description}
                </p>
                <p
                  className="product-rating"
                  style={{
                    color: theme.palette.alert.main,
                    fontWeight: "bold",
                  }}
                >
                  Rating:
                  <span> {products.rating}</span>
                </p>
                <p
                  className="product-price"
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  Price: ₹{products.price}
                </p>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.secondary.main,
                    width: "70%",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.primary.main,
                      transition: "all 0.3s ease",
                    },
                  }}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Snackbar
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  open={open1}
                  autoHideDuration={2000}
                  message="Item Added to Cart"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.secondary.main,
                  }}
                />
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
