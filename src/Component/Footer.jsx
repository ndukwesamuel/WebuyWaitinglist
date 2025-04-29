import React, { useState } from "react";
import footerBg from "../assets/images/footer-bg.png";
import footerImg from "../assets/images/footer-img.png";
import { Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Newsletter subscription:", email);
    // Reset form after submission
    setEmail("");
  };

  return (
    <footer
      className="relative w-full py-12 text-white overflow-hidden pt-[8rem]"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8 items-start justify-between relative z-10">
        {/* Left side - Footer Image */}
        <div className="w-full md:w-1/3">
          <img
            src={footerImg}
            alt="Footer Logo"
            className="max-w-full h-auto max-h-60"
          />
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/2347073244594"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FaWhatsapp size={18} className="text-white" />
                <span className="text-sm md:text-base">+2347073244594</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="mailto:webuyam@gmail.com"
                className="flex items-center gap-2"
              >
                <Mail size={18} className="text-white" />
                <span className="text-sm md:text-base">webuyam@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right side - Newsletter and Social Media */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-200 mb-4">
              Stay updated with our latest products and promotions
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-3 rounded-md bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-white w-full"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#007A3D] text-white rounded-md hover:bg-[#006030] transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Icons */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/webuyam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#007A3D] transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://instagram.com/webuyam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#007A3D] transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://x.com/WeBuy001"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#007A3D] transition-colors duration-300"
              >
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-6 border-t border-white/20 text-center relative z-10">
        <p className="text-gray-300">
          © {new Date().getFullYear()} Buycrowdy Technology Solutions Limited.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
