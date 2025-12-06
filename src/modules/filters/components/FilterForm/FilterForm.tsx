'use client';

import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { useFetchCategories } from '@/modules/header/header-categories/api/useFetchCategories';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion';
import { Button } from '@/ui/button/Button';
import { CheckBox } from '@/ui/checkbox/CheckBox';
import { BaseInput } from '@/ui/inputs';
import { NumberInput } from '@/ui/inputs/numberInput/NumberInput';
import { Loader } from '@/ui/loader/Loader';
import { ToastMessage } from '@/ui/toastMessage/toastMessages';

import css from './styles/filterForm.module.scss';

import SearchIcon from '../../assets/search.svg';

type ProductFilters = {
  search: string;
  price_from: string;
  price_to: string;
  location: string[];
  state: string[];
  category: string[];
};

const LOCATIONS = [
  { id: 1, label: 'Київ' },
  { id: 2, label: 'Одеса' },
  { id: 3, label: 'Днiпро' },
  { id: 4, label: 'Харкiв' },
  { id: 5, label: 'Запорiжжя' },
  { id: 6, label: 'Херсон' },
  { id: 7, label: 'Львiв' },
];

const STATES = [
  { id: 1, label: 'Нове' },
  { id: 2, label: 'Вживане' },
];

export const FilterForm = () => {
  // const { data, isLoading, error } = useFetchCategories();

  const { handleSubmit, control, reset } = useForm<ProductFilters>({
    defaultValues: {
      search: '',
      price_from: '',
      price_to: '',
      location: [],
      state: [],
      category: [],
    },
  });

  // if (isLoading) return <Loader />;
  // if (error || !data)
  //   return <ToastMessage message={error?.detail} type="error" />;

  const onSubmit: SubmitHandler<ProductFilters> = async (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <BaseInput {...field} Icon={SearchIcon} iconPosition="left" />
        )}
      />

      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price">
          <AccordionTrigger>Цена</AccordionTrigger>
          <AccordionContent>
            <div className={css.popover_price__content}>
              <Controller
                name="price_from"
                control={control}
                render={({ field }) => (
                  <NumberInput {...field} placeholder="Вiд" />
                )}
              />
              <Controller
                name="price_to"
                control={control}
                render={({ field }) => (
                  <NumberInput {...field} placeholder="До" />
                )}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible defaultValue="location">
        <AccordionItem value="location">
          <AccordionTrigger>Мiсто</AccordionTrigger>
          <AccordionContent>
            <div className={css.popover_location__content}>
              {LOCATIONS.map(({ id, label }) => (
                <Controller
                  key={id}
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <CheckBox
                      labelText={label}
                      labelProps={{
                        className: css.popover_checkbox,
                      }}
                      inputProps={{
                        checked: field.value?.includes(label),
                        onChange: (e) => {
                          const checked = e.target.checked;

                          console.log(checked);
                          if (checked) {
                            field.onChange([...field.value, label]);
                          } else {
                            field.onChange(
                              field.value.filter((v) => v !== label),
                            );
                          }
                        },
                      }}
                    />
                  )}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible defaultValue="state">
        <AccordionItem value="state">
          <AccordionTrigger>Стан</AccordionTrigger>
          <AccordionContent>
            <div className={css.popover_location__content}>
              {STATES.map(({ id, label }) => (
                <Controller
                  key={id}
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <CheckBox
                      labelText={label}
                      labelProps={{
                        className: css.popover_checkbox,
                      }}
                      inputProps={{
                        checked: field.value?.includes(label),
                        onChange: (e) => {
                          const checked = e.target.checked;

                          console.log(checked);
                          if (checked) {
                            field.onChange([...field.value, label]);
                          } else {
                            field.onChange(
                              field.value.filter((v) => v !== label),
                            );
                          }
                        },
                      }}
                    />
                  )}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* <Accordion type="single" collapsible defaultValue="category">
        <AccordionItem value="category">
          <AccordionTrigger>Категорії</AccordionTrigger>
          <AccordionContent>
            <div className={css.popover_location__content}>
              {data.map(({ category_id, name }) => (
                <Controller
                  key={category_id}
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <CheckBox
                      {...field}
                      labelText={name}
                      labelProps={{
                        className: css.popover_checkbox,
                      }}
                    />
                  )}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}

      <Button
        variant="outline"
        text="Скинути фільтер"
        onClick={() => reset()}
      />
    </form>
  );
};
