import { useParams } from 'react-router-dom';
import { Share, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Page from '@/components/helmet-page';
import { useApi } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import Spinner from '@/components/loaders/Spinner';
// import { MEMBER_DETAIL } from '../view-member/type';
import moment from 'moment';
// import profile from '/public/user.png'
const GymReceipt = () => {
  const { id } = useParams<{ id: string }>();
  const getMemberDetail = useApi<any>({
    api: `${gymApi.getMember}/${id}`,
    key: 'get-member-gym-id-card',
    value: [id],
    options: {
      enabled: !!id
    }
  });

  const printReceipt = () => {
    const originalContent = document.body.innerHTML;
    const printContent =
      document.getElementById('printable-section')?.innerHTML;

    if (printContent) {
      document.body.innerHTML = printContent;
      window.print();
      // Restore the original content after printing
      document.body.innerHTML = originalContent;
      window.location.reload(); // To refresh the page and restore functionality
    }
  };

  if (getMemberDetail.isLoading) {
    return (
      <Page title="Member GYM ID Card">
        <div className="h-[650px] flex items-center justify-center">
          <Spinner />
        </div>
      </Page>
    );
  }


  return (
    <Page title="Member GYM ID Card" className="bg-gray-100">
      <div className="flex justify-center mt-4">
        <h1 className="text-xl font-bold text-gray-800">Member GYM ID Card</h1>
      </div>
      <div className="mt-4">
        <div className="w-full h-[500px] bg-gradient-to-br from-blue-900 to-black rounded-lg overflow-hidden shadow-xl relative">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
            <img
             src={getMemberDetail?.data?.data?.userDetails?.fullImgUrl}
              alt="Watermark Logo"
              className="w-80 opacity-40"
            />
          </div>

          {/* Main Card Content */}
          <div className="relative p-6 flex flex-col h-full z-10">
            {/* Top Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 transform rotate-45 translate-x-16 -translate-y-16" />

            {/* Logo and Title */}
            <div className="text-white mb-8">
              <h3 className="text-xl font-bold uppercase">{getMemberDetail?.data?.data?.userDetails?.gymName}</h3>
              <p className="text-xs text-gray-300">
                Professional Training Services
              </p>
            </div>

            {/* Member Info */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <img
                  src={ getMemberDetail?.data?.data?.fullImgUrl}
                  alt="Member"
                  className="w-24 h-24 rounded-full"
                />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">
                {getMemberDetail?.data?.data?.memberName}
              </h2>
              <p className="text-yellow-500 font-semibold uppercase tracking-wider mb-4">
                {getMemberDetail?.data?.data?.mobile}
              </p>
              <p className="text-gray-400 font-semibold tracking-wider mb-4 text-sm w-72 text-center truncate">
                {getMemberDetail?.data?.data?.planMappingId
                  ?.map((data:any) => data.plan)
                  .join(', ')}
              </p>
            </div>

            {/* ID and DOB Info */}
            <div className="mt-auto">
              <div className="border-t border-gray-600 pt-4">
                <div className="flex justify-between text-gray-300 text-sm mb-2">
                  <span>ID No:</span>
                  <span>{getMemberDetail?.data?.data?.generatedId}</span>
                </div>
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>DOB:</span>
                  <span>
                    {moment(getMemberDetail?.data?.data?.dob).format(
                      'DD-MMM-YYYY'
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* share button and print button */}
      <div className="flex justify-end gap-2 p-2 border-b">
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600"
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: 'ID Card',
                  text: 'Here is your ID card',
                  url: `/gym-app/guest-id-card/${id}`
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
            }
          }}
        >
          <Share className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600"
          // onClick={() => window.print()}
          onClick={() => printReceipt()}
        >
          <Printer className="h-4 w-4" />
        </Button>
      </div>
    </Page>
  );
};

export default GymReceipt;
