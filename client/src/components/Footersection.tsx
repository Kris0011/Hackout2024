import React from 'react';
import { FacebookFilled, TwitterSquareFilled, LinkedinFilled, GithubFilled } from '@ant-design/icons';

const Footer = () => {
    return (
        <footer className="bg-[#16302B] text-gray-200 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:justify-between gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-100">About Us</h2>
                        <p className="text-gray-400">
                            Our full-stack project, developed for a hackathon, features advanced tools to enhance agricultural practices. 
                            Explore our Crop Prediction, Plant Disease Prediction, Pesticide Suggestions, and Crop Bidding facilities to 
                            support informed decision-making for farmers and stakeholders.
                        </p>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-100">Quick Links</h2>
                        <ul className="space-y-3">
                            <li><a href="/" className="text-gray-300 hover:text-gray-100 transition">Home</a></li>
                            <li><a href="/features" className="text-gray-300 hover:text-gray-100 transition">Features</a></li>
                            <li><a href="/about" className="text-gray-300 hover:text-gray-100 transition">About</a></li>
                            <li><a href="/contact" className="text-gray-300 hover:text-gray-100 transition">Contact</a></li>
                        </ul>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-3xl font-semibold mb-4 text-gray-100">Meet the Team</h2>
                        <p className="text-gray-400 mb-4">We are a passionate team committed to leveraging technology for better agricultural solutions.</p>
                        <div className="flex flex-col gap-2">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-gray-100 transition">
                                <GithubFilled className="text-2xl mr-3" /> Kris Patel
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-gray-100 transition">
                                <GithubFilled className="text-2xl mr-3" /> Naitik Patel
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-gray-100 transition">
                                <GithubFilled className="text-2xl mr-3" /> Udit Mehta
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-gray-100 transition">
                                <GithubFilled className="text-2xl mr-3" /> Vraj Patel
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Hackout24. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
