import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: any) {

  return (
    <SessionProvider session={session} basePath="/api/token/">
      <Component {...pageProps} />
    </SessionProvider>
  )
}
