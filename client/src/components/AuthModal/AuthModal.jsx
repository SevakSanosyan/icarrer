import "./AuthModal.css";

function AuthModal({

  isOpen,

  onClose,

}) {

  if (!isOpen) return null;

  return (

    <div className="auth-modal">

      <div className="auth-modal__overlay"
        onClick={onClose}
      />

      <div className="auth-modal__content">

        <button
          className="auth-modal__close"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>
          Մուտք
        </h2>

        <form>

          <input
            type="email"
            placeholder="Էլ․ հասցե"
          />

          <input
            type="password"
            placeholder="Գաղտնաբառ"
          />

          <button type="submit">

            Մուտք գործել

          </button>

        </form>

        <div className="auth-modal__bottom">

          <span>
            Գրանցվել
          </span>

          <span>
            Մոռացել եք գաղտնաբառը
          </span>

        </div>

      </div>

    </div>

  );
}

export default AuthModal;