import { useState } from "react";

import api from "../../services/api";

import "./SubmitForm.css";

function SubmitForm() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] =
  useState(false);

const [preview, setPreview] = useState("");

const handleImageChange = (e) => {

  const file = e.target.files[0];

  setImage(file);

  setPreview(
    URL.createObjectURL(file)
  );
};


const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append("title", title);

    formData.append(
      "description",
      description
    );

    formData.append("image", image);

    await api.post(
      "/listings",
      formData
    );

    setSuccess(true);

setTimeout(() => {
  setSuccess(false);
}, 4000);

    setTitle("");
    setDescription("");

    setImage(null);

    setPreview("");

  } catch (error) {

    console.log(error);

  }
};

  return (
    <section
      className="submit-form"
      id="submit-form"
    >

      <form onSubmit={handleSubmit}>

        <div className="submit-form__top">

        <label className="submit-form__upload">

<input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  hidden
/>

{preview ? (

  <img
    src={preview}
    alt="preview"
  />

) : (

  <span>
    Upload Image
  </span>

)}

</label>

          <input
            type="text"
            placeholder="Վերնագիր"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

        </div>

        <textarea
          placeholder="Հայտարարություն"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        կհրապարակվի հաստատումից հետո։
      </p>

    </div>

  )
}

      </form>

    </section>
  );
}

export default SubmitForm;