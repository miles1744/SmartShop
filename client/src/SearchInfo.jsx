import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchInfo = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get("term");

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!term) return;
      try {
        const res = await axios.get(`http://localhost:3000/search?term=${encodeURIComponent(term)}`)
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2>Search Results for: {term}</h2>
      <ul>
        {console.log(results)}
      </ul>
    </div>
  );
};

export default SearchInfo; 