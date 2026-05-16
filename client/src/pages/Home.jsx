import { useEffect, useState } from "react";

import api from "../services/api";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Listings from "../components/Listings/Listings";
import Pagination from "../components/Pagination/Pagination";
import SubmitForm from "../components/SubmitForm/SubmitForm";
import Footer from "../components/Footer/Footer";

function Home() {

  const [listings, setListings] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 30;

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {

    try {

      const res = await api.get("/listings");

      setListings(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  const currentListings = listings.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    listings.length / itemsPerPage
  );

  return (
    <div>

      <Header />

      <Hero />

      <Listings listings={currentListings} />



      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <SubmitForm />
      
      <Footer />

    </div>
  );
}

export default Home;