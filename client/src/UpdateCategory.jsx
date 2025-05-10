
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get(`http://localhost:3000/categories/${id}`);
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
    await axios.put(`http://localhost:3000/categories/${id}`, form);
    alert("Grocery updated!");
    navigate("/categories");
  };

  return (
    <div>
        
        <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <button type="submit">Update Category</button>
        </form>
    </div>
  );
};

export default UpdateCategory;
