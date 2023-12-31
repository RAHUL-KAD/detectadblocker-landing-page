// Determines if the user is likely using an ad block extension
async function checkAdBlocker() {
    // Used to cache the result
    let isBlocked;
  
    async function tryRequest() {
      try {
        return fetch(
          new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
            method: 'HEAD',
            mode: 'no-cors'
          }))
          .then(function(response) {
            // Google Ads request succeeded, so likely no ad blocker
            isBlocked = false;
            return isBlocked;
          }).catch(function(e) {
            // Request failed, likely due to ad blocker
            isBlocked = true;
            return isBlocked;
          });
      } catch (error) {
        // fetch API error; possible fetch not supported (old browser)
        // Marking as a blocker since there was an error and so
        // we can prevent continued requests when this function is run
        console.log(error);
        isBlocked = true;
        return isBlocked;
      }
    }
  
    return isBlocked !== undefined ? isBlocked : await tryRequest();
  }
  
  // Using the ad block checker
  const usingBlocker = async function () {
    return await checkAdBlocker();
    }
// Using the ad block checker
usingBlocker().then((res) => { 
    if(res) {
        console.log('AdBlock is enabled');
        
    } else {
   console.log('AdBlock is NOT enabled');
    }
});