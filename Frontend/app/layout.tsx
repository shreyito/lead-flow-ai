import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Lead Flow AI',  // Updated title
  description: 'AI-driven lead generation and management',  // Updated description
  generator: 'LeadFlow.ai',  // Updated generator
  icons: {
    icon: [
      {
        url: '/leadflow-icon-light-32x32.png',  // Updated favicon for light mode
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/leadflow-icon-dark-32x32.png',  // Updated favicon for dark mode
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/leadflow-icon.svg',  // Updated SVG favicon
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',  // Make sure this apple icon corresponds to the updated branding
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
