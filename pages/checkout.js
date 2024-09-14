// pages/payment.js

import { useState } from 'react';

const PaymentPage = () => {
  const [customerNo, setCustomerNo] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://erp.uniquepipedgas.com/uatgas/payment?reqParam=%7B%22action%22:%22fetch_details%22,%22domain%22:%22online_payment%22,%22customerNo%22:%22${customerNo}%22,%22customerName%22:%22${name}%22,%22mobileNumber%22:%22${mobileNo}%22,%22emailId%22:%22${email}%22%7D`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white py-12 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="p-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 font-mono underline">Pay Reticulated Bill</h1>
          <form onSubmit={fetchData} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="customerNo">Customer Number:</label>
                <input
                  type="text"
                  id="customerNo"
                  value={customerNo}
                  onChange={(e) => setCustomerNo(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="mobileNo">Mobile Number:</label>
                <input
                  type="text"
                  id="mobileNo"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-48 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
             Pay Now
            </button>
          </form>
        </div>
        <div className="p-8">
          {loading && <div className="text-center text-blue-600">Loading...</div>}
          {error && <div className="text-center text-red-600">{error}</div>}
          {data && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 font-mono mb-4">Payment Information</h2>
              <div className="space-y-3 font-mono">
                <p className="text-gray-700"><strong>Customer Name:</strong> {data.customerName}</p>
                <p className="text-gray-700"><strong>Customer Number:</strong> {data.customerNo}</p>
                <p className="text-gray-700"><strong>Due Date:</strong> {data.dueDate}</p>
                <p className="text-gray-700"><strong>Bill Period:</strong> {data.billPeriod} days</p>
                <p className="text-gray-700"><strong>Bill Date:</strong> {data.billDate}</p>
                <p className="text-gray-700"><strong>Bill Amount:</strong> ₹ {data.billAmount.toFixed(2)}</p>
                <p className="text-gray-700"><strong>Bill Number:</strong> {data.billNumber}</p>
                <p className="text-gray-700"><strong>Convenience Fee:</strong> ₹ {data.convenienceFee.toFixed(2)}</p>
                <p className="text-gray-700"><strong>Payable Amount:</strong> ₹ {data.payableAmount}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
