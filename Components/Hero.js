"use client"
import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [productForm, setProductForm] = useState({});
    const [products, setProducts] = useState([]);
    const [alert, setAlert] = useState("");
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingaction, setloadingaction] = useState(false)
    const [dropdown, setDropdown] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/product');
            let rjson = await response.json();
            setProducts(rjson.products);
        }
        fetchProducts();
    }, []);

    const buttonAction = async (action, slug, initialQuantity) => {
        // In products
        let index = products.findIndex((item) => item.slug === slug);
        let newProducts = JSON.parse(JSON.stringify(products))
        if (action === 'plus') {
            newProducts[index].quantity = parseInt(initialQuantity) + 1;
        }
        else {
            newProducts[index].quantity = parseInt(initialQuantity) - 1;
        }
        setProducts(newProducts);

        // In Dropdown
        let indexdrop = dropdown.findIndex((item) => item.slug === slug);
        let newDropdown = JSON.parse(JSON.stringify(dropdown))
        if (action === 'plus') {
            newDropdown[indexdrop].quantity = parseInt(initialQuantity) + 1;
        }
        else {
            newDropdown[indexdrop].quantity = parseInt(initialQuantity) - 1;
        }
        setDropdown(newDropdown)

        console.log(action, slug);
        setloadingaction(true);
        const response = await fetch('/api/action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action, slug, initialQuantity })
        });
        let r = await response.json();
        console.log(r);
        setloadingaction(false);
    }

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productForm)
            });

            if (response.ok) {
                setAlert("Your product added successfully!");
                setProductForm({});
            } else {
                console.error('Failed to add product');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductForm({ ...productForm, [name]: value });
    };

    const onDropdownEdit = async (e) => {
        let value = e.target.value;
        setQuery(value);
        if (value.length > 0) {
            setLoading(true);
            setDropdown([])
            const response = await fetch('/api/search?query=' + query);
            let rjson = await response.json();
            setDropdown(rjson.products);
            setLoading(false);
        }
        else {
            setDropdown([]);
        }
    }

    return (
        <>
            <span className='flex items-center justify-center m-auto text-green-500 text-xs'>{alert}</span>
            <div className="flex flex-col p-10 px-20 space-y-14 font-light rounded-2xl">
                {/* Search a Product */}
                <div className="flex flex-col w-full">
                    <div className="flex items-center space-x-4 text-4xl font-medium mb-4">
                        <span>Search a Product</span>
                        {loading && (
                            <svg className="" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <rect className="spinner_9y7u" x="1" y="1" rx="1" width="10" height="10" />
                                <rect className="spinner_9y7u spinner_DF2s" x="1" y="1" rx="1" width="10" height="10" />
                                <rect className="spinner_9y7u spinner_q27e" x="1" y="1" rx="1" width="10" height="10" />
                            </svg>
                        )}
                    </div>
                    <form className="flex gap-2 w-full">
                        <input onChange={onDropdownEdit} type="text" placeholder="Search by Product Name" className="p-2 px-4 bg-white/[0.1] rounded outline-none w-full" />
                        <select className="p-2 rounded bg-white/[0.1] w-full">
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="groceries">Groceries</option>
                            <option value="accessories">Accessories</option>
                        </select>
                        <button type="submit" className="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded w-1/3">Search</button>
                    </form>

                    <div className='flex flex-col items-center absolute z-30 top-[13rem] bg-zinc-800 rounded-b-xl w-[68rem]'>
                        {dropdown.map(item => {
                            return <div key={item.slug} className="flex items-center px-5 h-12 text-white w-full">
                                <div className='flex items-center justify-between text-center w-full'>
                                    <span className='text-start w-full'>{item.slug}</span>
                                    <span className='w-full'>( {item.quantity} )</span>
                                    <span className='w-full'>available for</span>
                                    <span className='w-full'>₹ {item.price}</span>
                                </div>
                                <div className="flex items-center justify-between text-xl font-bold w-60">
                                    <button onClick={() => { buttonAction("minus", item.slug, item.quantity) }} disabled={loadingaction} className='py-2 px-3 leading-3 rounded-md bg-zinc-700 hover:bg-blue-700 disabled:opacity-50'>-</button>
                                    <p className='text-base font-light'>{item.quantity}</p>
                                    <button onClick={() => { buttonAction("plus", item.slug, item.quantity) }} disabled={loadingaction} className='py-2 px-3 leading-3 rounded-md bg-zinc-700 hover:bg-blue-700 disabled:opacity-50'>+</button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

                {/* Add a Product */}
                <div className="flex flex-col relative top-0 w-full">
                    <h1 className="text-4xl font-medium mb-4">Add a Product</h1>
                    <form className="flex flex-col space-y-5">
                        <div className="flex gap-2 w-full">
                            <input value={productForm?.slug || ""} name='slug' onChange={handleChange} type="text" placeholder="Product Slug" className="p-2 px-4 bg-white/[0.1] rounded outline-none w-full" />
                            <input value={productForm?.quantity || ""} name='quantity' onChange={handleChange} type="number" placeholder="Stock Quantity" className="p-2 px-4 bg-white/[0.1] rounded outline-none w-full" />
                            <input value={productForm?.price || ""} name='price' onChange={handleChange} type="number" placeholder="₹ Price" className="p-2 px-4 bg-white/[0.1] rounded outline-none w-full" />
                        </div>
                        <button onClick={addProduct} type="submit" className="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded w-60">+ Add Product</button>
                    </form>
                </div>

                {/* Display Current Stocks */}
                <div className="flex flex-col w-full">
                    <h1 className="text-4xl font-medium mb-4">Display Current Stocks</h1>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-zinc-800 font-medium p-2">Product Name</th>
                                <th className="border border-zinc-800 font-medium p-2">Stock Quantity</th>
                                <th className="border border-zinc-800 font-medium p-2">Price of Product</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => {
                                return <tr key={product.slug}>
                                    <td className="border border-zinc-800 p-2">{product.slug}</td>
                                    <td className="border border-zinc-800 p-2 text-start">{product.quantity}</td>
                                    <td className="border border-zinc-800 p-2 text-start">₹{product.price}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Hero;