import "./Header.css";

import {
  useState,
} from "react";

import logo from "../../assets/images/logo3.png";

import Instalogo from "../../assets/images/instagram.png";

import Facebooklogo from "../../assets/images/facebook.png";

import Telelogo from "../../assets/images/telegram.png";

import profileIcon from "../../assets/images/profile.png";

import useAuthStore
from "../../store/AuthStore";

function Header({

  setIsAuthOpen,

}) {

  const {

    token,

    user,

    logout,

  } = useAuthStore();

  const [

    isProfileOpen,

    setIsProfileOpen,

  ] = useState(false);

  const scrollToForm = () => {

    if (!token) {

      setIsAuthOpen(true);

      return;
    }

    const formSection =
    document.getElementById(
      "submit-form"
    );

    formSection?.scrollIntoView({

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
            src={Instalogo}
            alt=""
          />

        </a>

        <a href="#">

          <img
            src={Facebooklogo}
            alt=""
          />

        </a>

        <a href="#">

          <img
            src={Telelogo}
            alt=""
          />

        </a>

      </div>

      <div className="header__right">

        <button
          className="header__submit"
          onClick={scrollToForm}
        >

          Տեղադրել հայտարարություն

        </button>

        {

          user ? (

            <div className="header__profile">

              <img

                src={profileIcon}

                alt="profile"

                onClick={() =>

                  setIsProfileOpen(
                    !isProfileOpen
                  )

                }

              />

              {

                isProfileOpen && (

                  <div className="profile-dropdown">

                    <button>

                      Իմ հայտարարությունները

                    </button>

                    <button
                      onClick={logout}
                    >

                      Դուրս գալ

                    </button>

                  </div>

                )

              }

            </div>

          ) : (

            <button

              className="header__button"

              onClick={() =>

                setIsAuthOpen(true)

              }

            >

              Գրանցվել

            </button>

          )

        }

      </div>

    </header>

  );
}

export default Header;