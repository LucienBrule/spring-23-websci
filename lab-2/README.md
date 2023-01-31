# Web Sci Lab 2

## Using the weather app

```yarn dev```
navigate to localhost:3000
get prompted for you location
refresh the page
weather auto loads
map auto loads

interesting: 

open dev tools,

open the console,

click the three dots in the top right next to the close button,

more tools > sensors

sensors tab opens on the bottom of dev tools

this allows you to spoof you location,

notice how the map updates to reflect new locations.


## Detailed Description of all the APIs

### 1. OpenWeather API

See IWeatherResponse for the shape of returned data. The API is pretty shoddy, and takes a long time to verify your API key. (big sad)

### 2. api.openai.com

The documentation for the backing api to chat gpt. 

The docs are [here](https://beta.openai.com/docs/api-reference/authentication)

This API requires the use of two headers in every request, 
a Content-Type Header and an Authorization Header.

The Content-Type Header is always application/json.

The Authorization Header is type Bearer and the tokens are generated from the OpenAI Dashboard.

### 3. APOD
URL: https://api.nasa.gov/planetary/apod

NASA has a collection of APIS that are free to use. 

One of the most popular ones is "Astronomy Picture of the Day" (APOD).

```bash
$ curl https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY | jq .
{
  "copyright": "Dan Bartlett",
  "date": "2023-01-27",
  "explanation": "The current darling of the northern night, Comet C/2022 E3 ZTF is captured in this telescopic image from a dark sky location at June Lake, California. Of course Comet ZTF has been growing brighter in recent days, headed for its closest approach to Earth on February 1.  But this view was recorded on January 23, very close to the time planet Earth crossed the orbital plane of long-period Comet ZTF. The comet's broad, whitish dust tail is still curved and fanned out away from the Sun as Comet ZTF sweeps along its orbit. Due to perspective near the orbital plane crossing, components of the fanned out dust tail appear on both sides of the comet's green tinted coma though, to lend Comet ZTF a visually striking (left) anti-tail. Buffeted by solar activity the comet's narrower ion tail also streams away from the coma diagonally to the right, across the nearly three degree wide field of view.",
  "hdurl": "https://apod.nasa.gov/apod/image/2301/C2022E3ZTF_2023_01_23_054036PST_DEBartlett.jpg",
  "media_type": "image",
  "service_version": "v1",
  "title": "Comet ZTF: Orbital Plane Crossing",
  "url": "https://apod.nasa.gov/apod/image/2301/C2022E3ZTF_2023_01_23_054036PST_DEBartlett1024.jpg"
}
```




---

---

# Running the project

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
