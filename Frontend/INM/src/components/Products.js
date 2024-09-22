
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Products() {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
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
        // Confirm deletion
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`http://localhost:3001/api/deleteproduct/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    console.log("Product deleted");
                    getProducts(); // Refresh the product list
                } else {
                    console.log("Failed to delete product. Status code:", response.status);
                }
            } catch (err) {
                console.log("Error deleting product:", err);
            }
        }
    };

    return (
        <div className='container-fluid p-5'>
            <h1>Products Inventory</h1>
            <div className='add_button'>
                <NavLink to="/insertproduct" className='btn btn-primary fs-5'> + Add New Product</NavLink>
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
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((element, id) => (
                            <tr key={element._id}>
                                <th scope="row">{id + 1}</th>
                                <td>{element.ProductName}</td>
                                <td>{element.ProductPrice}</td>
                                <td>{element.ProductBarcode}</td>
                                <td>
                                    <NavLink to={`/updateproduct/${element._id}`} className="btn btn-primary">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </NavLink>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteProduct(element._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import api from "../services/api.js";

// export default function Products() {
//     const [productData, setProductData] = useState([]);

//     useEffect(() => {
//         getProducts();
//     }, []);

//     const getProducts = async () => {
//         try {
//             const res = await api.get("/products");

//             if (res.status === 200) {
//                 setProductData(res.data);
//                 console.log("Data Retrieved.");
//             } else {
//                 console.error("Failed to retrieve data. Status code:", res.status);
//             }
//         } catch (err) {
//             console.error("Error fetching data:", err);
//         }
//     };

//     const deleteProduct = async (id) => {
//         if (window.confirm("Are you sure you want to delete this product?")) {
//             try {
//                 const response = await api.delete(`/deleteproduct/${id}`);

//                 if (response.status === 204) {
//                     console.log("Product deleted");
//                     getProducts(); // Refresh the product list
//                 } else {
//                     console.error("Failed to delete product. Status code:", response.status);
//                 }
//             } catch (err) {
//                 console.error("Error deleting product:", err);
//             }
//         }
//     };

//     return (
//         <div className='container-fluid p-5 flex-grow-1'>
//             <h1>Products Inventory</h1>
//             <div className='add_button'>
//                 <NavLink to="/insertproduct" className='btn btn-primary fs-5'> + Add New Product</NavLink>
//             </div>
//             <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
//                 <table className="table table-striped table-hover mt-3 fs-5">
//                     <thead>
//                         <tr className="tr_color">
//                             <th scope="col">#</th>
//                             <th scope="col">Product Name</th>
//                             <th scope="col">Product Price</th>
//                             <th scope="col">Product Barcode</th>
//                             <th scope="col">Update</th>
//                             <th scope="col">Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {productData.map((product, index) => (
//                             <tr key={product._id}>
//                                 <th scope="row">{index + 1}</th>
//                                 <td>{product.ProductName}</td>
//                                 <td>{product.ProductPrice}</td>
//                                 <td>{product.ProductBarcode}</td>
//                                 <td>
//                                     <NavLink to={`/updateproduct/${product._id}`} className="btn btn-primary">
//                                         <i className="fa-solid fa-pen-to-square"></i>
//                                     </NavLink>
//                                 </td>
//                                 <td>
//                                     <button className="btn btn-danger" onClick={() => deleteProduct(product._id)}>
//                                         <i className="fa-solid fa-trash"></i>
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }
