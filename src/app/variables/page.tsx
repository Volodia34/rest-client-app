'use client';
import dynamic from 'next/dynamic';

const Variables = dynamic(() => import('@/components/variables/variables'), {
  ssr: true,
});

export default function VariablesPage() {
  return <Variables />;
}
