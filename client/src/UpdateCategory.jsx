
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_URL;


const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get(`${API_BASE}/categories/${id}`);
      setForm(res.data);
    };
    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${API_BASE}/categories/${id}`, form);
    alert("Cateogry updated!");
    navigate("/categories");
  };

  return (
    <div className="update-container">
        
        <form onSubmit={handleSubmit} className="category-form">
          <label>Name:</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
          <label>Description:</label>
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
          <button type="submit">Update Category</button>
        </form>

      <Link to="/">
        <button className="home-button">Home</button>
      </Link>
    </div>
  );
};

export default UpdateCategory;
