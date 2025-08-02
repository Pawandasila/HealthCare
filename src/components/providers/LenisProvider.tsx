"use client";
import useLenis from '@/hooks/useLenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  // Initialize Lenis
  useLenis();

  return <>{children}</>;
};

export default LenisProvider;
