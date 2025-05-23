import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { fetchProduct } from "../features/product/productslice";
import { useSelector, useDispatch } from "react-redux";

function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [editMode, setEditmode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);

  const API_URL = "http://localhost:5000/api/products";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("image", product.image);

    try {
      let response;
      if (editMode) {
        response = await axios.put(`${API_URL}/${editId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axios.post(API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setMessage(
        response.data.msg || (editMode ? "Product updated!" : "Product added!")
      );
      dispatch(fetchProduct());
      setProduct({
        title: "",
        description: "",
        price: "",
        category: "",
        image: null,
      });
      setEditmode(false);
      setEditId(null);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Failed to add product");
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      setMessage(response.data.msg || "Product deleted!");
      dispatch(fetchProduct());
    } catch (error) {
      setMessage(error.response?.data?.msg || "Failed to delete product");
    }
  };
  const handleEdit = async (_id) => {
    try {
      const response = await axios.get(`${API_URL}/${_id}`);
      const prod = response.data;
      setProduct({
        title: prod.title,
        description: prod.description,
        price: prod.price,
        category: prod.category,
        image: null,
      });

      setEditmode(true);
      setEditId(_id);
      setMessage("");
    } catch (error) {
      setMessage(error.response?.data?.msg || "Failed to edit product");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5 }}>
      <Box
        sx={{
          p: 3,
          mt: 10,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "#f9f9f9",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {message && <Typography color="secondary">{message}</Typography>}
          <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {product.image && (
            <Typography sx={{ mt: 1 }}>
              Selected: {product.image.name}
            </Typography>
          )}

          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={product.title}
            onChange={handleChange}
            required
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={product.description}
            onChange={handleChange}
            required
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            margin="normal"
            value={product.price}
            onChange={handleChange}
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={product.category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="books">Books</MenuItem>
              <MenuItem value="home">Home</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            {editMode ? "Update Product" : "Submit"}
          </Button>
        </form>
      </Box>

      {/* Product List Table */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Product List
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No products found</TableCell>
                </TableRow>
              ) : (
                products.map((prod) => (
                  <TableRow key={prod._id}>
                    <TableCell>{prod.title}</TableCell>
                    <TableCell>${prod.price}</TableCell>
                    <TableCell>{prod.category}</TableCell>
                    <TableCell>
                      {prod.image && (
                        <img
                          src={`http://localhost:5000/${prod.image}`}
                          alt={prod.title}
                          width="50"
                          height="50"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleDelete(prod._id);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleEdit(prod._id);
                        }}
                      >
                        {" "}
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AddProduct;
