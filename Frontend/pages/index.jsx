import React, { useState, useEffect } from "react";
import Cards from "../components/Card";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [player, setPlayer] = useState("");
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } 
    async function fetchData() {
      const response = await axios.get('http://localhost:4000/api/v1/products', {
        headers: {Authorization: `Bearer ${token}`}
      })
      const data = response.data
      setProducts(data);
      return response;
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="container py-4">
        <h1>Products</h1>
        <div className="col-lg-6 mt-4">
          {
            products.map((product, index) => {
              return(
                <div className="col-12" key={`product-${index}`}>
                    <Cards data={product} />
                </div>
              )  
            })
          }
          </div>
      </div>
    </div>
  );
}
