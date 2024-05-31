// pages/index.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import { useClient } from 'next/client';

const JsonBuilder = dynamic(() => import('../components/JsonBuilder'), { ssr: false });

const HomePage: React.FC = () => {
  useClient(); // Ensure the parent component is a client component
  return (
    <div>
      <JsonBuilder />
    </div>
  );
};

export default HomePage;
