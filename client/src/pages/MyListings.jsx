
import {
  useEffect,
  useState,
} from "react";

import api
from "../services/api";

import "./MyListings.css";

import Header
from "../components/Header/Header";

function MyListings() {

  const [isAuthOpen,
  setIsAuthOpen] =
  useState(false);

  const [listings,
  setListings] =
  useState([]);

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

  return (

    <>

      <Header
        setIsAuthOpen={
          setIsAuthOpen
        }
      />

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

                <h2>
                  {listing.title}
                </h2>

                <p>
                  {listing.description}
                </p>

                <span>

                  {

                    listing.approved

                    ? "Հաստատված"

                    : "Սպասման մեջ"

                  }

                </span>

              </div>

            ))

          }

        </div>

      </div>

    </>

  );

}

export default MyListings;

