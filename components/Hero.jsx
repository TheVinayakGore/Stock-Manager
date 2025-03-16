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
  const [isEditing, setIsEditing] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        toast.error("Failed to fetch products !");
      }
    };
    fetchProducts();
  }, []);

  // Add or update a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/api/action` : "/api/product";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        toast.success(
          isEditing
            ? "Product updated successfully !"
            : "Product added successfully !"
        );
        setProductForm({});
        setIsEditing(false); // Reset editing state
        // Refresh products list
        const fetchResponse = await fetch("/api/product");
        const fetchData = await fetchResponse.json();
        setProducts(fetchData.products);
      } else {
        toast.error(
          isEditing ? "Failed to update product !" : "Failed to add product !"
        );
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

  // Handle product edit
  const handleEdit = (product) => {
    setProductForm(product); // Pre-fill the form with the selected product's data
    setIsEditing(true); // Set editing state to true
  };

  // Handle product deletion
  const handleDelete = async (slug) => {
    try {
      const response = await fetch(`/api/action`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      if (response.ok) {
        toast.success("Product deleted successfully !");
        // Refresh products list
        const fetchResponse = await fetch("/api/product");
        const fetchData = await fetchResponse.json();
        setProducts(fetchData.products);
      } else {
        toast.error("Failed to delete product !");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <main className="flex flex-col items-center gap-28 text-base font-light relative w-full">
      {/* Add/Edit a Product */}
      <section className="flex flex-col w-full">
        <h1 className="text-4xl font-medium mb-10">
          {isEditing ? "Edit Product" : "Add a Product"}
        </h1>
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <div className="flex gap-4 w-full">
            <Input
              value={productForm?.slug || ""}
              name="slug"
              onChange={handleChange}
              type="text"
              placeholder="Product Slug"
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
            <Input
              value={productForm?.quantity || ""}
              name="quantity"
              onChange={handleChange}
              type="number"
              placeholder="Stock Quantity"
              className="p-6 w-full bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
            />
            <Select
              value={productForm?.category || ""}
              onValueChange={(value) =>
                setProductForm({ ...productForm, category: value })
              }
            >
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
          </div>
          <Button
            type="submit"
            className="p-6 text-lg font-medium w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isEditing ? "Update Product" : "+ Add Product"}
          </Button>
        </form>
      </section>

      {/* Display Current Stocks */}
      <section className="flex flex-col w-full">
        <h1 className="text-4xl font-medium mb-10">Display Current Stocks</h1>
        <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden">
          <Table className="bg-white dark:bg-zinc-900">
            <TableHeader>
              <TableRow className="bg-zinc-100 dark:bg-zinc-700">
                <TableHead className="text-xl font-bold py-4 px-6 w-1/4">
                  Product Slug
                </TableHead>
                <TableHead className="text-xl font-bold py-4 px-6 w-1/4">
                  Stock Quantity
                </TableHead>
                <TableHead className="text-xl font-bold py-4 px-6 w-1/4">
                  Price of Product
                </TableHead>
                <TableHead className="text-xl font-bold py-4 px-6 w-1/4">
                  Category
                </TableHead>
                <TableHead className="text-xl font-bold py-4 px-6 w-1/4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.slug}>
                  <TableCell className="text-base font-medium py-4 px-6 w-1/4">
                    {product.slug}
                  </TableCell>
                  <TableCell className="text-base font-medium py-4 px-6 w-1/4">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-base font-medium py-4 px-6 w-1/4">
                    ₹ {product.price}
                  </TableCell>
                  <TableCell className="text-base font-medium py-4 px-6 w-1/4">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-base font-medium py-4 px-6 w-1/4">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(product)}
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
