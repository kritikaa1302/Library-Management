export default function BookCard({ book, onBorrow, onWishlist, isWishlisted, actions }) {
  return (
    <div className="book-card">
      <img src={book.coverImage} alt={book.title} className="book-cover" />
      <h4>{book.title}</h4>
      <p className="author">{book.author}</p>
      <p className="category">{book.category}</p>
      <p className="rating">⭐ {book.ratings} · {book.availableCopies} copies</p>
      {actions && (
        <div className="card-actions">
          {actions}
        </div>
      )}
    </div>
  );
}