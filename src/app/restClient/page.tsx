'use client';
import dynamic from 'next/dynamic';

const RestClient = dynamic(() => import('@/components/restClient/RestClient'), {
  ssr: false,
});

export default function RestClientPage() {
  return <RestClient />;
}
