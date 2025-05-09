import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const ViewCateogry = () => {

    const { id } = useParams();
    const [category, setCategory] = useState(null);
  
    useEffect(() => {
      const fetchCategory = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/categories/${id}`);
          setCategory(res.data);
        } catch (err) {
          console.error("Failed to fetch category:", err);
        }
      };
  
      fetchCategory();
    }, [id]);

    return (
        <div>

        </div>
    )
}

export default ViewCateogry;