import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'; // Importing React Icons

const Hero8 = () => {
  const images = [
    'banner1.jpg',
    'banner2.jpg',
    'banner3.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

 

  return (
    <div className='min-h-screen bg-white'>
   <div className="relative flex justify-end bg-gradient-to-t from-white via-transparent to-white overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-36 md:h-96">
          <img
            className="object-contain w-full h-full"
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
          />

          {/* Left Arrow */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            onClick={handlePrev}
          >
            <FiArrowLeft className="w-6 h-6 text-gray-800" />
          </button>

          {/* Right Arrow */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            onClick={handleNext}
          >
            <FiArrowRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Dotted Indicators */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full ${currentIndex === idx ? 'bg-indigo-600' : 'bg-gray-300'} transition-colors`}
                onClick={() => goToSlide(idx)}
              ></button>
            ))}
          </div>
        </div>
      </div>
  <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">


          <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-3">
            <div>
              <img className="relative z-10 object-cover w-full rounded-md h-96" src="lot.jpg" alt="" />

              <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                <a href="#" className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                  LOT System
                </a>

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                  LOT systems are designed to meet the needs of clients requiring a substantial volume of LPG, with the capacity to handle up to 250 kilograms per hour. These systems operate by drawing liquid LPG from specialized LOT cylinders through a dedicated LPG manifold system. Once extracted, the liquid LPG is then directed into a high-performance LPG vaporizer, where it is efficiently transformed into a usable gaseous state. This process ensures a reliable and continuous supply of LPG for various industrial and commercial applications, making LOT systems an ideal choice for high-demand situations.
                </p>


              </div>
            </div>

            <div>
              <img className="relative z-10 object-cover w-full rounded-md h-96" src="https://4.imimg.com/data4/SA/HD/MY-7162172/lpg-gas-manifold-500x500.jpg" alt="" />

              <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                <a href="#" className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                  Reticulated Piped Gas
                </a>

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                  Reticulated piped gas, often referred to as natural gas or piped natural gas (PNG), is a safe and convenient energy source delivered directly to homes, businesses, and industries through an extensive network of underground pipelines. This versatile energy solution provides a continuous and reliable supply of clean-burning gas for a wide range of applications, including cooking, heating, hot water systems, and more. Reticulated piped gas offers numerous benefits, such as energy efficiency, reduced environmental impact, and the convenience of never needing to order or refill gas cylinders.
                  
                </p>

              </div>
            </div>

            <div>
              <img className="relative z-10 object-cover w-full rounded-md h-96" src="supply3.jpg" alt="" />

              <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                <a href="#" class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                  Supply of LPG - 14.2,19, etc
                </a>

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                  LPG Tank (Bulk) Installation: Our professional and experienced team specializes in the safe and efficient installation of bulk LPG tanks. Whether you need a new tank installation or the replacement of an existing one, we ensure that your LPG storage solution is set up to the highest industry standards. Our comprehensive services encompass site assessment, tank selection, secure installation, and compliance with all relevant safety regulations. Trust us for a seamless and dependable LPG tank installation that meets your specific needs and provides a continuous supply of propane for your business or residential requirements.
                </p>


              </div>
            </div>
            <div>
              <img className="relative z-10 object-cover w-full rounded-md h-96" src="conversion.png" alt="" />

              <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                <a href="#" className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                  Conversion other fuels to LPG/Natural Gas
                </a>

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                At Uniqued Piped Gas, we are your trusted partner in energy transformation. Our mission is to make your life more convenient, efficient, and environmentally friendly by converting various fuel sources to cleaner and sustainable options like LPG (liquefied petroleum gas) and natural gas. With our expertise in fuel conversion, we bring you cost-effective and eco-conscious solutions that not only save you money but also contribute to a greener future. Discover the benefits of cleaner energy with Uniqued Piped Gas today.
                </p>


              </div>
            </div>

            <div>
              <img className="relative z-10 object-cover w-full rounded-md h-96" src="lpg.png" alt="" />

              <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                <a href="#" className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                  Pipelines - LPG,Natural Gas, Commercial, Industrial
                </a>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                  Uniqued Piped Gas is a leading provider of pipeline solutions for a diverse range of industries. Specializing in LPG and natural gas pipelines, our company offers top-tier services tailored to the needs of commercial and industrial sectors. With unmatched expertise, Uniqued Piped Gas ensures the safe and efficient transportation of gas resources through cutting-edge pipeline technology. We are committed to delivering innovative solutions that guarantee reliability, cost-effectiveness, and sustainability, making us the preferred choice for businesses seeking superior gas pipeline solutions.
                </p>

              </div>
            </div>

            <div>
              <img className="relative z-10 object-cover w-96 rounded-md h-96" src="burner.jpg" alt="" />

              <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                <a href="#" class="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl">
                  Burners
                </a>

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                  Uniqued Piped Gas Burners is a leading provider of innovative and reliable gas burner solutions. Our company specializes in delivering cutting-edge technology for residential, commercial, and industrial applications, offering safe and efficient combustion solutions. With a commitment to quality, sustainability, and customer satisfaction, we provide custom-designed burners that optimize energy efficiency and reduce environmental impact. Uniqued Piped Gas Burners is your trusted partner for delivering precision and performance in gas combustion, ensuring a clean, efficient, and sustainable future for heating and process applications.
                </p>


              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-8 mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">We Provide Energy</h2>

          <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="w-full max-w-xs text-center">
              <img className="object-cover object-center  mx-auto rounded-lg" src="https://themes.webdevia.com/petroleum-gas/wp-content/uploads/2016/01/icon11.jpg" alt="avatar" />

              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Installation By Expertize</h3>
                <span className="mt-1  text-gray-600 dark:text-gray-300">Our installation team comprises experienced professionals who are experts in their field</span>
              </div>
            </div>

            <div className="w-full max-w-xs text-center">
              <img className="object-cover object-center  mx-auto rounded-lg" src="https://themes.webdevia.com/petroleum-gas/wp-content/uploads/2016/01/icon81.jpg" alt="avatar" />

              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Maximum Power</h3>
                <span className="mt-1  text-gray-600 dark:text-gray-300">Get Unlimited Energy of passages of Lerem ipsum available</span>
              </div>
            </div>

            <div className="w-full max-w-xs text-center">
              <img className="object-cover object-center  mx-auto rounded-lg" src="https://themes.webdevia.com/petroleum-gas/wp-content/uploads/2016/01/icon71.jpg" alt="avatar" />

              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Oil Resources</h3>
                <span className="mt-1  text-gray-600 dark:text-gray-300">There is many variantions of passages of Lerem ipsum available</span>
              </div>
            </div>

            <div className="w-full max-w-xs text-center">
              <img className="object-cover object-center  mx-auto rounded-lg" src="https://themes.webdevia.com/petroleum-gas/wp-content/uploads/2016/01/icon61.jpg" alt="avatar" />

              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Continues Development</h3>
                <span className="mt-1  text-gray-600 dark:text-gray-300">There is many variantions of passages of Lerem ipsum available</span>
              </div>
            </div>
            <div className="w-full max-w-xs text-center">
              <img className="object-cover object-center  mx-auto rounded-lg" src="https://themes.webdevia.com/petroleum-gas/wp-content/uploads/2016/01/icon51.jpg" alt="avatar" />

              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Chimical Analysis</h3>
                <span className="mt-1  text-gray-600 dark:text-gray-300">There is many variantions of passages of Lerem ipsum available</span>
              </div>
            </div>

            <div className="w-full max-w-xs text-center">
              <img className="object-cover object-center  mx-auto rounded-lg" src="https://themes.webdevia.com/petroleum-gas/wp-content/uploads/2016/01/icon41.jpg" alt="avatar" />

              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">We Fight Polution</h3>
                <span className="mt-1  text-gray-600 dark:text-gray-300">There is many variantions of passages of Lerem ipsum available</span>
              </div>
            </div>

            <div className="w-full max-w-xs text-center">
              <img className="object-cover object-center  mx-auto rounded-lg" src="https://themes.webdevia.com/petroleum-gas/wp-content/uploads/2016/01/icon31.jpg" alt="avatar" />

              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">We Think About The Consumer</h3>
                <span className="mt-1  text-gray-600 dark:text-gray-300">There is many variantions of passages of Lerem ipsum available</span>
              </div>
            </div>

            <div className="w-full max-w-xs text-center">
              <img className="object-cover object-center  mx-auto rounded-lg" src="https://themes.webdevia.com/petroleum-gas/wp-content/uploads/2016/01/icon9.jpg" alt="avatar" />

              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">We Care About Envirement</h3>
                <span className="mt-1  text-gray-600 dark:text-gray-300">There is many variantions of passages of Lerem ipsum available</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  </div>
  )
}

export default Hero8
