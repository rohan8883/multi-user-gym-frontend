import { useState } from 'react';
import moment from 'moment';
import Page from '@/components/helmet-page';
import { Card } from '@/components/ui/card';
import { useApi } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import { I_PAYMENT_LIST_TYPE } from './type';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PaginationComponent from '@/components/pagination';
import LoaderList from '@/components/loader-list';

export default function PaymentList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const location = useLocation();
  const search =
    new URLSearchParams(location.search).get('paymentstatus') ?? '';

  const payStatus = search == '0' ? '0' : '';

  const paymentList = useApi<I_PAYMENT_LIST_TYPE>({
    api: `${gymApi.amountList}?page=${page}&limit=${limit}&paidstatus=${search}`,
    key: 'paymentListAmount',
    value: [page, limit, payStatus],
    options: { enabled: true }
  });

  // filter list by amount, due, paid amount , if amount is 0 , due amount is 0, paid amount is 0 , then it will be unpaid
  // const filterList = () => {
  //   return paymentList.data?.data.docs?.filter((item: any) => {
  //     // if (search == '0') {
  //     //   return item.amount - item.paidAmount > 0;
  //     // } else if (search == '1') {
  //     //   return item.paidAmount > 0;
  //     // } else if (search == '2') {
  //     //   return item.dueAmount > 0;
  //     // } else {
  //     //   return item;
  //     // }
  //     switch (search) {
  //       case '0':
  //         return item.amount - item.paidAmount > 0;
  //       case '1':
  //         return item.paidAmount > 0;
  //       case '2':
  //         return item.dueAmount > 0;
  //       default:
  //         return item;
  //     }
  //   });
  // };

  return (
    <Page title="Transaction List">
      <LoaderList
        isLoading={paymentList.isLoading}
        dataLength={paymentList.data?.data.docs?.length!}
      >
        {/* total amount */}
        <div className="flex justify-between items-center  mt-2 mb-2">
          <h1
            className={`text-sm font-semibold 
          ${search == '0' && 'text-red-700'}
          ${search == '1' && 'text-green-700'}
          ${search == '2' && 'text-blue-700'}
          
            `}
          >
            Total Amount-:{' '}
            {/* {(search == '0' &&
              filterList()?.reduce((acc, item) => acc + item.amount, 0)) ||
              (search == '1' &&
                filterList()?.reduce(
                  (acc, item) => acc + item.paidAmount,
                  0
                )) ||
              (search == '2' &&
                filterList()?.reduce((acc, item) => acc + item.dueAmount, 0)) ||
              (search == '' &&
                filterList()?.reduce((acc, item) => acc + item.amount, 0))} */}
            {(search == '0' &&
              paymentList.data?.data?.totalAmt?.totalUnpaidAmount) ||
              (search == '1' &&
                paymentList.data?.data?.totalAmt?.totalPaidAmount) ||
              (search == '2' &&
                paymentList.data?.data?.totalAmt?.totalDueAmount) ||
              (search == '' && paymentList.data?.data?.totalAmt?.totalAmount)}
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {paymentList.data?.data.docs?.map((data, index) => (
            <Card
              key={index + 1}
              className=" shadow-none rounded-2xl bg-secondary"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <h1 className="text-base font-semibold text-foreground">
                        Name-: {data.member.memberName}
                      </h1>
                      <small className="text-xs font-semibold text-muted-foreground">
                        Email-: {data?.member?.email}
                      </small>
                      <div>
                        <h1 className="text-xs font-semibold text-muted-foreground">
                          Mobile-: {data?.member?.mobile}
                        </h1>
                        {/* with join comma*/}
                        <h1 className="text-xs font-semibold text-muted-foreground">
                          Plan-: {data.member.planName}
                        </h1>
                      </div>
                      <div>
                        {(search == '0' && (
                          <h1 className="text-xs font-semibold text-muted-foreground">
                            Unpaid Amount-: {data?.amount - data?.paidAmount}
                          </h1>
                        )) ||
                          (search == '1' && (
                            <h1 className="text-xs font-semibold text-muted-foreground">
                              Paid Amount-: {data?.paidAmount}
                            </h1>
                          )) ||
                          (search == '2' && (
                            <h1 className="text-xs font-semibold text-muted-foreground">
                              Due Amount-: {data?.dueAmount}
                            </h1>
                          )) ||
                          (search == '' && (
                            <h1 className="text-xs font-semibold text-muted-foreground">
                              Total Amount-: {data?.amount}
                            </h1>
                          ))}

                        {/* with join comma*/}
                      </div>
                      <div>
                        {/* with join comma*/}
                        <h1 className="text-xs font-semibold text-muted-foreground">
                          Start date-:{' '}
                          {moment(data.startDate).format('DD-MM-YYYY')}
                        </h1>
                        <h1 className="text-xs font-semibold text-muted-foreground">
                          End date-: {moment(data.endDate).format('DD-MM-YYYY')}
                        </h1>
                      </div>
                    </div>
                  </div>
                  {/* menu bar */}
                  <div className="flex flex-col gap-3">
                    <div>
                      <Button
                        size={'sm'}
                        className="bg-blue-100 text-white rounded-xl"
                        onClick={() =>
                          navigate(`/gym-app/view-member/${data?.member._id}`)
                        }
                      >
                        <Eye size={15} className="text-blue-600" />
                      </Button>
                    </div>
                    <div>
                      <Button
                        size={'sm'}
                        className="bg-green-100 text-white rounded-xl"
                        onClick={() =>
                          navigate(`/gym-app/update-member/${data?.member._id}`)
                        }
                      >
                        <PencilIcon size={15} className="text-green-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {/* pagination */}
        <div className="flex justify-end mt-3">
          <PaginationComponent
            page={page}
            perPage={limit}
            totalPage={paymentList.data?.data.totalDocs}
            hasNextPage={paymentList.data?.data?.hasNextPage}
            hasPrevPage={paymentList.data?.data.hasPrevPage}
            setPage={setPage}
            setPerPage={setLimit}
          />
        </div>
      </LoaderList>
    </Page>
  );
}
