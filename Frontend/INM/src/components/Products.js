

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'; // Import the search icon

export default function Products() {
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // Fetch role from localStorage
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setProductData(data);
        console.log("Data Retrieved.");
      } else {
        console.log("Failed to retrieve data. Status code:", res.status);
      }
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/deleteproduct/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          console.log("Product deleted");
          getProducts(); // Refresh the product list
        } else {
          console.log(
            "Failed to delete product. Status code:",
            response.status
          );
        }
      } catch (err) {
        console.log("Error deleting product:", err);
      }
    }
  };

  const filteredProducts = productData.filter(
    (product) =>
      product.ProductBarcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ProductName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ProductPrice.toString().includes(searchQuery)
  );

  return (
    <div className="container-fluid p-5">
      <h1>Products Inventory</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Add product button, visible for both users and admins */}
        <NavLink to="/insertproduct" className="btn btn-primary fs-5">
          {" "}
          + Add New Product
        </NavLink>

        {/* Search input with icon */}
        <div className="d-flex align-items-center">
          <div className="input-group" style={{ width: "300px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name, Price or Barcode"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="input-group-text">
              <FaSearch />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
        <table className="table table-striped table-hover mt-3 fs-5">
          <thead>
            <tr className="tr_color">
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
              <th scope="col">Product Barcode</th>
              <th scope="col">Update</th>
              {/* Only show the Delete column if the role is admin or superadmin */}
              {(role === "Admin" || role === "Super Admin") && (
                <th scope="col">Delete</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((element, id) => (
                <tr key={element._id}>
                  <th scope="row">{id + 1}</th>
                  <td>{element.ProductName}</td>
                  <td>{element.ProductPrice}</td>
                  <td>{element.ProductBarcode}</td>

                  {/* Render update button for all users */}
                  <td>
                    <NavLink
                      to={`/updateproduct/${element._id}`}
                      className="btn btn-primary"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </NavLink>
                  </td>

                  {/* Render delete button only if the role is 'admin' or 'superadmin' */}
                  {(role === "Admin" || role === "Super Admin") && (
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProduct(element._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
