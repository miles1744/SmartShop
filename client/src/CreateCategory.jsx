import { useState } from "react";
import { Link } from "react-router-dom";

const CreateCategory = () => {
const [name, setName] = useState("");
const [description, setDescription] = useState("")

    return (
        <div className="Create-Category-Container">
            <h1>Create a Category</h1>
            <form>
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