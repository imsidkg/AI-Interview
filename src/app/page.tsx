'use client';

import { Roboto_Mono } from 'next/font/google';
import { useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';

// Load the Roboto Mono font
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Home() {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  function navigateToDashboard() {
    router.push('/dashboard');
  }

  function navigateToSignin() {
    router.push('/sign-in');
    router.push('/dashboard');
  }

  if (!isLoaded) {
    return (
      <div className={robotoMono.className}>
        <Loader />
      </div>
    );
  }

  return (
    <main className={robotoMono.className}>
      {user ? (
        <div className={`flex flex-col justify-center items-center h-screen max-w-xl mx-auto text-center space-y-6`}>
          <h1 className="text-2xl md:text-4xl font-bold">
            Ace Every Interview with a little more practice with us
          </h1>
          <Button
            onClick={navigateToDashboard}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <div className={`flex flex-col justify-center items-center h-screen max-w-xl mx-auto text-center space-y-6`}>
          <h1 className="text-2xl md:text-4xl font-bold">
            Ace Every Interview with a little more practice with us
          </h1>
          <Button
            onClick={navigateToSignin}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Sign in to continue
          </Button>
        </div>
      )}
    </main>
  );
}
