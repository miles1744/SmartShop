import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoriesList from "./CategoriesList.jsx";
import GroceryList from "./GroceryList.jsx";
import SearchInfo from './SearchInfo.jsx';
import CreateCategory from './CreateCategory.jsx';
import CreateGrocery from './CreateGrocery.jsx';
import ViewCategory from './ViewCategory.jsx';
import ViewGrocery from './ViewGrocery.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/groceries" element={<GroceryList />} />
        <Route path="/search" element={<SearchInfo />} />
        <Route path="/categories/new" element={<CreateCategory />} />
        <Route path="/groceries/new" element={<CreateGrocery />} />
        <Route path="/categories/:id" element={<ViewCategory />} />
        <Route path="/groceries/:id" element={<ViewGrocery />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
