// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';

// export default function Products() {
//     const [productData, setProductData] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//         getProducts();
//     }, []);

//     const getProducts = async () => {
//         try {
//             const res = await fetch("http://localhost:3001/api/products", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });

//             if (res.ok) {
//                 const data = await res.json();
//                 setProductData(data);
//                 console.log("Data Retrieved.");
//             } else {
//                 console.log("Failed to retrieve data. Status code:", res.status);
//             }
//         } catch (err) {
//             console.log("Error fetching data:", err);
//         }
//     };

//     const deleteProduct = async (id) => {
//         if (window.confirm("Are you sure you want to delete this product?")) {
//             try {
//                 const response = await fetch(`http://localhost:3001/api/deleteproduct/${id}`, {
//                     method: "DELETE",
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 });

//                 if (response.ok) {
//                     console.log("Product deleted");
//                     getProducts(); // Refresh the product list
//                 } else {
//                     console.log("Failed to delete product. Status code:", response.status);
//                 }
//             } catch (err) {
//                 console.log("Error deleting product:", err);
//             }
//         }
//     };

//     const filteredProducts = productData.filter(product =>
//         product.ProductBarcode.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className='container-fluid p-5'>
//             <h1>Products Inventory</h1>
//             <div className='d-flex justify-content-between mb-3'>
//                 <NavLink to="/insertproduct" className='btn btn-primary fs-5'> + Add New Product</NavLink>
//                 <input
//                     type="text"
//                     className="form-control" // Removed width class for a default width
//                     placeholder="Search by Barcode"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     style={{ width: '200px' }} // Custom width style
//                 />
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
//                         {filteredProducts.length > 0 ? (
//                             filteredProducts.map((element, id) => (
//                                 <tr key={element._id}>
//                                     <th scope="row">{id + 1}</th>
//                                     <td>{element.ProductName}</td>
//                                     <td>{element.ProductPrice}</td>
//                                     <td>{element.ProductBarcode}</td>
//                                     <td>
//                                         <NavLink to={`/updateproduct/${element._id}`} className="btn btn-primary">
//                                             <i className="fa-solid fa-pen-to-square"></i>
//                                         </NavLink>
//                                     </td>
//                                     <td>
//                                         <button className="btn btn-danger" onClick={() => deleteProduct(element._id)}>
//                                             <i className="fa-solid fa-trash"></i>
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="6" className="text-center">No products found.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Products() {
    const [productData, setProductData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    
    const filteredProducts = productData.filter(product =>
        product.ProductBarcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ProductName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ProductPrice.toString().includes(searchQuery)
    );

    return (
        <div className='container-fluid p-5'>
            <h1>Products Inventory</h1>
            <div className='d-flex justify-content-between mb-3'>
                <NavLink to="/insertproduct" className='btn btn-primary fs-5'> + Add New Product</NavLink>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name, Price or Barcode"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '200px' }}
                />
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
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((element, id) => (
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
