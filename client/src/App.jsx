import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./App.css"





const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
  };

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:3000")
    console.log(response.data)
  };

  return(
    <div className="shop-container">
      <h1> 🛒 Smart Shop </h1>
      <p> Track your groceries and items and style and precision. </p>
      <div className="categories-container">
        <Link to="/categories">
          <button>Manage Categories</button>
        </Link>
        <Link to="/groceries">
          <button>View All Items</button>
        </Link>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}>
        <input value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}}/>
        <button type="submit">Search</button>
      </form>
      
    </div>
  )
}

export default App;
