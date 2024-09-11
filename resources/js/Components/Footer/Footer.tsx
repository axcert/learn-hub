import AXCERTRO from "@/..//../public/asstts/img/AXCERTRO.webp";
import {
    FaFacebookF,
    FaGithub,
    FaInstagram,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";

const Footer = () => {
    const date = new Date();
    return (
        <>
            <footer className="bg-gray-900 text-gray-300 py-8 ">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Thank You Section */}
                    <div className="text-center mb-8">
                        <h2 className="text-lg lg:text-xl font-semibold mb-3">
                            Thank You for Visiting Our Learning Management
                            System!
                        </h2>
                        <img
                            className="w-24 lg:w-28 mx-auto mb-4 rounded-full"
                            src={AXCERTRO}
                            alt="Axcerto Logo"
                        />
                        <p className="mb-4 text-sm lg:text-base">
                            We hope you found what you were looking for. If you
                            have any questions or need further assistance,
                            please don't hesitate to contact us.
                        </p>
                    </div>

                    {/* Solutions, Destinations, Contact, and Newsletter Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 text-sm lg:text-base">
                        {/* Solutions Column */}
                        <div className="flex flex-col items-start">
                            <h3 className="font-bold mb-2 text-gray-100">
                                Solutions
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        Policies
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Destinations Column */}
                        <div className="flex flex-col items-start">
                            <h3 className="font-bold mb-2 text-gray-100">
                                Destinations
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        Guides
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-500">
                                        API Status
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Information */}
                        <div className="flex flex-col items-start">
                            <h3 className="font-bold mb-2 text-gray-100">
                                Contact Us
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    Email:{" "}
                                    <a
                                        href="mailto:hello@gmail.com"
                                        className="text-gray-400 hover:text-gray-200"
                                    >
                                        hello@gmail.com
                                    </a>
                                </li>
                                <li>
                                    Phone:{" "}
                                    <span className="text-gray-400">
                                        +194 (775) 499-507
                                    </span>
                                </li>
                                <li>
                                    Address:{" "}
                                    <span className="text-gray-400">
                                        B-15, Samagimw, Randiyagama, Sri Lanka
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter Subscription */}
                        <div className="flex flex-col items-start">
                            <h3 className="font-bold mb-2 text-gray-100">
                                Newsletter
                            </h3>
                            <p className="text-sm mb-3">
                                Get the latest updates and news directly to your
                                inbox.
                            </p>
                            <form className="flex w-full">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="p-2 rounded-l-md bg-gray-800 border-none w-full text-gray-100"
                                />
                                <button className="p-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-500 transition">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-xs md:text-sm text-gray-500">
                            &copy; 2024 Your Company. All rights reserved.
                        </p>
                        <div className="flex space-x-3 mt-4 md:mt-0">
                            <a href="#" className="hover:text-blue-500">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-500">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-500">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-500">
                                <FaGithub size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-500">
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;
