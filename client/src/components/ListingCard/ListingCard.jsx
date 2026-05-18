import "./ListingCard.css";

import { useNavigate } from "react-router-dom";

function ListingCard({ listing }) {

  const navigate = useNavigate();

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

          <span>
            Նոր
          </span>

        </div>

        <p>
          {listing.description}
        </p>

        <button
  onClick={() =>
    navigate(
      `/listing/${listing._id}`
    )
  }
>

  Կարդալ ավելին

</button>

      </div>

    </div>

  );
}

export default ListingCard;