import "./Header.css";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import logo from "../../assets/images/logo3.png";

import Instalogo from "../../assets/images/instagram.png";

import Facebooklogo from "../../assets/images/facebook.png";

import Telelogo from "../../assets/images/telegram.png";

import profileIcon from "../../assets/images/profile.png";

import useAuthStore from "../../store/AuthStore";

import {
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

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

  const navigate =
  useNavigate();

  const location =
  useLocation();

  const dropdownRef =
  useRef(null);

  useEffect(() => {

    const handleClickOutside =
    (event) => {

      if (

        dropdownRef.current &&

        !dropdownRef.current.contains(
          event.target
        )

      ) {

        setIsProfileOpen(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  const handleSubmitClick =
  () => {

    if (!token) {

      setIsAuthOpen(true);

      return;

    }

    if (
      location.pathname !== "/"
    ) {

      navigate("/");

      setTimeout(() => {

        const element =
        document.getElementById(
          "submit-form"
        );

        element?.scrollIntoView({

          behavior: "smooth",

        });

      }, 150);

    }

    else {

      const element =
      document.getElementById(
        "submit-form"
      );

      element?.scrollIntoView({

        behavior: "smooth",

      });

    }

  };

  return (

    <header className="header">

      <div
        className="header__logo"
        onClick={() => navigate("/")}
        style={{
          cursor: "pointer",
        }}
      >

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

        <a href="https://www.facebook.com/profile.php?id=61589883387481  ">

          <img
            src={Facebooklogo}
            alt=""
          />

        </a>

        <a href="https://t.me/icareeram">

          <img
            src={Telelogo}
            alt=""
          />

        </a>

      </div>

      <div className="header__right">

        <button
          className="header__submit"
          onClick={handleSubmitClick}
        >

          Տեղադրել հայտարարություն

        </button>

        {

          user ? (

            <div
              className="header__profile"
              ref={dropdownRef}
            >

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

                    <Link
                      to="/my-listings"
                    >

                      <button>

                        Իմ հայտարարությունները

                      </button>

                    </Link>

                    {

                      user?.isAdmin && (

                        <Link
                          to="/admin"
                        >

                          <button>

                            Admin Panel

                          </button>

                        </Link>

                      )

                    }

                    <button
                      onClick={() => {

                        logout();

                        window.location.href = "/";

                      }}
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

              Մուտք

            </button>

          )

        }

      </div>

    </header>

  );
}

export default Header;