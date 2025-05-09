import { useState } from "react";
import { Link } from "react-router-dom";

const CreateCategory = () => {
const [name, setName] = useState("");
const [description, setDescription] = useState("")


const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
        name:name,
        description:description
      };
      
    try {
      await axios.post("http://localhost:3000/categories/new", {
        newCategory
      });

      alert("Category item created!");
      setItem("");
      setPrice("");
      setQuantity("");
      setCategoryId("");
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
                    <textarea name="name" onChange={(e) => {setDescription(e.target.value)}} value={description} placeholder="Write the description here..." required/>
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