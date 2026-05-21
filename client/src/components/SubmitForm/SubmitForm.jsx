
import { useState } from "react";

import api from "../../services/api";

import "./SubmitForm.css";

import useAuthStore
from "../../store/AuthStore";

function SubmitForm({

  setIsAuthOpen

}) {

  const { user } =
  useAuthStore();

  const [title,
  setTitle] =
  useState("");

  const [description,
  setDescription] =
  useState("");

  const [image,
  setImage] =
  useState(null);

  const [success,
  setSuccess] =
  useState(false);

  const [preview,
  setPreview] =
  useState("");

  const [price, setPrice] =
useState("");

  const handleImageChange =
  (e) => {

    if (!user) {

      setIsAuthOpen(true);

      return;
    }

    const file =
    e.target.files[0];

    setImage(file);

    setPreview(

      URL.createObjectURL(file)

    );
  };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const authData =
      JSON.parse(

        localStorage.getItem(
          "auth-storage"
        )

      );

      const token =
      authData?.state?.token;

      const formData =
      new FormData();

      formData.append(
        "userEmail",
        user?.email
      );

      formData.append(
        "title",
        title
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "image",
        image
      );

      formData.append(
        "price",
        price
      );

      await api.post(

        "/listings",

        formData,

        {

          headers: {

            Authorization:
            `Bearer ${token}`,

            "Content-Type":
            "multipart/form-data",

          },

        }

      );

      setSuccess(true);

      setTimeout(() => {

        setSuccess(false);

      }, 4000);

      setTitle("");
      setDescription("");

      setImage(null);

      setPreview("");

      setPrice("");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <section
      className="submit-form"
      id="submit-form"
    >

      <form
        onSubmit={handleSubmit}
      >

        <div className="submit-form__top">

          <label className="submit-form__upload">

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

            {

              preview ? (

                <img
                  src={preview}
                  alt="preview"
                />

              ) : (

                <span>
                  Upload Image
                </span>

              )

            }

          </label>

          <input
            type="text"
            placeholder="Վերնագիր"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

        </div>

        <input
  type="number"
  placeholder="Գին (ոչ պարտադիր)"
  value={price}
  onChange={(e) =>
    setPrice(e.target.value)
  }
/>

        <textarea
          placeholder="Հայտարարություն"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <button type="submit">

          Ուղարկել

        </button>

        {

          success && (

            <div className="submit-success">

              <h3>

                Հայտարարությունը ուղարկվել է 🙂

              </h3>

              <p>

                Ձեր հայտարարությունը
                կհրապարակվի
                հաստատումից հետո։

              </p>

            </div>

          )

        }

      </form>

    </section>

  );

}

export default SubmitForm;

