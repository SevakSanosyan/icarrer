import "./Header.css";
import logo from "../../assets/images/logo3.png";
import Instalogo from "../../assets/images/instagram.png";
import Facebooklogo from "../../assets/images/facebook.png";

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

  <a href="#">
    <img
      src={Facebooklogo}
      alt="facebook"
    />
  </a>

  <a href="#">
    <img
      src={Instalogo}
      alt="instagram"
    />
  </a>

</div>

      <button
        className="header__button"
        onClick={scrollToForm}
      >
        Տեղադրել հայտարարություն
      </button>

    </header>
  );
}

export default Header;