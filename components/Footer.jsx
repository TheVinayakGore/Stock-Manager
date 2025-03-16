"use client";
import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const emailBody = encodeURIComponent("Hey, hi Vinayak Gore, I am...");

  const socialLinks = [
    {
      icon: <FaFacebook className="w-6 h-6" />,
      link: "https://www.facebook.com/profile.php?id=61561190855256&mibextid=ZbWKwL",
    },
    {
      icon: <FaXTwitter className="w-6 h-6" />,
      link: "https://x.com/vinugoredev",
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      link: "https://www.linkedin.com/in/vinayak-gore-b85b7922a/",
    },
    {
      icon: <FaGithub className="w-6 h-6" />,
      link: "https://github.com/TheVinayakGore",
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      link: `mailto:vvgore2677@gmail.com?subject=Contact%20from%20Stock%20Manager&body=${emailBody}`,
    },
  ];

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 py-10 w-full">
      <section className="flex items-center justify-between px-20 w-full">
        {/* Logo & Description */}
        <div className="w-1/3">
          <h2 className="text-2xl font-extrabold">Stock Manager</h2>
          <p className="mt-2 text-sm">
            Efficiently manage and track your eCommerce inventory with our
            powerful stock management system.
          </p>
        </div>

        {/* Social & CTA */}
        <div className="flex flex-col items-end justify-center gap-2 w-1/2">
          <h3 className="text-2xl font-extrabold">Stay Tuned for updates</h3>
          <div className="flex items-center gap-1">
            {socialLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                target="_blank"
                className="p-2 opacity-30 hover:opacity-100 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 hover:scale-110"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Copyright */}
      <section className="text-center text-sm mt-8 border-t pt-6">
        &copy; {new Date().getFullYear()} Stock Manager. All rights reserved.
      </section>
    </footer>
  );
};

export default Footer;
