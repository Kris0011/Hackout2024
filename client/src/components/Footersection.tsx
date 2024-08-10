import React from 'react';
import { GithubFilled } from '@ant-design/icons';

const Footer = () => {
    return (
        <footer className="bg-[#16302B] text-gray-200 py-4 mt-auto">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-2 text-gray-100">Meet the Team</h2>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-gray-100 transition">
                            <GithubFilled className="text-lg mr-2" /> Kris Patel
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-gray-100 transition">
                            <GithubFilled className="text-lg mr-2" /> Naitik Patel
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-gray-100 transition">
                            <GithubFilled className="text-lg mr-2" /> Udit Mehta
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-gray-100 transition">
                            <GithubFilled className="text-lg mr-2" /> Vraj Patel
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-2 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Hackout24. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
