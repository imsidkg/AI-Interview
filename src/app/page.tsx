import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'], 
  weight: ['400', '700'], 
});

export default function Home() {
  return (
    <main className={robotoMono.className}>
      here is the new page
    </main>
  );
}
