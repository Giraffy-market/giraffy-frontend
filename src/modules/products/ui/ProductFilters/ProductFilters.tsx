'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button/Button';

import styles from './ProductFilters.module.scss';

const CITIES = [
  'Київ',
  'Одеса',
  'Дніпро',
  'Харків',
  'Запоріжжя',
  'Херсон',
  'Львів',
];
const OTHER_CITIES = ['Вінниця', 'Полтава', 'Чернігів', 'Житомир'];

const CATEGORIES = [
  { id: 'house', label: 'Для дому' },
  { id: 'kitchen', label: 'Кухня' },
  { id: 'pets', label: 'Тварини' },
  { id: 'kids', label: 'Дитячі товари' },
  { id: 'hobbies', label: 'Хобі та розваги' },
  { id: 'electronics', label: 'Електроніка' },
  { id: 'clothes', label: 'Одяг та взуття' },
  { id: 'beauty', label: 'Краса та догляд' },
  { id: 'transport', label: 'Транспорт' },
];

export const ProductFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const [openSections, setOpenSections] = useState({
    price: true,
    city: true,
    status: true,
    categories: true,
  });

  const [showAllCities, setShowAllCities] = useState(false);

  useEffect(() => {
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
  }, [searchParams]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const handleStepPrice = (
    name: 'minPrice' | 'maxPrice',
    direction: 'up' | 'down',
  ) => {
    const step = 100;
    const currentVal =
      name === 'minPrice' ? Number(minPrice) : Number(maxPrice);
    const newVal =
      direction === 'up' ? currentVal + step : Math.max(0, currentVal - step);

    if (name === 'minPrice') setMinPrice(String(newVal));
    else setMaxPrice(String(newVal));
  };

  const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(searchParams.toString());

    const selectedCities = formData.getAll('city');
    const selectedCategories = formData.getAll('category');

    params.delete('city');
    selectedCities.forEach((c) => params.append('city', c as string));

    params.delete('category');
    selectedCategories.forEach((cat) =>
      params.append('category', cat as string),
    );

    if (minPrice) params.set('minPrice', minPrice);
    else params.delete('minPrice');
    if (maxPrice) params.set('maxPrice', maxPrice);
    else params.delete('maxPrice');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    setMinPrice('');
    setMaxPrice('');
    router.push(window.location.pathname);
  };

  const displayedCities = showAllCities ? [...CITIES, ...OTHER_CITIES] : CITIES;

  return (
    <aside className={styles.filterSidebar}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Пошук..."
          className={styles.searchInput}
        />
      </div>

      <form onSubmit={handleApply}>
        <div className={styles.section}>
          <div
            className={styles.sectionHeader}
            onClick={() => toggleSection('price')}
          >
            <h3>Ціна</h3>
            <span
              className={`${styles.arrow} ${openSections.price ? styles.up : ''}`}
            />
          </div>
          {openSections.price && (
            <div className={styles.priceInputs}>
              <div className={styles.inputStepper}>
                <input
                  type="number"
                  placeholder="Від"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <div className={styles.stepperControls}>
                  <button
                    type="button"
                    onClick={() => handleStepPrice('minPrice', 'up')}
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStepPrice('minPrice', 'down')}
                  >
                    ▼
                  </button>
                </div>
              </div>
              <div className={styles.inputStepper}>
                <input
                  type="number"
                  placeholder="До"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <div className={styles.stepperControls}>
                  <button
                    type="button"
                    onClick={() => handleStepPrice('maxPrice', 'up')}
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStepPrice('maxPrice', 'down')}
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <div
            className={styles.sectionHeader}
            onClick={() => toggleSection('city')}
          >
            <h3>Місто</h3>
            <span
              className={`${styles.arrow} ${openSections.city ? styles.up : ''}`}
            />
          </div>
          {openSections.city && (
            <div className={styles.checkboxList}>
              {displayedCities.map((city) => (
                <label key={city} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="city"
                    value={city}
                    defaultChecked={searchParams.getAll('city').includes(city)}
                  />
                  <span>{city}</span>
                </label>
              ))}
              <span
                className={styles.showMore}
                onClick={() => setShowAllCities(!showAllCities)}
              >
                {showAllCities ? 'ЗГОРНУТИ' : `ЩЕ ${OTHER_CITIES.length}`}
              </span>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <div
            className={styles.sectionHeader}
            onClick={() => toggleSection('status')}
          >
            <h3>Стан</h3>
            <span
              className={`${styles.arrow} ${openSections.status ? styles.up : ''}`}
            />
          </div>
          {openSections.status && (
            <div className={styles.checkboxList}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="status" value="new" />
                <span>Нове</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="status" value="used" />
                <span>Вживане</span>
              </label>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <div
            className={styles.sectionHeader}
            onClick={() => toggleSection('categories')}
          >
            <h3>Категорії</h3>
            <span
              className={`${styles.arrow} ${openSections.categories ? styles.up : ''}`}
            />
          </div>
          {openSections.categories && (
            <div className={styles.checkboxList}>
              {CATEGORIES.map((cat) => (
                <label key={cat.id} className={styles.checkboxLabel}>
                  <input type="checkbox" name="category" value={cat.id} />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <Button
            text="Застосувати"
            type="submit"
            variant="primary"
            className={styles.applyBtn}
          />
          <Button
            text="Скинути фільтри"
            onClick={handleReset}
            variant="outline"
            className={styles.resetBtn}
          />
        </div>
      </form>
    </aside>
  );
};
