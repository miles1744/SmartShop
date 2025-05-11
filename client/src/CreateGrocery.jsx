import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_URL;


const CreateGrocery = () => {
const [item, setItem] = useState("");
const [price, setPrice] = useState("");
const [quantity, setQuantity] = useState("");
const [results, setResults] = useState([]);
const [categoryId, setCategoryId] = useState("");


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGrocery = {
        item,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryid: parseInt(categoryId),
      };
      
    try {
      await axios.post(`${API_BASE}/groceries/new`, {
        newGrocery
      });

      alert("Grocery item created!");
      setItem("");
      setPrice("");
      setQuantity("");
      setCategoryId("");
    } catch (err) {
      console.error("Failed to create grocery:", err);
    }
  };


    return (
        <div className="Create-Grocery-Container">
            <h1>Create a Grocery</h1>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Item:</label>
                    <input type="text" name="item" onChange={(e) => {setItem(e.target.value)}} value={item} placeholder="Write the item" required/>
                </div>

                <div>
                    <label>Price:</label>
                    <input type="text" name="price" onChange={(e) => {setPrice(e.target.value)}} value={price} placeholder="Write the price" required/>
                </div>

                <div>
                    <label>Quantity:</label>
                    <input type="text" name="quantity" onChange={(e) => {setQuantity(e.target.value)}} value={quantity} placeholder="Write the quantity" required/>
                </div>

                <div>
                <label>Category:</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="">Select a category</option>
                    {results.map((cat) => (
                    <option name="cat" key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                    ))}
  </select>
</div>



                <button>Create a new grocery</button>
            </form>

            <Link to="/">
                <button className="home-button">Home</button>
             </Link>
        </div>
    )
}


export default CreateGrocery;