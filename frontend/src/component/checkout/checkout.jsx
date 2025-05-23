import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Checkout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const cart = useSelector((state) => state.checkout.setItem);

  const total = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {!isMobile && (
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
      )}

      <Grid container
      sx={{
        marginTop:"20px"
      }}
      spacing={4}>
        {/* Left: Form */}
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="First Name" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Last Name" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Company Name" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Address"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Town/City" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Country" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>

        {/* Right: Cart Summary + Payment */}
        <Grid item xs={12} md={6} lg={8}>
          <Typography variant="h6" gutterBottom>
            Cart Summary
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Info</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.title} × {item.quantity}
                    </TableCell>
                    <TableCell align="right">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <strong>Subtotal</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>₹{total.toFixed(2)}</strong>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" color="error">
                      ₹{total.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Payment Method */}
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Select Payment Method</FormLabel>
            <RadioGroup row={!isMobile} name="payment">
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Cash on Delivery"
              />
              <FormControlLabel value="card" control={<Radio />} label="Card" />
              <FormControlLabel value="upi" control={<Radio />} label="UPI" />
              <FormControlLabel
                value="netbanking"
                control={<Radio />}
                label="Net Banking"
              />
              <FormControlLabel
                value="wallet"
                control={<Radio />}
                label="Wallet"
              />
            </RadioGroup>
          </FormControl>

          <Button variant="contained" fullWidth>
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Checkout;
