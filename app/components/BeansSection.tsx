'use client';

import { useState } from 'react';
import BeansGrid from './BeansGrid';
import BeanDetail from './BeanDetail';

export default function BeansSection() {
  const [selectedBean, setSelectedBean] = useState<string | null>(null);

  const handleBeanSelect = (beanName: string) => {
    setSelectedBean(beanName);
  };

  const handleBack = () => {
    setSelectedBean(null);
  };

  if (selectedBean) {
    return <BeanDetail beanName={selectedBean} onBack={handleBack} />;
  }

  return <BeansGrid onBeanSelect={handleBeanSelect} />;
}