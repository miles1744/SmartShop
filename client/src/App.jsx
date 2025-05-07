import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


const App = () => {
  const [searchTerm, setSearchTerm] = useState("")


  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:3000")
    console.log(response.data)
  };

  return(
    <>
      <h1> 🛒 Smart Shop </h1>
      <p> Track your groceries and items and style and precision. </p>
      <Link to="/categories">
        <button>Manage Categories</button>
      </Link>
      <Link to="/groceries">
        <button>View All Items</button>
      </Link>
      <form>
        <input value={searchTerm} onChange={(e) => {setSearch(e.target.value)}}/>
      </form>
    </>
  )
}

export default App;
