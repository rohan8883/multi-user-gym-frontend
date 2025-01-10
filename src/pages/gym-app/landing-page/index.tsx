import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BarChart, Calendar, Dumbbell, Users } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur   supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center opacity-90">

          <Avatar className="w-12 h-12 border  dark:border-gray-700">
            <AvatarImage src="/Gym.png" alt="@shadcn" />
          </Avatar>
          <span className="font-bold">GymSphere</span>

          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" to="/gym-app/registration-form">
              Features
            </Link>

          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
          <div className="absolute inset-0 z-0">
            <img
              src="/gym6.jpg"
              alt="GymSphere Admin Dashboard"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Streamline Your Gym Management with GymSphere
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  The all-in-one admin solution for efficient gym operations, member management, and business growth.
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/gym-app/registration-form"> <Button className="bg-white text-primary hover:bg-gray-100">Registration</Button> </Link>
                <Link to="/gym-app/auth/login"><Button variant="outline" className=" border-white  text-primary">SingIn</Button></Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Powerful Admin Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Member Management</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Easily manage memberships, track attendance, and handle payments in one place.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Calendar className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Class Scheduling</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Create and manage class schedules, assign trainers, and allow members to book sessions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <BarChart className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Promote Accessibility and Scalability</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Develop a user-friendly, mobile-responsive platform that can scale with the growth of fitness businesses of all sizes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-8 ">
          <div className="container px-4 md:px-6">
            {/* <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3">Pricing Plans</h2> */}
            <div className="grid gap-6 lg:grid-cols-2 md:mx-20 lg:gap-12 ">

              <div className="flex flex-col justify-center items-center  bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <img src="/gm-bg.jpg" alt="" />
              </div>
              <div className="flex flex-col  ">
                <div
                  className="object-cover bg-center  items-center justify-center   z-0"
                  style={{ backgroundImage: `url('')` }}
                >

                  <div className='py-9 space-y-5'>
                    <div>
                      <h1 className='text-xl font-bold '>Streamline Gym Operations</h1>
                      <p className='font-semibold'>Provide a comprehensive management system to automate administrative tasks, track member attendance, and manage payments effortlessly.
                      </p>
                    </div>
                    <div>
                      <h1 className='text-xl font-bold'>Enhance Member Experience</h1>
                      <p className='font-semibold'>Enable personalized experiences with features like workout plans,
                        progress tracking, and session booking to keep members engaged and motivated.
                      </p>
                    </div>
                    <div>
                      <h1 className='text-xl font-bold'>Support Financial Growth</h1>
                      <p className='font-semibold'>Offer detailed reports and analytics to help gym owners optimize their revenue, monitor subscription renewals, and manage expenses effectively.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Gym Owners Say</h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              {[
                { name: 'Sandeep Gupta, Fitness Firsts Owner', text: "GymSphere has revolutionized how we manage our gym. The member management and scheduling features have saved us countless hours." },
                { name: 'Ramesh Singh, Iron GYM owner', text: "The analytics provided by GymSphere have been instrumental in growing our business. We can now make data-driven decisions with ease." }
              ].map((testimonial, index) => (
                <div key={index} className="flex flex-col p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                  <p className="text-gray-500 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
                  <p className="font-bold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
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
              <Link to="/gym-app/registration-form" > <Button className="bg-white text-primary hover:bg-gray-100">Start Your Free Trial</Button></Link>
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
              © 2023 GymSphere. All rights reserved.
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
