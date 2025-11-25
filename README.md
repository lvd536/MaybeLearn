# MaybeLearn

MaybeLearn - это образовательная платформа, созданная с использованием современных веб-технологий. Она предоставляет возможности для создания и прохождения курсов и тестов, а также включает в себя админ-панель для управления контентом и пользователями.

## Технологии

-   **Frontend:**
    -   [React](https://react.dev/) - Библиотека для создания пользовательских интерфейсов
    -   [TypeScript](https://www.typescriptlang.org/) - Типизированный JavaScript
    -   [Vite](https://vitejs.dev/) - Инструмент для сборки и разработки
    -   [Tailwind CSS](https://tailwindcss.com/) - CSS-фреймворк
    -   [Zustand](https://github.com/pmndrs/zustand) - Простое решение для управления состоянием
    -   [React Router](https://reactrouter.com/) - Библиотека для маршрутизации
-   **Backend:**
    -   [Supabase](https://supabase.com/) - Open-source альтернатива Firebase

## Запуск проекта

1.  **Клонируйте репозиторий:**

    ```bash
    git clone https://github.com/lvd536/MaybeLearn.git
    cd MaybeLearn
    ```

2.  **Установите зависимости:**

    ```bash
    npm install
    ```

3.  **Настройте переменные окружения:**
    Создайте файл `.env` в корне проекта и добавьте в него ключи для Supabase:

    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  **Запустите dev-сервер:**

    ```bash
    npm run dev
    ```

    Проект будет доступен по адресу `http://localhost:5173`.

## Доступные скрипты

-   `npm run dev`: Запуск сервера для разработки
-   `npm run build`: Сборка проекта для продакшена
-   `npm run lint`: Запуск линтера для проверки кода
-   `npm run preview`: Предпросмотр продакшн-сборки
