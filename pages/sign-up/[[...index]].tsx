// "use client";

import { SignUp } from "@clerk/nextjs";
// import { supabase } from "../../lib/supabase";

// import { useUser } from "@clerk/clerk-react";
// import { v4 as uuidv4 } from 'uuid';
// import { useEffect } from 'react';

export default function Page() {

  // const { isSignedIn, user, isLoaded } = useUser();

  // useEffect(() => {
  //   if (isSignedIn && user) {
  //     const fullUuid = uuidv4();
  //     const uniqueId = fullUuid.split('-')[0]; // Extract the first 8 characters

  //     const user_data = {
  //       'unique_user_id': uniqueId,
  //       'user_email': user.emailAddresses[0].emailAddress,
  //       'user_id': user.id,
  //       'user_name': user.username
  //     }
      
  //   }
  // }, [isSignedIn, user]);

  // if (!isLoaded) {
  //   return null;
  // }

  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp />
    </div>
  );
}
