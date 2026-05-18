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
      isRegister &&
      password !== repeatPassword
    ) {

      setError(
        "Գաղտնաբառերը չեն համընկնում"
      );

      return;
    }

    try {

      setLoading(true);

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

          setTimeout(() => {

            setIsRegister(false);

          }, 1000);
        }

      } else {

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
            isRegister
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

          <div className="auth-password">

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

            isRegister && (

              <div className="auth-password">

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

          <span>

            Մոռացել եք գաղտնաբառը

          </span>

        </div>

      </div>

    </div>

  );
}

export default AuthModal;