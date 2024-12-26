'use client';
import { useState } from 'react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import MonthName from './PlanForm';
import { useApi, usePutMutation } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import { I_PLAN_TYPE } from './type';
import { Separator } from '@/components/ui/separator';
import SearchBox from '@/components/search-box';
import Spinner from '@/components/loaders/Spinner';
import toast from 'react-hot-toast';

export default function MonthList() {
  const putMutation = usePutMutation({});
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>('');
  const [edit, setEdit] = useState(false);
  const monthData = useApi<I_PLAN_TYPE>({
    api: `${gymApi?.getAllPlans}`,
    key: 'planList',
    options: {
      enabled: true
    }
  });

  const handleEdit = (id: string) => {
    setEdit(true);
    setOpen(true);
    setId(id);
  };

  const deactivateMonth = async (mId: string) => {
    try {
      const res = await putMutation.mutateAsync({
        api: `${gymApi.updatePlanStatusById}/${mId}`
      });
      if (res.data.success) {
        toast.success(res.data.message);
        monthData.refetch();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <main className="grid items-start">
      <MonthName
        open={open}
        setOpen={setOpen}
        title={edit ? 'Edit Month' : 'Add Month'}
        id={id}
        edit={edit}
        setEdit={setEdit}
        refetch={monthData.refetch}
      />
      <div className="grid auto-rows-max items-start gap-4 md:gap-2 lg:col-span-2">
        <div className="flex justify-between w-full gap-2">
          <div>
            <SearchBox
              search={search}
              setSearch={setSearch}
              refetch={monthData.refetch}
              isFetching={monthData.isLoading}
            />
          </div>
          <div>
            <Button
              size={'sm'}
              className="flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              Add New
            </Button>
          </div>
        </div>
        <Card className="w-full overflow-scroll">
          <CardHeader className="px-7">
            <CardDescription>
              Total Month: {monthData?.data?.data?.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {monthData.isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Spinner />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">PLan Name</TableHead>
                      <TableHead className="">Created at</TableHead>
                      <TableHead className="">Status</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthData?.data?.data?.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.planName}</TableCell>
                        <TableCell>
                          {moment(item.createdAt).format('DD-MM-YYYY')}
                        </TableCell>
                        <TableCell>
                          {item.status == 1 ? 'Active' : 'Inactive'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size={'sm'}
                              className="bg-primary"
                              onClick={() => handleEdit(item._id)}
                            >
                              Edit
                            </Button>
                            <Button
                              size={'sm'}
                              className={
                                item.status == 1
                                  ? 'bg-destructive'
                                  : 'bg-green-700'
                              }
                              onClick={() => deactivateMonth(item._id)}
                            >
                              {item.status == 1 ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className="mt-4 mb-2" />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
