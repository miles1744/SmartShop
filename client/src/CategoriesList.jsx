import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_URL;


const CategoriesList = () => {

    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
          try {
    
            const res = await axios.get(`${API_BASE}/categories`);
            const data = res.data;
            console.log(data)
            setResults(data)

    
          } catch (err) {
            console.error("Error fetching results:", err);
          }
        };
    
        fetchResults();
      }, []);

      const handleDelete = async (categoryId) => {
        try {
          await axios.delete(`${API_BASE}/categories/${categoryId}`);
          setResults(prev => prev.filter(cat => cat.id !== categoryId));
        } catch (err) {
          console.error("Failed to delete category:", err);
          alert("Failed to delete category.");
        }
      };

      const handleView = (categoryId) => {
        navigate(`/categories/${categoryId}`);
      };
      

      const handleUpdate = (categoryId) => {
        navigate(`/categories/update/${categoryId}`);
      };
    

      return (<div className="category-container">

        <h1>Categories</h1>

        <div className="category-cards">
            {results && results.length > 0 ? (
                results.map((category, index) => (
                    <div key={index} className="category-card">
                        <p key={category.id}>{category.name}</p>

                        <div className="options-bar"> 
                            <p className="view" onClick={() => handleView(category.id)}>View</p>
                            <p className="edit" onClick={() => handleUpdate(category.id)}>Edit</p>
                            <p className="delete" onClick={() => handleDelete(category.id)}>Delete</p>
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