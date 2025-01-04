import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function LandingPage() {

  return (
    <div className="">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Avatar className="w-12 h-12 border  dark:border-gray-700">
            <AvatarImage src="/Gym.png" alt="@shadcn" />
          </Avatar>
          <span className="font-bold ml-2">GymSphere</span>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" to="/gym-app/registration-form">
              APK
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
