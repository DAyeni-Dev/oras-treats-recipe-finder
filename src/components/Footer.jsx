
import { FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-green-600 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-6">
        {/* Brand */}
        <h2 className="text-xl font-bold">ORA's Treats 2025</h2>

        <div className="flex gap-6 mt-4 sm:mt-0">
          <a
            href="https://www.facebook.com/profile.php?id=61575480968843&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition"
          >
            <FaFacebook size={24} />
          </a>

          <a
            href="https://www.instagram.com/oras_treats?igsh=MTNveGJuZndsYXFlYw=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      
      <div className="mt-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} ORA’s Treats. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
