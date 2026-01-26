import React from 'react';

export const data = [
  {
    image: 1,
    content: (
      <>
        <p>
          <span className="about_text__title">Giraffy</span> — це сучасний
          український маркетплейс, що дає речам друге життя.
        </p>
        <p>
          Ми створюємо простий і зручний простір, у якому кожен може{' '}
          <span style={{ fontWeight: '600' }}>
            продати, обміняти або подарувати
          </span>{' '}
          те, що більше не використовує, і знайти щось потрібне — швидко,
          безпечно й вигідно.
        </p>
        <div>
          <p>Giraffy поєднує:</p>

          <ul className="about_text__nested-list">
            <li>
              <span style={{ fontWeight: '600' }}>Екологію</span> — замість
              викидати, речі знаходять нових власників.
            </li>
            <li>
              <span style={{ fontWeight: '600' }}>Економію</span> — допомагаємо
              купувати вигідно та продавати швидко.
            </li>
            <li>
              <span style={{ fontWeight: '600' }}>Обмін</span> — платформа для
              реюзу, дарування й продажу.
            </li>
          </ul>
        </div>
        <p>
          Giraffy створено в Україні, для українців. Ми підтримуємо локальну
          спільноту, екосвідоме споживання і взаємопідтримку в часи змін.У
          майбутньому на платформі з’являться AI-асистент для створення
          оголошень та система гейміфікації, що мотивуватиме користувачів
          отримувати бонуси за активність.
        </p>
        <p>
          Giraffy — це не просто маркетплейс, це спільнота людей, які дбають про
          речі, планету і одне одного.
        </p>
      </>
    ),
  },
  {
    image: 2,
    isReversed: true,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p className="about_text__title">Наша місія</p>

          <p>
            Ми хочемо змінити ставлення до споживання: допомогти людям позбутись
            зайвого, заощадити кошти, і водночас зробити свій внесок у{' '}
            <span style={{ fontWeight: '600' }}>
              чистішу, екологічну Україну.
            </span>
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p className="about_text__title">Для кого ми створені:</p>

          <ul className="about_text__nested-list">
            <li>
              Для тих, хто після переїздів або змін у житті хоче навести лад у
              просторі.
            </li>
            <li>
              Для родин, студентів і переселенців, яким важливо купувати
              розумно.
            </li>
            <li>
              Для тих, хто шукає зручний спосіб продавати — без зайвих кроків і
              нервів.
            </li>
            <li>
              Для всіх, хто хоче{' '}
              <span style={{ fontWeight: '600' }}>
                підтримати своїх і купувати у своїх.
              </span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    image: 3,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p className="about_text__title">Наш підхід</p>
          <p>
            Мінімум складнощів — максимум користі.Усе побудовано навколо
            простоти: створити оголошення можна за{' '}
            <span style={{ fontWeight: '600' }}>три кроки</span>, а система
            підкаже, що і як заповнити.Giraffy — це не просто маркетплейс, це{' '}
            <span style={{ fontWeight: '600' }}>дружня екосистема</span>, де
            покупки й продажі стають частиною гри, свідомості та
            взаємопідтримки.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p className="about_text__title">Ми ще ростемо </p>
          <p>
            Наша команда створює{' '}
            <span style={{ fontWeight: '600' }}>MVP-версію</span> платформи,
            тестує функціонал і збирає відгуки, щоб зробити Giraffy ще зручнішим
            і кориснішим для вас.Якщо маєте ідеї чи бажаєте долучитися — пишіть
            нам.
          </p>
        </div>
      </div>
    ),
  },
];
