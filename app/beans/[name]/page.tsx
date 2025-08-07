'use client';

import { useParams, useRouter } from 'next/navigation';
import BeanDetail from '../../components/BeanDetail';

export default function BeanDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const beanName = decodeURIComponent(params.name as string);

  const handleBack = () => {
    router.push('/beans');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <BeanDetail beanName={beanName} onBack={handleBack} />
    </div>
  );
} 