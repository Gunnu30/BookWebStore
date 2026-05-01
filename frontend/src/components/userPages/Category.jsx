import { useEffect, useState } from "react";

const availableGenres = [
  { id: "g1", name: "Romance" },
  { id: "g2", name: "Psychology" },
  { id: "g3", name: "Poems" },
  { id: "g4", name: "Self Development" },
  { id: "g5", name: "Fiction" },
  { id: "g6", name: "Science" },
  { id: "g7", name: "History" },
  { id: "g8", name: "Philosophy" },
  { id: "g9", name: "Crime" },
  { id: "g10", name: "Thriller" },
  { id: "g11", name: "Fantasy" },
  { id: "g12", name: "Biography" },
  { id: "g13", name: "Health" },
  { id: "g14", name: "Business" },
  { id: "g15", name: "Non-Fiction" },
  { id: "g16", name: "Comedy" }
];

const Category = () => {
  const [listBooks, setListBooks] = useState([]);
  const [genreId, setGenreId] = useState("g1");

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/books-genre/${genreId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        const data = await res.json();
        console.log("Books:", data.listBooks);
        setListBooks(data.listBooks || []);
      } catch (e) {
        console.log("Error", e.message);
      }
    };
    fetchBooksByGenre();
  }, [genreId]); // re-run when genreId changes


  const filteredData = listBooks.filter((each) => each.genreId === genreId);

  const handleChange = (e) => {
    setGenreId(e.target.value);
  };

  return (
    <div>
      <h1>By Default Genre is Romance</h1>
      <select
        className="p-2 border rounded-md"
        value={genreId}
        onChange={handleChange}
      >
        {availableGenres.map((each) => (
          <option key={each.id} value={each.id}>
            {each.name}
          </option>
        ))}
      </select>

      <div>
        {filteredData.map((book) => (
          <p key={book.id}>{book.title}</p>
        ))}
      </div>
    </div>
  );
};

export default Category;
