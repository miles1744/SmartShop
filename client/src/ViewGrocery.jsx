import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ViewGrocery = () => {
  const { id } = useParams();
  const [grocery, setGrocery] = useState(null);

  useEffect(() => {
    const fetchGrocery = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/groceries/${id}`);
        console.log("Fetched grocery:", res.data);
        setGrocery(res.data);
      } catch (err) {
        console.error("Failed to fetch grocery:", err);
      }
    };

    fetchGrocery();
  }, [id]);

  if (!grocery) {
    return 
  }

  return (
    <div className="grocery-container">
      <div className="grocery-detail">
        <h1>Item: {grocery.item}</h1>
        <p>Price: ${grocery.price}</p>
        <p>Quantity: ${grocery.quantity}</p>
        
      </div>

      <Link to="/">
        <button className="home-button">Home</button>
      </Link>
    </div>
  );
};

export default ViewGrocery;
