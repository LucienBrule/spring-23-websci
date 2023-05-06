import { Html, Head, Main, NextScript } from 'next/document'
import Link from "next/link";


function Navigation(){
    return (
        <div className={"navigation"}>
            <h3>NewsTicker</h3>
            <Link href="/">Home</Link>
        </div>
    )
}
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Navigation/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
