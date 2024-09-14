import React, { useState, useEffect } from "react";
import { firebase } from "../Firebase/config";
import { FaEye, FaShoppingCart, FaTimes } from "react-icons/fa"; // Importing icons from React Icons
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
const db = firebase.firestore();

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEnquirePopupOpen, setIsEnquirePopupOpen] = useState(false); // New state for enquire popup
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiry, setEnquiry] = useState({ name: '', mobileNo: '', email: '', address: '' });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await db.collection("Product").get();
      const productList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openPopup = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsEnquirePopupOpen(false); // Close enquire popup as well
    setSelectedProduct(null);
  };

  const handleImageClick = (image) => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        mainImage: image
      });
    }
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
    try {
      const response = await fetch('/api/productenquire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...enquiry,
          product: selectedProduct
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        closePopup(); // Close popups after sending
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error sending enquiry:", error);
    }
  };
  const handleAddToCart = (product) => {
    // Get cart from localStorage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item is already in the cart
    const isItemInCart = cart.some((item) => item.id === product.id);

    if (isItemInCart) {
      // Show toast notification if item is already in the cart
      toast.error("This item is already in the cart!");
    } else {
      // Add item to cart
      cart.push({ id: product.id, title: product.title, category: product.productcategory,image:product.images[0] });
      localStorage.setItem('cart', JSON.stringify(cart));
      // Show success toast notification
      toast.success("Item added to cart successfully!");
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gray-white py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="h-56 w-full">
                  <a href="#">
                    <img
                      className="mx-auto h-full"
                      src={product.images[0]} // Displaying the first image
                      alt={product.title}
                    />
                  </a>
                </div>
                <div className="pt-6">
                  <h2 className="text-lg font-mono font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                    {product.title} {/* Displaying the product title */}
                  </h2>
                  <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    {product.productcategory} {/* Displaying the product category */}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    {/* View Button with Icon */}
                    <button
                      type="button"
                      onClick={() => openPopup(product)}
                      className="inline-flex items-center font-mono rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <FaEye className="mr-2" /> View
                    </button>

                    {/* Add to Cart Button with Icon */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="inline-flex items-center font-mono rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <FaShoppingCart className="mr-2" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup for Product Details */}
      {isPopupOpen && selectedProduct && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 max-h-[100vh] overflow-y-auto">
            <button
              type="button"
              onClick={closePopup}
              className="absolute top-0 right-2 text-red-500 hover:text-red-700"
            >
              <FaTimes size={40} />
            </button>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  className="w-full h-auto rounded-lg"
                  src={selectedProduct.mainImage || selectedProduct.images[0]}
                  alt={selectedProduct.title}
                />
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedProduct.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index}`}
                      className="w-20 h-20 object-cover cursor-pointer border rounded-md"
                      onClick={() => handleImageClick(image)}
                    />
                  ))}
                </div>
              </div>
              <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
                <h2 className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
                  {selectedProduct.title}
                </h2>
                <p className="text-lg text-gray-600 font-mono dark:text-gray-400 mt-2">
                  {selectedProduct.productcategory}
                </p>
                {/* <button
                  type="button"
                  onClick={handleEnquireClick}
                  className="mt-4 inline-flex font-mono items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Enquire
                </button> */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 whitespace-pre-wrap">
  {selectedProduct.description}
</p>

              </div>
            </div>
          </div>
        </div>
      )}
      {isEnquirePopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <button
              type="button"
              onClick={closePopup}
              className="absolute top-0 right-2 text-red-500 hover:text-red-700"
            >
              <FaTimes size={40} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Enquire About This Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Enter  Name
                </label>
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
                <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
                  Enter Mobile No.
                </label>
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Enter  Email
                </label>
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
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Enter  Address
                </label>
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
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default Products;
