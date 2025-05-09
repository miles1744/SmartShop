import { useState, useEffect } from "react"
import {Link} from "react-router-dom";
import axios from "axios";

const GroceryList = () => {

    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
          try {
    
            const res = await axios.get(`http://localhost:3000/groceries`);
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
    

      return (<div className="grocery-container">

        <h1>Groceries</h1>

        <div className="grocery-cards">
            {results && results.length > 0 ? (
                results.map((grocery, index) => (
                    <div key={index} className="grocery-card">
                        <p key={grocery.id}>{grocery.item}</p>

                        <div className="options-bar"> 
                            <p className="view">View</p>
                            <p className="edit">Edit</p>
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