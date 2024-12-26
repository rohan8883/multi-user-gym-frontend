import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import Page from '@/components/helmet-page';
import { useApi } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import { RECEIPT_LIST } from './type';
import PaginationComponent from '@/components/pagination';
import LoaderList from '@/components/loader-list';
import SearchBox from '@/components/search-box';
import moment from 'moment';

export default function MemberList() {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  const memberId = searchParam.get('member-id') ?? '';
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const getAllReceiptData = useApi<RECEIPT_LIST>({
    api: `${gymApi.getAllReceipt}?page=${page}&limit=${limit}&q=${search}&memberid=${memberId}`,
    key: 'getAllReceipt',
    value: [page, limit],
    options: {
      enabled: true
    }
  });

  return (
    <Page title="Receipt List">
      <div className="mt-3 mb-1">
        <SearchBox
          search={search}
          setSearch={setSearch}
          refetch={getAllReceiptData.refetch}
          isFetching={getAllReceiptData.isLoading}
          setPage={setPage}
        />
      </div>
      {/* member list */}
      <LoaderList
        dataLength={getAllReceiptData.data?.data?.docs?.length ?? 0}
        isLoading={getAllReceiptData.isFetching}
      >
        {/*  */}
        <div className="flex items-center justify-between mt-4">
          <h1 className="text-sm font-semibold text-muted-foreground">
            Total Receipt ({getAllReceiptData.data?.data?.totalDocs ?? 0})
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-0 mt-2">
          {getAllReceiptData.data?.data?.docs.map((data, index) => (
            <div key={index + 1}>
              <Link to={`/gym-app/payment-receipt/${data._id}`}>
                <Card className=" p-4 shadow-none bg-secondary">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h1 className="text-xs font-semibold text-muted-foreground">
                        Receipt no
                      </h1>
                      <h1 className="text-sm font-semibold">
                        {data?.receiptNo}
                      </h1>
                    </div>
                    <div>
                      <h1 className="text-xs font-semibold text-muted-foreground">
                        Member ID
                      </h1>
                      <h1 className="text-sm font-semibold">
                        {data?.member.generatedId}
                      </h1>
                    </div>
                    <div>
                      <h1 className="text-xs font-semibold text-muted-foreground">
                        Payment Date
                      </h1>
                      <h1 className="text-sm font-semibold">
                        {moment(data?.createdAt).format('DD-MM-YYYY')}
                      </h1>
                    </div>

                    <div>
                      <h1 className="text-xs font-semibold text-muted-foreground">
                        Paid Amount
                      </h1>
                      <h1 className="text-sm font-semibold">
                        ₹ {data.totalPaidAmount}
                      </h1>
                    </div>
                  </div>
                </Card>
              </Link>
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
            totalPage={getAllReceiptData.data?.data.totalDocs}
            hasNextPage={getAllReceiptData.data?.data?.hasNextPage}
            hasPrevPage={getAllReceiptData.data?.data.hasPrevPage}
            setPage={setPage}
            setPerPage={setLimit}
          />
        </div>
      </LoaderList>
    </Page>
  );
}
