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
import LoadingSpinner from "./LoadingSpinner";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const buttonAction = async (action, slug) => {
    setLoadingAction(true);
    try {
      const response = await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, slug }),
      });
      const data = await response.json();
      toast.success(data.message);

      const searchRes = await fetch(`/api/search?query=${slug}`);
      const searchData = await searchRes.json();
      setDropdown(searchData.products);
    } catch {
      toast.error("Failed to update quantity!");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleSearchInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?query=${value}`);
        const data = await response.json();
        setDropdown(data.products);
      } catch {
        toast.error("Failed to fetch search results!");
      } finally {
        setLoading(false);
      }
    } else {
      setDropdown([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    } else {
      toast.error("Please enter a search term.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-zinc-50 dark:bg-zinc-900 h-auto py-4 px-10 lg:px-20 border-b w-full">
      <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0 w-full lg:w-auto">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={theme === "dark" ? "/logo.webp" : "/logo2.webp"}
              alt="logo"
              className="w-10 md:w-12"
              width="300"
              height="300"
            />
            <span className="text-lg md:text-2xl font-bold">Stock Manager</span>
          </Link>
          {loading && <LoadingSpinner />}
        </div>

        {/* Search Bar + Theme Toggle */}
        <div className="relative flex items-center gap-2 w-full md:flex-1">
          <form onSubmit={handleSearch} className="relative w-full">
            <Input
              type="text"
              placeholder="Search products by slug..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-full p-5 pr-10 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 rounded-md"
            />
            {searchQuery && (
              <RxCross2
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-red-500 cursor-pointer"
                size={20}
                onClick={() => {
                  setSearchQuery("");
                  setDropdown([]);
                }}
              />
            )}
          </form>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/[0.3] dark:bg-zinc-900/[0.3] backdrop-blur-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {theme === "dark" ? (
              <HiOutlineSun className="h-6 w-6" />
            ) : (
              <IoMoonOutline className="h-6 w-6" />
            )}
          </button>

          {/* Dropdown */}
          {dropdown.length > 0 && (
            <div className="absolute top-[3.6rem] left-0 w-full max-h-[300px] overflow-y-auto z-30 bg-white dark:bg-zinc-800 rounded-xl border border-blue-500 shadow-lg">
              {dropdown.map((item) => (
                <div
                  key={item.slug}
                  className="flex items-start sm:items-center justify-between px-4 py-3 border-b dark:border-zinc-700"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center w-full text-base gap-1 md:gap-4 font-medium text-zinc-900 dark:text-zinc-50">
                    <span className="truncate max-w-xs">{item.slug}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>₹{item.price}</span>
                    <span>Category: {item.category}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <Button
                      onClick={() => buttonAction("minus", item.slug)}
                      disabled={loadingAction || item.quantity <= 0}
                      variant="ghost"
                      size="icon"
                      className="bg-zinc-200 dark:bg-zinc-700 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white"
                    >
                      -
                    </Button>
                    <span className="font-light">{item.quantity}</span>
                    <Button
                      onClick={() => buttonAction("plus", item.slug)}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
