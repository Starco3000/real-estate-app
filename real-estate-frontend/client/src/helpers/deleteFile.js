const deleteFile = async (publicId) => {
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/destroy`;
  
    const data = new FormData();
    data.append('public_id', publicId);
    data.append(
      'api_key',
      `${import.meta.env.VITE_CLOUDINARY_API_KEY}`
    );
    data.append(
      'timestamp',
      Math.floor(Date.now() / 1000)
    );
  
    // Generate a signature using your API secret
    const signature = generateSignature(data);
    data.append('signature', signature);
  
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });
    const responseData = await response.json();
  
    return responseData;
  };
  
  // Function to generate a signature using your API secret
  const generateSignature = (data) => {
    const paramsToSign = new URLSearchParams(data).toString();
    const hash = crypto.createHash('sha1');
    hash.update(paramsToSign + import.meta.env.VITE_CLOUDINARY_API_SECRET);
    return hash.digest('hex');
  };
  
  export { uploadFile, uploadFiles, deleteFile };