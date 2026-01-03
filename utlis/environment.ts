// utils/environment.ts
export const isVercelProduction = () => {
  // Check for Vercel specific environment variables
  return process.env.VERCEL_ENV === 'production' || 
         process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
};

export const shouldShowSpeedInsights = () => {
  // Only show in Vercel production
  if (isVercelProduction()) return true;
  
  // Optional: Also allow in non-Vercel production if you have a different setup
  if (process.env.NODE_ENV === 'production' && 
      typeof window !== 'undefined' && 
      window.location.hostname !== 'localhost') {
    return true;
  }
  
  return false;
};