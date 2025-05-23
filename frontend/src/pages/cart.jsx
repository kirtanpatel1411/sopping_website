// import React from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import {
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from "../features/cartslice/cartslice";
// import { CheckOut } from "../features/checkoutslice/checkoutslice";
// import { IconButton } from "@mui/material";
// import { Tooltip } from "@mui/material";
// import Button from "@mui/material/Button";
// import { useTheme } from "@mui/material/styles";

// /**
//  * This is the component for the cart page show the products in the cart
//  * @returns function
//  */
// function Cart() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cartItem = useSelector((state) => state.cart.cartItem);
//   const theme = useTheme();

//   const handleOut = () => {
//     // Dispatch each cart item to checkout
//     cartItem.forEach((item) => {
//       dispatch(CheckOut(item));
//     });
//     navigate("/checkout"); // Fixed: navigate instead of Navigate
//   };

//   return (
//     <>
//       <div className="cart-con">
//         <div className="cart-detail">
//           <table className="carttable">
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Subtotal</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             {cartItem.length === 0 ? (
//               <tbody>
//                 <tr>
//                   <td colSpan="6">
//                     <p>No items in cart.</p>
//                   </td>
//                 </tr>
//               </tbody>
//             ) : (
//               <tbody>
//                 {cartItem.map((item) => (
//                   <tr key={item.id}>
//                     <td className="cartimg">
//                       <img src={item.thumbnail} alt={item.title} />
//                     </td>
//                     <td>{item.title}</td>
//                     <td>₹{item.price}</td>
//                     <td>
//                       <Tooltip title="Remove">
//                         <IconButton
//                           variant="outlined"
//                           size="small"
//                           className="minus"
//                           onClick={() => dispatch(decreaseQuantity(item.id))}
//                         >
//                           <RemoveIcon />
//                         </IconButton>
//                       </Tooltip>
//                       <span>{item.quantity}</span>
//                       <Tooltip title="Add">
//                         <IconButton
//                           variant="outlined"
//                           size="small"
//                           className="plus"
//                           onClick={() => dispatch(increaseQuantity(item.id))}
//                         >
//                           <AddIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </td>
//                     <td>₹{(item.quantity * item.price).toFixed(2)}</td>
//                     <td>
//                       <Tooltip title="Remove">
//                         <IconButton
//                           type="button"
//                           aria-label="delete"
//                           className="remove"
//                         >
//                           <DeleteIcon
//                             onClick={() => dispatch(removeFromCart(item.id))}
//                             sx={{
//                               color: "red",
//                             }}
//                           />
//                         </IconButton>
//                       </Tooltip>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             )}
//           </table>
//           <div className="total-con">
//             <div>
//               <h1>Cart Total</h1>
//               <div className="count">
//                 <span className="spansub">
//                   Sub total: ₹
//                   {cartItem
//                     .reduce(
//                       (total, item) => total + item.quantity * item.price,
//                       0
//                     )
//                     .toFixed(2)}
//                 </span>
//                 <br />
//                 <br />
//                 <br />
//                 <span className="spansub">
//                   Total: ₹
//                   {cartItem
//                     .reduce(
//                       (total, item) => total + item.quantity * item.price,
//                       0
//                     )
//                     .toFixed(2)}
//                 </span>
//               </div>
//             </div>
//             <div className="checkoutbtn">
//               <Button
//                 variant="contained"
//                 onClick={handleOut}
//                 sx={{
//                   backgroundColor: "#123458",
//                   color: "#D4C9BE",
//                 }}
//               >
//                 Checkout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

    // export default Cart;
