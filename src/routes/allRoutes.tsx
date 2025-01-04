import { LazyExoticComponent, Suspense, lazy, ElementType } from 'react';
import SuspenseLoader from '@/components/loaders/Spinner';

// ----------------------------------------------------------------------
const Loadable =
  (Component: LazyExoticComponent<() => JSX.Element>) =>
  (props: JSX.IntrinsicAttributes) => {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <SuspenseLoader />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

const lazyWithRetries = (importer: () => Promise<{ default: ElementType }>) => {
  const retryImport = async () => {
    try {
      return await importer();
    } catch (error) {
      window.location.reload();
    }
  };
  return Loadable(lazy(retryImport as any));
};

// -------------------------------Before auth routes--------------------------------
const Login = lazyWithRetries(() => import('@/pages/auth/login'));
const OtpLogin = lazyWithRetries(() => import('@/pages/auth/otp-login'));
const Register = lazyWithRetries(() => import('@/pages/auth/register'));
const ForgetPassword = lazyWithRetries(
  () => import('@/pages/auth/forget-password')
);

const Home = lazyWithRetries(() => import('@/pages/gym-app/home'));
const LandingPage = lazyWithRetries(() => import('@/pages/gym-app/landing-page'));
const Profile = lazyWithRetries(() => import('@/pages/gym-app/profile'));
const ChangePassword = lazyWithRetries(
  () => import('@/pages/gym-app/change-password')
);

const AddOwner = lazyWithRetries(() => import('@/pages/gym-app/add-owner'));
const OwnerList = lazyWithRetries(() => import('@/pages/gym-app/owner-list'));
const UpdateOwner = lazyWithRetries(
  () => import('@/pages/gym-app/update-owner')
);


const AddMember = lazyWithRetries(() => import('@/pages/gym-app/add-member'));
const MemberList = lazyWithRetries(() => import('@/pages/gym-app/member-list'));
const UpdateMember = lazyWithRetries(
  () => import('@/pages/gym-app/update-member')
);

const ViewMember = lazyWithRetries(() => import('@/pages/gym-app/view-member'));
const Payment = lazyWithRetries(() => import('@/pages/gym-app/payment'));
const PaymentList = lazyWithRetries(
  () => import('@/pages/gym-app/payment-list')
);

const ExpSubList = lazyWithRetries(
  () => import('@/pages/gym-app/exp-subscription')
);

const CollectionReport = lazyWithRetries(
  () => import('@/pages/gym-app/collection-report')
);

const MonthMaster = lazyWithRetries(
  () => import('@/pages/gym-app/masters/month')
);

const PlanMaster = lazyWithRetries(
  () => import('@/pages/gym-app/masters/plan')
);
const PlanMappingMaster = lazyWithRetries(
  () => import('@/pages/gym-app/masters/plan-month-mappting')
);

const PaymentReceipt = lazyWithRetries(
  () => import('@/pages/gym-app/payment-receipt')
);
const MemberId = lazyWithRetries(() => import('@/pages/gym-app/member-gym-id'));

const ReceiptList = lazyWithRetries(
  () => import('@/pages/gym-app/receipt-list')
);
const MonthPlanReport = lazyWithRetries(
  () => import('@/pages/gym-app/month-plan-report')
);

const GuestPaymentReceipt = lazyWithRetries(
  () => import('@/pages/gym-app/guest/payment-receipt')
);

const GuestIdCard = lazyWithRetries(
  () => import('@/pages/gym-app/guest/guest-id-card')
);

export type Route = {
  layout: string;
  pages: {
    id: string;
    name: string;
    path: string;
    element: JSX.Element;
    exact?: boolean;
  }[];
};

const routes: Route[] = [
  {
    layout: 'auth', // before Auth
    pages: [
      {
        id: '1',
        name: 'Login',
        path: 'login',
        element: <Login />
      },
      {
        id: '2',
        name: 'Register',
        path: 'register',
        element: <Register />
      },
      {
        id: '3',
        name: 'Forget Password',
        path: 'forget-password',
        element: <ForgetPassword />
      },
      {
        id: '4',
        name: 'Otp Login',
        path: 'otp-login',
        element: <OtpLogin />
      },
    ]
  },

  {
    layout: 'gym-app', // after Auth
    pages: [
      {
        id: '1',
        name: 'Home',
        path: 'home',
        element: <Home />,
        exact: true
      },
      {
        id: '2',
        name: 'Profile',
        path: 'profile',
        element: <Profile />
      },
      {
        id: '3',
        name: 'Member List',
        path: 'member-list',
        element: <MemberList />
      },
      {
        id: '4',
        name: 'Add Member',
        path: 'add-member',
        element: <AddMember />
      },
      {
        id: '5',
        name: 'Update Member',
        path: 'update-member/:id',
        element: <UpdateMember />
      },
      {
        id: '6',
        name: 'View Member',
        path: 'view-member/:id',
        element: <ViewMember />
      },
      {
        id: '7',
        name: 'Payment',
        path: 'payment/:id',
        element: <Payment />
      },
      {
        id: '8',
        name: 'Payment List',
        path: 'payment-list',
        element: <PaymentList />
      },
      {
        id: '9',
        name: 'Exp Subscription List',
        path: 'exp-subscription',
        element: <ExpSubList />
      },
      {
        id: '10',
        name: 'Collection Report',
        path: 'collection-report',
        element: <CollectionReport />
      },
      {
        id: '11',
        name: 'Month Master',
        path: 'masters/month',
        element: <MonthMaster />
      },
      {
        id: '12',
        name: 'Plan Master',
        path: 'masters/plan',
        element: <PlanMaster />
      },
      {
        id: '13',
        name: 'Plan Mapping Master',
        path: 'masters/plan-mapping',
        element: <PlanMappingMaster />
      },
      {
        id: '14',
        name: 'Plan Mapping Master',
        path: 'payment-receipt/:id',
        element: <PaymentReceipt />
      },
      {
        id: '15',
        name: 'Receipt List',
        path: 'receipt-list',
        element: <ReceiptList />
      },
      {
        id: '16',
        name: 'Member ID',
        path: 'member-gym-id/:id',
        element: <MemberId />
      },
      {
        id: '17',
        name: 'Month Plan Report',
        path: 'month-plan-report',
        element: <MonthPlanReport />
      },
      {
        id: '18',
        name: 'Change Password',
        path: 'change-password',
        element: <ChangePassword />
      },
      // {
      //   id: '19',
      //   name: 'Add Owner',
      //   path: 'add-owner',
      //   element: <AddOwner />
      // },
      {
        id: '20',
        name: 'Owner List',
        path: 'owner-list',
        element: <OwnerList />
      },
      {
        id: '21',
        name: 'Owner List',
        path: 'update-owner/:id',
        element: <UpdateOwner />
      },
    ]
  },

  {
    layout: 'guest', // Guest
    pages: [
      {
        id: '1',
        name: 'Guest Payment Receipt',
        path: 'guest-payment-receipt/:id',
        element: <GuestPaymentReceipt />
      },
      {
        id: '2',
        name: 'Guest Id Card',
        path: 'guest-id-card/:id',
        element: <GuestIdCard />
      },
      {
        id: '3',
        name: 'Landing Page',
        path: 'landing-page',
        element: <LandingPage />
      },
      {
        id: '4',
        name: 'Add Owner',
        path: 'registration-form',
        element: <AddOwner />
      },
    ]
  }
];

export default routes;
