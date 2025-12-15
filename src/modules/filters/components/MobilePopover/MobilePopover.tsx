import { PopoverClose } from '@radix-ui/react-popover';

import { Button } from '@/ui/button/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { ScrollArea } from '@/ui/scroll-area';

import css from './styles/mobilePopover.module.scss';

import CloseIcon from '../../assets/close.svg';
import FilterIcon from '../../assets/filter.svg';
import { FilterForm } from '../FilterForm/FilterForm';

export const MobilePopover = () => {
  return (
    <ScrollArea>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="primary_with_icon"
            text="Фільтра"
            Icon={FilterIcon}
          />
        </PopoverTrigger>
        <PopoverContent className={css.popover}>
          <div className={css.popover_headers}>
            <span className={css.popover_title}>Фільтра</span>
            <PopoverClose className={css.popover_close__button}>
              <CloseIcon role="img" />
            </PopoverClose>
          </div>
          <FilterForm />
        </PopoverContent>
      </Popover>
    </ScrollArea>
  );
};
