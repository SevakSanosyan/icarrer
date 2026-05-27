import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import api
from "../services/api";



import "./ListingDetails.css";

function ListingDetails() {

  const { id } =
  useParams();

  const [listing,
  setListing] =
  useState(null);

  const [isAuthOpen,
  setIsAuthOpen] =
  useState(false);

  useEffect(() => {

    fetchListing();

  }, [id]);

  const fetchListing =
  async () => {

    try {

      const res =
      await api.get(
        `/listings/${id}`
      );

      setListing(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  if (!listing) {

    return (
      <h1 className="loading">
        Loading...
      </h1>
    );

  }

  return (

    <>



      <section className="single">

        <div className="single__image">

          <img
            src={`http://localhost:5000${listing.image}`}
            alt={listing.title}
          />

        </div>

        <div className="single__content">

          <div className="single__top">

            <h1>
              {listing.title}
            </h1>

            {

              listing.isContract ? (

                <div className="single__price contract">

                  Պայմանագրային

                </div>

              ) : (

                listing.price && (

                  <div className="single__price">

                    {listing.price} ֏

                  </div>

                )

              )

            }

          </div>

          <div className="single__block">

            <h3>
              Աշխատանքի նկարագրություն
            </h3>

            <p>
              {listing.description}
            </p>

          </div>

          <div className="single__block">

            <h3>
              Անհրաժեշտ որակավորումներ
            </h3>

            <p>
              {listing.qualifications}
            </p>

          </div>

          <div className="single__block">

            <h3>
              Գործատուի մասին
            </h3>

            <p>
              {listing.employerInfo}
            </p>

          </div>

          <div className="single__bottom">

<span>

  📧 {listing.userEmail}

</span>

<div className="single__bottom-price">

  {

    listing.isContract

    ? "Պայմանագրային"

    : `${listing.price} ֏`

  }

</div>

</div>
        </div>

      </section>



    </>

  );

}

export default ListingDetails;