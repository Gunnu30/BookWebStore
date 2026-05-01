# BookWebStore

A full-stack online bookstore application with separate backend and frontend projects. The backend is built with Express and Supabase, while the frontend is a React + Vite app using Redux for state management and protected routing for both users and admins.

## Project Overview

### Backend
- `backend/src/index.js` starts an Express server on port `5000` by default.
- Uses `express.json()`, `cors`, and `cookie-parser`.
- Connects to Supabase using `backend/src/config/db.js`.
- Uses cookie-based JWT authentication in `backend/src/middleware/authMiddleware.js`.
- Supports user registration, login, admin registration/login, logout, and auth validation.
- Supports listing books, fetching book details, filtering books by genre, cart management, and checkout.

### Frontend
- React application bootstrapped with Vite in `frontend/`.
- Uses Redux Toolkit for state management in `frontend/src/reduxSlices/`.
- Uses `react-router-dom` for routing and route guards:
  - `frontend/src/services/ProtectedRoutes.jsx`
  - `frontend/src/services/PublicRoutes.jsx`
- Reads auth state from cookies and hydrates user session via `frontend/src/services/authServices.js`.
- Includes pages for user login/register, book browsing, cart, checkout, admin login/register, admin dashboard, and admin book operations.
- Includes theme state support via `themeSlice`.

## Key Features

- User registration and login
- Admin registration and login
- JWT authentication stored in cookies
- Protected routes for authenticated users and admin-only pages
- Book listing, details, and genre-based filtering
- Add to cart and checkout endpoints
- Supabase-backed data storage for users, books, genres, and cart items
- Theme toggle support and global styling

## 📂 Book by Category

The frontend allows users to browse books by selecting a genre from a dropdown.  
When a genre is selected, the app calls:


### How Filtering Works
- The backend looks up the `book_genres` table for rows where `genre_id = :genreId`.
- It collects all matching `book_id` values.
- It then fetches the corresponding book details from the `books` table.
- The result is a list of books filtered by the chosen category.

### Relevance Score
- The `book_genres` table includes a `score` column (integer).
- This score represents how strongly a book belongs to a given genre:
  - Higher scores = more relevant.
  - Lower scores = loosely related.
- The backend includes this score in the response as `relevanceScore`.
- The frontend sorts books by `relevanceScore` descending and displays it as a badge (★ `score/10`) on each book card.

### Example Response
```json
{
  "listBooks": [
    {
      "id": 1,
      "title": "Romantic Tales",
      "author": "Author A",
      "price": 299,
      "cover_url": "https://...",
      "description": "A love story...",
      "relevanceScore": 9
    },
    {
      "id": 2,
      "title": "Psychology Basics",
      "author": "Author B",
      "price": 399,
      "cover_url": "https://...",
      "description": "Intro to psychology...",
      "relevanceScore": 5
    }
  ]
}

---

This section makes it clear how your **category filtering** and **relevance scoring** work, both for developers and contributors.  

👉 Would you like me to also draft a **diagram (ASCII or markdown table)** showing the relationship between `books`, `book_genres`, and `genres` so your README visually explains the filtering logic?
```
## API Endpoints

### Auth
- `POST /register` - Create a new normal user
- `POST /login` - Login as a normal user
- `POST /admin/register` - Create a new admin user
- `POST /admin/login` - Login as an admin user
- `GET /me` - Verify token and return the current user
- `POST /logout` - Clears auth cookie

### Books
- `GET /books` - Fetch all books
- `GET /books/:id` - Fetch details for a single book
- `GET /books-genre/:genreId` - Fetch books by genre ID

### Cart
- `GET /cart` - Fetch cart items for authenticated user
- `POST /add-to-cart` - Add or update a book in the cart
- `POST /confirm-payment` - Clear cart after payment confirmation

## Environment Setup

### Backend
Create a `.env` file in `backend/` with:

```env
SUPABASE_URL=https://your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend
Create a `.env` file in `frontend/` with:

```env
VITE_API_URL=http://localhost:5000
```

## Run Locally

### Start backend
```bash
cd backend
npm install
npm run start
```

### Start frontend
```bash
cd frontend
npm install
npm run dev
```

## Notes

- The backend uses cookie-based JWT authentication, so frontend requests should include credentials when calling protected endpoints.
- Supabase is used as the database provider, meaning you must configure your Supabase project and tables for `users`, `books`, `book_genres`, and `cart`.
- Redux stores user session, cart contents, and theme state for the UI.

## Recommended Improvements

- Add validation and improved error handling on the frontend.
- Add a dedicated logout action in Redux to clear user state.
- Implement more robust cart retrieval and user-specific cart filtering on the backend.
- Add tests for backend routes and frontend components.
