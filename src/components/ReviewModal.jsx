import {
  getReviewsByPizzaId,
  getStars,
} from "../utils/reviewUtils";
import "../styles/ReviewModal.css";

function ReviewModal({ pizza, onClose }) {
  const reviews = getReviewsByPizzaId(pizza.id);

  return (
    <div className="review-overlay">
      <div className="review-modal">
        <h2>{pizza.name} Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews available for this pizza.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-left">
                <strong>{review.userName}</strong>
                <p className="review-date">{review.date}</p>
              </div>

              <div className="review-right">
                <p className="review-stars">
                  {getStars(review.rating)}
                </p>

                <p>{review.comment}</p>
              </div>
            </div>
          ))
        )}

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ReviewModal;