This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).and for the front-end framework we used [`tailwind-css`](https://tailwindcss.com/)

## ATC Chains

First, you need to clone the project got the git 
after that you need to install depencencies and you can use this commonds for that
run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
and you need to add .env file and add this name:
```bash
ESLINT_NO_DEV_ERRORS=true
NEXT_PUBLIC_NODE_ENV = "production"
NEXT_PUBLIC_API_BASE_URL_DEV = ""
```
you can also change the localhost port from the /server.js.
for the API routes/urls you can change from /fetchers folder 

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

For project build you can use this commands

```bash
npm run build
# or
yarn build
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## Authors
Manish Shaw
License
This project is licensed under the Tecblic Pvt. Ltd. License - see the LICENSE.md file for details.
