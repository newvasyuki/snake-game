## Description

The Snake Game project was developed by the New Vasyuki team.
"Snake Game" is a variation of the famous game "Snake".
The game aim is to eat objects that appear in different cells of the field.
After eating each item, the snake increases by one cell.
Movement is controlled using the keyboard arrows.
In the event of a collision of the snake's movement with the wall or with the snake itself, the game stops.

After eating each item, the player earns points.
The more items were used - the more points.
The players who have earned the most points are ranked.

## Core points

* configured routing with React Router
* stores data, and also look at Redux, Redux-Thunk as well as Sequelize
* workes with security in React: SQL injection, XSS
* TypeScript + React
* PostgreSQL and Node.js on the backend
* uses Service Workers and utilizes Canvas API for drawings
* configured Server-Side Rendering
* implement various authorization methods: using OAuth, etc.
* set up CI/CD in GitHub Actions
* configured Nginx

## Tech stack

The project uses 
* Typescript
* Stylelint 
* Eslint
* Prettier
* PostCss
* SSR
* Express
* Docker
* Swagger
* Client build - Webpack 
* server build - tsc
* Tests: react-testing-library

## Installation and starting up

- `npm install` — install dependencies,
- `npm run dev` — start dev server,
- `npm start` — assembling the client, server and launching the project on the local Express server,
- `npm run build` — build client and server.
  Other commands are described in the scripts section of package.json

## Run in docker and connect to database
For production:

`docker-compose up -d`

For developers:

*Method 1:*
For development mode, it is recommended to run the database in a container

Run command:

`docker-compose -f docker-compose.dev.yaml up postgres`

After that, in a separate terminal, you need to run the application:

`npm run dev`

*Method 2:*
For development mode, you can also run all applications in containers with:

`docker-compose -f docker-compose.dev.yaml up`

In both cases, you can connect to the database from the host machine, for example, using [DBeaver](https://dbeaver.io) or any other client.

## Working with the forum in development mode with authorization

1. Add an alias to the hosts file:
`127.0.0.1 snake.ya-praktikum.tech`

2. Generate self-certificate for https access

[How to generate a self-signed certificate](https://stackoverflow.com/questions/21397809/create-a-trusted-self-signed-ssl-cert-for-localhost-for-use-with-express-node)

`openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365`

`openssl rsa -in keytmp.pem -out key.pem`

3. Create an ssl folder in the root of the repository and put the generated keys there

[How to use the generated certificate](https://blog.postman.com/using-self-signed-certificates-with-postman/)

4. Launch a dev environment with a forum
`npm run dev:forumWithAuth`

5. [Swagger](https://snake.ya-praktikum.tech:5000/api-docs) available for testing endpoints

## Snaphsots
<<<<<<< HEAD
![Login page](https://raw.githubusercontent.com/newvasyuki/snake-game/ba571515b32cc5cb2cf3105187f78d8e72766437/assets/snapshots/login.png)
![Game interface](https://raw.githubusercontent.com/newvasyuki/snake-game/ba571515b32cc5cb2cf3105187f78d8e72766437/assets/snapshots/game.png)
![Game interface dark theme](https://raw.githubusercontent.com/newvasyuki/snake-game/ba571515b32cc5cb2cf3105187f78d8e72766437/assets/snapshots/game_dark_theme.png)
=======
[Login page](https://raw.githubusercontent.com/newvasyuki/snake-game/ba571515b32cc5cb2cf3105187f78d8e72766437/assets/snapshots/login.png)
[Game interface](https://raw.githubusercontent.com/newvasyuki/snake-game/ba571515b32cc5cb2cf3105187f78d8e72766437/assets/snapshots/game.png)
[Game interface dark theme](https://raw.githubusercontent.com/newvasyuki/snake-game/ba571515b32cc5cb2cf3105187f78d8e72766437/assets/snapshots/game_dark_theme.png)
>>>>>>> 7a6d9907dedbfa65412563896177206f2736bef7
## About team

The project was made by

- [MasterOfMenace](https://github.com/MasterOfMenace)
- [Ren22](https://github.com/Ren22)
- [devBaxa](https://github.com/devBaxa)
- Mentor [gohabereg](https://github.com/gohabereg)
