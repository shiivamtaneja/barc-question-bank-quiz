import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BARC Quiz - Shivam Taneja',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
