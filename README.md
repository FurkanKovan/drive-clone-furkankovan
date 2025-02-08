# Google Drive Clone Project

## Stack:
- [React](https://react.dev/)
- [Next.js](http://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle](https://orm.drizzle.team/) (database)

## External Services Used in Project:
- [T3 Stack](https://create.t3.gg/) - bootstrap for full-stack nextjs app projects
- [V0](https://v0.dev/) - generative chat for building UI components, mainly uses [shadcn](https://ui.shadcn.com/)
- [Netlify](https://www.netlify.com/) - development and management platform for web apps
- [Singlestore](https://www.singlestore.com/) - database management system

## TODO
- [x] Make a TODO list
- [x] Create a mockup UI
- [ ] Set up database and data model
- [ ] Move folder open state to URL
- [ ] Add auth
- [ ] Add file uploading

## Steps taken:
1. Create the project using [T3 stack](https://create.t3.gg/) (pnpm create t3-app@latest project-name)
2. Initialize [git](https://git-scm.com/) and create a [GitHub](https://github.com/) repo
3. Synch GitHub repo with [Netlify](https://app.netlify.com/)
4. Build a starting mockup UI with [V0](https://v0.dev/)
5. Add github CI yaml file (.github/workflows/ci.yaml) to typecheck and lint on push commands
6. Handle database configuration for [Singlestore](https://www.singlestore.com/) under server/db/index.ts, configure [drizzle](https://orm.drizzle.team/) config, add dummy schema to test connection
7. 
