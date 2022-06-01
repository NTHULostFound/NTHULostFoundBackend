# NTHU Lost & Found GraphQL Backend
### Forked from [Lecture 09: GraphQL Backend Adventure](https://shwu10.cs.nthu.edu.tw/courses/software-studio/2022-spring/lab-apollo-server-graphql-database)

## Install
```bash
$ yarn install
```

## Create environment
Environment file example.
```
# .env
# Apollo Server
VERSION=1.0.0
NODE_ENV=development
PORT=3000
SECRET=YOUR_SECRET

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=gql
DB_USER=root
DB_PASS=
```
## Getting Started
### Run Server
```bash
$ yarn dev
```

### Test

```bash
$ yarn test
```
or
#### Standard
https://standardjs.com/
```bash
yarn standard --fix
```

#### Jest
https://jestjs.io/

https://jestjs.io/docs/expect

https://pjchender.dev/npm/npm-jest/
```bash
yarn jest
```

Jest config
```
  "jest": {
    "verbose": true,
    "collectCoverage": true
  },
```
