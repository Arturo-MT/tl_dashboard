export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: Readonly<{
  Component: React.ComponentType
  pageProps: { session: any }
}>) {
  return <Component {...pageProps} />
}
