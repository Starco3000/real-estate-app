// import { useState, useEffect } from 'react';
// import {
//   fetchDistricts,
//   fetchProvinces,
//   fetchWards,
// } from '../services/apiService';

// export const useLocationData = () => {
//   const [provinces, setProvinces] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [wards, setWards] = useState([]);
//   const [selectedProvince, setSelectedProvince] = useState(null);
//   const [selectedDistrict, setSelectedDistrict] = useState(null);
//   const [selectedWard, setSelectedWard] = useState(null);

//   // Fetch provinces
//   useEffect(() => {
//     const getProvinces = async () => {
//       try {
//         const data = await fetchProvinces();
//         setProvinces(data);
//       } catch (error) {
//         console.error('Error fetching provinces:', error);
//       }
//     };
//     getProvinces();
//   }, []);

//   // Fetch districts when a province is selected
//   useEffect(() => {
//     const getDistricts = async () => {
//       if (selectedProvince && selectedProvince.code) {
//         try {
//           const data = await fetchDistricts(selectedProvince.code);
//           setDistricts(data.districts);
//           setSelectedDistrict(null); // Reset selected district
//           setSelectedWard(null); // Reset selected ward
//           setWards([]); // Reset wards when province changes
//         } catch (error) {
//           console.error('Error fetching districts:', error);
//         }
//       } else {
//         setDistricts([]);
//         setWards([]);
//         setSelectedDistrict(null); // Reset selected district
//         setSelectedWard(null); // Reset selected ward
//       }
//     };
//     getDistricts();
//   }, [selectedProvince]);

//   // // Fetch wards when a district is selected
//   useEffect(() => {
//     const getWards = async () => {
//       if (selectedDistrict && selectedDistrict.code) {
//         try {
//           const data = await fetchWards(selectedDistrict.code);
//           setWards(data.wards);
//           setSelectedWard(null); // Reset selected ward when district changes
//         } catch (error) {
//           console.error('Error fetching wards:', error);
//         }
//       } else {
//         setWards([]);
//       }
//     };
//     getWards();
//   }, [selectedDistrict]);

//   return {
//     provinces,
//     districts,
//     wards,
//     selectedProvince,
//     selectedDistrict,
//     selectedWard,
//     setSelectedProvince,
//     setSelectedDistrict,
//     setSelectedWard,
//   };
// };


import { useState, useEffect } from 'react';
import { fetchProvinces, fetchDistricts, fetchWards } from '../services/apiService'; // Adjust the import path as needed

const useLocationData = (initialQuery = {}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const data = await fetchProvinces();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    getProvinces();
  }, []);

  useEffect(() => {
    const getDistricts = async () => {
      if (query.province && query.province.code) {
        try {
          const data = await fetchDistricts(query.province.code);
          setDistricts(data.districts);
          setQuery((prev) => ({ ...prev, district: null, ward: null }));
          setWards([]); // Reset wards when province changes
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      } else {
        setDistricts([]);
        setWards([]);
        setQuery((prev) => ({ ...prev, district: null, ward: null }));
      }
    };
    getDistricts();
  }, [query.province]);

  useEffect(() => {
    const getWards = async () => {
      if (query.district && query.district.code) {
        try {
          const data = await fetchWards(query.district.code);
          setWards(data.wards);
          setQuery((prev) => ({ ...prev, ward: null }));
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      } else {
        setWards([]);
        setQuery((prev) => ({ ...prev, ward: null }));
      }
    };
    getWards();
  }, [query.district]);

  return {
    provinces,
    districts,
    wards,
    query,
    setQuery,
    setSelectedProvince: (value) => setQuery((prev) => ({ ...prev, province: value })),
    setSelectedDistrict: (value) => setQuery((prev) => ({ ...prev, district: value })),
    setSelectedWard: (value) => setQuery((prev) => ({ ...prev, ward: value })),
  };
};

export default useLocationData;