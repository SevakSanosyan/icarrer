import {
    useEffect,
    useState,
  } from "react";
  
  import {
    useParams,
  } from "react-router-dom";
  
  import api
  from "../services/api";
  
  import "./SingleListing.css";
  
  function SingleListing() {
  
    const { id } =
    useParams();
  
    const [listing,
      setListing] =
      useState(null);
  
    useEffect(() => {
  
      fetchListing();
  
    }, []);
  
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
        <h1>
          Loading...
        </h1>
      );
    }
  
    return (
  
      <div
        className="single"
      >
  
        <div
          className="single__image"
        >
  
          <img
            src={`http://localhost:5000${listing.image}`}
            alt=""
          />
  
        </div>
  
        <div
          className="single__content"
        >
  
          <h1>
  
            {listing.title}
  
          </h1>
  
          <p>
  
            {listing.description}
  
          </p>
  
          <div
            className="single__bottom"
          >
  
            <span>
  
              {listing.userEmail}
  
            </span>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default
  SingleListing;