export const fetchProvinces = async () => {
  try {
    const response = await fetch('https://provinces.open-api.vn/api/p/');
    if (!response.ok) {
      throw new Error('Failed to fetch provinces');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

export const fetchDistricts = async (provinceCode) => {
  try {
    const response = await fetch(
      `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch districts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

export const fetchWards = async (districtCode) => {
  try {
    const response = await fetch(
      `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch wards');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching wards:', error);
    throw error;
  }
};
