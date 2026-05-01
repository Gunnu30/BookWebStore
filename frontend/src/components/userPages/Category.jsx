import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const theme = useSelector((state) => state.theme.theme);
  const isLight = theme === "light";

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/books-genre/${genreId}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
          }
        );
        const data = await res.json();

        if (!res.ok) {
          console.error("Error fetching books by genre:", data);
          setListBooks([]);
          return;
        }

        // Sort by relevance score (descending)
        const sorted = (data.listBooks || []).sort(
          (a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)
        );
        setListBooks(sorted);
      } catch (e) {
        console.log("Error", e.message);
        setListBooks([]);
      }
    };
    fetchBooksByGenre();
  }, [genreId]);

  const displayBooks = listBooks;
  const currentGenre = availableGenres.find((g) => g.id === genreId);

  const handleChange = (e) => setGenreId(e.target.value);

  return (
    <div
      className={`w-full min-h-screen p-6 transition-colors duration-300 ${
        isLight ? "bg-gray-50 text-gray-900" : "bg-[#0F1C3F] text-white"
      }`}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-6">Browse by Category</h1>

        {/* Genre Selector */}
        <div className="flex items-center gap-4">
          <label className="text-lg font-semibold">Select Genre:</label>
          <select
            value={genreId}
            onChange={handleChange}
            className={`px-4 py-2 rounded-lg border-2 font-semibold text-lg ${
              isLight
                ? "bg-white border-blue-400 text-gray-900 hover:border-blue-600"
                : "bg-[#1a2a4d] border-blue-500 text-white hover:border-blue-400"
            } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {availableGenres.map((each) => (
              <option key={each.id} value={each.id}>
                📚 {each.name}
              </option>
            ))}
          </select>
        </div>
        {currentGenre && (
          <p className="mt-4 text-xl font-semibold opacity-80">
            Showing {displayBooks.length} books in {currentGenre.name}
          </p>
        )}
      </div>

      {/* Books Grid */}
      {displayBooks.length === 0 ? (
        <div
          className={`text-center py-16 rounded-lg ${
            isLight ? "bg-white" : "bg-[#1a2a4d]"
          }`}
        >
          <p className="text-xl opacity-60 mb-4">
            No books found in this category.
          </p>
          <p className="text-sm opacity-50">
            Try selecting another genre above.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayBooks.map((book) => (
            <div
              key={book.id}
              className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
                isLight ? "bg-white" : "bg-[#1a2a4d]"
              }`}
            >
              {/* Book Cover */}
              <div className="relative overflow-hidden h-48 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-all">
                {book.cover_url ? (
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="w-[100px] h-[150px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="text-white text-center px-4">
                    <p className="font-semibold">No Cover</p>
                  </div>
                )}
                {/* Relevance Badge */}
                {book.relevanceScore > 0 && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
                    ★ {book.relevanceScore}/10
                  </div>
                )}
              </div>

              {/* Book Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-500">
                  {book.title}
                </h3>
                <p
                  className={`text-sm mb-3 ${
                    isLight ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  by {book.author || "Unknown Author"}
                </p>

                {/* Description */}
                <p
                  className={`text-xs mb-4 line-clamp-2 ${
                    isLight ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {book.description || "No description available"}
                </p>

                {/* Price + Button */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-500">
                    ₹{book.price?.toFixed(2) || "0.00"}
                  </span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
