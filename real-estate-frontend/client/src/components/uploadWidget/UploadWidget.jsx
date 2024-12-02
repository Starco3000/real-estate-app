// import { createContext, useCallback, useEffect, useState } from 'react';

// // Create a context to manage the script loading state
// const CloudinaryScriptContext = createContext();

// function UploadWidget({ uwConfig, setState }) {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     // Check if the script is already loaded
//     if (!loaded) {
//       const uwScript = document.getElementById('uw');
//       if (!uwScript) {
//         // If not loaded, create and load the script
//         const script = document.createElement('script');
//         script.setAttribute('async', '');
//         script.setAttribute('id', 'uw');
//         script.src = 'https://upload-widget.cloudinary.com/global/all.js';
//         script.addEventListener('load', () => setLoaded(true));
//         document.body.appendChild(script);
//       } else {
//         // If already loaded, update the state
//         setLoaded(true);
//       }
//     }
//   }, [loaded]);

//   const initializeCloudinaryWidget = useCallback(
//     (event) => {
//       event.preventDefault();
//       if (loaded) {
//         var myWidget = window.cloudinary.createUploadWidget(
//           uwConfig,
//           (error, result) => {
//             if (!error && result && result.event === 'success') {
//               console.log('Done! Here is the image info: ', result.info);
//               setState((prev) => [...prev, result.info.secure_url]);
//             } else if (error) {
//               setState((prev) => [...prev, null]);
//             }
//           },
//         );

//       document.getElementById('upload_widget').addEventListener(
//         'click',
//         function () {
//           myWidget.open();
//         },
//         false,
//       );
//     }
//     },
//     [loaded, uwConfig, setState],
//   );

//   return (
//     <CloudinaryScriptContext.Provider value={{ loaded }}>
//       <button
//         id='upload_widget'
//         className='w-20 h-10 bg-primary text-white text-sm rounded-md'
//         onClick={initializeCloudinaryWidget}
//       >
//         Upload
//       </button>
//     </CloudinaryScriptContext.Provider>
//   );
// }

// export default UploadWidget;
// export { CloudinaryScriptContext };

// import { createContext, useCallback, useEffect, useState, useRef } from 'react';

// // Create a context to manage the script loading state
// const CloudinaryScriptContext = createContext();

// function UploadWidget({ uwConfig, setState }) {
//   const [loaded, setLoaded] = useState(false);
//   const widgetRef = useRef(null);

//   useEffect(() => {
//     // Check if the script is already loaded
//     if (!loaded) {
//       const uwScript = document.getElementById('uw');
//       if (!uwScript) {
//         // If not loaded, create and load the script
//         const script = document.createElement('script');
//         script.setAttribute('async', '');
//         script.setAttribute('id', 'uw');
//         script.src = 'https://upload-widget.cloudinary.com/global/all.js';
//         script.addEventListener('load', () => setLoaded(true));
//         document.body.appendChild(script);
//       } else {
//         // If already loaded, update the state
//         setLoaded(true);
//       }
//     }
//   }, [loaded]);

//   const initializeCloudinaryWidget = useCallback(
//     (event) => {
//       event.preventDefault();
//       if (loaded && !widgetRef.current) {
//         widgetRef.current = window.cloudinary.createUploadWidget(
//           uwConfig,
//           (error, result) => {
//             if (!error && result && result.event === 'success') {
//               console.log('Done! Here is the image info: ', result.info);
//               setState((prev) => [...prev, result.info.secure_url]);
//             } else if (error) {
//               setState((prev) => [...prev, null]);
//             }
//           },
//         );
//       }

//       if (widgetRef.current) {
//         widgetRef.current.open();
//       }
//     },
//     [loaded, uwConfig, setState],
//   );

//   return (
//     <CloudinaryScriptContext.Provider value={{ loaded }}>
//       <button
//         type='button'
//         id='upload_widget'
//         className='w-20 h-10 bg-primary text-white text-sm rounded-md'
//         onClick={initializeCloudinaryWidget}
//       >
//         Upload
//       </button>
//     </CloudinaryScriptContext.Provider>
//   );
// }

// export default UploadWidget;
// export { CloudinaryScriptContext };

import { createContext, useCallback, useEffect, useState, useRef } from 'react';

const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setState }) {
  const [loaded, setLoaded] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    // Use dynamic import for better performance
    const loadCloudinaryScript = () => {
      return new Promise((resolve, reject) => {
        if (window.cloudinary) {
          resolve(window.cloudinary);
          setLoaded(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.async = true;
        script.defer = true;

        script.onload = () => {
          setLoaded(true);
          resolve(window.cloudinary);
        };

        script.onerror = (error) => {
          reject(error);
          console.error('Cloudinary script failed to load', error);
        };

        document.body.appendChild(script);
      });
    };

    loadCloudinaryScript().catch(console.error);

    // Cleanup function to remove script if component unmounts
    return () => {
      const existingScript = document.querySelector('script[src="https://upload-widget.cloudinary.com/global/all.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const initializeCloudinaryWidget = useCallback(
    (event) => {
      event.preventDefault();
      if (loaded && window.cloudinary && !widgetRef.current) {
        widgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === 'success') {
              setState((prev) => [...prev, result.info.secure_url]);
            } else if (error) {
              setState((prev) => [...prev, null]);
              console.error('Upload error:', error);
            }
          }
        );
      }

      if (widgetRef.current) {
        widgetRef.current.open();
      }
    },
    [loaded, uwConfig, setState]
  );

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        type='button'
        id='upload_widget'
        className='w-20 h-10 bg-primary text-white text-sm rounded-md'
        onClick={initializeCloudinaryWidget}
        disabled={!loaded}
      >
        {loaded ? 'Upload' : 'Loading...'}
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
