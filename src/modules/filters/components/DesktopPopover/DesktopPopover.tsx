import css from './styles/desktopPopover.module.scss';

import { FilterForm } from '../FilterForm/FilterForm';

export const DesktopPopover = () => {
  return (
    <div className={css.popover}>
      <FilterForm />
    </div>
  );
};
