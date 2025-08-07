'use client';

import { useRouter } from 'next/navigation';
import BeansGrid from './BeansGrid';

export default function BeansSection() {
  const router = useRouter();

  const handleBeanSelect = (beanName: string) => {
    router.push(`/beans/${encodeURIComponent(beanName)}`);
  };

  return <BeansGrid onBeanSelect={handleBeanSelect} />;
}