import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {

    return (

        <>

            <Navbar />

            <section className="bg-gray-100 py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <h1 className="text-5xl font-bold text-center mb-14">
                        Contact Us
                    </h1>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Image */}

                        <img
                            src="/images/contact.jpg"
                            alt="Contact"
                            className="rounded-2xl shadow-xl w-full h-[450px] object-cover"
                        />

                        {/* Right Side */}

                        <div>

                            <h2 className="text-3xl font-bold mb-8">
                                Get In Touch
                            </h2>

                            <div className="space-y-5 mb-8">

                                <div>

                                    <h3 className="font-bold">
                                        Address
                                    </h3>

                                    <p className="text-gray-600">
                                        Ahmedabad, Gujarat, India
                                    </p>

                                </div>

                                <div>

                                    <h3 className="font-bold">
                                        Phone
                                    </h3>

                                    <p className="text-gray-600">
                                        +91 9876543210
                                    </p>

                                </div>

                                <div>

                                    <h3 className="font-bold">
                                        Email
                                    </h3>

                                    <p className="text-gray-600">
                                        support@cardealer.com
                                    </p>

                                </div>

                            </div>

                            {/* Small Contact Form */}

                            <form className="space-y-4">

                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                                <textarea
                                    rows="4"
                                    placeholder="Message"
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                ></textarea>

                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
                                >
                                    Send Message
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Contact;