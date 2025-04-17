'use client';
import dynamic from 'next/dynamic';

const RestClient = dynamic(() => import('@/components/restClient/RestClient'), {
  ssr: true,
});

export default function RestClientPage() {
  return <RestClient />;
}
