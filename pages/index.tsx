import React, { lazy } from 'react';

import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import Image from 'next/image';

const Tools = lazy(() => import('../components/Tools'));


import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';



const Home: NextPage = () => {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2">
      <Head>
      <title>Tracker | All in one Tracking </title>
      <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="w-full grid sm:grid-cols-2 mt-10 gap-10 sm:ml-40 px-4 sm:mt-16">
        
        <div className='sm:mt-16 mt-10'>
          <img
                src="https://tinypixel.pythonanywhere.com/pixel.gif?page=voxlab-landing-page"
              style={{ width: '1px', height: '1px' }}
            />
            <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-5xl">
              
            <span className="relative whitespace-nowrap text-[#333]">
                <span className="relative mr-2">Tracke everything</span>
              </span>
              
            </h1>

            <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-[#333] sm:text-5xl sm:mt-2">
            with a pixel
            </h1>


            <p className="mx-auto sm:mt-5 mt-5 max-w-xl text-lg text-[#333] leading-7">
              Generate high quality datasets for Computer Vision, ASR, Virtual assistants, Chatbots, and content creation.
            </p>

            <div className="flex space-x-4">
              
              <Link
                className="items-center mt-7 justify-center font-medium rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-[#333] border-2 duration-200 focus-visible:ring-black hover:bg-transparent hover:text-black lg:w-auto px-6 py-3 text-center text-white"
                href="https://tally.so/r/m6e6EA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the Waitlist
              </Link>

              {/* <Link
                className="items-center mt-7 justify-center font-medium rounded-xl focus-visible:outline-black focus:outline-none inline-flex bg-[#6a32ee] border-2 duration-200 focus-visible:ring-black hover:bg-transparent hover:border-black hover:text-black lg:w-auto px-6 py-3 text-center text-white"
                href="#Tools"
              >
                Explore Synthetic Datasets
              </Link> */}
            </div>
        </div>

        <div>

        <video
          src="https://uploads-ssl.webflow.com/62fa8255a7287e714931a2ad/62fa85a47f6f589559851bfc_web_white-transcode.mp4"
          width="100%"
          height="auto"
          autoPlay
          loop
          muted
          playsInline
          className="mt-10"
      ></video>
        </div>
      </main>
    </div>
  );
};

export default Home;
