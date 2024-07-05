# ThunderQuest API

This is the backend graphql api server for ThunderQuest. Longer term website support may be leveraged.

# Developers

This project uses prisma and grapqhl and their associated code generation tools. To get started you will need to generate both the database and api types before compiling:

```
npx prisma generate
pnpm generate
```

You can run the project with:
```
pnpm dev
```

Additionally, it is worth noting that this project uses vercel for ci/di and deployment.