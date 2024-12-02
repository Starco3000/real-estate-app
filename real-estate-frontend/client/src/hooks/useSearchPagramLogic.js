import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSearchPagramLogic = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const status = searchParams.get('status') || '';
  const address = searchParams.get('address') || '';
  const province = searchParams.get('province') || '';
  const district = searchParams.get('district') || '';
  const ward = searchParams.get('ward') || '';
  const type = searchParams.get('type') || '';
  const bedroom = searchParams.get('bedroom') || '';
  const direction = searchParams.get('direction') || '';
  const sizeCode = searchParams.get('sizeCode') || '';
  const priceCode = searchParams.get('priceCode') || '';

  useEffect(() => {
    setSearchParams({
      status,
      address,
      province,
      district,
      ward,
      type,
      bedroom,
      direction,
      sizeCode,
      priceCode,
      page: currentPage,
    });
  }, [
    status,
    address,
    province,
    district,
    ward,
    type,
    bedroom,
    direction,
    sizeCode,
    priceCode,
    currentPage,
    setSearchParams,
  ]);

  const handlePageChange = (page) => {
    setSearchParams({
      status,
      address,
      province,
      district,
      ward,
      type,
      bedroom,
      direction,
      sizeCode,
      priceCode,
      page,
    });
  };

  return {
    currentPage,
    status,
    address,
    province,
    district,
    ward,
    type,
    bedroom,
    direction,
    sizeCode,
    priceCode,
    handlePageChange,
  };
};

export default useSearchPagramLogic;
