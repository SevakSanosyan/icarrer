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

  const [qualifications,
  setQualifications] =
  useState("");

  const [description,
  setDescription] =
  useState("");

  const [employerInfo,
  setEmployerInfo] =
  useState("");

  const [price,
  setPrice] =
  useState("");

  const [isContract,
  setIsContract] =
  useState(false);

  const [image,
  setImage] =
  useState(null);

  const [success,
  setSuccess] =
  useState(false);

  const [preview,
  setPreview] =
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

    if (!image) {

      alert(
        "Նկարը պարտադիր է"
      );

      return;

    }

    try {

      const authData =
      JSON.parse(

        localStorage.getItem(
          "auth-storage"
        )

      );

      const token =

        authData?.state?.token ||

        authData?.token;

      if (!token) {

        alert(
          "Token չի գտնվել"
        );

        return;

      }

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
        "qualifications",
        qualifications
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "employerInfo",
        employerInfo
      );

      formData.append(
        "price",

        isContract
        ? ""
        : price
      );

      formData.append(
        "isContract",
        isContract
      );

      formData.append(
        "image",
        image
      );

      const res =
      await api.post(

        "/listings",

        formData,

        {

          headers: {

            Authorization:
            `Bearer ${token}`,

          },

        }

      );

      console.log(res.data);

      setSuccess(true);

      setTimeout(() => {

        setSuccess(false);

      }, 4000);

      setTitle("");

      setQualifications("");

      setDescription("");

      setEmployerInfo("");

      setPrice("");

      setIsContract(false);

      setImage(null);

      setPreview("");

    } catch (error) {

      console.log(error);

      console.log(
        error?.response
      );

      alert(

        error?.response?.data?.message ||

        error.message ||

        "Սխալ է տեղի ունեցել"

      );

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
            placeholder="Անվանում"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            required
          />

        </div>

        <textarea
          placeholder="Անհրաժեշտ որակավորումներ"
          value={qualifications}
          onChange={(e) =>
            setQualifications(
              e.target.value
            )
          }
          required
        />

        <textarea
          placeholder="Աշխատանքի նկարագրություն"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          required
        />

        <div className="submit-form__salary">

          <h3 className="submit-form__salary-title">
            Աշխատավարձի չափ
          </h3>

          <div className="submit-form__salary-options">

            <label className="submit-form__checkbox">

              <input
                type="checkbox"
                checked={isContract}
                onChange={() =>
                  setIsContract(!isContract)
                }
              />

              <span className="submit-form__fake-check"></span>

              <span className="submit-form__checkbox-text">
                Պայմանագրային
              </span>

            </label>

            {

              !isContract && (

                <div className="submit-form__price-input">

                  <input
                    type="number"
                    placeholder="Նշված աշխատավարձ"
                    value={price}
                    onChange={(e) =>
                      setPrice(
                        e.target.value
                      )
                    }
                  />

                  <span>
                    դրամ
                  </span>

                </div>

              )

            }

          </div>

        </div>

        <textarea
          placeholder="Տեղեկատվություն գործատուի մասին"
          value={employerInfo}
          onChange={(e) =>
            setEmployerInfo(
              e.target.value
            )
          }
          required
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