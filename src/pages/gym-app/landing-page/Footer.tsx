import { Button } from '@/components/ui/button';
import { Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function LandingFooter() {

  return (
    <div className="">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Transform Your Gym Management?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
                  Join GymSphere today and experience the difference efficient admin tools can make for your business.
                </p>
              </div>
              <Button className="bg-white text-primary hover:bg-gray-100">Start Your Free Trial</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6" />
              <span className="font-bold">GymSphere</span>
            </div>
            <p className="text-center text-sm leading-loose text-gray-600 dark:text-gray-400 md:text-left">
              © 2025GymSphere. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link className="text-sm hover:underline underline-offset-4" to="#">
                Privacy Policy
              </Link>
              <Link className="text-sm hover:underline underline-offset-4" to="#">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
