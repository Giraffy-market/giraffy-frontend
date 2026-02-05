# 🦒 UseModalManager

Управління статусами модальними вікнами (**welcome, error, sendmessage, successreview, complaint**).

## Структура модуля

- `StatusModal.tsx` — UI компонент (на базі Radix UI Dialog).
- `hooks/useModalManager.ts` — логіка керування станом (open/close).
- `modals/constants.ts` — тексти та конфігурації для кожного типу вікна.
- `styles/StatusModal.module.scss` — адаптивні стилі та кастомні міксини.

## Інструкція з використання

### 1. Додавання або редагування контенту

Усі тексти знаходяться в `modals/constants.ts`. Ви можете змінити існуючі або додати нові ключі:

```typescript
export const MODAL_CONTENTS = {
  welcome: {
    title: 'Вітаємо!',
    description: 'Ви успішно зареєструвалися.',
    buttonText: 'Почати'
  },
  error: {
    title: 'Помилка',
    description: 'Щось пішло не так. Спробуйте ще раз.',
    buttonText: 'Закрити'
  },
};

import { StatusModal, useModalManager, MODAL_CONTENTS } from '@/components/common/UseModalManager';

export const YourComponent = () => {
  const { activeModal, openModal, closeModal } = useModalManager();

  // Отримуємо контент на основі активного ключа
  const current = activeModal ? MODAL_CONTENTS[activeModal] : null;

  return (
    <>
      {/* Приклад виклику різних модалок */}
      <Button onClick={() => openModal('welcome')} text="Тест успіху" />
      <Button onClick={() => openModal('error')} text="Тест помилки" />

      {/* Рендер модалки завжди поза межами Drawer/інших оверлеїв */}
      {current && (
        <StatusModal
          isOpen={!!activeModal}
          onClose={closeModal}
          title={current.title}
          description={current.description}
          buttonText={current.buttonText}
        />
      )}
    </>
  );
};
```
