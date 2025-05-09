import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const ViewGrocery = () => {

    const { id } = useParams();
    const [grocery, setGrocery] = useState(null);
  
    useEffect(() => {
      const fetchCategory = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/groceries/${id}`);
          setGrocery(res.data);
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

export default ViewGrocery;