import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_URL;


const UpdateGrocery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    item: "",
    price: "",
    quantity: "",
    categoryId: ""
  });
  const [results, setResults] = useState([]);


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


  useEffect(() => {
    const fetchGrocery = async () => {
      const res = await axios.get(`http://localhost:3000/groceries/${id}`);
      setForm(res.data);
    };
    fetchGrocery();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/groceries/${id}`, form);
    alert("Grocery updated!");
    navigate("/groceries");
  };

  return (
    <div className="update-container">
        <h1>Update Grocery</h1>
        <form onSubmit={handleSubmit} className="grocery-form">
            <label>Item:</label>
            <input name="item" value={form.item} onChange={handleChange} placeholder="Item" />
            <label>Price:</label>
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
            <label>Quantity:</label>
            <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" />
            <label>Category:</label>
            <select value={form.categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="">Select a category</option>
                    {results.map((cat) => (
                    <option name="cat" key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                    ))}
            </select>
            <button type="submit">Update Grocery</button>
        </form>

        <Link to="/">
        <button className="home-button">Home</button>
      </Link>
    </div>
  );
};

export default UpdateGrocery;
