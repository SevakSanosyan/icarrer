import "./AuthModal.css";

import {
  useEffect,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import useAuthStore
from "../../store/AuthStore";

function AuthModal({

  isOpen,

  onClose,

}) {

  const {

    login,

    register,

  } = useAuthStore();

  const [isRegister,
  setIsRegister] =
  useState(false);

  const [isForgot,
  setIsForgot] =
  useState(false);

  const [email,
  setEmail] =
  useState("");

  const [password,
  setPassword] =
  useState("");

  const [repeatPassword,
  setRepeatPassword] =
  useState("");

  const [showPassword,
  setShowPassword] =
  useState(false);

  const [showRepeatPassword,
  setShowRepeatPassword] =
  useState(false);

  const [error,
  setError] =
  useState("");

  const [success,
  setSuccess] =
  useState("");

  const [loading,
  setLoading] =
  useState(false);

  useEffect(() => {

    if (!isOpen) {

      setError("");

      setSuccess("");

      setEmail("");

      setPassword("");

      setRepeatPassword("");

      setShowPassword(false);

      setShowRepeatPassword(false);

      setIsRegister(false);

      setIsForgot(false);
    }

  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");

    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(email)
    ) {

      setError(
        "Սխալ էլ․ հասցե"
      );

      return;
    }

    if (
      password.length < 6
    ) {

      setError(
        "Գաղտնաբառը պետք է լինի առնվազն 6 սիմվոլ"
      );

      return;
    }

    if (
      (isRegister || isForgot) &&
      password !== repeatPassword
    ) {

      setError(
        "Գաղտնաբառերը չեն համընկնում"
      );

      return;
    }

    try {

      setLoading(true);

      // FORGOT PASSWORD

      if (isForgot) {

        const res =
        await fetch(

          "http://localhost:5000/auth/forgot-password",

          {

            method: "PUT",

            headers: {

              "Content-Type":
              "application/json",

            },

            body: JSON.stringify({

              email,
              password,

            }),

          }

        );

        if (res.ok) {

          setSuccess(
            "Գաղտնաբառը փոխվեց"
          );

          setTimeout(() => {

            setIsForgot(false);

            setPassword("");

            setRepeatPassword("");

          }, 1000);

        } else {

          setError(
            "Օգտատեր չի գտնվել"
          );
        }

        return;
      }

      // REGISTER

      if (isRegister) {

        const success =
        await register(
          email,
          password
        );

        if (success) {

          setSuccess(
            "Գրանցումը հաջողվեց"
          );

          setTimeout(() => {

            onClose();

          }, 500);
        }

      }

      // LOGIN

      else {

        const success =
        await login(
          email,
          password
        );

        if (success) {

          setSuccess(
            "Մուտքը հաջողվեց"
          );

          setTimeout(() => {

            onClose();

          }, 500);
        }
      }

    } catch (error) {

      setError(
        "Ինչ-որ սխալ է տեղի ունեցել"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="auth-modal">

      <div
        className="auth-modal__overlay"
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

          {

            isForgot

            ? "Վերականգնել գաղտնաբառը"

            : isRegister

            ? "Գրանցում"

            : "Մուտք"

          }

        </h2>

        {

          error && (

            <p className="auth__error">

              {error}

            </p>

          )

        }

        {

          success && (

            <p className="auth__success">

              {success}

            </p>

          )

        }

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            placeholder="Էլ․ հասցե"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <div className="password-field">

            <input
              type={
                showPassword
                ? "text"
                : "password"
              }
              placeholder="Գաղտնաբառ"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >

              {

                showPassword

                ? <EyeOff size={20} />

                : <Eye size={20} />

              }

            </button>

          </div>

          {

            (isRegister || isForgot) && (

              <div className="password-field">

                <input
                  type={
                    showRepeatPassword
                    ? "text"
                    : "password"
                  }
                  placeholder="Կրկնել գաղտնաբառը"
                  value={repeatPassword}
                  onChange={(e) =>
                    setRepeatPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowRepeatPassword(
                      !showRepeatPassword
                    )
                  }
                >

                  {

                    showRepeatPassword

                    ? <EyeOff size={20} />

                    : <Eye size={20} />

                  }

                </button>

              </div>

            )

          }

          <button
            type="submit"
            disabled={loading}
          >

            {

              loading

              ? "Սպասեք..."

              : isForgot

              ? "Փոխել գաղտնաբառը"

              : isRegister

              ? "Գրանցվել"

              : "Մուտք գործել"

            }

          </button>

        </form>

        <div className="auth-modal__bottom">

          <span
            onClick={() => {

              setIsRegister(
                !isRegister
              );

              setIsForgot(false);

              setError("");

              setSuccess("");
            }}
          >

            {

              isRegister

              ? "Արդեն գրանցվա՞ծ եք"

              : "Գրանցվել"

            }

          </span>

          <span
            onClick={() => {

              setIsForgot(
                !isForgot
              );

              setIsRegister(false);

              setError("");

              setSuccess("");
            }}
          >

            {

              isForgot

              ? "Վերադառնալ"

              : "Մոռացել եք գաղտնաբառը"

            }

          </span>

        </div>

      </div>

    </div>

  );
}

export default AuthModal;