import React, { useState, useEffect } from "react";
import { firebase } from "../../Firebase/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/router';
const db = firebase.firestore();
const storage = firebase.storage();

const Products = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productData, setProductData] = useState({
    id: "",
    title: "",
    description: "",
    productcategory: "",
    images: [],
    imagesUrls: [], // Added this to manage existing images
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  };
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is an admin when the component mounts
  useEffect(() => {
    const isAdminInLocalStorage = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(isAdminInLocalStorage);
    if (!isAdminInLocalStorage) {
      // If the user is not an admin, show a loading message or redirect them to the login page
      router.push("/adminlogin");
    } else {
    }
  }, [router]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadProgress(0);
    toast.info("Submitting...");

    const imageUrls = [];
    let totalBytes = 0;
    let loadedBytes = 0;

    const uploadTasks = productData.images.map((file) => {
      const fileRef = storage.ref().child(`Product/${file.name}`);
      totalBytes += file.size;

      return new Promise((resolve, reject) => {
        const uploadTask = fileRef.put(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(Math.round((loadedBytes + (file.size * (snapshot.bytesTransferred / snapshot.totalBytes))) / totalBytes * 100));
          },
          (error) => {
            toast.error("Error uploading image. Please try again.");
            setUploading(false);
            reject(error);
          },
          async () => {
            const url = await uploadTask.snapshot.ref.getDownloadURL();
            imageUrls.push(url);
            loadedBytes += file.size;
            resolve();
          }
        );
      });
    });

    try {
      await Promise.all(uploadTasks);

      const productDataToSave = {
        title: productData.title,
        description: productData.description,
        productcategory: productData.productcategory,
        images: [...productData.imagesUrls, ...imageUrls], // Append new images to existing
      };

      if (productData.id) {
        // Update existing product
        await db.collection("Product").doc(productData.id).update(productDataToSave);
        toast.success("Product updated successfully!");
      } else {
        // Add new product
        await db.collection("Product").add(productDataToSave);
        toast.success("Product added successfully!");
      }

      setIsModalOpen(false);
      setProductData({
        id: "",
        title: "",
        description: "",
        productcategory: "",
        images: [],
        imagesUrls: [], // Added this to manage existing images
      });
      window.location.reload();
    } catch (error) {
      toast.error("Error saving product. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product) => {
    setProductData({
      ...product,
      images: [], // Reset images to avoid showing old files
      imagesUrls: product.images || [], // Preserve existing image URLs
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, imageUrls) => {
    try {
      // Delete images from storage
      await Promise.all(imageUrls.map(async (url) => {
        // Decode the file name and path
        const decodedUrl = decodeURIComponent(url);
        const fileName = decodedUrl.split('/').pop().split('?')[0];
  
        // Construct the file reference path
        const fileRef = storage.ref().child(`Product/${fileName}`);
  
        // Check if the file exists before trying to delete it
        const fileSnapshot = await fileRef.getMetadata().catch((error) => {
          if (error.code === 'storage/object-not-found') {
            console.warn(`File not found: ${fileName}`);
          } else {
            throw error;
          }
        });
  
        if (fileSnapshot) {
          // File exists, proceed to delete
          await fileRef.delete();
          console.log(`File deleted: ${fileName}`);
        } else {
          console.warn(`File already deleted or doesn't exist: ${fileName}`);
        }
      }));
  
      // Delete product from Firestore
      await db.collection("Product").doc(id).delete();
      toast.success("Product deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Error deleting product. Please try again.");
      console.error("Error deleting product:", error);
    }
  };
  

  const handleRemoveImage = async (url) => {
    try {
      // Decode the file name and path
      const decodedUrl = decodeURIComponent(url);
      const fileName = decodedUrl.split('/').pop().split('?')[0];
  
      // Construct the file reference path
      const fileRef = storage.ref().child(`Product/${fileName}`);
  
      // Log the file reference for debugging
      console.log("Deleting file:", fileRef.fullPath);
  
      // Delete the file from Firebase Storage
      await fileRef.delete();
  
      // Update the product data to remove the image URL
      const updatedImagesUrls = productData.imagesUrls.filter(imageUrl => imageUrl !== url);
      setProductData(prev => ({ ...prev, imagesUrls: updatedImagesUrls }));
  
      toast.success("Image removed successfully!");
    } catch (error) {
      toast.error("Error removing image. Please try again.");
      console.error("Error removing image:", error);
    }
  };
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await db.collection("Product").get();
      const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
      setFilteredProducts(productList.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())));
    } catch (error) {
      toast.error("Error fetching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, products]);

  return (
    <div className="m-auto min-h-screen bg-white dark:bg-gray-900">
      <section className="bg-white  dark:bg-gray-900">
        <section className="bg-white dark:bg-gray-900 p-3 sm:p-5">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                    <input
                        type="text"
                        id="simple-search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        required=""
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    type="button"
                    className="flex items-center justify-center text-black bg-red-400 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => setIsModalOpen(true)}
                  >
                    ➕ Add product
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
              {loading ? (
                  <p className="p-4">Loading...</p>
                ) : filteredProducts.length === 0 ? (
                  <p className="p-4">No products found.</p>
                ) : (
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{product.title}</td>
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{product.productcategory}</td>
                        
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              className="text-blue-600 dark:text-blue-500 hover:underline"
                              onClick={() => handleEdit(product)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="text-red-600 dark:text-red-500 hover:underline ml-2"
                              onClick={() => handleDelete(product.id, product.images)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </section>
      </section>

      {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Product {productData.id ? "Edit" : "Add"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={productData.title}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              
              
                         
              <div className="mb-4">
  <label className="block text-gray-700 mb-2" htmlFor="productcategory">
    Product Category
  </label>
  <input
    type="text"
    id="productcategory"
    name="productcategory"
    className="border border-gray-300 rounded-lg w-full p-2"
    value={productData.productcategory}
    onChange={handleInputChange}
    placeholder="Enter Product Category"
    required
  />
</div>

                                  

               
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full h-36 p-2 border border-gray-300 rounded"
                />
             
               
              
               <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Existing Images</label>
                <div className="flex flex-wrap gap-2">
                  {productData.imagesUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img src={url} alt={`Product Image ${index + 1}`} className="w-24 h-24 object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(url)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-blue-600 text-white p-2 rounded"
                >
                  {uploading ? `Uploading ${uploadProgress}%` : 'Submit'}
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-2xl font-bold font-mono text-red-500 hover:text-red-800 dark:text-red-400 dark:hover:text-red-100"
            >
              x
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Products;
