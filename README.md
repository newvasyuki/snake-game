## Описание

Учебный проект курса "Мидл-фронтенд разработчик" от Яндекс.Практикум.
Проект "Snake Game" разработан командой "Нью-Васюки".
"Snake Game" это вариация на тему известной игры "Змейка".
Игра заключается в поедании предметов, появляющихся в разных клетках поля.
После поедания каждого предмета змейка увеличивается на одну клетку.
Управление движением осуществляется с помощью стрелок клавиатуры.
В случае столкновения движения змейки со стеной или с самой змейкой - игра прекращается.

После поедания каждого предмета игрок зарабатывает очки.
Чем больше было употреблено предметов - тем больше очков.
Игроки, которые заработали больше всех очков, попадают в рейтинг.

## Стек

В проекте используются Typescript, Stylelint, Eslint, Prettier, PostCss, SSR, Express, Docker, Swagger. Сборка клиента - Webpack, сборка сервера - tsc.
Тесты - Jest + react-testing-library.

## Установка и запуск

- `npm install` — установка зависимостей,
- `npm run dev` — запуск дев сервера,
- `npm start` — сборка клиента, сервера и запуск проекта на локальном Express-сервере,
- `npm run build` — сборка клиента и сервера.
  Остальные команды описаны в разделе scripts packa

## Запуск в докере и подключение к базе данных
For production:

`docker-compose up -d`

For developers:

*Способ 1:*
Для режима разработки рекомендуется запустить базу данных в контейнере 

Комманда для запуска:

`docker-compose -f docker-compose.dev.yaml up postgres`

После этого в отдельном терминале нужно запустить приложение:

`npm run dev`

*Способ 2:*
Для режима разработки также можно запустить все приложения в контейнерах при помощи:

`docker-compose -f docker-compose.dev.yaml up`

В обоих случаях подключатся к базе данных можно с машины хоста, например при помощи [DBeaver](https://dbeaver.io) или любого другого клиента.

## Работа с форумом в режиме разработки с авторизацией

1. Добавить алиас в файл hosts: 
`127.0.0.1 snake.ya-praktikum.tech`

2. Сгенерировать self-certificate для доступа по https 

[Как сгенерировать self-seigned сертификат](https://stackoverflow.com/questions/21397809/create-a-trusted-self-signed-ssl-cert-for-localhost-for-use-with-express-node)

`openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365`

`openssl rsa -in keytmp.pem -out key.pem`

3. Создать в корне репозитория папку ssl и Положить туда сгенерированные ключи

[Как использовать сгенерированный сертификат](https://blog.postman.com/using-self-signed-certificates-with-postman/)

4. Запустить дев среду с форумом
`npm run dev:forumWithAuth`

5. [Swagger](https://snake.ya-praktikum.tech:5000/api-docs) доступен для тестирования эндпоинтов

## О команде

Над проектом работали

- Студент [MasterOfMenace](https://github.com/MasterOfMenace)
- Студент [Ren22](https://github.com/Ren22)
- Студент [devBaxa](https://github.com/devBaxa)
- Ментор [gohabereg](https://github.com/gohabereg)
