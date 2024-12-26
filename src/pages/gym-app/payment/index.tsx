import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useApi, usePutMutation } from '@/hooks/useCustomQuery';
import { I_DUE_AMOUNT } from './type';
import { gymApi } from '@/lib';
import Page from '@/components/helmet-page';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { RHFTextField, FormProviders, ButtonLoading } from '@/components/forms';
import { Confirm } from '@/components/react-confirm-box';
import Spinner from '@/components/loaders/Spinner';
import { Image } from '@/components/image';

// const MODE = [
//   {
//     label: 'Cash',
//     value: 'cash'
//   },
//   {
//     label: 'Online',
//     value: 'online'
//   }
// ];

const schema = yup.object().shape({
  subData: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      amount: yup.number(),
      paidAmount: yup.number().required('Paid Amount is required'),
      dueAmount: yup.number(),
      paidStatus: yup.number(),
      startDate: yup.string(),
      endDate: yup.string(),
      planName: yup.string(),
      month: yup.string()
    })
  )
});

type AddSubType = yup.InferType<typeof schema>;

export default function Payment() {
  // const [paymentMode, setPaymentMode] = useState<string>('cash');
  const navigate = useNavigate();
  const paymentMutation = usePutMutation({});
  const { id } = useParams();
  const getDueSubs = useApi<I_DUE_AMOUNT>({
    api: `${gymApi.getDueSubscription}/${id}`,
    key: 'get-member-detail-view-payment',
    value: [id],
    options: {
      enabled: !!id
    }
  });

  const defaultValue = useMemo(() => {
    return {
      subData: getDueSubs.data?.data?.subscription
        ?.filter?.((item) => item.paidStatus == 0)
        .map((data) => ({
          id: data._id,
          amount: data?.amount,
          paidAmount: data?.amount,
          dueAmount: 0,
          paidStatus: data?.paidStatus,
          startDate: data.startDate || '',
          endDate: data.endDate || '',
          planName: data.planName || '',
          month: data.month || ''
        }))
    };
  }, [getDueSubs.data?.data?.subscription]);

  const methods = useForm<AddSubType>({
    defaultValues: defaultValue
    // resolver: yupResolver(schema)
  });
  const { handleSubmit, watch, control } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'subData'
  });

  const onSubmit = async (data: AddSubType) => {
    const subData = data?.subData?.map((item) => ({
      id: item.id,
      paidAmount: Number(item.paidAmount) + Number(item.dueAmount),
      dueAmount: item?.amount! - item.paidAmount - item.dueAmount!,
      planName: item.planName,
      amount: item.amount,
      startDate: item.startDate,
      endDate: item.endDate,
      month: item.month,
      prevDueAmount: item.dueAmount
    }));

    const dueData = filterSubDate(2)?.map((item) => ({
      id: item._id,
      paidAmount: Number(item.paidAmount) + Number(item.dueAmount),
      dueAmount: item?.amount - item.paidAmount - item?.dueAmount,
      planName: item.planName,
      amount: item.amount,
      startDate: item.startDate,
      endDate: item.endDate,
      month: item.month,
      prevDueAmount: item.dueAmount
    }));

    const finalData = [...(subData || []), ...(dueData || [])];
    console.log('subData', finalData);
    if (finalData?.some((data) => data.paidAmount == 0)) {
      return toast.error('Please enter paid amount');
    }
    Confirm(
      'Are you sure?',
      'You want to pay amount for this Member?',
      async () => {
        try {
          const result = await paymentMutation.mutateAsync({
            api: gymApi.updateSubscription,
            data: {
              memberId: id,
              subData: finalData
            }
          });
          if (result.data.success) {
            toast.success(result.data.message);
            navigate(`/gym-app/payment-receipt/${result.data.data._id}`);
          } else {
            toast.error(result.data.message);
          }
        } catch (err) {
          toast.error('Something went wrong');
        }
      }
    );
  };

  useEffect(() => {
    if (defaultValue) {
      methods.reset(defaultValue);
    }
  }, [defaultValue]);

  const filterSubDate = (paidStatus: number) => {
    return getDueSubs?.data?.data?.subscription?.filter(
      (data) => data.paidStatus == paidStatus
    );
  };

  if (getDueSubs.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <Page title="Payment">
      <Card className="mt-4 p-4 shadow-none bg-secondary">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h1 className="text-xs font-semibold text-muted-foreground">
              Member Name
            </h1>
            <h1 className="text-sm font-semibold">
              {getDueSubs.data?.data?.memberName}
            </h1>
          </div>
          <div>
            <h1 className="text-xs font-semibold text-muted-foreground">
              Member ID
            </h1>
            <h1 className="text-sm font-semibold">
              {getDueSubs.data?.data?.generatedId}
            </h1>
          </div>
        </div>
      </Card>
      {/* <div className="border-t border-gray-100 mt-3"></div> */}
      {(getDueSubs.data?.data?.subscription?.length ?? 0) == 0 ? (
        <div className="flex items-center justify-center h-[500px]">
          <div>
            <div className="text-center flex justify-center items-center">
              <Image src="/check.svg" alt="No data" className="h-24 w-24" />
            </div>
            <div className="text-center mt-1">
              <h1 className="text-sm font-semibold text-muted-foreground">
                No Due Amount
              </h1>
              <h1 className="text-sm font-semibold">All dues are cleared</h1>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={() => navigate(-1)}
                className="text-xs font-semibold text-primary"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* line */}
          {/* previous due amount */}
          {filterSubDate(2)?.length! > 0 && (
            <div className="mt-6">
              <h1 className="text-sm font-semibold text-muted-foreground">
                Due Amount List
              </h1>
              <div className="">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="py-1">
                        <small>
                          <strong>Plan</strong>
                        </small>
                      </TableHead>
                      <TableHead className="py-1">
                        <small>
                          <strong>Expire</strong>
                        </small>
                      </TableHead>
                      <TableHead className="py-1">
                        <small>Amount</small>
                      </TableHead>
                      <TableHead className="py-1">
                        <small>Paid</small>
                      </TableHead>
                      <TableHead className="py-1">
                        <small>Due</small>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterSubDate(2)?.map((itm) => (
                      <TableRow key={itm._id}>
                        <TableCell className="py-2">
                          <small>{itm.planName}</small>
                        </TableCell>
                        <TableCell className="py-2">
                          {
                            // if enddate is less than current date then show expired
                            moment(itm.endDate).diff(moment(), 'days') < 0
                              ? 'Expired'
                              : moment(itm.endDate).diff(moment(), 'days') +
                                ' days'
                          }
                        </TableCell>
                        <TableCell className="py-2">{itm.amount}</TableCell>
                        <TableCell className="py-2">{itm.paidAmount}</TableCell>
                        <TableCell className="py-2">{itm?.dueAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 mt-5"></div>

          {/* using div not table */}
          <FormProviders methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              {fields?.map((itm, index) => (
                <div key={itm.id} className="grid grid-cols-3 gap-3">
                  <div className="col-span-3">
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Plan
                    </h1>
                    <h1 className="text-xs font-semibold">
                      {itm.planName} ({itm.month} month)
                      <small className="text-muted-foreground text-xs"></small>
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Start Date
                    </h1>
                    <h1 className="text-xs font-semibold">
                      {moment(itm.startDate).format('DD-MMM-YYYY')}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      End Date
                    </h1>
                    <h1 className="text-xs font-semibold">
                      {moment(itm.endDate).format('DD-MMM-YYYY')}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Expired In
                    </h1>

                    {
                      // if enddate is less than current date then show expired
                      moment(itm.endDate).diff(moment(), 'days') < 0 ? (
                        <h1 className="text-xs font-semibold text-red-600">
                          {' '}
                          Expired
                        </h1>
                      ) : (
                        <h1 className="text-xs font-semibold text-green-600">
                          {moment(itm.endDate).diff(moment(), 'days') + ' days'}
                        </h1>
                      )
                    }
                  </div>
                  {/* line */}
                  <div className="border-t border-gray-200 py-0 col-span-3"></div>
                  {/* line */}
                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Amount
                    </h1>
                    <h1 className="text-xs font-semibold">{itm.amount}</h1>
                  </div>
                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Paid
                    </h1>
                    <h1 className="text-xs font-semibold">
                      {/*@ts-ignore */}
                      {watch(`subData[${index}].paidAmount`)}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Due
                    </h1>
                    <h1 className="text-xs font-semibold">
                      {itm.amount! -
                        // @ts-ignore
                        parseInt(watch(`subData[${index}].paidAmount`))}
                    </h1>
                  </div>
                  <div className="col-span-3">
                    <RHFTextField
                      className="w-full"
                      name={`subData[${index}].paidAmount`}
                      type="number"
                      onInput={(
                        e: React.FormEvent<HTMLInputElement> & {
                          target: HTMLInputElement;
                        }
                      ) => {
                        if (parseInt(e.target.value) > itm.amount!) {
                          // @ts-ignore
                          e.target.value = itm.amount!;
                        }
                      }}
                    />
                  </div>

                  <div className="border-t border-gray-200 py-2 col-span-3"></div>

                  {/* line */}
                  <div className="border-t border-gray-200 py-2 col-span-3"></div>
                </div>
              ))}
              {/* total */}

              <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                <div className="text-green-700">
                  <h1 className="text-xs font-semibold">Amount</h1>
                </div>
                <div className="text-green-700">
                  <h1 className="text-xs font-semibold">
                    ₹
                    {watch('subData')?.reduce(
                      (acc, field) => acc + Number(field?.amount),
                      0
                    )}
                  </h1>
                </div>
                <div className="text-blue-700">
                  <h1 className="text-xs font-semibold">
                    {' '}
                    Previous due amount
                  </h1>
                </div>
                <div className="text-blue-700">
                  <h1 className="text-xs font-semibold">
                    +₹
                    {filterSubDate(2)?.reduce(
                      (acc, field) => acc + Number(field?.dueAmount),
                      0
                    )}
                  </h1>
                </div>

                <div className="text-cyan-700">
                  <h1 className="text-xs font-semibold"> Current due amount</h1>
                </div>
                <div className="text-cyan-700">
                  <h1 className="text-xs font-semibold">
                    -₹
                    {watch('subData')?.reduce(
                      (acc, field) => acc + Number(field?.amount!),
                      0
                    )! -
                      watch('subData')?.reduce(
                        (acc, field) => acc + Number(field?.paidAmount),
                        0
                      )!}
                  </h1>
                </div>

                <div className="text-red-700">
                  <h1 className="text-xs font-semibold ">Paid amount</h1>
                </div>
                <div className="text-red-700">
                  <h1 className="text-xs font-semibold">
                    ₹
                    {watch('subData')!?.reduce(
                      (acc, field) => acc + Number(field.paidAmount),
                      0
                    ) +
                      filterSubDate(2)!?.reduce(
                        (acc, field) => acc + Number(field?.dueAmount),
                        0
                      )}
                  </h1>
                </div>
              </div>

              {/* line */}
              <div className="py-2" />
              {/* <div className="border-t border-gray-200 py-2"></div> */}

              {/* <div className="flex items-center justify-center space-x-2 gap-6 mb-3">
                {MODE.map((itm) => (
                  <div key={itm.value}>
                    <input
                      type="radio"
                      className="mr-1"
                      value={itm.value}
                      checked={paymentMode === itm.value}
                      onChange={() => setPaymentMode(itm.value)}
                    />
                    <label>{itm.label}</label>
                  </div>
                ))}
              </div> */}
              {/* line */}
              <div className="border-t border-gray-200 py-2"></div>
              {/* line */}
              <div className="flex justify-center items-center mt-4">
                <ButtonLoading
                  type="submit"
                  size="sm"
                  isLoading={paymentMutation.isPending}
                >
                  <small className="font-bold w-24">PAY NOW</small>
                </ButtonLoading>
              </div>
            </div>
          </FormProviders>
        </>
      )}
    </Page>
  );
}
