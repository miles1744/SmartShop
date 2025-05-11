import { useState, useEffect } from "react"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_URL;


const GroceryList = () => {

    const [results, setResults] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchResults = async () => {
          try {
            const res = await axios.get(`${API_BASE}/groceries`);
            const data = res.data;
            console.log(data)
            setResults(data)
          } catch (err) {
            console.error("Error fetching results:", err);
          }
        };
    
        fetchResults();
      }, []);


      const handleDelete = async (groceryId) => {
        try {
          await axios.post("http://localhost:3000/groceries", {
            id: groceryId,
          });
          setResults(prev => prev.filter(cat => cat.id !== groceryId));
        } catch (err) {
          console.error("Failed to delete category:", err);
          alert("Failed to delete category.");
        }
      };
    
      const handleView = (groceryId) => {
        navigate(`/groceries/${groceryId}`);
      };

      const handleUpdate = (groceryId) => {
        navigate(`/groceries/update/${groceryId}`);
      };

      return (<div className="grocery-container">

        <h1>Groceries</h1>

        <div className="grocery-cards">
            {results && results.length > 0 ? (
                results.map((grocery, index) => (
                    <div key={index} className="grocery-card">
                        <p key={grocery.id}>{grocery.item}</p>

                        <div className="options-bar"> 
                            <p className="view" onClick={() => handleView(grocery.id)}>View</p>
                            <p className="edit" onClick={() => handleUpdate(grocery.id)}>Edit</p>
                            <p className="delete" onClick={() => handleDelete(grocery.id)}>Delete</p>
                        </div>
                    </div>
                ))
            ) : (
                <div><p>There are no groceries.</p></div>
                )}
        </div>

        <Link to="/groceries/new">
                <button className="create-button">Create Groceries</button>
        </Link>

        <Link to="/">
                <button className="home-button">Home</button>
        </Link>

        

        </div>
    );
}

export default GroceryList;