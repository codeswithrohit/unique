import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaTrash, FaEnvelope, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isEnquirePopupOpen, setIsEnquirePopupOpen] = useState(false);
  const [enquiry, setEnquiry] = useState({ name: '', mobileNo: '', email: '', address: '' });
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleEnquireClick = () => {
    setIsEnquirePopupOpen(true);
  };

  const handleEnquiryChange = (e) => {
    setEnquiry({
      ...enquiry,
      [e.target.name]: e.target.value
    });
  };

  const handleSend = async () => {
    setIsLoading(true); // Show "Sending..." when sending starts
    try {
      const response = await fetch('/api/productenquire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...enquiry,
          product: cartItems
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message); // Show success toast
        setIsEnquirePopupOpen(false); // Close popup after sending
      } else {
        toast.error(result.message); // Show error toast
      }
    } catch (error) {
      console.error("Error sending enquiry:", error);
      toast.error("Failed to send enquiry. Please try again."); // Show error toast
    } finally {
      setIsLoading(false); // Hide "Sending..." when done
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <section className="bg-gray-white py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul>
                {cartItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-mono">{item.title} ({item.category})</span>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={handleEnquireClick}
                className="mt-4 inline-flex items-center font-mono rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaEnvelope className="mr-2" /> Enquire
              </button>
            </>
          )}
        </div>
      </section>

      {/* Enquire Popup */}
      {isEnquirePopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <button
              type="button"
              onClick={() => setIsEnquirePopupOpen(false)}
              className="absolute top-0 right-2 text-red-500 hover:text-red-700"
            >
              <FaTimes size={40} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Enquire About Cart Items</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Enter Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  value={enquiry.name}
                  onChange={handleEnquiryChange}
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">Enter Mobile No.</label>
                <input
                  id="mobileNo"
                  name="mobileNo"
                  type="text"
                  placeholder="Enter Mobile No."
                  value={enquiry.mobileNo}
                  onChange={handleEnquiryChange}
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={enquiry.email}
                  onChange={handleEnquiryChange}
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Enter Address</label>
                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter Address"
                  value={enquiry.address}
                  onChange={handleEnquiryChange}
                  required
                  className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
