import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter
} from "react-icons/fa";

function Footer() {

    return (

        <footer className="bg-slate-900 text-white">

            <div className="max-w-7xl mx-auto px-6 py-14">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Company */}

                    <div>

                        <h2 className="text-3xl font-bold mb-5">

                            CarDealer

                        </h2>

                        <p className="text-gray-400 leading-7">

                            Your trusted destination for buying premium,
                            luxury and affordable vehicles. We offer
                            quality cars with transparent pricing and
                            excellent customer service.

                        </p>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="text-xl font-semibold mb-5">

                            Quick Links

                        </h3>

                        <ul className="space-y-3 text-gray-400">

                            <li>
                                <Link to="/" className="hover:text-blue-400 transition">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/vehicles" className="hover:text-blue-400 transition">
                                    Vehicles
                                </Link>
                            </li>

                            <li>
                                <Link to="/about" className="hover:text-blue-400 transition">
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link to="/contact" className="hover:text-blue-400 transition">
                                    Contact
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="text-xl font-semibold mb-5">

                            Contact

                        </h3>

                        <div className="space-y-4 text-gray-400">

                            <div className="flex items-center gap-3">

                                <Phone size={18} />

                                <span>+91 9876543210</span>

                            </div>

                            <div className="flex items-center gap-3">

                                <Mail size={18} />

                                <span>info@cardealer.com</span>

                            </div>

                            <div className="flex items-center gap-3">

                                <MapPin size={18} />

                                <span>Ahmedabad, Gujarat, India</span>

                            </div>

                        </div>

                    </div>

                    {/* Social Media */}

                    <div>

                        <h3 className="text-xl font-semibold mb-5">

                            Follow Us

                        </h3>

                        <div className="flex gap-4">

                            <a
                                href="#"
                                className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"
                            >
                                <FaFacebookF size={20} />
                            </a>

                            <a
                                href="#"
                                className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition"
                            >
                                <FaInstagram size={20} />
                            </a>

                            <a
                                href="#"
                                className="bg-sky-600 p-3 rounded-full hover:bg-sky-700 transition"
                            >
                                <FaTwitter size={20} />
                            </a>

                            <a
                                href="#"
                                className="bg-blue-800 p-3 rounded-full hover:bg-blue-900 transition"
                            >
                                <FaLinkedinIn size={20} />
                            </a>

                        </div>

                    </div>

                </div>

                <hr className="border-gray-700 my-10" />

                <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">

                    <p>

                        © {new Date().getFullYear()} CarDealer Inventory.
                        All Rights Reserved.

                    </p>

                    <p className="mt-4 md:mt-0">

                        Developed using React, Node.js, Express & MongoDB

                    </p>

                </div>

            </div>

        </footer>

    );

}

export default Footer;