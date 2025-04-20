import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BarChart, Calendar, Dumbbell, Users } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center opacity-90">
          <Avatar className="w-12 h-12 border dark:border-gray-700">
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
      <main className="flex-1 mt-14">
        <section className="w-full pt-20 pb-12 md:py-24 lg:py-32 xl:py-48 relative">
          <div className="absolute inset-0 z-0" style={{ top: '-60px', bottom: '-60px' }}>
            <img
              src="/gym6.jpg"
              alt="GymSphere Admin Dashboard"
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ objectPosition: 'center 30%' }} 
               
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
                <Link to="/gym-app/auth/login"><Button variant="outline" className="border-white text-primary">SingIn</Button></Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full mt-5  md:mt-0 py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
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
        <section id="pricing" className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
  <div className="container px-4 md:px-6 mx-auto">
    <div className="text-center mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-2">Elevate Your Fitness Business</h2>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Powerful tools to transform your gym management and member experience</p>
    </div>
    
    <div className="grid gap-6 md:gap-8 lg:grid-cols-2 md:mx-4 lg:gap-12 items-center">
      {/* Mobile-optimized image container */}
      <div className="flex flex-col justify-center items-center rounded-xl shadow-xl overflow-hidden h-64 sm:h-80 md:h-96 lg:h-500">
        <div className="relative w-full h-full">
          <img 
            src="/gm-bg.jpg" 
            alt="Modern gym with equipment" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            style={{ objectPosition: "center 30%" }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 md:p-8 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Transform Your Facility</h3>
              <p className="text-sm md:text-base text-gray-200">Our solutions adapt to your unique fitness business needs</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col space-y-6 md:space-y-10 py-4 md:py-6">
        <div className="group hover:bg-blue-50 dark:hover:bg-gray-700 p-4 md:p-6 rounded-xl transition-all duration-300">
          <div className="flex items-start space-x-3 md:space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 md:p-3 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">Streamline Gym Operations</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Comprehensive management system that automates administrative tasks, tracks member attendance, and handles payments effortlessly—giving you more time to focus on growing your business.</p>
            </div>
          </div>
        </div>
        
        <div className="group hover:bg-green-50 dark:hover:bg-gray-700 p-4 md:p-6 rounded-xl transition-all duration-300">
          <div className="flex items-start space-x-3 md:space-x-4">
            <div className="bg-green-100 dark:bg-green-900 p-2 md:p-3 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">Enhance Member Experience</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Create personalized fitness journeys with customizable workout plans, progress tracking, and seamless session booking that keeps your members engaged, motivated, and loyal.</p>
            </div>
          </div>
        </div>
        
        <div className="group hover:bg-purple-50 dark:hover:bg-gray-700 p-4 md:p-6 rounded-xl transition-all duration-300">
          <div className="flex items-start space-x-3 md:space-x-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 md:p-3 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">Support Financial Growth</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Access detailed analytics and reports that provide actionable insights to optimize revenue streams, monitor subscription renewals, and manage expenses for sustainable business growth.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-8 md:mt-12 text-center">
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
        Get Started Today
      </button>
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
              <Link to="/gym-app/registration-form"> <Button className="bg-white text-primary hover:bg-gray-100">Start Your Free Trial</Button></Link>
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