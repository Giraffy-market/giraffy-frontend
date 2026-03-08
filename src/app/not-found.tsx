'use client';

import Error from '@/components/ui/loadingErrorPage/LoadingErrorPage';
import Giraffe from '@/components/ui/loadingErrorPage/assets/giraffe.svg';

export default function NotFound() {
  return (
    <Error
      Icon={Giraffe}
      title={['Схоже, цієї сторінки не існує (']}
      description="Або вона вже видалена, або ти потрапив сюди випадково. Не хвилюйся — потрібне можна знайти на головній"
    />
  );
}
