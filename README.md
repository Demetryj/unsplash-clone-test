# Галерея зображень (Міні Unsplash clone)

Простий веб-сайт для перегляду зображень, створений на основі API Unsplash. Реалізовано функціонал
пошуку, фільтрації за тегами, збереження зображень до колекції та перегляду детальної інформації.

---

## **Особливості**

- Відображення зображень у сітці типу Masonry.
- Пошук зображень за ключовими словами.
- Фільтрація за тегами.
- Збереження та видалення зображень у колекцію.
- Адаптивний дизайн для різних пристроїв.
- Реєстрація та авторизація користувачів.

---

## **Технології**

- **Frontend:** Next.js, React.js
- **Backend:** API роутинг у Next.js
- **Стилизація:** SCSS
- **База даних:** MongoDB
- **Аутентифікація:** NextAuth
- **API:** Unsplash API `https://unsplash.com/documentation`

---

## **Встановлення та запуск**

1. **Склонуйте репозиторій:**

```bash
git clone https://github.com/unsplash-clone-test.git
cd unsplash-clone-test
```

2. **Встановіть залежності:**

```bash
  npm install
```

3. **Створіть файл `.env.local` з такими змінними:**

```bash
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=
UNSPLASH_SECRET_KEY=
MONGODB_URI=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
NEXT_PUBLIC_API_URL=
```

4. **Запустіть локальний сервер:**

```bush
npm run dev
```
