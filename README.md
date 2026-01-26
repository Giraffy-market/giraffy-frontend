This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```diff
├── src/
│   ├── app
│   │   ├── (page)
│   │   │   └── test /
│   │   │       └── page.tsx
│   │   ├── api
│   │   │   └── auth /
│   │   │       └── page.tsx
│   │   │           └── [...nextauth] /
│   │   │               └── route.ts
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components
│   │   ├── common
│   │   │   ├── Breadcrumbs /
│   │   │   │   ├── constants /
│   │   │   │   │   └── breadcrumbsData.ts
│   │   │   │   ├── styles /
│   │   │   │   │   └── Breadcrumbs.module.scss
│   │   │   │   ├── Breadcrumbs.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── Categories /
│   │   │   │   └── assets /
│   │   │   │       ├── beauty-care.svg
│   │   │   │       ├── cars-care.svg
│   │   │   │       ├── cars-care.svg
│   │   │   │       ├── electronics.svg
│   │   │   │       ├── hobbies.svg
│   │   │   │       ├── house-care.svg
│   │   │   │       ├── kids.svg
│   │   │   │       ├── kitchen.svg
│   │   │   │       └── kitchen.svg
│   │   │   │
│   │   │   ├── ProfilePopup /
│   │   │   │   └── assets /
│   │   │   │       ├── basket.svg
│   │   │   │       ├── bonuses.svg
│   │   │   │       ├── chats.svg
│   │   │   │       ├── default-profile-icon.svg
│   │   │   │       ├── locale.svg
│   │   │   │       ├── logout.svg
│   │   │   │       ├── profile-skeleton.svg
│   │   │   │       └── support.svg
│   │   │   │
│   │   │   └── Slider /
│   │   │       ├── assets /
│   │   │       │   ├── arrow.svg
│   │   │       │   ├── giraffe1.svg
│   │   │       │   ├── giraffe2.svg
│   │   │       │   ├── giraffe3.svg
│   │   │       │   ├── giraffe4.svg
│   │   │       │   └── giraffe5.svg
│   │   │       ├── constants /
│   │   │       │   └── sliderData.ts
│   │   │       ├── styles /
│   │   │       │   └── Slider.module.scss
│   │   │       ├── hooks /
│   │   │       │   └── useDotButton.ts
│   │   │       ├── ui /
│   │   │       │   └── SliderItem /
│   │   │       │       ├── styles /
│   │   │       │       │   └── SliderItem.module.scss
│   │   │       │       ├── index.ts
│   │   │       │       └── SliderItem.tsx
│   │   │       ├── index.ts
│   │   │       └── Slider.tsx
│   │   │
│   │   ├── layout
│   │   │   ├── Footer /
│   │   │   │   ├── styles
│   │   │   │   │   └── Footer.module.scss
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── Header /
│   │   │   │   ├── assets /
│   │   │   │   │   ├── catalogue.svg
│   │   │   │   │   ├── categories.svg
│   │   │   │   │   ├── favourites.svg
│   │   │   │   │   ├── notification.svg
│   │   │   │   │   ├── profile.svg
│   │   │   │   │   └── search.svg
│   │   │   │   ├── components /
│   │   │   │   │   ├── HeaderAction /
│   │   │   │   │   │   ├── styles /
│   │   │   │   │   │   │   └── HeaderAction.module.scss
│   │   │   │   │   │   ├── HeaderAction.tsx /
│   │   │   │   │   │   └── index.ts /
│   │   │   │   │   ├── HeaderCategories /
│   │   │   │   │   │   ├── constants /
│   │   │   │   │   │   │   └── constants.ts
│   │   │   │   │   │   ├── styles /
│   │   │   │   │   │   │   ├── _header-categories.scss
│   │   │   │   │   │   │   ├── _header-typography.scss
│   │   │   │   │   │   │   └── HeaderCategories.module.scss
│   │   │   │   │   │   ├── ui /
│   │   │   │   │   │   │   ├── _header-categories.scss
│   │   │   │   │   │   │   ├── _header-typography.scss
│   │   │   │   │   │   │   └── HeaderCategories.module.scss
│   │   │   │   │   │   └── index.ts /

│   │   │   │   └── index.ts
│   ├── mock/
│   │   ├── data.js # Тестова база данних
│   ├── pages/
│   │   ├── ChatPage /
│   │   │   ├── components /
│   │   │   │   ├── ChatContainer /
│   │   │   │   │   ├── components /
│   │   │   │   │   │   ├── ChatHeader /
│   │   │   │   │   │   │   ├── components /
│   │   │   │   │   │   │   │   ├── DeleteDialog /
│   │   │   │   │   │   │   │   │   ├── DeleteDialog.styled.jsx
│   │   │   │   │   │   │   │   │   └── index.jsx
│   │   │   │   │   │   │   │   │
│   │   │   │   │   │   │   │   ├── DropDownMenu /
│   │   │   │   │   │   │   │   │   ├── DropDownMenu.styled.jsx
│   │   │   │   │   │   │   │   │   └── index.jsx
│   │   │   │   │   │   │   │   │
│   │   │   │   │   │   │   │   ├── MainChatHeader /
│   │   │   │   │   │   │   │   │   ├── MainChatHeader.styled.jsx
│   │   │   │   │   │   │   │   │   └── index.jsx
│   │   │   │   │   │   │   │   │
│   │   │   │   │   │   │   │   └── SearchInputHeader /
│   │   │   │   │   │   │   │       ├── SearchInputHeader.styled.jsx
│   │   │   │   │   │   │   │       └── index.jsx
│   │   │   │   │   │   │   │
│   │   │   │   │   │   │   ├── ChatHeader.styled.jsx
│   │   │   │   │   │   │   └── index.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── MessageBar /   📅 7.12.2025 update
│   │   │   │   │   │   │   ├── MessageBar.styled.jsx
│   │   │   │   │   │   │   └── index.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   └── MessageContainer /   📅 7.12.2025 update
│   │   │   │   │   │       ├── MessageContainer.styled.jsx
│   │   │   │   │   │       └── index.jsx
│   │   │   │   │   │
│   │   │   │   │   ├── ChatContainer.styled.jsx
│   │   │   │   │   └── index.jsx
│   │   │   │   │
│   │   │   │   ├── ContactsContainer /
│   │   │   │   │   ├── components /
│   │   │   │   │   │   ├── Content /   📅 7.12.2025 update
│   │   │   │   │   │   │   ├── Content.styled.jsx
│   │   │   │   │   │   │   └── index.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   ├── InputSearch /
│   │   │   │   │   │   │   ├── InputSearch.styled.jsx
│   │   │   │   │   │   │   └── index.jsx
│   │   │   │   │   │   │
│   │   │   │   │   │   └── SidebarRail /
│   │   │   │   │   │       ├── SidebarContext.jsx
│   │   │   │   │   │       ├── SidebarRail.styled.jsx
│   │   │   │   │   │       └── index.jsx
│   │   │   │   │   │
│   │   │   │   │   ├── ContactsContainer.styled.jsx
│   │   │   │   │   └── index.jsx
│   │   │   │   │
│   │   │   │   ├── EmptyContainer /
│   │   │   │   ├── EditProfile /  📅 7.12.2025
│   │   │   │   │   ├── EditProfile.styled.jsx
│   │   │   │   │   └── index.jsx
│   │   │   │   │
│   │   │   │   ├── MyProfile /  📅 7.12.2025
│   │   │   │   │   ├── MyProfile.styled.jsx
│   │   │   │   │   └── index.jsx
│   │   │   │   │
│   │   │   │   ├── CreateChat /   📅 7.12.2025 update
│   │   │   │   │   ├── CreateChat.styled.jsx
│   │   │   │   │   └── index.jsx
│   │   │   │   │
│   │   │   │   └── UserProfile /   📅 7.12.2025
│   │   │   │       ├── UserProfile.styled.jsx
│   │   │   │       └── index.jsx
│   │   │   │
│   │   │   ├── Chat.styled.jsx
│   │   │   └── index.jsx
│   │   │
│   │   ├── MainSignIn/
│   │   │   ├── MainSignIn.styled.jsx 📅 16.12.2025
│   │   │   └── MainSignIn.jsx 📅 16.12.2025
│   │   │
│   │   ├── SignIn/
│   │   │   ├── SignIn.styled.jsx 📅 17.12.2025
│   │   │   └── SignIn.jsx 📅 17.12.2025
│   │   │
│   │   ├── ForgotPassword/
│   │   │   ├── ForgotPassword.styled.jsx 📅 17.12.2025
│   │   │   └── ForgotPassword.jsx 📅 17.12.2025
│   │   │
│   │   ├── VerifyCode/
│   │   │   ├── VerifyCode.styled.jsx 📅 17.12.2025
│   │   │   └── index.jsx 📅 17.12.2025
│   │   │
│   │   ├── ChangePassword/
│   │   │   ├── components/
│   │   │   │   └── SuccessMessage/
│   │   │   │       ├── SuccessMessage.styled.jsx 📅 17.12.2025
│   │   │   │       └── index.jsx 📅 17.12.2025
│   │   │   │
│   │   │   ├── ChangePassword.styled.jsx 📅 17.12.2025
│   │   │   └── ChangePassword.jsx 📅 17.12.2025
│   │   │
│   │   ├── SelectAccount/
│   │   │   ├── components/
│   │   │   │   ├── AccessCode/
│   │   │   │   │   ├── AccessCode.styled.jsx 📅 18.12.2025
│   │   │   │   │   └── index.jsx 📅 18.12.2025
│   │   │   │   │
│   │   │   │   └── RadioSelect/
│   │   │   │       ├── RadioSelect.styled.jsx 📅 18.12.2025
│   │   │   │       └── index.jsx 📅 18.12.2025
│   │   │   │
│   │   │   ├── SelectAccount.styled.jsx 📅 18.12.2025
│   │   │   └── index.jsx 📅 18.12.2025
│   │   │
│   │   ├── CreateAccount/
│   │   │   ├── components/
│   │   │   │   └── EmailPassword/
│   │   │   │       ├── EmailPassword.styled.jsx 📅 18.12.2025
│   │   │   │       └── index.jsx 📅 18.12.2025
│   │   │   │
│   │   │   ├── CreateAccount.styled.jsx 📅 18.12.2025
│   │   │   └── index.jsx 📅 18.12.2025
│   │   │
│   │   ├── Chat.jsx
│   │   ├── CreateAccount.jsx
│   │   └── Main.jsx
│   │
│   │
│   │
│   ├── ui /
│   │   ├── ArrowBack /  📅 7.12.2025
│   │   │   ├── ArrowBack.styled.jsx
│   │   │   └── index.jsx
│   │   │
│   │   ├── Avatar /  📅 7.12.2025
│   │   │   ├── Avatar.styled.jsx
│   │   │   └── index.jsx
│   │   │
│   │   ├── Button /  📅 7.12.2025
│   │   │   ├── Button.styled.jsx
│   │   │   └── index.jsx
│   │   │
│   │   ├── HeaderBack /  📅 7.12.2025
│   │   │   ├── HeaderBack.styled.jsx
│   │   │   └── index.jsx
│   │   │
│   │   └── ToggleSwitch /  📅 7.12.2025
│   │       ├── ToggleSwitch.styled.jsx
│   │       └── index.jsx
│   │
│   ├── App.jsx 📅 18.12.2025
│   ├── index.css 📅 18.12.2025
│   └── main.jsx

```
