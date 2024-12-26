import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Page from '@/components/helmet-page';
import { useApi, usePutMutation } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import { EXP_SUB_TYPE } from './type';
import PaginationComponent from '@/components/pagination';
import SearchBox from '@/components/search-box';
import { Eye, Trash } from 'lucide-react';
import LoaderList from '@/components/loader-list';
import moment from 'moment';
import { Confirm } from '@/components/react-confirm-box';
import toast from 'react-hot-toast';

export default function MemberList() {
  const updateSubsMutate = usePutMutation({});
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');

  const memberExpListData = useApi<EXP_SUB_TYPE>({
    api: `${gymApi.getAllExpiredSubscription}?page=${page}&limit=${limit}&q=${search}`,
    key: 'exp-list',
    value: [page, limit],
    options: {
      enabled: true
    }
  });

  const deleteExpSub = async (id: string) => {
    Confirm('Are you sure?', 'Do you really want to delete this?', async () => {
      try {
        const result = await updateSubsMutate.mutateAsync({
          api: `${gymApi.updateExpInSubscription}/${id}`,
          data: {}
        });
        if (result.data?.success) {
          memberExpListData.refetch();
          toast.success('Deleted Successfully');
        } else {
          toast.error('Failed to delete');
        }
      } catch (error) {
        toast.error('Failed to delete');
      }
    });
  };

  return (
    <Page title="Expired Subscription">
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-base font-semibold text-muted-foreground">
          Expired Subscription List({memberExpListData.data?.data.totalDocs})
        </h1>
      </div>

      <div className="border-t border-secondary mt-3 mb-2"></div>

      <SearchBox
        search={search}
        setSearch={setSearch}
        refetch={memberExpListData.refetch}
        isFetching={memberExpListData.isFetching}
        setPage={setPage}
      />

      <div className="border-t border-secondary mt-1 mb-1"></div>

      <LoaderList
        dataLength={memberExpListData.data?.data?.docs.length!}
        isLoading={memberExpListData.isLoading}
      >
        {/*  */}
        <div className="grid grid-cols-1 gap-3 mt-2">
          {memberExpListData.data?.data?.docs.map((data, index) => (
            <Card key={index + 1}>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border dark:border-gray-700">
                      <AvatarImage
                        src={data?.member?.fullImgUrl}
                        alt="@shadcn"
                      />
                      <AvatarFallback className="text-base text-primary">
                        {data?.member?.memberName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-primary font-semibold text-sm">
                        {data?.member?.memberName}{' '}
                      </h1>
                      <div className="text-primary font-bold ">
                        <h1 className="text-muted-foreground text-xs">
                          {data?.member?.generatedId}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* using moment  */}
                    <h1 className="text-primary font-semibold text-sm">
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
                    </h1>
                  </div>
                </div>
              </div>

              <div className="px-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-primary font-semibold text-xs">
                      {data?.member?.mobile}
                    </h1>
                    <small className="text-muted-foreground font-semibold text-xs">
                      Mobile
                    </small>
                  </div>

                  <div>
                    <h1 className="text-primary font-semibold text-xs">
                      {data?.planName}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-4 mb-4 gap-4">
                <Button
                  variant="outline"
                  size={'sm'}
                  className="text-primary w-full h-6 "
                  onClick={() =>
                    navigate(`/gym-app/view-member/${data?.member._id}`)
                  }
                >
                  <Eye size={16} />
                  <h1 className="ms-1 text-xs">View</h1>
                </Button>

                <Button
                  variant="outline"
                  size={'sm'}
                  className="text-red-600 w-full h-6 border-red-600 "
                  onClick={() => deleteExpSub(data._id)}
                >
                  <Trash size={16} />
                  <h1 className="ms-1 text-xs">Delete</h1>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-end mt-3">
          <PaginationComponent
            page={page}
            perPage={limit}
            totalPage={memberExpListData.data?.data.totalDocs}
            hasNextPage={memberExpListData.data?.data?.hasNextPage}
            hasPrevPage={memberExpListData.data?.data.hasPrevPage}
            setPage={setPage}
            setPerPage={setLimit}
          />
        </div>
      </LoaderList>
    </Page>
  );
}
