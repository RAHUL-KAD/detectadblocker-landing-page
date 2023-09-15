import React, { useEffect, useState } from 'react';


export default function Track(){

    const [message, setMessage] = useState('');
  
    async function checkAdBlocker() {
      try {
        await fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", { method: 'HEAD', mode: 'no-cors' });
        setMessage('Adblocker is not detected.');
      } catch (error) {
        console.log(error);
        setMessage('Adblocker is detected.');
      }
    }
  
    useEffect(() => {
      checkAdBlocker();
    }, []);

    // This is to get the user device and other info
    const [userAgent, setUserAgent] = useState<string>('');
    const [apiResponse, setApiResponse] = useState<any | null>(null); // Type `any` can be improved based on the API response structure
  
    useEffect(() => {
      const userAgentString: string = window.navigator.userAgent;
      setUserAgent(userAgentString);
  
      // Create the URL with the user agent
      const apiUrl = `https://api.apicagent.com/?ua=${encodeURIComponent(userAgentString)}`;
  
      // Make a GET request to the API
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setApiResponse(data);
        //   console.log(data);
        })
        .catch((error) => {
          console.error('API Request Error:', error);
        });
    }, []);

      // Extract device-type and os-name from the API response
    const deviceType = apiResponse?.device?.type || 'Unknown';
    const osName = apiResponse?.os?.name || 'Unknown';


    // detect if cookies are disabled or not
    const [cookieSupport, setCookieSupport] = useState<boolean | null>(null);

    useEffect(() => {
      const testCookieName = 'testCookie';
  
      // Try to set a test cookie
      document.cookie = `${testCookieName}=1`;
  
      // Check if the test cookie was successfully set
      const cookieExists = document.cookie.indexOf(testCookieName) !== -1;
  
      // Delete the test cookie
      document.cookie = `${testCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  
      // Set the cookie support state
      setCookieSupport(cookieExists);
    });

    const [adsBlocked, setAdsBlocked] = useState(false);

    useEffect(() => {
        const detectAdBlock = async () => {
        const urls = [
            'https://pagead2.googlesyndication.com/pagead/show_ads.js',
            'https://googleads.g.doubleclick.net/pagead/id',
            'https://static.doubleclick.net/instream/ad_status.js',
            'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
            'https://static.ads-twitter.com/uwt.js',
            '||us-u.openx.net^',
            '||pagead2.googlesyndication.com^*/pagead/js/*/show_ads_impl.js',
            '||pagead2.googlesyndication.com^*/pagead/osd.js',
            '||adserver.adtechus.com^*/adiframe/*',
            '||bid.g.doubleclick.net^*/adview?',
            '||googleads.g.doubleclick.net^*/pagead/ads?',
            '||googleads.g.doubleclick.net^*/pagead/lvz?',
        ];

        for (let i = 0; i < urls.length; i++) {
            setAdsBlocked(false);
            const url = urls[i];
            try {
            await fetch(new Request(url), { mode: 'no-cors' }).catch((error) => {
                // no-cors mode doesn't allow you to have response data, but we don't need it for adblock detection
                setAdsBlocked(true);
            });
            } catch (e) {
            setAdsBlocked(true);
            }
            if (adsBlocked) {
            // Adblock detected
            return;
            }
        }
        };

        detectAdBlock();
    }, []);

    return (
        <section
            id='api' className="md:pt-5 pb-10 mt-28"
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto md:text-center">

                    <h1 className="mx-auto max-w-4xl font-display text-xl font-bold tracking-normal text-[#333] sm:text-4xl flex items-center justify-center">
                        See it in action
                    </h1>
                </div>

                

                <div className="flex-1 overflow-hidden mt-5">
                    <div className="bg-white w-full p-6 rounded-md border-2 border-gray-200">
                        <div className="">
                            {/* <h2 className="text-xl  mb-1 font-semibold ">{message}</h2> */}
                        </div>

                        
                        <div>
                        {adsBlocked ? (
                            <p className='text-xl  mb-1 font-semibold'>Ads are disabled.</p>
                        ) : (
                            <p className='text-xl  mb-1 font-semibold'>Ads are not disabled.</p>
                        )}
                        </div>

                        <div>
                            {cookieSupport ? (
                                <p className='text-xl  mb-1 font-semibold'>Cookies are supported in this browser.</p>
                            ) : (
                                <p className='text-xl  mb-1 font-semibold'>Cookies are not supported in this browser.</p>
                            )}
                        </div>

                        
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">

                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                                                
                            <a>
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Device Type</h5>
                            </a>
                            <div>
                                {apiResponse && (
                                    <p>{deviceType}</p>
                                )}
                            </div>
                        </div>

                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl  dark:bg-gray-800 dark:border-gray-700">
                                                
                            <a>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">OS</h5>
                            </a>
                            <div>
                                {apiResponse && (
                                    <p>{osName}</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                            
                            <a>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Location</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">India</p>
                            
                        </div>

                </div>
                    </div>

                    
                </div>
            </div>

        </section>
    )
}
