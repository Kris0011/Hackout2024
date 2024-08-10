// src/components/HeroSection.js
import { GithubFilled } from '@ant-design/icons';
import React from 'react';
import bgImage from "../assets/Background.jpeg";

const HeroSection = () => {
    return (
        <section className="relative flex items-center justify-center h-screen bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="absolute inset-0 w-full h-full bg-black bg-opacity-40 z-[-1]" />
            <div className="bg-white bg-opacity-80 p-8 rounded-lg max-w-4xl w-full text-center z-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Project</h1>
                <p className="text-lg text-gray-600 mb-8">Discover the power of our solution and join the community.</p>
                <div className="flex justify-center gap-4">
                    <a href="/login" className="bg-orange-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-orange-600 transition duration-300">Login</a>
                    <a href="https://github.com/Kris0011/Hackout2024" className="bg-gray-800 text-white py-2 px-6 rounded-lg font-bold hover:bg-gray-700 transition duration-300" target="_blank" rel="noopener noreferrer">
                        <GithubFilled /> View on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
