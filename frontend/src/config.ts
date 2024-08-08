const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// cloudinary path
export const cldPath = (() => {
  if (isDevelopment) return process.env.CLOUDINARY_NAME;
  if (isProduction) return process.env.CLOUDINARY_NAME;
  return process.env.CLOUDINARY_NAME;
})();
