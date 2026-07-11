// import { useEffect, useState } from "react";

// import { getVehicles } from "../services/vehicleService";

// import Navbar from "../components/Navbar";
// import HeroSlider from "../components/HeroSlider";
// import VehicleCard from "../components/VehicleCard";

// function Home(){

//     const [vehicles,setVehicles]=useState([]);

//     useEffect(()=>{

//         const fetchVehicles=async()=>{

//             try{

//                 const data=await getVehicles();

//                 setVehicles(data);

//             }catch(error){

//                 console.log(error);

//             }

//         };

//         fetchVehicles();

//     },[]);

//     return(

//         <>
//             <Navbar/>

//             <HeroSlider/>

//             <section className="max-w-7xl mx-auto py-16">

//                 <h1 className="text-4xl font-bold text-center mb-10">
//                     Featured Vehicles
//                 </h1>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

//                     {
//                         vehicles.map(vehicle=>(
//                             <VehicleCard
//                                 key={vehicle._id}
//                                 vehicle={vehicle}
//                             />
//                         ))
//                     }

//                 </div>

//             </section>

//         </>

//     );

// }

// export default Home;





// import Navbar from "../components/Navbar";
// import HeroSlider from "../components/HeroSlider";
// import FeaturedVehicles from "../components/FeaturedVehicles";


// function Home() {
//     return (
//         <div className="bg-gray-50 min-h-screen">

//             {/* Navbar */}
//             <Navbar />

//             {/* Hero Slider */}
//             <HeroSlider />

//             {/* Featured Vehicles */}
//             <section className="py-16">
//                 <div className="max-w-7xl mx-auto px-6">

//                     <h2 className="text-4xl font-bold text-center mb-10">
//                         Featured Vehicles
//                     </h2>

//                     <FeaturedVehicles />

//                 </div>
//             </section>

//             {/* Browse By Category */}
//             <section className="bg-white py-16">

//                 <div className="max-w-7xl mx-auto px-6">

//                     <h2 className="text-4xl font-bold text-center mb-10">
//                         Browse by Category
//                     </h2>

//                     <Categories />

//                 </div>

//             </section>

//             {/* Why Choose Us */}
//             <section className="py-16">

//                 <div className="max-w-7xl mx-auto px-6">

//                     <h2 className="text-4xl font-bold text-center mb-10">
//                         Why Choose Us
//                     </h2>

//                     <WhyChooseUs />

//                 </div>

//             </section>

//             {/* Latest Vehicles */}
//             <section className="bg-white py-16">

//                 <div className="max-w-7xl mx-auto px-6">

//                     <h2 className="text-4xl font-bold text-center mb-10">
//                         Latest Vehicles
//                     </h2>

//                     <LatestVehicles />

//                 </div>

//             </section>

//             {/* Statistics */}
//             <section className="bg-blue-700 text-white py-16">

//                 <div className="max-w-7xl mx-auto px-6">

//                     <Statistics />

//                 </div>

//             </section>

//             {/* Testimonials */}
//             <section className="py-16">

//                 <div className="max-w-7xl mx-auto px-6">

//                     <h2 className="text-4xl font-bold text-center mb-10">
//                         What Our Customers Say
//                     </h2>

//                     <Testimonials />

//                 </div>

//             </section>

//             {/* Contact */}
//             <section className="bg-white py-16">

//                 <div className="max-w-7xl mx-auto px-6">

//                     <h2 className="text-4xl font-bold text-center mb-10">
//                         Contact Us
//                     </h2>

//                     <ContactSection />

//                 </div>

//             </section>

//             {/* Footer */}
//             <Footer />

//         </div>
//     );
// }

// export default Home;



import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import FeaturedVehicles from "../components/FeaturedVehicles";
import Categories from "../components/Categories";
import WhyChooseUs from "../components/WhyChooseUs";
import LatestVehicles from "../components/LatestVehicles";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function Home() {
    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Navbar */}
            <Navbar />

            {/* Hero Slider */}
            <HeroSlider />

            {/* Featured Vehicles */}
            <section className="py-16 bg-gray-100">

                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-3">
                        Featured Vehicles
                    </h2>

                    <p className="text-center text-gray-500 mb-10">
                        Discover our most popular vehicles at the best prices.
                    </p>

                    <FeaturedVehicles />

                </div>

            </section>

            <section className="py-16">

        <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center mb-10">

                Browse by Category

            </h2>

            <Categories />

        </div>

    </section>

    <section className="py-16 bg-gray-100">

        <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center mb-10">

                Why Choose Us

            </h2>

            <WhyChooseUs />

        </div>

    </section>

    <section className="py-16">

        <LatestVehicles />

    </section>

    <section>
        <Statistics />
    </section>

    <section>
        <Testimonials />
    </section>

    <Footer />

        </div>
    );
}

export default Home;