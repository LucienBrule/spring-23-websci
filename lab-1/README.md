
# WebSci Lab-1 


[Production / Preview](https://spring-23-websci.vercel.app/)

## Specs:

[Lab 1 Spec Sheet](specs/specs.md)


## Requirements:

- [ ] ~~Retrieve news articles from JSON file~~
- [X] Retrieve news articles from API

- [X] Display 5 articles at a time on the news ticker

- [X] Implement a method for cycling through the articles slowly (no faster than once every 3 seconds)

- [X] Consider options such as replacing all 5 articles every 3 seconds, replacing one every 3 seconds, or a different approach

## Methodology

I started by implementing the newsfeed api logic first. 
you can see an example of this in [demo.sh](demo.sh)

I then broke out the UI into components in [index.tsx](src/pages/index.tsx)

At this point I had a page that would dynamically pull content via XHR request.
It would pull al the articles. This wasn't the best as the page was super long and the assignment said to only show 5 at a time.

I decided to use a feature of NextJS called Static Site Generation (SSG) to generate the page at build time.
This would allow me to pull the articles at build time and then only show 5 at a time.
I pull 50 articles, but this can be changed to up to 200. It just makes the build time longer.

If I had more time, I would have like to progressively enhance the page by hydrating on page scroll.

I then implemented the news ticker logic such that it would cycle through the articles every 5 seconds.
For this I used a `setInterval` function to call a function that would update the state of the page contained within a react `useEffect` hook.


As far as design goes, I like my news sites minimal. In my opinion HackerNews and Reddit have near optimal designs.
So I used css flexbox to create a list of cards that would display the articles. This allows the page to be responsive and scale to any size.
By not using bootstrap I also save a lot on my bundle size.

## Stats

### Bundle Size
```
Route (pages)                              Size     First Load JS
┌ ● / (7837 ms)                            821 B          74.3 kB
├   /_app                                  0 B            73.5 kB
├ ○ /404                                   181 B          73.7 kB
└ λ /api/hello                             0 B            73.5 kB
+ First Load JS shared by all              73.9 kB
  ├ chunks/framework-ad45764ecfcae9e5.js   45.4 kB
  ├ chunks/main-1227de1dc46e1332.js        27.1 kB
  ├ chunks/pages/_app-bf55c49910772dbb.js  297 B
  ├ chunks/webpack-8fa1640cc84ba8fe.js     750 B
  └ css/1e9850de97c44540.css               380 B
```

Above you can see my bundle sizes are all under 1Mb.


### LightHouse Scores

```
Performance:                99
Accessibility:              97
Best Practices:             100
SEO:                        82
PWA:                        N/A
First Contentful Paint:     900ms
Time to Interactive:        1200ms
```

I believe I could improve my SEO score by adding more metadata to the page.
I also could improve my performance score by adding a service worker and preloading the next page.
The FCP and TTI scores are pretty good, I could optimize them further by using a CDN and preloading the next page. 

## Conclusion

I am happy with the results of this assignment. I got a chance to use NextJS and learn about SSG.

---

---
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
