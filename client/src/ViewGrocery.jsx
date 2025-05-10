import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ViewGrocery = () => {
  const { id } = useParams();
  const [grocery, setGrocery] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchGrocery = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/groceries/${id}`);
        setGrocery(res.data);
      } catch (err) {
        console.error("Failed to fetch grocery:", err);
      }
    };

    fetchGrocery();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    if (grocery) fetchCategories();
  }, [grocery]);

  if (!grocery || categories.length === 0) {
    return <p>Loading grocery details...</p>;
  }

  const matchedCategory = categories.find(cat => cat.id === grocery.categoryid);

  return (
    <div className="grocery-container">
      <div className="grocery-detail">
        <h1>Item: {grocery.item}</h1>
        <p>Price: ${grocery.price}</p>
        <p>Quantity: {grocery.quantity}</p>
        <p>Category: {matchedCategory?.name || "Unknown"}</p>
      </div>

      <Link to="/">
        <button className="home-button">Home</button>
      </Link>
    </div>
  );
};

export default ViewGrocery;
