import React, { useEffect, useState } from 'react';


export default function Track(){

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
    const [adblockDetectionComplete, setAdblockDetectionComplete] = useState(false);

    useEffect(() => {
        const detectAdBlock = async () => {
        const urls = [
            'https://pagead2.googlesyndication.com/pagead/show_ads.js', 'https://googleads.g.doubleclick.net/pagead/id', 'https://static.doubleclick.net/instream/ad_status.js',
            'https://imasdk.googleapis.com/js/sdkloader/ima3.js', 'https://static.ads-twitter.com/uwt.js', '||us-u.openx.net^',
            '||pagead2.googlesyndication.com^*/pagead/js/*/show_ads_impl.js', '||pagead2.googlesyndication.com^*/pagead/osd.js',
            '||adserver.adtechus.com^*/adiframe/*', '||bid.g.doubleclick.net^*/adview?', '||googleads.g.doubleclick.net^*/pagead/ads?', '||googleads.g.doubleclick.net^*/pagead/lvz?',
        ];

            let blocked = false;

                for (let i = 0; i < urls.length; i++) {
                    const url = urls[i];
                    try {
                        await fetch(new Request(url), { mode: 'no-cors' });
                    } catch (e) {
                        blocked = true;
                        break; // Exit the loop early if adblock is detected
                    }
                }

                setAdsBlocked(blocked);
                setAdblockDetectionComplete(true);
            };

        detectAdBlock();
    }, []);

    const [deviceType, setDeviceType] = useState('Unknown');
    const [osName, setOsName] = useState('Unknown');
    const [country, setCountry] = useState('Unknown'); // Add state for country
    const [city, setCity] = useState('Unknown');
    const [region, setRegion] = useState('Unknown');

    useEffect(() => {
        if (adblockDetectionComplete) {
            // Define the query parameters for adblock and cookies
            console.log('adblocked', adsBlocked);
            console.log('cookie', cookieSupport);

            
            const queryParams = new URLSearchParams();
            queryParams.append('adblock', adsBlocked.toString());
            queryParams.append('cookies', cookieSupport !== null ? cookieSupport.toString() : 'false');
            const apiKey = process.env.NEXT_PUBLIC_DETECT_AD_BLOCKER_API_KEY
            if (apiKey) {
              queryParams.append('apiKey', apiKey);
            }


            // Create the URL with query parameters
            const apiUrl = `https://fine-gray-horse-tux.cyclic.app/getDeviceInfo?${queryParams.toString()}`;

            // Make a request to your Express API using node-fetch
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    const { deviceType, osName, country, city, region } = data;
                    setDeviceType(deviceType);
                    setOsName(osName);
                    setCountry(country); // Set the country state
                    setCity(city);
                    setRegion(region);
                    console.log(data);
                })
                .catch((error) => {
                    console.error('API Request Error:', error);
                });
        }
    }, [adsBlocked, adblockDetectionComplete]);


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
                                
                                    <p>{deviceType}</p>
                                
                            </div>
                        </div>

                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl  dark:bg-gray-800 dark:border-gray-700">
                                                
                            <a>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">OS</h5>
                            </a>
                            <div>
                                
                                    <p>{osName}</p>
                                
                            </div>
                        </div>
                        
                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                            
                            <a>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Location</h5>
                            </a>
                            <div>
                                
                                    <p>{city}, {region}, {country}</p>
                                
                            </div>
                        </div>

                    </div>
                </div>
                    
                </div>
            </div>

        </section>
    )
}
