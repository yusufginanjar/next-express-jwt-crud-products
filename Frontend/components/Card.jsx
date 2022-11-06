import React from "react";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";

export default function Cards({data}) {
  const stylecard = {
    minHeight: "100px",
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/product/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div id="Cards" styles={stylecard}>
        <div className="card mb-3 pb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={ data.image } className="card-img img-fluid" alt="..."/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{data.name}</h5>
              <p className="card-text">{data.description}</p>
              <h6>Rp {data.price}</h6>
              <p className="card-text"><small className="text-muted">Stock: {data.stock}</small></p>
            </div>
            <div className="d-flex">
              <Link href={`edit?` + `id=${data.id}`}>
                <Button variant="warning" className="me-2">Edit</Button>
              </Link>
              <Button variant="danger" onClick={() => handleDelete(data.id)}>Delete</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
