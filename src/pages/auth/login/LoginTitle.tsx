// import { Image } from '@/components/image';

export default function LoginTitle() {
  return (
    <div className="px-6 lg:px-0 mx-auto max-w-sm py-6 ">
      {/* logo */}
      <div className="flex justify-center">
        {/* <Image
          src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={100}
          height={100}
          alt="Logo"
          className="rounded-full"
        /> */}
      </div>

      <h1 className="text-3xl font-bold text-center mt-4 text-primary">
        {/* title */}
        Fitness Firsts GYM
      </h1>

      {/* subtitle */}
      <p className="text-center mt-2 text-muted-foreground">
        Login to your account
      </p>
    </div>
  );
}
