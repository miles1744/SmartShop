import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css"

const SearchInfo = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const term = queryParams.get("term");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      if (!term) return;
      try {

        const res = await axios.get(`http://localhost:3000/search?term=${encodeURIComponent(term)}`);
        const data = res.data;

        const cat = [...new Set(data.map(item => item.category))];
        const i = [...new Set(data.map(item => item.item))];
        

        setCategories(cat);
        setItems(i);

      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    fetchResults();
  }, [term]);
  

  return (
        <div className="search-info-container">
            <div className="search-results">
                <h2>Search Results for: {term}</h2>
            </div>

            <div className="Categories-Header">
                <h3>Categories</h3>
            </div>

            <div>
                {categories && categories.length > 0 ? ( 
                    <div className="category-cards">
                    {categories.map((category, index) => (
                    <div key={index} className="category-card">
                        <h4>{category}</h4>
                        <div className="options-bar"> 
                            <p className="view">View</p>
                            <p className="edit">Edit</p>
                            <p className="delete">Delete</p>
                        </div>
                    </div>
                ))}
            </div>
            ) : (
                <div>No categories found.</div>
            )}
            </div>

            <div className="Groceries-Header">
                <h3>Groceries</h3>
            </div>

            {items && items.length > 0 ? ( 
                    <div className="item-cards">
                    {items.map((item, index) => (
                        <div key={index} className="item-card">
                            <h4>{item}</h4>
                        <div className="options-bar"> 
                            <p className="view">View</p>
                            <p className="edit">Edit</p>
                            <p className="delete">Delete</p>
                        </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No items found.</div>
            )}

            <Link to="/">
                <button className="home-button">Home</button>
            </Link>
        </div>

  );
};

export default SearchInfo; 