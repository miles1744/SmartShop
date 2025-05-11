import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_URL;


const CreateCategory = () => {
const [name, setName] = useState("");
const [description, setDescription] = useState("")


const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
        name,
       description
      };
      
    try {
      await axios.post(`${API_BASE}/categories/new`, 
        newCategory
      );

      alert("Category created!");
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Failed to create category:", err);
    }
  };


    return (
        <div className="Create-Category-Container">
            <h1>Create a Category</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={(e) => {setName(e.target.value)}} value={name} placeholder="Write the name" required/>
                </div>

                <div>
                    <label>Description:</label>
                    <textarea name="description" onChange={(e) => {setDescription(e.target.value)}} value={description} placeholder="Write the description here..." required/>
                </div>

                <button>Create a new category</button>
            </form>

            <Link to="/">
                <button className="home-button">Home</button>
             </Link>
        </div>
    )
}


export default CreateCategory;