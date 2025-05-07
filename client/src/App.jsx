import { useState, useEffect } from 'react'

import './App.css'

const App = () => {

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:3000")
    console.log(response.data)
  };

  return(
    <>
      <h1> 🛒 Smart Shop </h1>
      <p> Track your groceries and items and style and precision. </p>
      <button onClick={}>Manage Categories</button>
      <button onClick={}>View All Items</button>
      <form>
        <input value={}
      </form>
    </>
  )
}

export default App;
