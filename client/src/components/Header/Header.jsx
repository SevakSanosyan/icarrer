import "./Header.css";
import logo from "../../assets/images/logo3.png";
import Instalogo from "../../assets/images/instagram.png";
import Facebooklogo from "../../assets/images/facebook.png";
import Telelogo from "../../assets/images/telegram.png";

function Header() {
  const scrollToForm = () => {
    const formSection = document.getElementById("submit-form");

    formSection.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="header">

<div className="header__logo">

  <img
    src={logo}
    alt="logo"
  />

</div>

<div className="header__socials">

  <a href="https://www.facebook.com/profile.php?id=61589883387481 ">
    <img
      src={Facebooklogo}
      alt="Facebook"
    />
  </a>

  <a href="#">
    <img
      src={Instalogo}
      alt="Instagram"
    />
  </a>

  <a href="#">
    <img
      src={Telelogo}
      alt="Telegram"
    />
  </a>

</div>

      <button
        className="header__button"
        onClick={scrollToForm}
      >
        
        ՏԵՂԱԴՐԵԼ ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ
      </button>

    </header>
  );
}

export default Header;