import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 py-10">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-extrabold">Own Stock Manager</h2>
          <p className="mt-2 text-sm">
            Build and manage UI components efficiently with our platform.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <Link href="/about" className="hover:text-blue-500">
            About
          </Link>
          <Link href="/pricing" className="hover:text-blue-500">
            Pricing
          </Link>
          <Link href="/blog" className="hover:text-blue-500">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-blue-500">
            Contact
          </Link>
        </div>

        {/* Social & CTA */}
        <div>
          <h3 className="text-lg font-semibold">Stay Connected</h3>
          <div className="flex space-x-4 mt-2">
            <Link href="#">
              <FaFacebook className="text-xl hover:text-blue-500" />
            </Link>
            <Link href="#">
              <FaTwitter className="text-xl hover:text-blue-500" />
            </Link>
            <Link href="#">
              <FaLinkedin className="text-xl hover:text-blue-500" />
            </Link>
            <Link href="#">
              <FaGithub className="text-xl hover:text-blue-500" />
            </Link>
          </div>
          <Button className="mt-4 bg-primary hover:bg-primary/80">
            Get Started
          </Button>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-8 border-t pt-6">
        &copy; {new Date().getFullYear()} VUIHUB. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
