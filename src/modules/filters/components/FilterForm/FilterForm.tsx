'use client';

import { useEffect } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';

import type { CategoryItem } from '@/modules/categories/types/CategoryItem';
import { categoriesKeys } from '@/modules/header/header-categories/api/useFetchCategories';

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
  const queryClient = useQueryClient();
  const d = queryClient.getQueryData<CategoryItem[]>(categoriesKeys.all);

  const [searchParams, setSearchParams] = useQueryStates({
    search: parseAsString.withDefault(''),
    price_from: parseAsString.withDefault(''),
    price_to: parseAsString.withDefault(''),
    location: parseAsArrayOf(parseAsString).withDefault([]),
    state: parseAsArrayOf(parseAsString).withDefault([]),
    category: parseAsArrayOf(parseAsString).withDefault([]),
  });

  const { watch, control, reset } = useForm<ProductFilters>({
    defaultValues: searchParams,
  });

  useEffect(() => {
    const subscription = watch((values) => {
      setSearchParams(values as ProductFilters);
    });

    return () => subscription.unsubscribe();
  }, [watch, setSearchParams]);

  // Error handled by parent component
  if (!d) return null;

  return (
    <>
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <BaseInput {...field} Icon={SearchIcon} iconPosition="left" />
        )}
      />

      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price">
          <AccordionTrigger>Цiна</AccordionTrigger>
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

      <Accordion type="single" collapsible defaultValue="category">
        <AccordionItem value="category">
          <AccordionTrigger>Категорії</AccordionTrigger>
          <AccordionContent>
            <div className={css.popover_location__content}>
              {d.map(({ category_id, name }) => (
                <Controller
                  key={category_id}
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <CheckBox
                      labelText={name}
                      labelProps={{
                        className: css.popover_checkbox,
                      }}
                      inputProps={{
                        checked: field.value?.includes(name),
                        onChange: (e) => {
                          const checked = e.target.checked;

                          if (checked) {
                            field.onChange([...field.value, name]);
                          } else {
                            field.onChange(
                              field.value.filter((v) => v !== name),
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

      <Button variant="outline" text="Скинути фільтр" onClick={() => reset()} />
    </>
  );
};
