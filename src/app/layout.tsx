import Navbar from './Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Entertainment Web App',
  description: 'Watch your favourite TV Shows and Movies!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={`${inter.className} main`}>
        <Navbar />
        <Providers>
          {children}
        </Providers>
        </body>
    </html>
  )
}
