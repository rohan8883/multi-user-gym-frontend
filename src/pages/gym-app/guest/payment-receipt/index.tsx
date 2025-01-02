import { Card } from '@/components/ui/card';
import { useParams } from 'react-router-dom';
import {  Clock, CheckCircle2 } from 'lucide-react';
import Page from '@/components/helmet-page';
import { useApi } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import { I_PAYMENT_RECEIPT } from './type';
import Spinner from '@/components/loaders/Spinner';


const GymReceipt = () => {
  const { id } = useParams<{ id: string }>();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const receiptData = useApi<I_PAYMENT_RECEIPT>({
    api: `${gymApi.paymentReceiptGuest}/${id}`,
    key: 'get-receipt-by-id-guest',
    value: [id],
    options: {
      enabled: !!id
    }
  });

  if (receiptData.isLoading) {
    return (
      <Page title="Payment Receipt">
        <div className="h-[650px] flex items-center justify-center">
          <Spinner />
        </div>
      </Page>
    );
  }

  // const printReceipt = () => {
  //   const originalContent = document.body.innerHTML;
  //   const printContent =
  //     document.getElementById('printable-section')?.innerHTML;

  //   if (printContent) {
  //     document.body.innerHTML = printContent;
  //     window.print();
  //     // Restore the original content after printing
  //     document.body.innerHTML = originalContent;
  //     window.location.reload(); // To refresh the page and restore functionality
  //   }
  // };

  return (
    <Page title="Payment Receipt" className="bg-gray-100">
      <div className="min-h-screen mt-4 relative">
        {/* Receipt Content */}
        <Card
          className="max-w-md mx-auto bg-white relative z-10"
          id="printable-section"
        >
          {/* Receipt Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
            <img
              src={receiptData?.data?.userDetails?.fullImgUrl}
              alt="Gym Logo"
              className="absolute rounded-md opacity-10  h-44 w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            />
            <div className="text-center  z-10 flex-1">
              <h1 className="text-lg font-bold">{receiptData?.data?.userDetails?.gymName}</h1>
              <p className="text-sm opacity-90">Payment Receipt</p>
            </div>
          </div>

          {/* Receipt Actions */}
          <div className="flex justify-end gap-2 p-2">
            {/* <Button
              variant="ghost"
              size="sm"
              className="text-blue-600"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: 'Payment Receipt',
                      text: 'Here is your payment receipt',
                      url: window.location.href
                    })
                    .then(() => console.log('Successful share'))
                    .catch((error) => console.log('Error sharing', error));
                }
              }}
            >
              <Share className="h-4 w-4" />
            </Button> */}

            {/* <Button
              variant="ghost"
              size="sm"
              className="text-blue-600"
              // onClick={() => window.print()}
              onClick={() => printReceipt()}
            >
              <Printer className="h-4 w-4" />
            </Button> */}
          </div>
          <div className="flex justify-between gap-2 p-2 border-b">
            {/* member name */}
            <h1 className="text-sm font-semibold w-44 truncate">
              {receiptData?.data?.data?.memberId?.memberName}
            </h1>
            {/* Member ID */}
            <div className="flex items-center gap-1 text-sm">
              <span className="font-semibold">
                {receiptData?.data?.data?.memberId?.generatedId}
              </span>
            </div>
          </div>

          {/* Receipt Details */}
          <div className="p-4 space-y-4">
            {/* Receipt Info */}
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-600">Receipt No</p>
                <p className="font-semibold">
                  {receiptData?.data?.data?.receiptNo}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Date</p>
                <p className="font-semibold">
                  {formatDate(String(receiptData?.data?.data?.receiptDate))}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-blue-50 p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Mobile No.</p>
                <p className="font-semibold">
                  {receiptData?.data?.data?.memberId?.mobile}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Status</p>
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-semibold">Paid</span>
                </div>
              </div>
            </div>

            {/* Subscriptions */}
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-gray-600">
                Subscription Details
              </h2>
              <div className="space-y-3">
                {receiptData?.data?.data?.subscriptionId?.map((sub) => (
                  <div
                    key={sub.subscriptionId}
                    className="bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-sm mb-1">Plan</p>
                        <p className="font-semibold text-xs text-gray-600">
                          Paid Amount
                        </p>
                        <p className="font-semibold text-xs text-gray-600">
                          Due Amount
                        </p>
                        <p className="font-semibold text-xs">Total Amount</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {sub.month} Month
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">
                          {sub.planName}
                        </p>
                        <p className="font-semibold text-xs text-gray-600">
                          ₹{sub.paidAmount}
                        </p>
                        <p className="font-semibold text-xs text-gray-600">
                          ₹{sub.dueAmount}
                        </p>
                        <p className="font-semibold text-xs">₹{sub.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDate(sub.startDate)} - {formatDate(sub.endDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-gray-600">
                Payment Summary
              </h2>
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Amount Due</p>
                  <p className="text-sm">
                    ₹{receiptData?.data?.data?.totalDueAmount}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Amount Paid</p>
                  <p className="text-sm">
                    ₹{receiptData?.data?.data?.totalPaidAmount}
                  </p>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <p className="font-semibold">Total Amount</p>
                  <p className="font-semibold">
                    ₹
                    {receiptData?.data?.data?.totalDueAmount! +
                      receiptData?.data?.data?.totalPaidAmount!}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 space-y-1 pt-4 border-t">
              <p>Member ID: {receiptData?.data?.data?.memberId?.generatedId}</p>
              <p className="font-medium">
                Thank you for choosing {receiptData?.data?.userDetails?.gymName}
              </p>
            </div>
          </div>
        </Card>
      </div>
      {/* <div className="flex justify-end">
        <Button variant="ghost" size="sm" className="text-blue-600">
          <Share className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-blue-600">
          <Download className="h-4 w-4" />
        </Button>
      </div> */}
    </Page>
  );
};

export default GymReceipt;
