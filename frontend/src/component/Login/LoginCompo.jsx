import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.scss";
import { useTheme } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../context/authContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/login", form, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: form,
    });
    if (res.status === 200) {
      login(res.data.token);
      navigate("/profile");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{
            color: theme.palette.primary.main,
            fontSize: "50px",
            textAlign: "center",
          }}
        >
          Login
        </Typography>
        <Box
          component="form"
          className="loginform"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={onChange}
            autoFocus
            sx={{
              "& label": {
                color: theme.palette.primary.main,
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            onChange={onChange}
            type="password"
            id="password"
            sx={{
              "& label": {
                color: theme.palette.primary.main,
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            sx={{
              color: theme.palette.primary.main,
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            Sign In
          </Button>
          <Dialog
            open={open}
            onClose={handleDialogClose}
            PaperProps={{
              style: {
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          >
            <DialogTitle sx={{ color: theme.palette.primary.main }}>
              Login successful !
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ color: theme.palette.primary.main }}>
                You have successfully logged in.
              </DialogContentText>
              <Button
                size="medium"
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.primary.main,
                  },
                }}
                onClick={() => {
                  handleDialogClose();
                  navigate("/");
                }}
              >
                Close
              </Button>
            </DialogContent>
          </Dialog>
          <Grid container justifyContent="space-between">
            <Grid>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid>
              <Link
                href="/SignIn"
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
