import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Appbar from "./Admin/Appbar";
import axios from "axios";

const initialFormState = {
  title: "",
  author: "",
  genre: "",
  totalCopies: "",
};

function Admin() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("http://localhost:4002/api/v1/books");
      setBooks(data || []);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleOpenDialog = (book = null) => {
    setEditingBook(book);
    setForm(book || initialFormState);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setForm(initialFormState);
    setEditingBook(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingBook) {
        await axios.put(
          `http://localhost:4002/api/v1/books/${editingBook.id}`,
          form
        );
      } else {
        await axios.post("http://localhost:4002/api/v1/books", form);
      }
      fetchBooks();
      handleCloseDialog();
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4002/api/v1/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <Box>
      <Appbar />

      <Box p={3}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">Library Dashboard</Typography>
          <Button variant="contained" onClick={() => handleOpenDialog()}>
            Add Book
          </Button>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Total Copies</TableCell>
                <TableCell>Borrowed</TableCell>
                <TableCell>Available</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => {
                const borrowed = book.borrowedCount || 0;
                const available = book.totalCopies - borrowed;
                return (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.totalCopies}</TableCell>
                    <TableCell>{borrowed}</TableCell>
                    <TableCell>{available}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpenDialog(book)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog for Add/Edit Book */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingBook ? "Edit Book" : "Add Book"}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              name="title"
              label="Title"
              value={form.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="author"
              label="Author"
              value={form.author}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="genre"
              label="Genre"
              value={form.genre}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="totalCopies"
              label="Total Copies"
              type="number"
              value={form.totalCopies}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingBook ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Admin;
