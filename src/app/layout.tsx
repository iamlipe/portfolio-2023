import { Header } from '@/components/Header';
import { Cursor } from '@/components/ui/Cursor';
import { Loading } from '@/contexts/Loading';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'F-L©',
  description: 'Portfolio website create By Felipe Lima',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Loading>

          <div className="w-screen h-screen">
            {children}
            <Header />
            <Cursor />
          </div>
        </Loading>
      </body>
    </html>
  );
}
