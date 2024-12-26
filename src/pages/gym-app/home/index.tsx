import { useEffect, useState } from 'react';
import Page from '@/components/helmet-page';
import { IndianRupee, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useApi } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import { I_COUNT_TYPE, I_SUB_EXP_TYPE } from './type';
import Spinner from '@/components/loaders/Spinner';
import CountUp from 'react-countup';

const CARDDATA = [
  {
    title: 'Total Amount',
    amount: 300,
    color: 'text-blue-500',
    bg: 'bg-blue-300/10',
    paidStatus: ''
  },
  {
    title: 'Total Paid',
    amount: 200,
    color: 'text-green-500',
    bg: 'bg-green-300/10',
    paidStatus: 1
  },
  {
    title: 'Total Due',
    amount: 100,
    color: 'text-red-500',
    bg: 'bg-red-300/10',
    paidStatus: 2
  },
  {
    title: 'Total Unpaid',
    amount: 0,
    color: 'text-yellow-500',
    bg: 'bg-yellow-300/10',
    paidStatus: 0
  }
];

export default function Home() {
  const [dateTime, setDateTime] = useState<string>('');
  const [cardData, setCardData] = useState<
    {
      title: string;
      amount: number | null;
      color: string;
      bg: string;
      paidStatus?: number | string;
    }[]
  >([]);
  const [memberCount, setMemberCount] = useState<
    {
      title: string;
      amount: number | null;
      color: string;
      bg: string;
      href: string;
    }[]
  >([]);
  const countData = useApi<I_COUNT_TYPE>({
    api: gymApi.getCount,
    key: 'countData',
    options: { enabled: true }
  });

  const expList = useApi<I_SUB_EXP_TYPE>({
    api: gymApi.getExpSubBeforeSevenDat,
    key: 'expiresList',
    options: { enabled: true }
  });

  useEffect(() => {
    if (countData?.data) {
      const newData = CARDDATA.map((data) => {
        if (data.title === 'Total Due') {
          return { ...data, amount: countData.data?.data?.totalDueAmount };
        } else if (data.title === 'Total Paid') {
          return { ...data, amount: countData.data?.data?.totalPaidAmount };
        } else if (data.title === 'Total Amount') {
          return { ...data, amount: countData.data?.data?.totalAmount };
        } else if (data.title === 'Total Unpaid') {
          return { ...data, amount: countData.data?.data?.totalUnpaidAmount };
        }
        return data;
      });
      setCardData(newData);
      //
      const memberCount = [
        {
          title: 'Total Members',
          amount: countData.data?.data?.activeMember ?? 0,
          color: 'text-blue-500',
          bg: 'bg-blue-300/10',
          href: '/gym-app/member-list?member-status='
        },
        // {
        //   title: 'Total Members',
        //   amount:
        //     countData.data?.data?.activeMember! +
        //       countData.data?.data?.inActiveMember! || 0,
        //   color: 'text-blue-500',
        //   bg: 'bg-blue-300/10',
        //   href: '/gym-app/member-list?member-status='
        // },
        // {
        //   title: 'Active Members',
        //   amount: countData.data?.data?.activeMember ?? 0,
        //   color: 'text-green-500',
        //   bg: 'bg-green-300/10',
        //   href: '/gym-app/member-list?member-status=1'
        // },
        // {
        //   title: 'InActive Members',
        //   amount: countData.data?.data?.inActiveMember ?? 0,
        //   color: 'text-red-500',
        //   bg: 'bg-red-300/10',
        //   href: '/gym-app/member-list?member-status=0'
        // },
        {
          title: 'Plan Expired',
          amount: countData.data?.data?.expiredSub ?? 0,
          color: 'text-red-500',
          bg: 'bg-red-300/10',
          href: '/gym-app/exp-subscription'
        }
      ];
      setMemberCount(memberCount);
    }
  }, [countData?.data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(moment().format('DD-MMM-YYYY hh:mm:ss A'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (countData.isLoading || expList.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <Page title="Home">
      {/* <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user?.imgFullPath} alt="@shadcn" />
            <AvatarFallback className="text-xl text-primary">
              {user?.fullName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-primary font-bold">{user?.fullName}</h1>
            <small className="text-muted-foreground">{user?.email}</small>
          </div>
        </div>
        <Card className="shadow-none rounded-xl bg-secondary">
          <div className="flex items-center gap-4 p-3">
            <Pencil size={20} className="text-primary" />
          </div>
        </Card>
      </div> */}

      <div className="flex justify-between items-center py-2 mt-2">
        <h1 className="font-semibold text-foreground text-sm">Dashboard</h1>
        {/* close this <h1></h1> div if you build for Live  */}
        {/* <h1 className='text-red-500 font-semibold text-foreground text-sm'>Testing Mode</h1> */}   
        <div className="flex items-center gap-4">
          <span className="text-primary font-bold text-xs">
            {/* live date and time and socond */}
            {dateTime}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {memberCount?.map((data, index) => (
          <Link to={data.href} key={index + 1}>
            <Card
              key={index + 1}
              className={`shadow-none rounded-2xl ${data.bg}`}
            >
              <div className="px-4 py-5">
                <div className="flex items-center gap-1">
                  <User size={20} className={data.color} />
                  <span className={`text-lg font-semibold ${data.color}`}>
                    <CountUp end={data.amount!} duration={3} />
                  </span>
                </div>
                <h1 className="text-xs font-semibold">{data.title}</h1>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {/* line */}
      <div className="border-t border-secondary mt-3 mb-3"></div>
      <div className="flex justify-between items-center py-2 mt-5 text-sm">
        <h1 className="text-base font-semibold text-foreground">Transaction</h1>
        {/* some icon */}

        <Link
          to="/gym-app/collection-report"
          className="flex items-center gap-4"
        >
          <span className="text-sm font-semibold text-primary">
            Collection Report
          </span>
          {/* <span className="text-primary font-bold">
            {countData?.data?.data?.totalAmount}
          </span> */}
        </Link>
      </div>
      {/* card data */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {cardData?.map((data, index) => (
          <Link
            to={`/gym-app/payment-list?paymentstatus=${data.paidStatus}`}
            key={index + 1}
          >
            <Card
              key={index + 1}
              className={`shadow-none rounded-2xl ${data.bg}`}
            >
              <div className="px-4 py-5">
                <div className="flex items-center gap-0">
                  <IndianRupee size={20} className={data.color} />
                  <span className={`text-lg font-semibold ${data.color}`}>
                    <CountUp end={data.amount!} duration={3} />
                  </span>
                </div>
                <h1 className="text-xs font-semibold">{data.title}</h1>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {/* line */}
      <div className="border-t border-secondary mt-5"></div>
      {/* member list */}
      <div className="mt-3">
        <div className="flex justify-between items-center">
          <h1 className="text-sm font-semibold text-foreground">
            Recent Expired Subscription ({expList?.data?.data?.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-2">
          {expList?.data?.data?.map((data, index) => (
            <Link
              to={`/gym-app/view-member/${data.member?._id}`}
              key={index + 1}
            >
              <Card
                key={index + 1}
              // className=" shadow-none rounded-2xl bg-secondary"
              >
                <div className="p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center  ">
                      <Avatar className="w-14 h-14 border  dark:border-gray-700">
                        <AvatarImage
                          src={data.member?.fullImgUrl}
                          alt="@shadcn"
                        />
                        <AvatarFallback className="text-base text-primary">
                          {data.member?.memberName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-1">
                        <div className="text-primary font-semibold text-sm flex gap-2">
                          <h1> {data.member?.memberName}</h1>
                          <h1 className="mt-1.5">
                            {data?.member?.status == 1 ? (
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            )}
                          </h1>
                        </div>
                        <div className="text-primary font-bold ">
                          <h1 className="text-muted-foreground text-xs">
                            {data?.member?.mobile}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <small className="text-muted-foreground text-xs">
                        Expire Date
                      </small>
                      <h1 className="text-primary font-semibold text-xs">
                        {moment(data.endDate).format('DD-MMM-YYYY')}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="text-primary font-semibold text-sm px-4 pb-1.5">
                  <small className="text-muted-foreground ">
                    {data.planName} |{' '}
                    {(moment(data.endDate).diff(moment(), 'days') < 0 && (
                      <span className="text-red-500">Expired</span>
                    )) ||
                      (moment(data.endDate).diff(moment(), 'days') >= 0 && (
                        <span className="text-red-500">
                          {moment(data.endDate).diff(moment(), 'days') +
                            1 +
                            ' day left'}
                        </span>
                      ))}
                  </small>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Page>
  );
}
