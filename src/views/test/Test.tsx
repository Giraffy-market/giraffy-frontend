'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Categories } from '@/modules/categories';
import { Products } from '@/modules/products';

import { Slider } from '@/components/common/Slider';

import { client } from '@/shared/api/client';

import './Test.scss';

const Test = () => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 10000);
  });

  return (
    <div className="home-page">
      <div className="home-page__content">
        {isVisible && <TestCategories />}
      </div>
    </div>
  );
};

export default Test;

const TestCategories = () => {
  const { data, isLoading } = useQuery({
    staleTime: 2000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // gcTime: 5 * 1000,
    queryKey: ['categories'],
    queryFn: () => client.GET('/categories'),
  });

  //   if (isLoading) {
  //     return <div>Загрузка категорий...</div>;
  //   }
  console.log('API Response:', data);

  const categoriesList = data?.data || [];
  return (
    <div>
      <ul>
        {categoriesList?.map((category) => (
          <li key={category.category_id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};
