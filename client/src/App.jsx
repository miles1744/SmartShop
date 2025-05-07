import { useState, useEffect } from 'react'


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
      <button>Manage Categories</button>
      <button>View All Items</button>
      <form>
        <input value={searchTerm} onChange={(e) => {setSearch(e.target.value)}}/>s
      </form>
    </>
  )
}

export default App;
