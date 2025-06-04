import React, { useEffect, useState } from "react";
import axios from "axios";
import UserAppbar from "./User/UserAppbar";

function User() {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("http://localhost:4002/api/v1/books");
      setBooks(data || []);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4002/api/v1/user/borrowed"
      );
      setBorrowedBooks(data || []);
    } catch (error) {
      console.error("Error fetching borrowed books", error);
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      await axios.post(`http://localhost:4002/api/v1/user/borrow/${bookId}`);
      fetchBooks();
      fetchBorrowedBooks();
    } catch (error) {
      alert(error?.response?.data?.message || "Borrow failed");
    }
  };

  const handleReturn = async (bookId) => {
    try {
      await axios.post(`http://localhost:4002/api/v1/user/return/${bookId}`);
      fetchBooks();
      fetchBorrowedBooks();
    } catch (error) {
      alert(error?.response?.data?.message || "Return failed");
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchBorrowedBooks();
  }, []);

  return (
    <>
      <UserAppbar />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Available Books</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Author</th>
                  <th className="px-4 py-2 border">Genre</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Borrowed</th>
                  <th className="px-4 py-2 border">Available</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                  const borrowed = book.borrowedCount || 0;
                  const available = book.totalCopies - borrowed;
                  const alreadyBorrowed = borrowedBooks.some(
                    (b) => b.book.id === book.id
                  );

                  return (
                    <tr key={book.id}>
                      <td className="px-4 py-2 border">{book.title}</td>
                      <td className="px-4 py-2 border">{book.author}</td>
                      <td className="px-4 py-2 border">{book.genre}</td>
                      <td className="px-4 py-2 border">{book.totalCopies}</td>
                      <td className="px-4 py-2 border">{borrowed}</td>
                      <td className="px-4 py-2 border">{available}</td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleBorrow(book.id)}
                          disabled={available <= 0 || alreadyBorrowed}
                          className={`px-3 py-1 rounded text-white ${
                            alreadyBorrowed
                              ? "bg-gray-400 cursor-not-allowed"
                              : available <= 0
                              ? "bg-red-400 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                        >
                          {alreadyBorrowed
                            ? "Already Borrowed"
                            : available <= 0
                            ? "Unavailable"
                            : "Borrow"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">My Borrowed Books</h3>
          {borrowedBooks.length === 0 ? (
            <p className="text-gray-600">You haven’t borrowed any books yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {borrowedBooks.map(({ book, borrowDate }) => (
                <div
                  key={book.id}
                  className="border p-4 rounded shadow bg-white"
                >
                  <h4 className="text-lg font-bold">{book.title}</h4>
                  <p className="text-sm text-gray-600">Author: {book.author}</p>
                  <p className="text-sm text-gray-600">Genre: {book.genre}</p>
                  <p className="text-sm text-gray-600">
                    Borrowed On: {new Date(borrowDate).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => handleReturn(book.id)}
                    className="mt-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Return
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default User;
