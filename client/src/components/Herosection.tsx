import React, { useEffect } from "react";
import { GithubFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import bgImage from "../assets/Background.jpeg";
import ff from "../assets/female_farmer.png";
import mf from "../assets/male_farmer.png";
import { use } from "i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    // <div>
    //     <section
    //         className="flex items-center justify-center h-screen bg-cover bg-center text-white"
    //         style={{ backgroundImage: `url(${bgImage})` }}
    //     >

    //         <div className="bg-white bg-opacity-80 p-8 rounded-lg max-w-4xl w-full text-center">
    //             <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("Welcome to Our Project")}</h1>
    //             <p className="text-lg text-gray-600 mb-8">{t('description', { channel: 'RoadsideCoder' })}</p>
    //             <div className="flex justify-center gap-4">
    //                 <a href="/login" className="bg-orange-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-orange-600 transition duration-300">Login</a>
    //                 <a href="https://github.com/Kris0011/Hackout2024" className="bg-gray-800 text-white py-2 px-6 rounded-lg font-bold hover:bg-gray-700 transition duration-300" target="_blank" rel="noopener noreferrer"><GithubFilled /> View on GitHub</a>
    //             </div>
    //         </div>
    //     </section>
    // </div>

    
    <div>
      <section
        className="relative isolate px-6 pt-14 lg:px-8 flex bg-cover"
        
      >
        
        <div className="mx-auto max-w-4xl l py-32 sm:py-48 lg:pb-56 lg:pt-32">
          <div className="text-center px-10 py-20 h-full w-full bg-gray-900 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm  bg-opacity-50  ">
            <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl">
              Data to enrich your online business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-300"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        ></div>
      </section>
    </div>
  );
};

export default HeroSection;
