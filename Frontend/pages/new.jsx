// page form to add new product
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";


export default function New() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [ stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const response = await axios.post(
        "http://localhost:4000/api/v1/product",
        {
            name,
            price,
            description,
            image,
            stock,
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
        );
        console.log(response);
        router.push("/");
    };
    
    return (
        <div className="container py-4 col-6">
        <h1>Add New Product</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
                type="text"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
                type="text"
                className="form-control"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
                type="text"
                className="form-control"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            </div>
            <button type="submit" className="btn btn-primary mt-4">
            Submit
            </button>
        </form>
        </div>
    );
    }