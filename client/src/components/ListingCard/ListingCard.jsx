import "./ListingCard.css";

import {
  useNavigate,
} from "react-router-dom";

function ListingCard({ listing }) {

  const isNew =
  Date.now() -
  new Date(
    listing.createdAt
  ).getTime()
  <
  3 * 24 * 60 * 60 * 1000;

  const navigate =
  useNavigate();

  return (

    <div
      className="listing-card"
      onClick={() =>
        navigate(
          `/listing/${listing._id}`
        )
      }
    >

      <div className="listing-card__image">

        <img
          src={`http://localhost:5000${listing.image}`}
          alt={listing.title}
        />

      </div>

      <div className="listing-card__content">

        <div className="listing-card__top">

          <h2>
            {listing.title}
          </h2>

          {

            isNew && (

              <span>
                Նոր
              </span>

            )

          }

        </div>

        <p>

          <strong>
            Որակավորումներ։
          </strong>

          {" "}

          {listing.qualifications}

        </p>

        <p>

          <strong>
            Նկարագրություն։
          </strong>

          {" "}

          {listing.description}

        </p>

        <p>

          <strong>
            Գործատու։
          </strong>

          {" "}

          {listing.employerInfo}

        </p>

        <div className="listing-card__salary">

          {

            listing.isContract

            ? (

              <h3 className="listing-price">

                Պայմանագրային

              </h3>

            )

            : (

              listing.price && (

                <h3 className="listing-price">

                  {listing.price} ֏

                </h3>

              )

            )

          }

        </div>

        <button

          onClick={(e) => {

            e.stopPropagation();

            navigate(
              `/listing/${listing._id}`
            );

          }}

        >

          Կարդալ ավելին

        </button>

      </div>

    </div>

  );

}

export default ListingCard;