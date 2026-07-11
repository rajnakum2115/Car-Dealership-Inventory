import { MapPin, Phone, Mail, Clock } from "lucide-react";

function ContactSection() {

    return (

        <section className="bg-gray-100 py-20">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">

                    <h1 className="text-5xl font-bold text-gray-900">
                        Contact Us
                    </h1>

                    <p className="text-gray-600 mt-4 text-lg">
                        We'd love to hear from you. Feel free to reach out for
                        any inquiries regarding our vehicles or services.
                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Contact Information */}

                    <div className="bg-white rounded-2xl shadow-xl p-10">

                        <h2 className="text-3xl font-bold mb-8">
                            Get In Touch
                        </h2>

                        <div className="space-y-8">

                            <div className="flex items-start gap-5">

                                <div className="bg-blue-100 p-4 rounded-full">

                                    <MapPin
                                        className="text-blue-600"
                                        size={28}
                                    />

                                </div>

                                <div>

                                    <h3 className="font-bold text-xl">
                                        Address
                                    </h3>

                                    <p className="text-gray-600 mt-2">
                                        123 Car Street,
                                        Ahmedabad, Gujarat,
                                        India
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-start gap-5">

                                <div className="bg-green-100 p-4 rounded-full">

                                    <Phone
                                        className="text-green-600"
                                        size={28}
                                    />

                                </div>

                                <div>

                                    <h3 className="font-bold text-xl">
                                        Phone
                                    </h3>

                                    <p className="text-gray-600 mt-2">
                                        +91 9876543210
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-start gap-5">

                                <div className="bg-red-100 p-4 rounded-full">

                                    <Mail
                                        className="text-red-600"
                                        size={28}
                                    />

                                </div>

                                <div>

                                    <h3 className="font-bold text-xl">
                                        Email
                                    </h3>

                                    <p className="text-gray-600 mt-2">
                                        support@cardealer.com
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-start gap-5">

                                <div className="bg-yellow-100 p-4 rounded-full">

                                    <Clock
                                        className="text-yellow-600"
                                        size={28}
                                    />

                                </div>

                                <div>

                                    <h3 className="font-bold text-xl">
                                        Working Hours
                                    </h3>

                                    <p className="text-gray-600 mt-2">
                                        Monday - Saturday
                                    </p>

                                    <p className="text-gray-600">
                                        9:00 AM - 7:00 PM
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Contact Form */}

                    <div className="bg-white rounded-2xl shadow-xl p-10">

                        <h2 className="text-3xl font-bold mb-8">
                            Send Message
                        </h2>

                        <form className="space-y-6">

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full border rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full border rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full border rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <textarea
                                rows="6"
                                placeholder="Your Message"
                                className="w-full border rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition duration-300"
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default ContactSection;