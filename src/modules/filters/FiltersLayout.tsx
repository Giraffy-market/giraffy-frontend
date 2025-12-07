import { DesktopPopover } from './components/DesktopPopover/DesktopPopover';
import { MobilePopover } from './components/MobilePopover/MobilePopover';

import css from './styles/filtersLayout.module.scss';

export const FiltersLayout = () => {
  return (
    <>
      <div className={css.mobile_popover}>
        <MobilePopover />
      </div>
      <div className={css.desktop_popover}>
        <DesktopPopover />
      </div>
    </>
  );
};
