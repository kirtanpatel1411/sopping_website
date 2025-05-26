import * as React from "react";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../features/product/productslice";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "../../features/product/productslice";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Link,
  Avatar,
  Snackbar,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { addToCart } from "../../features/cartslice/cartslice";
import AddIcon from "@mui/icons-material/Add";
import "./product.scss";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useMediaQuery } from "@mui/material";

const ProductCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error}</h1>;
  }

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setSnackbarOpen(true);
    setSnackbarMessage(`${item.title} added to cart successfully`);
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  };

  const handleProductClick = (item) => {
    dispatch(setSelectedProduct(item));
    navigate(`/product/${item._id}`);
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "50px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {products?.map((item) => (
          <div className="card-con" key={item._id}>
            <Card
              sx={{
                width: isMobile ? 250 : 300,
                height: 300,
                maxWidth: "100%",
                boxShadow: 3,
                borderRadius: "10px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={`http://localhost:5000/${item.image}`}
                alt={item.title}
                sx={{ borderRadius: "10px 10px 0 0" }}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {item.title}
                </Typography>
                <Link
                  href={item.link}
                  component="button"
                  onClick={() => handleProductClick(item)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                    textDecoration: "underline",
                    color: theme.palette.alert.main,
                  }}
                >
                  {item.title}
                  <ArrowOutwardIcon sx={{ ml: 1 }} />
                </Link>

                <Typography
                  variant="h6"
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  Price:₹ {item.price}
                  <Chip
                    size="small"
                    label={item.category}
                    sx={{
                      backgroundColor: theme.palette.success.main,
                      color: theme.palette.text.secondary,
                    }}
                  />
                </Typography>
                {/* <Typography
                  variant="body2"
                  sx={{ color: theme.palette.success.main, fontWeight: 600 }}
                >
                  Rating: {item.rating}
                </Typography> */}
              </CardContent>
            </Card>
            <div className="card-button">
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.primary.main,
                    transition: "all 0.3s ease",
                  },
                  cursor: "pointer",
                }}
                onClick={() => handleAddToCart(item)}
              >
                <AddIcon />
              </Avatar>
            </div>
          </div>
        ))}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          message={snackbarMessage}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
          }}
        />
      </Container>
    </>
  );
};

export default ProductCard;
