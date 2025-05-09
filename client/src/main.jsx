import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoriesList from "./CategoriesList.jsx";
import GroceryList from "./GroceryList.jsx";
import SearchInfo from './SearchInfo.jsx';
import CreateCategory from './CreateCategory.jsx';
import CreateGrocery from './CreateGrocery.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/categories" element={<CategoriesList />}></Route>
        <Route path="/groceries" element={<GroceryList />}></Route>
        <Route path="/search" element={<SearchInfo />}></Route>
        <Route path="/categories/new" element={<CreateCategory />}></Route>
        <Route path="/groceries/new" element={<CreateGrocery />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
