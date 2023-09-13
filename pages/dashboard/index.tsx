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

        // console.log('User added:', userData);

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
    </main>
  )
}