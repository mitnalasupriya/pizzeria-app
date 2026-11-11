import "../styles/PopupMessage.css";

function PopupMessage({
  message,
  onClose,
  showButton = true,
}) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>{message}</h3>

        {showButton && (
          <button onClick={onClose}>
            OK
          </button>
        )}
      </div>
    </div>
  );
}

export default PopupMessage;