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

import LoadingSpinner from "../../components/LoadingSpinner";

import AdblockStats from "../../components/AdblockStats";

export default function Protect() {

  const { isSignedIn, user, isLoaded } = useUser();
  const [dataProcessed, setDataProcessed] = useState(false);
  const [uniqueUserId, setUniqueUserId] = useState('');


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

      }  
      
      // https://chat.openai.com/share/1de43fca-d47d-4f48-99ef-42cf3aa4010d
      // Retrieve the unique_user_id associated with the email
      const { data: newUser } = await supabase
        .from('clerk-users')
        .select('unique_user_id')
        .eq('user_email', userData.user_email);

      if (newUser && newUser.length > 0) {
        setUniqueUserId(newUser[0].unique_user_id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex flex-col">

        <Head>
            <title>Dashboard | Detect ad blocker </title>
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
                      href="/">Detect ad blocker</Link>
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
                {/* <h1 className="text-3xl font-semibold mb-4">Hello {user?.username}!</h1> */}

                {/* <a href="/app/projects?new=true">
                  <button className=" inline-flex relative items-center justify-center font-medium tracking-wide transition duration-100   focus:outline-none whitespace-nowrap   bg-blue-600 hover:bg-blue-700 text-white rounded  h-10 px-6 " type="button">New Project
                  </button>
                </a> */}
              </div>
                  
              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-visible pb-6">
                <a className="bg-white rounded-md border flex flex-col border-gray-300 p-6 w-full shadow-sm hover:shadow-md transition-shadow duration-200 relative group">
                  <h3 className="text-2xl font-semibold pb-3">API Key</h3>
                  <p className="text-gray-600 text-xl">{uniqueUserId}</p>
                </a>
              </div> */}
              
          
          </div>
          
          </div>
          </div>
            {uniqueUserId ? 
              <AdblockStats uniqueUserId={uniqueUserId} />: <LoadingSpinner /> 
          }
          
      </div>
    </main>
  )
}