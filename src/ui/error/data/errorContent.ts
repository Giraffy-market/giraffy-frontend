import GiraffeEating from '../assets/giraffe-eating.svg';
import Giraffe from '../assets/giraffe.svg';

import { ErrorContent } from '../shared/types/ErrorContent';

export const errorContent: ErrorContent = {
  '404': {
    titleLines: ['Схоже, цієї сторінки не існує ('],
    description:
      'Або вона вже видалена, або ти потрапив сюди випадково. Не хвилюйся — потрібне можна знайти на головній',

    Icon: GiraffeEating,
    showUpdateButton: false,
  },
  '500': {
    titleLines: ['Технічні труднощі'],
    description:
      'Тимчасові проблеми на сервері. Команда вже працює над вирішенням',
    Icon: GiraffeEating,
    showUpdateButton: true,
  },
  network: {
    titleLines: ['Упс!', 'Щось пішло не так'],
    description:
      'Схоже, виникла неочікувана помилка. Ми вже знаємо про це й працюємо над виправленням',
    Icon: Giraffe,
    showUpdateButton: true,
  },
  unknown: {
    titleLines: ['Невідома помилка'],
    description: 'Щось пішло не так, але ми вже працюємо над цим',
    Icon: Giraffe,
    showUpdateButton: true,
  },
};
