import Page from '@/components/helmet-page';
import { useApi } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { RHFSelectField } from '@/components/forms';
import { I_MONTH_TYPE } from '../masters/month/type';
import { I_PLAN_TYPE } from '../masters/plan/type';
import { I_MONTH_PLAN_LIST } from './type';
import PaginationComponent from '@/components/pagination';
import LoaderList from '@/components/loader-list';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const paidStatusData = [
  { value: '1', label: 'Paid' },
  { value: '0', label: 'Unpaid' },
  { value: '2', label: 'Due' }
];
export default function MonthPlanWiseReport() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  //   const [search] = useState('');
  const [monthId, setMonthId] = useState('');
  const [planId, setPlanId] = useState('');
  const [paidStatus, setPaidStatus] = useState('');

  let query = `page=${page}&limit=${limit}`;
  //   if (search) query += `&search=${search}`;
  if (monthId) query += `&monthId=${monthId}`;
  if (planId) query += `&planId=${planId}`;
  if (paidStatus) query += `&paidstatus=${paidStatus}`;
  //   if (planId && monthId) query += `&planId=${planId}&monthId=${monthId}`;

  const getMonthPlanWise = useApi<I_MONTH_PLAN_LIST>({
    api: `${gymApi.getMonthPlanWise}?${query}`,
    key: 'get-month-plan-wise-report',
    options: {
      enabled: true
    }
  });

  const monthData = useApi<I_MONTH_TYPE>({
    api: gymApi.getAllActiveMonths,
    key: 'get-all-active-months-rpt',
    options: {
      enabled: true
    }
  });

  const planData = useApi<I_PLAN_TYPE>({
    api: gymApi.getAllActivePlan,
    key: 'get-all-active-plans-rpt',
    options: {
      enabled: true
    }
  });

  return (
    <Page title="Month/Plan Report">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <RHFSelectField
              name="monthId"
              data={
                monthData.data?.data.map((item) => ({
                  value: item._id,
                  label: item.monthName
                })) ?? []
              }
              label="Month"
              selectedText="Select Month"
              isNormal={true}
              isHookForm={false}
              onChange={(e) => setMonthId(e.target.value)}
              value={monthId}
            />
          </div>
          <div>
            <RHFSelectField
              name="planId"
              data={
                planData.data?.data.map((item) => ({
                  value: item._id,
                  label: item.planName
                })) ?? []
              }
              label="Plan"
              selectedText="Select Plan"
              isNormal={true}
              isHookForm={false}
              onChange={(e) => setPlanId(e.target.value)}
              value={planId}
            />
          </div>
          <div>
            <RHFSelectField
              name="paidStatus"
              data={paidStatusData}
              label="Paid Status"
              selectedText="Select Paid Status"
              isNormal={true}
              isHookForm={false}
              onChange={(e) => setPaidStatus(e.target.value)}
              value={paidStatus}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-end'
            }}
          >
            <Button
              size={'sm'}
              onClick={() => {
                getMonthPlanWise.refetch();
              }}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="border-t border-secondary mt-1 mb-1"></div>
        {/* member list */}
        <LoaderList
          dataLength={getMonthPlanWise.data?.data?.docs?.length ?? 0}
          isLoading={getMonthPlanWise.isFetching}
        >
          <div className="grid grid-cols-1 gap-0 mt-2">
            {getMonthPlanWise.data?.data?.docs.map((data, index) => (
              <div key={index + 1}>
                <Link to={`/gym-app/view-member/${data?.member?._id}`}>
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
                          {data?.plan?.planName} ({data?.month?.month})
                        </h1>
                      </div>

                      <div>
                        <h1 className="text-xs font-semibold text-muted-foreground">
                          {(data?.paidStatus == 1 && 'Paid Amount') ||
                            (data?.paidStatus == 2 && 'Due Amount') ||
                            (data?.paidStatus == 0 && 'Amount')}
                        </h1>
                        <h1 className="text-sm font-semibold">
                          {
                            // if data?.paidStatus is  hen show paid amount, if 2 then show due amount, if 0 then show total amount
                            (data?.paidStatus == 1 && data?.paidAmount) ||
                              (data?.paidStatus == 2 && data?.dueAmount) ||
                              (data?.paidStatus == 0 && data?.amount)
                          }
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
              totalPage={getMonthPlanWise.data?.data.totalDocs}
              hasNextPage={getMonthPlanWise.data?.data?.hasNextPage}
              hasPrevPage={getMonthPlanWise.data?.data.hasPrevPage}
              setPage={setPage}
              setPerPage={setLimit}
            />
          </div>
        </LoaderList>
      </div>
    </Page>
  );
}
