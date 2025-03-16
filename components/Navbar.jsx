"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineSun } from "react-icons/hi2";
import { IoMoonOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false); // Added loadingAction state
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Handle quantity update (plus/minus)
  const buttonAction = async (action, slug, initialQuantity) => {
    const newQuantity =
      action === "plus" ? initialQuantity + 1 : initialQuantity - 1;

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
      toast.error("Failed to update quantity !");
    } finally {
      setLoadingAction(false);
    }
  };

  // Handle search input change
  const handleSearchInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?query=${value}`);
        const data = await response.json();
        setDropdown(data.products);
      } catch (error) {
        toast.error("Failed to fetch search results !");
      } finally {
        setLoading(false);
      }
    } else {
      setDropdown([]);
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    } else {
      toast.error("Please enter a search term.");
    }
  };

  // Handle product edit
  const handleEdit = (product) => {
    // Redirect to the edit page or open a modal for editing
    router.push(`/edit-product/${product.slug}`);
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
        // Refresh the dropdown after deletion
        const updatedDropdown = dropdown.filter((item) => item.slug !== slug);
        setDropdown(updatedDropdown);
      } else {
        toast.error("Failed to delete product !");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-zinc-50 dark:bg-zinc-900 p-4 px-20 border-b w-full">
        <div className="flex items-center gap-10 w-full">
          <div className="flex items-center gap-2 w-1/4">
            <Link href="/" className="flex items-center space-x-2 w-full">
              <Image
                src={theme === "dark" ? "/logo.webp" : "/logo2.webp"}
                alt="logo"
                className="w-10"
                width="300"
                height="300"
              />
              <span className="text-2xl font-bold">Stock Manager</span>
            </Link>
            {/* Loading Spinner */}
            {loading && <LoadingSpinner />}
          </div>

          <div className="flex items-center gap-2 relative w-full">
            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 w-full"
            >
              <Input
                type="text"
                placeholder="Search products by slug..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full p-5 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 rounded-md"
              />
            </form>

            {/* Dropdown Results */}
            {dropdown.length > 0 && (
              <div className="flex flex-col absolute z-30 top-[3.6rem] bg-white dark:bg-zinc-800 rounded-b-xl w-full border border-blue-500 shadow-lg">
                {dropdown.map((item) => (
                  <div
                    key={item.slug}
                    className="flex items-center text-base font-medium px-5 h-14 text-zinc-900 dark:text-zinc-50 w-full transition-colors"
                  >
                    <div className="flex items-center justify-between text-center w-full">
                      <span className="text-start w-full">
                        {item.slug.length > 10
                          ? item.slug.slice(0, 10) + "..."
                          : item.slug}
                      </span>
                      <span className="w-full">( Qty : {item.quantity} )</span>
                      <span className="w-full">available for</span>
                      <span className="w-full">[ ₹ {item.price} ]</span>
                      <span className="w-full">( Ctg : {item.category} )</span>
                    </div>
                    <div className="flex items-center justify-end gap-2 w-1/3">
                      <Button
                        onClick={() => handleEdit(item)}
                        size="icon"
                        className="hover:bg-blue-500 hover:text-white"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.slug)}
                        size="icon"
                        className="hover:bg-red-500 hover:text-white"
                      >
                        <Trash size={16} />
                      </Button>
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

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 cursor-pointer rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/[0.3] dark:bg-zinc-900/[0.3] backdrop-blur-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            >
              {theme === "dark" ? (
                <HiOutlineSun className="h-6 w-6" />
              ) : (
                <IoMoonOutline className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
