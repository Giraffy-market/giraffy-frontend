'use client';

import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { PopoverClose } from '@radix-ui/react-popover';

import { Button } from '@/ui/button/Button';
import { BaseInput } from '@/ui/inputs';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

import CloseIcon from './assets/close.svg';
import FilterIcon from './assets/filter.svg';
import SearchIcon from './assets/search.svg';

import css from './styles/popover.module.scss';

type ProductFilters = {
  search: string;
  price_from: string;
  price_to: string;
};

export const Filters = () => {
  const { handleSubmit, control, reset } = useForm<ProductFilters>({
    defaultValues: {
      search: '',
      price_from: '',
      price_to: '',
    },
  });

  const onSubmit: SubmitHandler<ProductFilters> = async (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Popover>
        <PopoverTrigger asChild>
          <div className={css.popover_btn__wrapper}>
            <Button
              variant="primary_with_icon"
              text="Фільтра"
              Icon={FilterIcon}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className={css.popover}>
          <div className={css.popover_headers}>
            <span className={css.popover_title}>Фільтра</span>
            <PopoverClose className={css.popover_close__button}>
              <CloseIcon role="img" />
            </PopoverClose>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="search"
              control={control}
              render={({ field }) => (
                <BaseInput {...field} Icon={SearchIcon} iconPosition="left" />
              )}
            />

            <Button
              variant="outline"
              text="Скинути фільтер"
              onClick={() => reset()}
            />
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};
