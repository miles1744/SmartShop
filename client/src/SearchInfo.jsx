import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchInfo = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get("term");

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!term) return;
      try {
        const res = await fetch(`/api/groceries?search=${encodeURIComponent(term)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    fetchResults();
  }, [term]);

  return (
    <div>
      <h2>Search Results for: {term}</h2>
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name} — {item.category}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInfo; 