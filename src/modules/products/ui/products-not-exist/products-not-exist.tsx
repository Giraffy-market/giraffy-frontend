import css from './products-not-exist.module.scss';

export const ProductsNotExist = () => {
  return (
    <div className={css.wrapper}>
      <span className={css.wrapper_text}>Товарів не знайдено</span>
    </div>
  );
};
