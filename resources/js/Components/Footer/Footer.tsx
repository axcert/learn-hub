import AXCERTRO from "@/..//../public/asstts/img/AXCERTRO.webp";
import {
    FaFacebookF,
    FaGithub,
    FaTwitter,
    FaLinkedin,
    FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
    const date = new Date();
    return (
        <>
            <footer className="bg-gray-900 text-gray-300 py-6">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Thank You Section */}
                    <div className="text-center mb-4">
                        <h2 className="text-base lg:text-lg font-semibold mb-2">
                            Thank You for Visiting Our Learning Management
                            System!
                        </h2>
                        <img
                            className="w-16 lg:w-20 mx-auto mb-2 rounded-full"
                            src={AXCERTRO}
                            alt="Axcerto Logo"
                        />
                        <p className="mb-2 text-xs lg:text-sm">
                            We hope you found what you were looking for. If you
                            have any questions or need further assistance,
                            please don't hesitate to contact us.
                        </p>
                    </div>

                    {/* Solutions, Contact, and Newsletter Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-xs lg:text-sm">
                        {/* Solutions Column */}
                        <div className="flex flex-col items-start">
                            <h3 className="font-semibold mb-2 text-gray-100">
                                Solutions
                            </h3>
                            <ul className="space-y-1">
                                <li>
                                    <a
                                        href=""
                                        className="hover:text-blue-500 transition-colors duration-300"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-blue-500 transition-colors duration-300"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-blue-500 transition-colors duration-300"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-blue-500 transition-colors duration-300"
                                    >
                                        Policies
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Information */}
                        <div className="flex flex-col items-start">
                            <h3 className="font-semibold mb-2 text-gray-100">
                                Contact Us
                            </h3>
                            <ul className="space-y-1">
                                <li>
                                    Email:{" "}
                                    <a
                                        href="mailto:hello@gmail.com"
                                        className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
                                    >
                                        hello@axcertro.com
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
                                        B-15, Samagi Mw, Randiyagama,
                                        Sooriyawewa, Sri Lanka PV00239879
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter Subscription */}
                        <div className="flex flex-col items-start">
                            <h3 className="font-semibold mb-2 text-gray-100">
                                Newsletter
                            </h3>
                            <p className="text-xs text-gray-400 mb-2">
                                Get the latest updates and news directly to your
                                inbox.
                            </p>
                            <form className="flex w-full">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="p-1 rounded-l-md bg-gray-800 border border-gray-700 text-gray-100 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="p-1 bg-blue-600 text-white rounded-r-md hover:bg-blue-500 transition duration-300">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className="border-t border-gray-700 pt-7 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-xs text-gray-500 mb-2 md:mb-0">
                            &copy; {date.getFullYear()} Axcertro Learn Hub. All
                            rights reserved.
                        </p>
                        <div className="flex space-x-2">
                            <a
                                href="https://www.facebook.com/axcertro"
                                className="hover:text-blue-500"
                            >
                                <FaFacebookF size={18} />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/axcertro/posts/?feedView=all"
                                className="hover:text-blue-500"
                            >
                                <FaLinkedin size={18} />
                            </a>
                            <a
                                href="https://x.com/home"
                                className="hover:text-blue-500"
                            >
                                <FaTwitter size={18} />
                            </a>
                            <a
                                href="https://github.com/axcert"
                                className="hover:text-blue-500"
                            >
                                <FaGithub size={18} />
                            </a>
                            <a
                                href="https://api.whatsapp.com/send/?phone=%2B94775499507&text&type=phone_number&app_absent=0"
                                className="hover:text-blue-500"
                            >
                                <FaWhatsapp size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
