import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function SigninCompo() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    password: "",
    profileImage: "", 
  });
  const [Massage, setMassage] = useState("");

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("number", form.number);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("profileImage", form.profileImage);

    try {
      const response = await api.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      setMassage(response.data.msg || "Registered successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMassage(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ height: "100vh" }}>
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
          Sign In
        </Typography>
        {Massage && <Typography sx={{ mt: 2 }}>{Massage}</Typography>}

        <Box
          component="form"
          className="loginform"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              },
              mt: 2,
            }}
          >
            Upload Profile Image
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              hidden
              onChange={onChange}
            />
          </Button>

          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            onChange={onChange}
            autoComplete="First Name"
            autoFocus
            sx={{
              "& .MuiInputLabel-root": {
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
            id="Last Name"
            label="Last Name"
            name="lastName"
            onChange={onChange}
            autoComplete="Last Name"
            autoFocus
            sx={{
              "& .MuiInputLabel-root": {
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
            id="number"
            label="Number"
            name="number"
            onChange={onChange}
            autoComplete="number"
            autoFocus
            sx={{
              "& .MuiInputLabel-root": {
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
            id="email"
            label="Email Address"
            name="email"
            onChange={onChange}
            autoComplete="email"
            autoFocus
            sx={{
              "& .MuiInputLabel-root": {
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
            autoComplete="current-password"
            sx={{
              "& .MuiInputLabel-root": {
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
            control={
              <Checkbox
                value="remember"
                sx={{ color: theme.palette.primary.main }}
              />
            }
            label={
              <Typography sx={{ color: theme.palette.primary.main }}>
                Remember me
              </Typography>
            }
          />
          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              },
              mt: 3,
              mb: 2,
            }}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            Sign In
          </Button>
          <Grid container justifyContent="space-between">
            <Grid>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  textAlign: "center",
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid>
              <Link
                href="/login"
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  textAlign: "center",
                }}
              >
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
