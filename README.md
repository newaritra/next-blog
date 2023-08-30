A link to the video demo of the same project : https://youtu.be/w22C40AX5BM

This project has **three APIs** running on three endpoints. Namely,
  - http://localhost:3000/api/fetch (GET) : Fetches all the blog posts from the db
  - http://localhost:3000/api/search (POST) : Fetches the posts which have matches with the string entered in the search bar
  - http://localhost:3000/api/filter (POST) : Fetches the blogs posts based on the filter selected in the select dropdown menu

Learnings:
  - Worked on **NextJS 13** and understood how it's working with sever components
  - **Debouncing** teh search result by creating a custom hook for debouncing and fetching
  - Revisisted some algorithms that helped in creating the filtered posts


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
