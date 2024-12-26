import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Page from '@/components/helmet-page';
import { useApi } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import { I_COLLECTION_LIST } from './type';
import PaginationComponent from '@/components/pagination';
import LoaderList from '@/components/loader-list';
import { Input } from '@/components/ui/input';

export default function MemberList() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const collectionReportData = useApi<I_COLLECTION_LIST>({
    api: `${gymApi.collectionReport}?page=${page}&limit=${limit}&fromDate=${fromDate}&toDate=${toDate}`,
    key: 'collectionReport',
    value: [page, limit],
    options: {
      enabled: true
    }
  });

  return (
    <Page title="Member List">
      <div className="border-t border-secondary mt-3 mb-2"></div>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-3">
          <Input
            type="date"
            value={fromDate ? fromDate : new Date().toISOString().split('T')[0]}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder="From Date"
            className="w-full"
            //  to date should be greater than from date
            min={toDate ? new Date(toDate).toISOString().split('T')[0] : ''}
          />
          <Input
            type="date"
            min={
              fromDate
                ? new Date(fromDate).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]
            }
            value={toDate ? toDate : new Date().toISOString().split('T')[0]}
            onChange={(e) => setToDate(e.target.value)}
            placeholder="To Date"
            className="w-full"
          />
        </div>
        <div className="w-full">
          <Button
            size={'sm'}
            className="w-full"
            onClick={() => {
              collectionReportData.refetch();
            }}
          >
            Search
          </Button>
        </div>
      </div>

      <div className="border-t border-secondary mt-1 mb-1"></div>
      {/* member list */}
      <LoaderList
        dataLength={collectionReportData.data?.data?.docs?.length ?? 0}
        isLoading={collectionReportData.isFetching}
      >
        {/*  */}
        <div className="flex items-center justify-between mt-4">
          <h1 className="text-sm font-semibold text-muted-foreground">
            Total Collection Amount (
            {collectionReportData.data?.data?.actualAmount?.totalPaidAmount})
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-0 mt-2">
          {collectionReportData.data?.data?.docs.map((data, index) => (
            <div key={index + 1}>
              <Card className=" p-4 shadow-none bg-secondary">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Member Name
                    </h1>
                    <h1 className="text-sm font-semibold">
                      {data?.member?.memberName}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Member ID
                    </h1>
                    <h1 className="text-sm font-semibold">
                      {data?.member?.generatedId}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Plan Name
                    </h1>
                    <h1 className="text-sm font-semibold">
                      {data?.member?.planName}
                    </h1>
                  </div>

                  <div>
                    <h1 className="text-xs font-semibold text-muted-foreground">
                      Amount
                    </h1>
                    <h1 className="text-sm font-semibold">{data.paidAmount}</h1>
                  </div>
                </div>
              </Card>
              {/* line */}
              <div className="border-t border-secondary mt-2 mb-2"></div>
            </div>
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-end mt-3">
          <PaginationComponent
            page={page}
            perPage={limit}
            totalPage={collectionReportData.data?.data.totalDocs}
            hasNextPage={collectionReportData.data?.data?.hasNextPage}
            hasPrevPage={collectionReportData.data?.data.hasPrevPage}
            setPage={setPage}
            setPerPage={setLimit}
          />
        </div>
      </LoaderList>
    </Page>
  );
}
