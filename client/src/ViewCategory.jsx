import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ViewCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/categories/${id}`);
        console.log(res.data);
        setCategory(res.data);
      } catch (err) {
        console.error("Failed to fetch category:", err);
      }
    };

    fetchCategory();
  }, [id]);

  if (!category) {
    return <p>Loading category...</p>;
  }

  return (
    <>
    <div className="category-container">
        <div className="category-detail">
          <h1>Category: {category.name}</h1>
          <p>Description: {category.description}</p>
        </div>

        <Link to="/">
          <button className="home-button">Home</button>
        </Link>
    </div>
    </>
  );
};

export default ViewCategory;
