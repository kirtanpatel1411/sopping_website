import { Outlet, NavLink } from "react-router-dom";
import logo from "../assets/shop.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { Drawer, IconButton } from "@mui/material";
import Cartbutton from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cartslice/cartslice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartContext } from "../context/cartcontext";
import { useContext } from "react";
import { Badge } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { CheckOut } from "../features/checkoutslice/checkoutslice";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../context/authContext";

/**
 * This is the main navigation component its purpose is to display the main navigation menu
 * @returns navbar
 */
const Navigate = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const { open, handleOpen, handleClose } = useContext(CartContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItem = useSelector((state) => state.cart.cartItems);
  const { token } = useContext(AuthContext);

  console.log(cartItem, "cartItem");
  const handleOut = () => {
    cartItem.forEach((item) => {
      dispatch(CheckOut(item));
    });
    navigate("/checkout");
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const Mobile = () => {
    return (
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "50%",
            backgroundColor: "background.default",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: 5,
            gap: 4,
            pt: 5,
          }}
        >
          <Typography
            variant="body1"
            fontWeight={400}
            onClick={() => {
              navigate("/");
              handleDrawerToggle();
            }}
            sx={{
              cursor: "pointer",
              transition: "color 0.3s",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Home
          </Typography>
          <Typography
            variant="body1"
            fontWeight={400}
            onClick={() => {
              navigate("/product");
              handleDrawerToggle();
            }}
            sx={{
              cursor: "pointer",
              transition: "color 0.3s",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Product
          </Typography>
          <Typography
            variant="body1"
            fontWeight={400}
            onClick={() => {
              navigate("/addProduct");
              handleDrawerToggle();
            }}
            sx={{
              cursor: "pointer",
              transition: "color 0.3s",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            AddProduct
          </Typography>
          <Typography
            variant="body1"
            fontWeight={400}
            onClick={() => {
              navigate("/checkout");
              handleDrawerToggle();
            }}
            sx={{
              cursor: "pointer",
              transition: "color 0.3s",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Checkout
          </Typography>

          <Typography
            onClick={() => {
              handleDrawerToggle();
              handleOpen();
            }}
          >
            <Badge badgeContent={cartItem.length} color="error">
              <Cartbutton sx={{ color: theme.palette.secondary.main }} />
            </Badge>
          </Typography>
        </Box>
      </Drawer>
    );
  };
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 0,
          zIndex: 1000,
          backgroundColor: isMobile
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
        }}
        className="navbar"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={logo}
              alt="logo"
              sx={{
                backgroundColor: isMobile
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
                width: "50px",
                height: "50px",
                borderRadius: "5%",
              }}
            />
          </div>
          {isMobile ? (
            <Box>
              <IconButton
                edge="end"
                onClick={handleDrawerToggle}
                aria-label="menu"
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                <Badge badgeContent={cartItem.length} color="error">
                  <MenuIcon />
                </Badge>
              </IconButton>
            </Box>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>

              <NavLink to="/product" className="nav-link">
                Product
              </NavLink>
              <NavLink to="/addProduct" className="nav-link">
                AddProduct
              </NavLink>

              <NavLink to="/checkout" className="nav-link">
                CheckOut
              </NavLink>
              <IconButton onClick={handleOpen}>
                <Badge badgeContent={cartItem.length} color="error">
                  <Cartbutton sx={{ color: theme.palette.secondary.main }} />
                </Badge>
              </IconButton>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MenuIcon sx={{ color: theme.palette.secondary.main }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                {token
                  ? [
                      <MenuItem
                        key="profile"
                        onClick={() => {
                          navigate("/profile");
                          setAnchorEl(null);
                        }}
                      >
                        Profile
                      </MenuItem>,
                      <MenuItem
                        key="logout"
                        onClick={() => {
                          navigate("/logout");
                          setAnchorEl(null);
                        }}
                      >
                        Logout
                      </MenuItem>,
                    ]
                  : [
                      <MenuItem
                        key="login"
                        onClick={() => {
                          navigate("/Login");
                          setAnchorEl(null);
                        }}
                      >
                        Login
                      </MenuItem>,
                      <MenuItem
                        key="signin"
                        onClick={() => {
                          navigate("/SignIn");
                          setAnchorEl(null);
                        }}
                      >
                        SignIn
                      </MenuItem>,
                    ]}
              </Menu>
            </div>
          )}
          <Drawer
            anchor="right"
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                width: isMobile ? "300px" : "400px",
              },
            }}
            open={open}
            onClose={handleClose}
          >
            <div
              style={{
                color: theme.palette.primary.main,
                width: "400px",
              }}
            >
              {cartItem.length === 0 ? (
                <Typography variant="body1">Cart is empty</Typography>
              ) : (
                <div>
                  <Typography
                    variant={isMobile ? "h4" : "h2"}
                    sx={{
                      fontWeight: "400",
                      color: theme.palette.alert.main,
                      textAlign: isMobile ? "left" : "center",
                      marginTop: "20px",
                      position: "relative",
                    }}
                  >
                    Your Cart
                  </Typography>
                  <Button
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                    }}
                  >
                    <CloseIcon />
                  </Button>
                  {cartItem.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        width: isMobile ? "300px" : "400px",
                      }}
                    >
                      <Card
                        sx={{
                          margin: isMobile ? "0px" : "20px",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: theme.palette.secondary.main,
                        }}
                      >
                        <img
                          src={`http://localhost:5000/${item.image}`}
                          alt="logo"
                          style={{
                            width: "100px",
                            height: "100px",
                          }}
                        />
                        <CardContent>
                          <Typography
                            variant="h5"
                            sx={{ color: theme.palette.text.primary }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: theme.palette.primary.main }}
                          >
                            ₹{item.price} <span>x</span> {item.quantity}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: isMobile ? "10px" : "70px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: isMobile
                                  ? "flex-start"
                                  : "space-between",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <IconButton
                                onClick={() =>
                                  dispatch(decreaseQuantity(item.id))
                                }
                              >
                                <RemoveIcon
                                  sx={{
                                    color: theme.palette.primary.main,
                                    border: `1px solid ${theme.palette.text.primary}`,
                                    padding: "5px",
                                  }}
                                />
                              </IconButton>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: "bold",
                                  color: theme.palette.primary.main,
                                }}
                              >
                                {item.quantity}
                              </Typography>
                              <IconButton
                                onClick={() =>
                                  dispatch(increaseQuantity(item.id))
                                }
                              >
                                <AddIcon
                                  sx={{
                                    color: theme.palette.primary.main,
                                    border: `1px solid ${theme.palette.text.primary}`,
                                    padding: "5px",
                                  }}
                                />
                              </IconButton>
                            </div>
                            <div>
                              <IconButton
                                onClick={() =>
                                  dispatch(removeFromCart(item.id))
                                }
                                sx={{
                                  color: theme.palette.alert.main,
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.primary.main,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Total:
                </Typography>
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: theme.palette.primary.main }}
                >
                  ₹
                  {cartItem
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "60%",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.secondary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.primary.main,
                      transition: "all 0.3s ease",
                    },
                  }}
                  onClick={() => {
                    handleOut();
                    handleClose();
                  }}
                >
                  Checkout
                </Button>
              </Grid>
            </Grid>
          </Drawer>
        </Toolbar>
      </AppBar>
      {isMobile && <Mobile />}
      <Outlet />
    </>
  );
};

export default Navigate;
