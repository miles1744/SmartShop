import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const CategoriesList = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
          try {
    
            const res = await axios.get(`http://localhost:3000/categories`);
            const data = res.data;
            console.log(data)
            setResults(data)

    
          } catch (err) {
            console.error("Error fetching results:", err);
          }
        };
    
        fetchResults();
      }, []);

    

      return (<div className="category-container">

        <h1>Categories</h1>

        <div className="category-cards">
            {results && results.length > 0 ? (
                results.map((category, index) => (
                    <div key={index} className="category-card">
                        <p key={category.id}>{category.name}</p>

                        <div className="options-bar"> 
                            <p className="view">View</p>
                            <p className="edit">Edit</p>
                            <p className="delete">Delete</p>
                        </div>
                    </div>
                ))
            ) : (
                <div><p>There are no categories.</p></div>
                )}
        </div>

        <Link to="/categories/new">
                <button className="create-button">Create Category</button>
        </Link>

        <Link to="/">
                <button className="home-button">Home</button>
        </Link>

        

        </div>
    );

}

export default CategoriesList;