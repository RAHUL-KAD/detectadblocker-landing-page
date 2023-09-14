"use client";

import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import Head from "next/head";
import { useEffect, useState } from 'react';

import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";

// supabase import from lib
import { supabase } from "../../lib/supabase";

export default function Protect() {

  const { isSignedIn, user, isLoaded } = useUser();
  const [dataProcessed, setDataProcessed] = useState(false);

  useEffect(() => {
    if (isSignedIn && user && isLoaded && !dataProcessed) {
      const fullUuid = uuidv4();
      const uniqueId = fullUuid.split('-')[0]; // Extract the first 8 characters

      const user_data = {
        unique_user_id: uniqueId,
        user_email: user.emailAddresses[0].emailAddress,
        user_id: user.id,
        user_name: user.username
      };

      // console.log("user data:", user_data)
      checkAndAddUser(user_data);
      setDataProcessed(true);
    }
  }, [isSignedIn, user, isLoaded, dataProcessed]);

  // if (!isLoaded) {
  //   return null;
  // }

  async function checkAndAddUser(userData: any) {
    try {
      const { data: existingUser, error } = await supabase
        .from('clerk-users')
        .select()
        .eq('user_email', userData.user_email);

      if (error) throw error;

      if (!existingUser || existingUser.length === 0) {
        const { data, error: insertError } = await supabase
          .from('clerk-users')
          .insert([userData]);

        if (insertError) throw insertError;

        console.log('User added to database');

      } else {
        console.log('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex flex-col">

        <Head>
            <title>Dashboard | pixelmark </title>
            <link rel="icon" href="/favicon.svg" />
        </Head>
      <header>
        <div>
          <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 ">

            <div className="flex flex-1 items-center justify-end md:justify-between mt-10">
              <nav aria-label="Global" className="hidden md:block">
                
                <ul className="flex items-center gap-6 text-sm">
                  <Image
                      alt="header text"
                      src="/favicon.svg"
                      className="sm:w-8 sm:h-8 w-10 h-10"
                      width={8}
                      height={8}
                  />
                  <li>
                    <Link
                      className="text-gray-900 text-2xl font-bold transition hover:text-gray-500/75"
                      href="/">Api4all</Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/">Documentation</Link> 
                  </li>
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/">Support</Link>
                  </li>
                  
                </ul>
              </nav>
              
              <div className="flex items-center gap-4">
                <UserButton afterSignOutUrl="/"/>
              </div>
            </div>



          </div>

          <div>
            <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 border-t-0 mt-5" />
          </div>
        </div>
      </header>

      <div className="flex max-w-6xl mx-auto flex-col items-center justify-center">
          <div>
          <div className="flex w-full gap-6 pt-4 pb-12">
            <div className="mx-auto max-w-5xl w-full space-y-4 flex flex-col">
              <div className="flex flex-row justify-between mt-4">
                <h1 className="text-3xl font-semibold mb-4">Hello {user?.username}!</h1>

                {/* <a href="/app/projects?new=true">
                  <button className=" inline-flex relative items-center justify-center font-medium tracking-wide transition duration-100   focus:outline-none whitespace-nowrap   bg-blue-600 hover:bg-blue-700 text-white rounded  h-10 px-6 " type="button">New Project
                  </button>
                </a> */}
              </div>
                  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 overflow-visible pb-6">
                <a className="bg-white rounded-md border flex flex-col border-gray-300 p-6 w-full shadow-sm hover:shadow-md transition-shadow duration-200 relative group">
                  <h3 className="text-xl font-semibold pb-3">API Key</h3>
                  <p className="text-gray-600">Using models</p>
                <div className="flex-1"></div><p className="text-gray-600 text-sm">No creation date</p></a></div>

          <div className="flex flex-row justify-between"><h1 className="text-4xl font-semibold mb-4">Get started</h1></div><div className="flex-1 overflow-hidden  "><div className="bg-white w-full p-6 rounded-md border-2 border-gray-100"><div className=""><h2 className="text-xl  mb-1 font-semibold ">What do you want to do?</h2><p className="text-gray-500">Get started in one click with a project preset.</p></div><div className="-mx-1 "><div className="grid grid-cols-1 md:grid-cols-2  mt-6 -mx-6 -mb-6 border-t border-gray-100"><div className="p-6 group flex-col flex relative w-full border-gray-100 border cursor-pointer  "><div><div className="bg-green-200 w-14 h-14 rounded-md text-green-500 items-center justify-center flex mb-4"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg></div><h3 className="text-lg font-semibold mb-2">Detect Personal Identifiable Information</h3><p>Detect and remove addresses, emails, phone numbers, social security numbers, and other sensitive data from text.</p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 text-gray-400 absolute top-3 right-3 group-hover:opacity-100 opacity-0 transition-opacity"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg></div></div><div className="p-6 group flex-col flex relative w-full border-gray-100 border cursor-pointer  "><div><div className="bg-rose-200 w-14 h-14 rounded-md text-rose-500 items-center justify-center flex mb-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path></svg></div><h3 className="text-lg font-semibold mb-2">Detect Sentiment</h3><p>Detect positive, negative, and neutral sentiment in text.</p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 text-gray-400 absolute top-3 right-3 group-hover:opacity-100 opacity-0 transition-opacity"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg></div></div><div className="p-6 group flex-col flex relative w-full border-gray-100 border cursor-pointer  "><div><div className="bg-amber-200 w-14 h-14 rounded-md text-amber-500 items-center justify-center flex mb-4"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path></svg></div><h3 className="text-lg font-semibold mb-2">Detect Toxicity &amp; NSFW</h3><p>Detect toxic content like racism, threats, profanity, or sensitive topics.</p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 text-gray-400 absolute top-3 right-3 group-hover:opacity-100 opacity-0 transition-opacity"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg></div></div><div className="p-6 group flex-col flex relative w-full border-gray-100 border cursor-pointer  "><div><div className="bg-teal-200 w-14 h-14 rounded-md text-teal-500 items-center justify-center flex mb-4"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg></div><h3 className="text-lg font-semibold mb-2">Check for Quality &amp; Spam</h3><p>Make sure that content is substantial and without spelling errors. Detect promotional spam or nonsensical content.</p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 text-gray-400 absolute top-3 right-3 group-hover:opacity-100 opacity-0 transition-opacity"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg></div></div><a className="p-6 group flex-col flex cursor-pointer relative w-full border-gray-100 border" href="/app/models"><div><div className="bg-purple-200  w-14 h-14 rounded-md text-purple-500 items-center justify-center flex mb-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path fillRule="evenodd" d="M11.622 1.602a.75.75 0 01.756 0l2.25 1.313a.75.75 0 01-.756 1.295L12 3.118 10.128 4.21a.75.75 0 11-.756-1.295l2.25-1.313zM5.898 5.81a.75.75 0 01-.27 1.025l-1.14.665 1.14.665a.75.75 0 11-.756 1.295L3.75 8.806v.944a.75.75 0 01-1.5 0V7.5a.75.75 0 01.372-.648l2.25-1.312a.75.75 0 011.026.27zm12.204 0a.75.75 0 011.026-.27l2.25 1.312a.75.75 0 01.372.648v2.25a.75.75 0 01-1.5 0v-.944l-1.122.654a.75.75 0 11-.756-1.295l1.14-.665-1.14-.665a.75.75 0 01-.27-1.025zm-9 5.25a.75.75 0 011.026-.27L12 11.882l1.872-1.092a.75.75 0 11.756 1.295l-1.878 1.096V15a.75.75 0 01-1.5 0v-1.82l-1.878-1.095a.75.75 0 01-.27-1.025zM3 13.5a.75.75 0 01.75.75v1.82l1.878 1.095a.75.75 0 11-.756 1.295l-2.25-1.312a.75.75 0 01-.372-.648v-2.25A.75.75 0 013 13.5zm18 0a.75.75 0 01.75.75v2.25a.75.75 0 01-.372.648l-2.25 1.312a.75.75 0 11-.756-1.295l1.878-1.096V14.25a.75.75 0 01.75-.75zm-9 5.25a.75.75 0 01.75.75v.944l1.122-.654a.75.75 0 11.756 1.295l-2.25 1.313a.75.75 0 01-.756 0l-2.25-1.313a.75.75 0 11.756-1.295l1.122.654V19.5a.75.75 0 01.75-.75z" clipRule="evenodd"></path></svg></div><h3 className="text-lg font-semibold mb-2">Create a Custom Model or AI Agent</h3><p>Easily create your own custom model or AI agent to detect whatever you need.</p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 text-gray-400 absolute top-3 right-3 group-hover:opacity-100 opacity-0 transition-opacity"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg></div></a><div className="p-6 group flex-col flex relative w-full border-gray-100 border cursor-pointer  "><div><div className="bg-indigo-200 w-14 h-14 rounded-md text-indigo-500 items-center justify-center flex mb-4"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path></svg></div><h3 className="text-lg font-semibold mb-2">Start a Blank Project</h3><p>Want to experiment with all the different models? <br/>Start a blank project and add the models you need.</p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-8 h-8 text-gray-400 absolute top-3 right-3 group-hover:opacity-100 opacity-0 transition-opacity"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path></svg></div></div></div></div></div></div></div></div>
          </div>
      </div>
    </main>
  )
}