
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    item: "",
    price: "",
    quantity: "",
    categoryid: ""
  });

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
    <div>
        
        <form onSubmit={handleSubmit}>
        <input name="item" value={form.item} onChange={handleChange} placeholder="Item" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" />
        <input name="categoryid" value={form.categoryid} onChange={handleChange} placeholder="Category ID" />
        <button type="submit">Update Grocery</button>
        </form>
    </div>
  );
};

export default UpdateCategory;
