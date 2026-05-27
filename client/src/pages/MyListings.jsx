import {
  useEffect,
  useState,
} from "react";

import api
from "../services/api";

import "./MyListings.css";

function MyListings() {

  const [listings,
  setListings] =
  useState([]);

  const [editingId,
  setEditingId] =
  useState(null);

  const [editData,
  setEditData] =
  useState({

    title: "",

    description: "",

    qualifications: "",

    employerInfo: "",

    price: "",

  });

  useEffect(() => {

    fetchMyListings();

  }, []);

  const fetchMyListings =
  async () => {

    try {

      const authData =
      JSON.parse(

        localStorage.getItem(
          "auth-storage"
        )

      );

      const token =
      authData?.state?.token;

      const res =
      await api.get(

        "/listings/my",

        {

          headers: {

            Authorization:
            `Bearer ${token}`,

          },

        }

      );

      setListings(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete =
  async (id) => {

    try {

      const authData =
      JSON.parse(
        localStorage.getItem(
          "auth-storage"
        )
      );

      const token =
      authData?.state?.token;

      await api.delete(

        `/listings/${id}`,

        {

          headers: {

            Authorization:
            `Bearer ${token}`,

          },

        }

      );

      fetchMyListings();

    } catch (error) {

      console.log(error);

    }

  };

  const startEdit =
  (listing) => {

    setEditingId(
      listing._id
    );

    setEditData({

      title:
      listing.title,

      description:
      listing.description,

      qualifications:
      listing.qualifications,

      employerInfo:
      listing.employerInfo,

      price:
      listing.price,

    });

  };

  const handleUpdate =
  async (id) => {

    try {

      const authData =
      JSON.parse(
        localStorage.getItem(
          "auth-storage"
        )
      );

      const token =
      authData?.state?.token;

      await api.put(

        `/listings/${id}`,

        editData,

        {

          headers: {

            Authorization:
            `Bearer ${token}`,

          },

        }

      );

      setEditingId(null);

      fetchMyListings();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="my-listings">

      <h1>
        Իմ հայտարարությունները
      </h1>

      <div className="my-listings__grid">

        {

          listings.map(
            (listing) => (

            <div
              key={listing._id}
              className="my-card"
            >

              <img
                src={`http://localhost:5000${listing.image}`}
                alt=""
              />

              {

                editingId ===
                listing._id ? (

                  <div className="edit-modal">

                    <h2>
                      Փոփոխել հայտարարությունը
                    </h2>

                    <div className="edit-group">

                      <label>
                        Անվանում
                      </label>

                      <input
                        type="text"
                        value={
                          editData.title
                        }
                        onChange={(e)=>
                          setEditData({

                            ...editData,

                            title:
                            e.target.value,

                          })
                        }
                      />

                    </div>

                    <div className="edit-group">

                      <label>
                        Նկարագրություն
                      </label>

                      <textarea
                        value={
                          editData.description
                        }
                        onChange={(e)=>
                          setEditData({

                            ...editData,

                            description:
                            e.target.value,

                          })
                        }
                      />

                    </div>

                    <div className="edit-group">

                      <label>
                        Որակավորումներ
                      </label>

                      <textarea
                        value={
                          editData.qualifications
                        }
                        onChange={(e)=>
                          setEditData({

                            ...editData,

                            qualifications:
                            e.target.value,

                          })
                        }
                      />

                    </div>

                    <div className="edit-group">

                      <label>
                        Տեղեկություն գործատուի մասին
                      </label>

                      <textarea
                        value={
                          editData.employerInfo
                        }
                        onChange={(e)=>
                          setEditData({

                            ...editData,

                            employerInfo:
                            e.target.value,

                          })
                        }
                      />

                    </div>

                    <div className="edit-group">

                      <label>
                        Գին
                      </label>

                      <input
  type="text"
  inputMode="numeric"
 
  value={editData.price}
  onChange={(e) =>
    setEditData({

      ...editData,

      price:
      e.target.value.replace(/\D/g, ""),

    })
  }
/>

                    </div>

                    <div className="edit-actions">

                      <button
                        className="save-btn"
                        onClick={() =>
                          handleUpdate(
                            listing._id
                          )
                        }
                      >

                        Պահպանել

                      </button>

                      <button
                        className="cancel-btn"
                        onClick={() =>
                          setEditingId(null)
                        }
                      >

                        Փակել

                      </button>

                    </div>

                  </div>

                ) : (

                  <>

                    <div className="my-card__content">

                      <h2>
                        {listing.title}
                      </h2>

                      <p>
                        {listing.description}
                      </p>

                      <p>

                        <strong>
                          Որակավորումներ․
                        </strong>

                        {" "}

                        {
                          listing.qualifications
                        }

                      </p>

                      <p>

                        <strong>
                          Գործատու․
                        </strong>

                        {" "}

                        {
                          listing.employerInfo
                        }

                      </p>

                      {

                        listing.price && (

                          <p
                            className="listing-price"
                          >

                            <strong>
                              Գին․
                            </strong>

                            {" "}

                            {
                              listing.price
                            } ֏

                          </p>

                        )

                      }

                      <span
                        className={
                          listing.approved
                          ? "approved"
                          : "pending"
                        }
                      >

                        {

                          listing.approved

                          ? "Հաստատված"

                          : "Սպասման մեջ"

                        }

                      </span>

                    </div>

                    <div className="my-card__actions">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          startEdit(
                            listing
                          )
                        }
                      >

                        Փոփոխել

                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            listing._id
                          )
                        }
                      >

                        Ջնջել

                      </button>

                    </div>

                  </>

                )

              }

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default MyListings;