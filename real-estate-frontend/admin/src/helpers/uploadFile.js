const uploadFile = async (file, folder) => {
  const data = new FormData();
  // Định dạng dữ liệu gửi lên server
  data.append('file', file);
  data.append(
    'upload_preset',
    `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`,
  );
  data.append('cloud_name', `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`);
  data.append('folder', folder);

  // Điều chỉnh tham số nén và tối ưu hóa ảnh
  data.append('quality', 'auto'); // Tự động điều chỉnh chất lượng
  data.append('fetch_format', 'auto'); // Tự động chọn định dạng tốt nhất
  data.append('width', '1920'); // Giới hạn chiều rộng tối đa
  data.append('height', '1080'); // Giới hạn chiều cao tối đa
  data.append('crop', 'limit'); // Giới hạn kích thước mà không cắt ảnh

  const url = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/auto/upload`;

  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });
  const responseData = await response.json();

  return responseData;
};

const uploadFiles = async (files, folder) => {
  const uploadPromises = files.map((file) => uploadFile(file, folder));
  const responses = await Promise.all(uploadPromises);
  return responses;
};

export { uploadFile, uploadFiles };
