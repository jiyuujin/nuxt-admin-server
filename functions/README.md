# function

Please install firebase-tools because you use the `firebase` command

```bash
npm install -g firebase-tools
firebase login
```

## First only

Initialize as the firebase project

```bash
firebase init
```

## Commands

Use Node.js 8 runtime

### Serve

```bash
firebase serve --only functions
```

### Shell

```bash
firebase functions:shell
```

### Deploy

```bash
firebase deploy --only functions
```

### Log

```bash
firebase functions:log
```
