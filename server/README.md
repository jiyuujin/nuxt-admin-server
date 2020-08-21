# server

Please install NestJS because you use the `nest` command.

```bash
npm install -g @nestjs/cli
nest new server
```

## Run

```bash
# development
yarn start

# watch
yarn start:w

# production
yarn start:prod
```

### Deploy to Lambda

Use AWS Lambda.

```bash
yarn deploy
```

## Test

```bash
# unit test
yarn test:unit

# e2e test
yarn test:e2e

# coverage
yarn test:cov
```
