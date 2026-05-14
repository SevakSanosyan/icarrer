import ListingCard from "../ListingCard/ListingCard";

import "./Listings.css";

function Listings({ listings }) {
  return (
    <section
  className="listings"
  id="listings"
>

      {listings.map((listing) => (
        <ListingCard
          key={listing._id}
          listing={listing}
        />
      ))}

    </section>
  );
}

export default Listings;