
import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export default function UpdateProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productBarcode, setProductBarcode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch the product details on component mount
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/products/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setProductName(data.ProductName);
                    setProductPrice(data.ProductPrice);
                    setProductBarcode(data.ProductBarcode);
                    console.log("Data Retrieved:", data);
                } else {
                    console.error("Failed to retrieve data. Status code:", res.status);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        getProduct();
    }, [id]);

    // Handle the form submission to update the product
    const updateProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3001/api/updateproduct/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ProductName: productName,
                    ProductPrice: productPrice,
                    ProductBarcode: productBarcode,
                }),
            });

            if (response.ok) {
                alert("Product updated successfully.");
                navigate('/products');
            } else {
                const errorData = await response.json();
                console.error("Update failed:", errorData);
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.error("Error updating product:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid p-5">
            <h1>Update Product Information</h1>
            <form onSubmit={updateProduct}>
                <div className="mt-5 col-lg-6 col-md-6 col-12">
                    <label htmlFor="product_name" className="form-label fs-4 fw-bold">Product Name</label>
                    <input
                        type="text"
                        onChange={(e) => setProductName(e.target.value)}
                        value={productName}
                        className="form-control fs-5"
                        id="product_name"
                        placeholder="Enter Product Name"
                        required
                    />
                </div>
                <div className="mt-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="product_price" className="form-label fs-4 fw-bold">Product Price</label>
                    <input
                        type="number"
                        onChange={(e) => setProductPrice(e.target.value)}
                        value={productPrice}
                        className="form-control fs-5"
                        id="product_price"
                        placeholder="Enter Product Price"
                        required
                    />
                </div>
                <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12">
                    <label htmlFor="product_barcode" className="form-label fs-4 fw-bold">Product Barcode</label>
                    <input
                        type="text"
                        onChange={(e) => setProductBarcode(e.target.value.slice(0, 12))}
                        value={productBarcode}
                        className="form-control fs-5"
                        id="product_barcode"
                        placeholder="Enter Product Barcode"
                        maxLength={12}
                        required
                    />
                </div>
                <div className="d-flex justify-content-center col-lg-6 col-md-6">
                    <NavLink to="/products" className="btn btn-primary me-5 fs-4">Cancel</NavLink>
                    <button type="submit" className="btn btn-primary fs-4" disabled={loading}>
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
                {error && (
                    <div className="col text-center col-lg-6">
                        <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>
                    </div>
                )}
            </form>
        </div>
    );
}
