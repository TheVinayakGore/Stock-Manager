"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Hero = () => {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [dropdown, setDropdown] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  // Handle quantity update (plus/minus)
  const buttonAction = async (action, slug, initialQuantity) => {
    const newQuantity =
      action === "plus" ? initialQuantity + 1 : initialQuantity - 1;

    // Update products state
    const updatedProducts = products.map((item) =>
      item.slug === slug ? { ...item, quantity: newQuantity } : item
    );
    setProducts(updatedProducts);

    // Update dropdown state
    const updatedDropdown = dropdown.map((item) =>
      item.slug === slug ? { ...item, quantity: newQuantity } : item
    );
    setDropdown(updatedDropdown);

    setLoadingAction(true);
    try {
      const response = await fetch("/api/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action, slug, initialQuantity }),
      });
      const data = await response.json();
      toast.info(data.message);
    } catch (error) {
      toast.error("Failed to update quantity");
    } finally {
      setLoadingAction(false);
    }
  };

  // Add a new product
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        setProductForm({});
        // Refresh products list
        const fetchResponse = await fetch("/api/product");
        const fetchData = await fetchResponse.json();
        setProducts(fetchData.products);
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  // Handle input change for product form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  // Handle search input change
  const onDropdownEdit = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?query=${value}`);
        const data = await response.json();
        setDropdown(data.products);
      } catch (error) {
        toast.error("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    } else {
      setDropdown([]);
    }
  };

  // Handle product update
  const handleUpdate = async (slug) => {
    try {
      const response = await fetch(`/api/product/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        toast.success("Product updated successfully!");
        // Refresh products list
        const fetchResponse = await fetch("/api/product");
        const fetchData = await fetchResponse.json();
        setProducts(fetchData.products);
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  // Handle product deletion
  const handleDelete = async (slug) => {
    try {
      const response = await fetch(`/api/product/${slug}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Product deleted successfully!");
        // Refresh products list
        const fetchResponse = await fetch("/api/product");
        const fetchData = await fetchResponse.json();
        setProducts(fetchData.products);
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <main className="space-y-14 text-base font-light relative w-full">
      {/* Product Form */}
      <section className="flex flex-col w-full">
        <div className="flex items-center space-x-4 text-4xl font-medium mb-4">
          <span>Search a Product</span>
          {loading && (
            <div className="spinner">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  className="spinner_9y7u"
                  x="1"
                  y="1"
                  rx="1"
                  width="10"
                  height="10"
                />
                <rect
                  className="spinner_9y7u spinner_DF2s"
                  x="1"
                  y="1"
                  rx="1"
                  width="10"
                  height="10"
                />
                <rect
                  className="spinner_9y7u spinner_q27e"
                  x="1"
                  y="1"
                  rx="1"
                  width="10"
                  height="10"
                />
              </svg>
            </div>
          )}
        </div>
        <form className="flex gap-6 w-full">
          <Input
            onChange={onDropdownEdit}
            type="text"
            placeholder="Search by Product Name"
            className="p-6 w-full bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
          />
          <Select>
            <SelectTrigger className="p-6 w-full bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700">
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="groceries">Groceries</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="p-6 text-lg font-medium w-1/3 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Search
          </Button>
        </form>

        {/* Dropdown Results */}
        {dropdown.length > 0 && (
          <div className="flex flex-col absolute z-30 top-[6.3rem] bg-white dark:bg-zinc-800 rounded-b-xl w-full border border-blue-500 shadow-lg">
            {dropdown.map((item) => (
              <div
                key={item.slug}
                className="flex items-center px-5 h-12 text-zinc-900 dark:text-zinc-50 w-full transition-colors"
              >
                <div className="flex items-center justify-between text-center w-full">
                  <span className="text-start w-full">{item.slug}</span>
                  <span className="w-full">( {item.quantity} )</span>
                  <span className="w-full">available for</span>
                  <span className="w-full">₹ {item.price}</span>
                </div>
                <div className="flex items-center justify-between text-xl font-bold w-60">
                  <Button
                    onClick={() =>
                      buttonAction("minus", item.slug, item.quantity)
                    }
                    disabled={loadingAction}
                    variant="ghost"
                    size="icon"
                    className="bg-zinc-200 dark:bg-zinc-700 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white"
                  >
                    -
                  </Button>
                  <p className="text-base font-light">{item.quantity}</p>
                  <Button
                    onClick={() =>
                      buttonAction("plus", item.slug, item.quantity)
                    }
                    disabled={loadingAction}
                    variant="ghost"
                    size="icon"
                    className="bg-zinc-200 dark:bg-zinc-700 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white"
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add a Product */}
      <section className="flex flex-col w-full">
        <h1 className="text-4xl font-medium mb-4">Add a Product</h1>
        <form className="flex flex-col space-y-5" onSubmit={addProduct}>
          <div className="flex gap-6 w-full">
            <Input
              value={productForm?.slug || ""}
              name="slug"
              onChange={handleChange}
              type="text"
              placeholder="Product Slug"
              className="p-6 w-full bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
            />
            <Input
              value={productForm?.quantity || ""}
              name="quantity"
              onChange={handleChange}
              type="number"
              placeholder="Stock Quantity"
              className="p-6 w-full bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
            />
            <Input
              value={productForm?.price || ""}
              name="price"
              onChange={handleChange}
              type="number"
              placeholder="₹ Price"
              className="p-6 w-full bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
            />
          </div>
          <Button
            type="submit"
            className="p-6 text-lg font-medium w-60 bg-blue-600 hover:bg-blue-700 text-white"
          >
            + Add Product
          </Button>
        </form>
      </section>

      {/* Display Current Stocks */}
      <section className="flex flex-col w-full">
        <h1 className="text-4xl font-medium mb-4">Display Current Stocks</h1>
        <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden">
          <Table className="bg-white dark:bg-zinc-900">
            <TableHeader>
              <TableRow className="bg-zinc-100 dark:bg-zinc-700">
                <TableHead className="text-xl font-bold py-4 px-6 w-1/3">
                  Product Name
                </TableHead>
                <TableHead className="text-xl font-bold py-4 px-6 w-1/3">
                  Stock Quantity
                </TableHead>
                <TableHead className="text-xl font-bold py-4 px-6 w-1/3">
                  Price of Product
                </TableHead>
                <TableHead className="text-xl font-bold py-4 px-6 w-1/4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.slug}
                  className="hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <TableCell className="text-base font-medium py-4 px-6 w-1/3">
                    {product.slug}
                  </TableCell>
                  <TableCell className="text-base font-medium py-4 px-6 w-1/3">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-base font-medium py-4 px-6 w-1/3">
                    ₹ {product.price}
                  </TableCell>
                  <TableCell className="text-base font-medium py-4 px-6 w-1/4">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleUpdate(product.slug)}
                        size="icon"
                        className="hover:bg-blue-500 hover:text-white"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        onClick={() => handleDelete(product.slug)}
                        size="icon"
                        className="hover:bg-red-500 hover:text-white"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
};

export default Hero;
