import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import {
  Trash,
  Phone,
  MessageSquareMore,
  ReceiptIndianRupee,
  ClipboardList,
  Edit
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApi, usePostMutation } from '@/hooks/useCustomQuery';
import { MEMBER_DETAIL } from './type';
import { gymApi } from '@/lib';
import Page from '@/components/helmet-page';
import moment from 'moment';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Confirm } from '@/components/react-confirm-box';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ButtonLoading } from '@/components/forms';
import Spinner from '@/components/loaders/Spinner';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/image';

export default function ViewMember() {
  const navigate = useNavigate();
  const [allSubs, setAllSubs] = useState<string>('0');
  const { id } = useParams();
  const [customDate, setCustomDate] = useState(moment().toISOString());
  const [actualPlan, setActualPlan] = useState<string[]>([]);
  const subscriptionMutate = usePostMutation({});
  const deleteSubsMutate = usePostMutation({});
  const getMemberDetail = useApi<MEMBER_DETAIL>({
    api: `${gymApi.getMember}/${id}`,
    key: 'get-member-detail-view',
    value: [id],
    options: {
      enabled: !!id
    }
  });

  const countAmount = (paidStatus: 'paid' | 'unpaid' | 'due') => {
    // sum paidStatus wise amount
    if (paidStatus === 'paid') {
      const total = getMemberDetail.data?.data?.subscription
        ?.filter((data) => data.paidStatus == 1 || data.paidStatus == 2)
        .reduce((acc, data) => acc + data.paidAmount, 0);
      return total;
    }
    if (paidStatus === 'unpaid') {
      const total = getMemberDetail.data?.data?.subscription
        ?.filter((data) => data.paidStatus == 0)
        .reduce((acc, data) => acc + data.amount, 0);
      return total;
    }
    if (paidStatus === 'due') {
      const total = getMemberDetail.data?.data?.subscription
        ?.filter((data) => data.paidStatus == 2)
        .reduce((acc, data) => acc + data.dueAmount, 0);
      return total;
    }
  };

  useEffect(() => {
    if (getMemberDetail.data?.data?.planMappingId?.length! > 0) {
      const subscribedPlan = getMemberDetail.data?.data?.planMappingId?.map(
        (data) => data._id
      );
      setActualPlan(subscribedPlan as string[]);
      setCustomDate('');
    }
  }, [getMemberDetail.data]);

  const handleAddSub = async () => {
    if (actualPlan.length === 0) {
      return toast.error('Please select at least one plan');
    }

    Confirm(
      'Are you sure?',
      'Do you want to add or renewal subscription?',
      async () => {
        try {
          const result = await subscriptionMutate.mutateAsync({
            api: gymApi.createSubscription,
            data: {
              memberId: id,
              subscriptionData: actualPlan?.map((data) => ({
                planMappingId: data
              })),
              customStartDate: customDate ?? moment().toISOString()
            }
          });
          if (result.data.success) {
            toast.success(result.data.message);
            getMemberDetail.refetch();
          } else {
            toast.error(result.data.message);
          }
        } catch (err) {
          toast.error('Something went wrong');
        }
      }
    );
  };

  const handleDeleteSub = async (subId: string) => {
    Confirm(
      'Are you sure!',
      'Do you want to delete this subscription?',
      async () => {
        try {
          const result = await deleteSubsMutate.mutateAsync({
            api: gymApi.subDeleteById,
            data: {
              id: subId
            }
          });
          if (result.data.success) {
            toast.success(result.data.message);
            getMemberDetail.refetch();
          } else {
            toast.error(result.data.message);
          }
        } catch (err) {
          toast.error('Something went wrong');
        }
      }
    );
  };

  if (getMemberDetail.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <Page title="View Member">
      {/* <div className="flex items-center justify-between mt-4">
        <h1 className="text-xs font-semibold text-muted-foreground">
          Member Detail
        </h1>
      </div> */}
      {/* <div className="border-t border-secondary mt-3"></div> */}
      <Card className="mt-4 p-4">
        <div className="grid grid-cols-2 gap-x-10 gap-y-3">
          <div className="flex gap-3 col-span-2">
            {getMemberDetail.data?.data?.planMappingId?.map((data, index) => (
              <div key={index + 1}>
                <Badge className="bg-secondary text-primary">
                  {data.plan}
                  <small className="text-xs font-semibold text-primary">
                    ({data.month}month)
                  </small>
                </Badge>
              </div>
            ))}
          </div>
          {/* line */}
          <div className="border-t border-secondary  col-span-2"></div>
          <div>
            <h1 className="text-xs font-semibold text-muted-foreground">
              Member Name
            </h1>
            <h1 className="text-xs font-semibold">
              {getMemberDetail.data?.data?.memberName}
            </h1>
          </div>
          <div>
            <h1 className="text-xs font-semibold text-muted-foreground">
              Member ID
            </h1>
            <h1 className="text-xs font-semibold">
              {getMemberDetail.data?.data?.generatedId}
            </h1>
          </div>
          {/* <div>
            <h1 className="text-xs font-semibold text-muted-foreground">
              Email
            </h1>
            <h1 className="text-xs font-semibold w-4 truncate">
              {getMemberDetail.data?.data?.email}
            </h1>
          </div> */}
          <div>
            <h1 className="text-xs font-semibold text-muted-foreground">
              Mobile
            </h1>
            <h1 className="text-xs font-semibold">
              {getMemberDetail.data?.data?.mobile}
            </h1>
          </div>
          <div>
            <h1 className="text-xs font-semibold text-muted-foreground">
              Date of Birth
            </h1>
            <h1 className="text-xs font-semibold">
              {moment(getMemberDetail.data?.data?.dob).format('DD-MMM-YYYY')}
            </h1>
          </div>
          <div>
            <h1 className="text-xs font-semibold text-muted-foreground">
              Weight
            </h1>
            <h1 className="text-xs font-semibold">
              {getMemberDetail.data?.data?.weight}
            </h1>
          </div>
          {/* receipt icon, whatsapp icon, callicon flex */}
          <div className="col-span-2">
            <div className="flex justify-center gap-6 items-center">
              <Phone
                className="h-6 w-6 text-green-600"
                onClick={() =>
                  window.open(`tel:${getMemberDetail.data?.data?.mobile}`)
                }
              />
              <MessageSquareMore
                className="h-6 w-6 text-blue-600"
                onClick={() =>
                  window.open(
                    `sms:${getMemberDetail.data?.data?.mobile}`,
                    `sms:${getMemberDetail.data?.data?.mobile}`
                  )
                }
              />
              <Image
                onClick={() => {
                  window.open(
                    `https://wa.me/${getMemberDetail.data?.data?.mobile}`
                  );
                }}
                src="/whatsapp.svg"
                alt="whatsapp"
                width={24}
                height={24}
              />
              <ReceiptIndianRupee
                className="h-6 w-6 text-primary"
                onClick={() => {
                  navigate(`/gym-app/receipt-list?member-id=${id}`);
                }}
              />
              <ClipboardList
                className="h-6 w-6 "
                onClick={() => {
                  navigate(`/gym-app/member-gym-id/${id}`);
                }}
              />
              <Edit
                className="h-6 w-6 text-red-700"
                onClick={() => {
                  navigate(`/gym-app/update-member/${id}`);
                }}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-secondary mt-4"></div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-green-700">
            <h1 className="text-xs font-semibold">Total Paid</h1>
            <h1 className="text-sm font-semibold">{countAmount('paid')}</h1>
          </div>
          <div className="text-blue-700">
            <h1 className="text-xs font-semibold">Total Due</h1>
            <h1 className="text-sm font-semibold">{countAmount('due')}</h1>
          </div>
          <div className="text-red-700">
            <h1 className="text-xs font-semibold ">Total Unpaid</h1>
            <h1 className="text-sm font-semibold">{countAmount('unpaid')}</h1>
          </div>
        </div>
      </Card>
      {/* line */}
      <div className="border-t border-secondary mt-3"></div>
      <Card className="mt-4 p-4">
        {deleteSubsMutate?.isPending ? (
          <div className="flex justify-center items-center h-16">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              {/* heading for date */}
              <h1 className="text-xs font-semibold text-muted-foreground">
                Choose Renewal Date
              </h1>
              <Input
                type="date"
                value={
                  customDate
                    ? moment(customDate).format('YYYY-MM-DD')
                    : moment().format('YYYY-MM-DD')
                }
                onChange={(e) => setCustomDate(e.target.value)}
                placeholder="Enter Custom Date"
              />
            </div>
            <div className="col-span-2 flex gap-3">
              {getMemberDetail.data?.data?.planMappingId?.map((data, index) => (
                <div key={index + 1} className="flex gap-12 mr-4">
                  <div>
                    <input
                      type="checkbox"
                      checked={actualPlan.includes(data._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setActualPlan([...actualPlan, data._id]);
                        } else {
                          setActualPlan(
                            actualPlan.filter((item) => item !== data._id)
                          );
                        }
                      }}
                    />{' '}
                    <label
                      className="font-bold text-xs text-muted-foreground"
                      htmlFor="plan"
                    >
                      {data.plan}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {getMemberDetail.data?.data?.subscription?.length! > 0 && (
              <div>
                <Button
                  size="sm"
                  className="bg-primary text-white w-full"
                  onClick={() => {
                    navigate(`/gym-app/payment/${id}`);
                  }}
                >
                  Proceed Payment
                </Button>
              </div>
            )}

            <div
              className={`
              ${
                getMemberDetail.data?.data?.subscription?.length! > 0
                  ? 'col-span-1'
                  : 'col-span-2'
              }
              `}
            >
              <ButtonLoading
                isLoading={subscriptionMutate.isPending}
                disabled={subscriptionMutate.isPending}
                size="sm"
                className="bg-red-900 text-white w-full hover:bg-red-800"
                onClick={handleAddSub}
              >
                {getMemberDetail.data?.data?.subscription?.length! > 0
                  ? 'Renew Subscription'
                  : 'Add Subscription'}
              </ButtonLoading>
            </div>
          </div>
        )}
      </Card>
      <div className="border-t border-secondary mt-6"></div>

      {getMemberDetail.data?.data?.subscription?.length! > 0 ? (
        <Tabs defaultValue={allSubs} className="w-full ">
          <TabsList className="w-full overflow-x-scroll h-8">
            <TabsTrigger
              className={`w-full text-xs`}
              value="0"
              onClick={() => {
                setAllSubs('0');
              }}
            >
              Current Subscription
            </TabsTrigger>
            {/* <TabsTrigger
              className={`w-full text-xs`}
              value="1"
              onClick={() => {
                setAllSubs('1');
              }}
            >
              Old Subs
            </TabsTrigger> */}
            <TabsTrigger
              className={`w-full text-xs`}
              value="2"
              onClick={() => {
                setAllSubs('2');
              }}
            >
              All Subscription
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="0"
            className="text-muted-foreground font-semibold"
          >
            {getMemberDetail?.data?.data?.subscription?.map((item) =>
              getMemberDetail.data?.data?.ExpStatus?.map((itm) => {
                if (itm.subsId === item._id) {
                  return (
                    <Card key={itm.subsId} className="mt-2 p-4">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-secondary text-primary">
                          {item.planName}
                          {/* space */}
                          <span className="ml-1"></span>
                          <small className="text-xs font-semibold text-primary">
                            ({item.month} month)
                          </small>
                        </Badge>
                        {moment(item.endDate).diff(moment(), 'days') + 1 <=
                        0 ? (
                          <span className="text-red-500 text-xs font-semibold">
                            Expired
                          </span>
                        ) : (
                          <span className="text-green-500 text-xs font-semibold">
                            {moment(item.endDate).diff(moment(), 'days') +
                              1 +
                              ' days left'}
                          </span>
                        )}
                        {item.paidStatus === 0 && (
                          <Trash
                            className="h-4 w-4 cursor-pointer text-red-600"
                            onClick={() => handleDeleteSub(item._id)}
                          />
                        )}
                      </div>
                      {/* line */}
                      <div className="border-t border-secondary mt-3 mb-1"></div>
                      <div className="grid grid-cols-4 gap-2.5">
                        <div className="col-span-2">
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            Start Date
                          </h1>
                          <h1 className="text-xs font-semibold">
                            {moment(item.startDate).format('DD-MMM-YYYY')}
                          </h1>
                        </div>
                        <div className="col-span-2">
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            End Date
                          </h1>
                          <h1 className="text-xs font-semibold">
                            {moment(item.endDate).format('DD-MMM-YYYY')}
                          </h1>
                        </div>
                        {/* line */}
                        <div className="border-t border-secondary  col-span-4"></div>
                        <div>
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            Amount
                          </h1>
                          <h1 className="text-xs font-semibold">
                            {item.amount}
                          </h1>
                        </div>
                        <div>
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            Paid
                          </h1>
                          <h1 className="text-xs font-semibold">
                            {item.paidAmount}
                          </h1>
                        </div>

                        <div>
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            Due
                          </h1>
                          <h1 className="text-xs font-semibold">
                            {item.dueAmount}
                          </h1>
                        </div>
                        <div>
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            Status
                          </h1>
                          {(item.paidStatus === 0 && (
                            <small className="text-red-600 font-bold text-xs">
                              UNPAID
                            </small>
                          )) ||
                            (item.paidStatus === 1 && (
                              <small className="text-green-600 font-bold text-xs">
                                PAID
                              </small>
                            )) ||
                            (item.paidStatus === 2 && (
                              <small className="text-blue-600 font-bold text-xs">
                                DUE
                              </small>
                            ))}
                        </div>
                      </div>
                    </Card>
                  );
                }
              })
            )}
          </TabsContent>
          {/* <TabsContent
            value="1"
            className="text-muted-foreground font-semibold"
          >
            {getMemberDetail?.data?.data?.subscription?.map((item) =>
              getMemberDetail.data?.data?.ExpStatus?.map((itm) => {
                if (itm.subsId != item._id) {
                  return (
                    <Card key={itm.subsId} className="mt-2 p-4">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-secondary text-primary">
                          {item.planName}

                          <span className="ml-1"></span>
                          <small className="text-xs font-semibold text-primary">
                            ({item.month} month)
                          </small>
                        </Badge>

                        <span className="text-blue-500 text-xs font-semibold">
                          Old Subscription
                        </span>
                        {item.paidStatus === 0 && (
                          <Trash
                            className="h-4 w-4 cursor-pointer text-red-600"
                            onClick={() => handleDeleteSub(item._id)}
                          />
                        )}
                      </div>

                      <div className="border-t border-secondary mt-3 mb-1"></div>
                      <div className="grid grid-cols-4 gap-2.5">
                        <div className="col-span-2">
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            Start Date
                          </h1>
                          <h1 className="text-xs font-semibold">
                            {moment(item.startDate).format('DD-MMM-YYYY')}
                          </h1>
                        </div>
                        <div className="col-span-2">
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            End Date
                          </h1>
                          <h1 className="text-xs font-semibold">
                            {moment(item.endDate).format('DD-MMM-YYYY')}
                          </h1>
                        </div>

                        <div className="border-t border-secondary  col-span-4"></div>
                        <div>
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            Amount
                          </h1>
                          <h1 className="text-xs font-semibold">
                            {item.amount}
                          </h1>
                        </div>
                        <div>
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            Paid
                          </h1>
                          <h1 className="text-xs font-semibold">
                            {item.paidAmount}
                          </h1>
                        </div>

                        <div>
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            Due
                          </h1>
                          <h1 className="text-xs font-semibold">
                            {item.dueAmount}
                          </h1>
                        </div>
                        <div>
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            Status
                          </h1>
                          {(item.paidStatus === 0 && (
                            <small className="text-red-600 font-bold text-xs">
                              UNPAID
                            </small>
                          )) ||
                            (item.paidStatus === 1 && (
                              <small className="text-green-600 font-bold text-xs">
                                PAID
                              </small>
                            )) ||
                            (item.paidStatus === 2 && (
                              <small className="text-blue-600 font-bold text-xs">
                                DUE
                              </small>
                            ))}
                        </div>
                      </div>
                    </Card>
                  );
                }
              })
            )}
          </TabsContent> */}
          <TabsContent
            value="2"
            className="text-muted-foreground font-semibold"
          >
            {getMemberDetail.data?.data?.subscription?.map((data, index) => (
              <Card key={index + 1} className="mt-2 p-4">
                <div className="flex justify-between items-center">
                  <Badge className="bg-secondary text-primary">
                    {data.planName}
                    {/* space */}
                    <span className="ml-1"></span>
                    <small className="text-xs font-semibold text-primary">
                      ({data.month} month)
                    </small>
                  </Badge>

                  {getMemberDetail?.data?.data?.ExpStatus?.find(
                    (exp) => exp.subsId == data._id
                  ) ? (
                    moment(data.endDate).diff(moment(), 'days') + 1 <= 0 ? (
                      <span className="text-red-500 text-xs font-semibold">
                        Expired
                      </span>
                    ) : (
                      <span className="text-green-500 text-xs font-semibold">
                        {moment(data.endDate).diff(moment(), 'days') +
                          1 +
                          ' days left'}
                      </span>
                    )
                  ) : (
                    <span className="text-blue-500 text-xs font-semibold">
                      Old Subscription
                    </span>
                  )}

                  {data.paidStatus == 0 && (
                    <Trash
                      className="h-4 w-4 cursor-pointer text-red-600"
                      onClick={() => handleDeleteSub(data._id)}
                    />
                  )}
                </div>
                {/* line */}
                <div className="border-t border-secondary mt-3 mb-1"></div>
                <div className="grid grid-cols-4 gap-2.5">
                  <div className="col-span-2">
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Start Date
                    </h1>
                    <h1 className="text-xs font-semibold">
                      {moment(data.startDate).format('DD-MMM-YYYY')}
                    </h1>
                  </div>
                  <div className="col-span-2">
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      End Date
                    </h1>
                    <h1 className="text-xs font-semibold">
                      {moment(data.endDate).format('DD-MMM-YYYY')}
                    </h1>
                  </div>
                  {/* line */}
                  <div className="border-t border-secondary  col-span-4"></div>
                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Amount
                    </h1>
                    <h1 className="text-xs font-semibold">
                      {/* {data?.amount - data?.paidAmount - data?.dueAmount} */}
                      {data?.amount}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Paid
                    </h1>
                    <h1 className="text-xs font-semibold">
                      {data?.paidAmount}
                    </h1>
                  </div>

                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Due
                    </h1>
                    <h1 className="text-xs font-semibold">{data.dueAmount}</h1>
                  </div>
                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Status
                    </h1>
                    {(data.paidStatus === 0 && (
                      <small className="text-red-600 font-bold text-xs">
                        UNPAID
                      </small>
                    )) ||
                      (data.paidStatus === 1 && (
                        <small className="text-green-600 font-bold text-xs">
                          PAID
                        </small>
                      )) ||
                      (data.paidStatus === 2 && (
                        <small className="text-blue-600 font-bold text-xs">
                          DUE
                        </small>
                      ))}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex justify-center items-center h-20">
          <div className="text-center">
            <h1 className="text-sm  font-semibold text-muted-foreground">
              No Subscription Found!
            </h1>
            <small className="text-xs font-semibold text-muted-foreground">
              Please add new subscription.
            </small>
          </div>
        </div>
      )}
    </Page>
  );
}
