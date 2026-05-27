import { useEffect, useState } from "react";

import api from "../services/api";



import "./Admin.css";

function Admin() {

  const [listings, setListings] =
  useState([]);

  const [users, setUsers] =
  useState([]);

  const [activeTab, setActiveTab] =
  useState("pending");

  const [isAuthOpen,
  setIsAuthOpen] =
  useState(false);

  useEffect(() => {

    fetchListings();

    fetchUsers();

  }, []);

  const fetchListings =
  async () => {

    try {

      const res =
      await api.get(
        "/listings/admin/all"
      );

      setListings(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchUsers =
  async () => {

    try {

      const res =
      await api.get(
        "/auth/users"
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const approveListing =
  async (id) => {

    try {

      await api.put(
        `/listings/admin/approve/${id}`
      );

      fetchListings();

    } catch (error) {

      console.log(error);

    }

  };

  const rejectListing =
  async (id) => {

    try {

      await api.delete(
        `/listings/admin/${id}`
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

    <>



      <div className="admin">

        <h1 className="admin-title">
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

          <button
            className={
              activeTab === "users"
              ? "active-tab"
              : ""
            }
            onClick={() =>
              setActiveTab("users")
            }
          >
            Օգտատերեր
          </button>

        </div>

        {

          activeTab === "pending" && (

            <div className="admin-grid">

              {

                pendingListings.map(
                  (listing) => (

                  <div
                    key={listing._id}
                    className="admin-card"
                  >

                    <img
                      src={`http://localhost:5000${listing.image}`}
                      alt=""
                    />

                    <div className="admin-card__content">

                      <h2>
                        {listing.title}
                      </h2>

                      <p>
                        <strong>
                          Նկարագրություն։
                        </strong>

                        {listing.description}
                      </p>

                      <p>
                        <strong>
                          Որակավորումներ։
                        </strong>

                        {listing.qualifications}
                      </p>

                      <p>
                        <strong>
                          Գործատու։
                        </strong>

                        {listing.employerInfo}
                      </p>

                      <p>
                        <strong>
                          Email։
                        </strong>

                        {listing.userEmail}
                      </p>

                      <p>
                        <strong>
                          Աշխատավարձ։
                        </strong>

                        {

                          listing.isContract

                          ? "Պայմանագրային"

                          : `${listing.price} դրամ`

                        }

                      </p>

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

          )

        }

        {

          activeTab === "approved" && (

            <div className="admin-grid">

              {

                approvedListings.map(
                  (listing) => (

                  <div
                    key={listing._id}
                    className="admin-card"
                  >

                    <img
                      src={`http://localhost:5000${listing.image}`}
                      alt=""
                    />

                    <div className="admin-card__content">

                      <h2>
                        {listing.title}
                      </h2>

                      <p>
                        <strong>
                          Նկարագրություն։
                        </strong>

                        {listing.description}
                      </p>

                      <p>
                        <strong>
                          Որակավորումներ։
                        </strong>

                        {listing.qualifications}
                      </p>

                      <p>
                        <strong>
                          Գործատու։
                        </strong>

                        {listing.employerInfo}
                      </p>

                      <p>
                        <strong>
                          Email։
                        </strong>

                        {listing.userEmail}
                      </p>

                      <p>
                        <strong>
                          Աշխատավարձ։
                        </strong>

                        {

                          listing.isContract

                          ? "Պայմանագրային"

                          : `${listing.price} դրամ`

                        }

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

          )

        }

        {

          activeTab === "users" && (

            <div className="admin-grid">

              {

                users.map((user) => (

                  <div
                    key={user._id}
                    className="admin-card user-card"
                  >

                    <div className="admin-card__content">

                      <h2>
                        {user.email}
                      </h2>

                      <p>
                        {user.phone}
                      </p>

                    </div>

                  </div>

                ))

              }

            </div>

          )

        }

      </div>

    </>

  );

}

export default Admin;