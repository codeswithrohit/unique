import { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default () => {
  const [state, setState] = useState(false);
  const router = useRouter();

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "Reticulated Payment", path: "/checkout" },
    { title: "About Us", path: "/aboutus" },
    { title: "Contact Us", path: "/contactus" }
  ];

  return (
    <nav className="bg-white shadow-md w-full border-b md:border-0 md:static">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/" className="flex-shrink-0">
            {/* Ensure the logo maintains its aspect ratio */}
            <img
              src='unique.png'
              alt="logo"
              className="w-48 h-16 object-contain" // Ensures the image fits within the container without stretching
            />
          </Link>
          <div className="md:hidden">
            <button
              aria-label="Toggle navigation"
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 transition-all duration-500 ease-in-out ${state ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              const isActive = router.pathname === item.path;
              return (
                <li key={idx} className={` hover:text-blue-900 hover:font-bold  ${isActive ? 'text-blue-900   font-bold px-2 py-1 rounded-md' : 'text-blue-900   px-2 py-1 rounded-md'}`}>
                  <Link href={item.path}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="hidden md:inline-block">
            <a href="/Cart" className="py-2 px-4  text-white bg-gray-600 hover:bg-indigo-700 rounded-md shadow-lg transition-transform duration-300 transform hover:scale-105 hover:font-bold">
         Cart
            </a>
        </div>
      </div>
    </nav>
  );
}
