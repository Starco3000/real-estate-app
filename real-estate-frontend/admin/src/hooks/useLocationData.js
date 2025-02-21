import { useState, useEffect } from 'react';
import {
  fetchProvinces,
  fetchDistricts,
  fetchWards,
} from '../services/apiService';

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

  const setSelectedProvince = (province) => {
    setQuery((prev) => ({ ...prev, province }));
  };

  const setSelectedDistrict = (district) => {
    setQuery((prev) => ({ ...prev, district, districtCode: district.code }));
  };

  const setSelectedWard = (ward) => {
    setQuery((prev) => ({ ...prev, ward, wardCode: ward.code }));
  };

  return {
    provinces,
    districts,
    wards,
    query,
    setQuery,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedWard,
  };
};

export default useLocationData;
