import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {

    return (

        <>
            <Navbar />

            <section className="bg-gray-100 py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <h1 className="text-5xl font-bold text-center mb-14">
                        About Us
                    </h1>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Image */}

                        <img
                            src="/images/about.png"
                            alt="About"
                            className="rounded-2xl shadow-xl w-full h-[450px] object-cover"
                        />

                        {/* Right Content */}

                        <div>

                            <h2 className="text-3xl font-bold text-blue-600 mb-6">
                                Welcome to CarDealer
                            </h2>

                            <p className="text-gray-600 leading-8 mb-6">
                                CarDealer Inventory is a trusted vehicle dealership
                                platform providing premium, luxury and affordable
                                cars. Our mission is to make buying and selling
                                vehicles simple, secure and transparent.
                            </p>

                            <p className="text-gray-600 leading-8 mb-8">
                                We offer a large collection of SUVs, Sedans,
                                Hatchbacks, Electric Cars and Sports Cars from
                                the world's leading brands.
                            </p>

                            <div className="grid grid-cols-2 gap-6">

                                <div className="bg-white rounded-xl shadow p-6">

                                    <h3 className="text-2xl font-bold text-blue-600">
                                        Our Mission
                                    </h3>

                                    <p className="text-gray-600 mt-3">
                                        Deliver quality vehicles with excellent
                                        customer service.
                                    </p>

                                </div>

                                <div className="bg-white rounded-xl shadow p-6">

                                    <h3 className="text-2xl font-bold text-blue-600">
                                        Our Vision
                                    </h3>

                                    <p className="text-gray-600 mt-3">
                                        Become India's most trusted online
                                        dealership platform.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default About;