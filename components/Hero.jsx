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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        toast.error("Failed to fetch products!");
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/api/action` : "/api/product";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        toast.success(
          isEditing
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
        setProductForm({});
        setIsEditing(false);

        const fetchResponse = await fetch("/api/product");
        const fetchData = await fetchResponse.json();
        setProducts(fetchData.products);
      } else {
        toast.error(
          isEditing ? "Failed to update product!" : "Failed to add product!"
        );
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const handleEdit = (product) => {
    setProductForm(product);
    setIsEditing(true);
  };

  const handleDelete = async (slug) => {
    try {
      const response = await fetch(`/api/action`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      if (response.ok) {
        toast.success("Product deleted successfully!");
        const fetchResponse = await fetch("/api/product");
        const fetchData = await fetchResponse.json();
        setProducts(fetchData.products);
      } else {
        toast.error("Failed to delete product!");
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
          <div className="flex flex-wrap gap-4 w-full">
            <Input
              value={productForm?.slug || ""}
              name="slug"
              onChange={handleChange}
              type="text"
              placeholder="Product Slug"
              className="p-6 flex-1 min-w-[200px]"
            />
            <Input
              value={productForm?.price || ""}
              name="price"
              onChange={handleChange}
              type="number"
              placeholder="₹ Price"
              className="p-6 flex-1 min-w-[200px]"
            />
            <Input
              value={productForm?.quantity || ""}
              name="quantity"
              onChange={handleChange}
              type="number"
              placeholder="Stock Quantity"
              className="p-6 flex-1 min-w-[200px]"
            />
            <Select
              value={productForm?.category || ""}
              onValueChange={(value) =>
                setProductForm({ ...productForm, category: value })
              }
            >
              <SelectTrigger className="p-6 flex-1 min-w-[200px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
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

      <hr className="h-0.5 w-full" />

      {/* Display Current Stocks */}
      <section className="flex flex-col w-full">
        <h1 className="text-4xl font-medium mb-10">Display Current Stocks</h1>
        <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-zinc-100 dark:bg-zinc-700">
                <TableHead className="text-lg font-semibold py-4 px-6 w-1/3">
                  Product Slug
                </TableHead>
                <TableHead className="text-lg font-semibold py-4 px-6">
                  Stock Quantity
                </TableHead>
                <TableHead className="text-lg font-semibold py-4 px-6">
                  Price
                </TableHead>
                <TableHead className="text-lg font-semibold py-4 px-6">
                  Category
                </TableHead>
                <TableHead className="text-lg font-semibold py-4 px-6">
                  Edit
                </TableHead>
                <TableHead className="text-lg font-semibold py-4 px-6">
                  Delete
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.slug ?? index}>
                  <TableCell className="py-3 px-6 w-1/3">{product.slug}</TableCell>
                  <TableCell className="py-3 px-6">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="py-3 px-6">₹{product.price}</TableCell>
                  <TableCell className="py-3 px-6 capitalize">
                    {product.category}
                  </TableCell>
                  <TableCell className="py-3 px-6">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="w-5 h-5" />
                    </Button>
                  </TableCell>
                  <TableCell className="py-3 px-6">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(product.slug)}
                    >
                      <Trash className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
};

export default Hero;
