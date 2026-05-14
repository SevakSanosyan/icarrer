import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../services/api";

function ListingDetails() {

  const { id } = useParams();

  const [listing, setListing] =
    useState(null);

  useEffect(() => {

    fetchListing();

  }, []);

  const fetchListing = async () => {

    try {

      const res = await api.get(
        `/listings/${id}`
      );

      setListing(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!listing) {

    return <h1>Loading...</h1>;

  }

  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >

      <img
        src={`http://localhost:5000${listing.image}`}
        alt=""
        style={{
          width: "100%",
          maxHeight: "500px",
          objectFit: "cover",
          borderRadius: "20px",
        }}
      />

      <h1
        style={{
          marginTop: "30px",
          fontSize: "42px",
          color: "#DB4A2B",
        }}
      >
        {listing.title}
      </h1>

      <p
        style={{
          marginTop: "20px",
          lineHeight: "1.8",
          fontSize: "18px",
        }}
      >
        {listing.description}
      </p>

    </div>
  );
}

export default ListingDetails;