import { useEffect, useState } from "react";

import api from "../services/api";

import "./Admin.css";

function Admin() {

  const [listings, setListings] = useState([]);
  const [activeTab, setActiveTab] =
  useState("pending");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {

    try {

      const res = await api.get(
        "/listings/admin/all"
      );

      setListings(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const approveListing = async (id) => {

    try {

      await api.put(
        `/listings/approve/${id}`
      );

      fetchListings();

    } catch (error) {

      console.log(error);

    }
  };

  const rejectListing = async (id) => {

    try {

      await api.delete(
        `/listings/${id}`
      );

      fetchListings();

    } catch (error) {

      console.log(error);

    }
  };

  const pendingListings =
    listings.filter(
      (listing) => !listing.approved
    );

  const approvedListings =
    listings.filter(
      (listing) => listing.approved
    );

  return (

    <div className="admin">

      <h1>
        Admin Panel
      </h1>

      <div className="admin-tabs">

<button
  className={
    activeTab === "pending"
      ? "active-tab"
      : ""
  }
  onClick={() =>
    setActiveTab("pending")
  }
>
  Նոր հայտարարություններ
</button>

<button
  className={
    activeTab === "approved"
      ? "active-tab"
      : ""
  }
  onClick={() =>
    setActiveTab("approved")
  }
>
  Հայտարարություններ
</button>

</div>


<div
  className={`admin-columns ${
    activeTab === "approved"
      ? "show-approved"
      : ""
  }`}
>

        <div className="admin-column">

          <h2 className="admin-column__title pending-title">
            Նոր հայտարարություններ
          </h2>

          <div className="admin__list">

            {
              pendingListings.map(
                (listing) => (

                <div
                  key={listing._id}
                  className="admin-card"
                >

                  <div className="admin-card__image">

                    <img
                      src={`http://localhost:5000${listing.image}`}
                      alt={listing.title}
                    />

                  </div>

                  <div className="admin-card__content">

                    <h2>
                      {listing.title}
                    </h2>

                    <p>
                      {listing.description}
                    </p>
                    <h4>
  {listing.userEmail}
</h4>

                    <div className="admin-card__buttons">

                      <button
                        className="approve-btn"
                        onClick={() =>
                          approveListing(
                            listing._id
                          )
                        }
                      >
                        Հաստատել
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          rejectListing(
                            listing._id
                          )
                        }
                      >
                        Ջնջել
                      </button>

                    </div>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

        <div className="admin-column">

          <h2 className="admin-column__title approved-title">
            Հայտարարություններ
          </h2>

          <div className="admin__list">

            {
              approvedListings.map(
                (listing) => (

                <div
                  key={listing._id}
                  className="admin-card"
                >

                  <div className="admin-card__image">

                    <img
                      src={`http://localhost:5000${listing.image}`}
                      alt={listing.title}
                    />

                  </div>

                  <div className="admin-card__content">

                    <h2>
                      {listing.title}
                    </h2>

                    <p>
                      {listing.description}
                    </p>

                    <div className="admin-card__buttons">

                      <button
                        className="reject-btn"
                        onClick={() =>
                          rejectListing(
                            listing._id
                          )
                        }
                      >
                        Ջնջել
                      </button>

                    </div>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>

  );
}

export default Admin;