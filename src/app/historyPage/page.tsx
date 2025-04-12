'use client';
import dynamic from 'next/dynamic';

const HistoryContent = dynamic(
  () => import('@/components/history/historyContent'),
  {
    ssr: true,
  }
);

export default function HistoryPage() {
  return <HistoryContent />;
}
