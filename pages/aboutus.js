import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6 text-center">
          <h1 className="text-3xl font-bold">About Us</h1>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Unique Central Piped Gas Pvt Ltd.</h2>
          <p className="text-gray-700 mb-6">
          Established in 1985, Unique Piped Gas has grown with the vision of "providing energy through quality and safety." As a trusted supplier of Bharat Petroleum products, we specialize in delivering safe and efficient energy solutions.
          </p>
          <p className="text-gray-700 mb-6">
          Our partners enabled us to offer a wide range of energy solutions, backed by robust engineering capabilities and a reliable transportation network. Our focus on quality and safety ensures that we meet the unique needs of every customer.
          </p>
          <p className="text-gray-700">
          At Unique Piped Gas, we are committed to sustainability, efficiency, and the highest standards of safety. We are not just providing energy; we are fueling a safer and brighter future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
