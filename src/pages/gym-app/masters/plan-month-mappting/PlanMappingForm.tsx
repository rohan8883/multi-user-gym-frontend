import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ButtonLoading,
  RHFTextField,
  FormProviders,
  RHFSelectField
} from '@/components/forms';
import { Separator } from '@/components/ui/separator';
import EditDialogBox from '@/components/dialog-box';
import {
  useApi,
  usePostMutation,
  usePutMutation
} from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import { I_PLAN_MAPPING_DETAIL } from './type';
import { I_PLAN_TYPE } from '../plan/type';
import { I_MONTH_TYPE } from '../month/type';

const schema = yup.object().shape({
  planMappingName: yup.string().required('Month name is required'),
  planId: yup.string().required('Plan is required'),
  monthId: yup.string().required('Month is required'),
  amount: yup.number().required('Amount is required')
});
type FormData = yup.InferType<typeof schema>;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  id?: string;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: () => void;
};

export default function PlanForm({
  open,
  setOpen,
  title,
  id,
  edit,
  setEdit,
  refetch
}: Readonly<Props>) {
  const postMutation = usePostMutation({});
  const putMutation = usePutMutation({});
  const { data, isFetching } = useApi<I_PLAN_MAPPING_DETAIL>({
    api: `${gymApi.planMappingById}/${id}`,
    options: {
      enabled: edit
    }
  });

  const activePlanData = useApi<{ data: I_PLAN_TYPE['data'] }>({
    api: `${gymApi.getAllActivePlan}`,
    key: 'activePlanList',
    options: {
      enabled: true
    }
  });

  const activeMonthData = useApi<{ data: I_MONTH_TYPE['data'] }>({
    api: `${gymApi.getAllActiveMonths}`,
    key: 'activeMonthList',
    options: {
      enabled: true
    }
  });

  const methods = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${gymApi.updatePlanMappingById}/${id}`,
          data: data
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: gymApi.createMappingPlan,
          data: data
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error('Month not created successfully');
        }
        methods.reset({
          planMappingName: '',
          planId: '',
          monthId: '',
          amount: 0
        });
      }
      setOpen(false);
      setEdit!(false);
      refetch!();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (edit && data) {
      methods.reset({
        planMappingName: data?.data?.planMappingName,
        planId: data?.data?.planId,
        monthId: data?.data?.monthId,
        amount: data?.data?.amount
      });
    } else {
      methods.reset({
        planMappingName: '',
        planId: '',
        monthId: '',
        amount: 0
      });
    }
  }, [edit, data]);

  return (
    <EditDialogBox
      open={open}
      setOpen={setOpen}
      title={title}
      setEdit={setEdit}
      edit={edit}
      isLoading={isFetching}
    >
      <FormProviders
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="gap-y-4 gap-x-2 grid grid-cols-1">
          <div>
            <RHFTextField
              name="planMappingName"
              placeholder="Enter plan mapping name"
            />
          </div>
          <div>
            <RHFSelectField
              name="planId"
              label="Select Plan"
              data={
                activePlanData?.data?.data?.map((item) => ({
                  value: item._id,
                  label: item.planName
                })) || []
              }
            />
          </div>
          <div>
            <RHFSelectField
              name="monthId"
              label="Select Month"
              data={
                activeMonthData?.data?.data?.map((item) => ({
                  value: item._id,
                  label: item.monthName
                })) || []
              }
            />
          </div>
          <div>
            <RHFTextField
              name="amount"
              placeholder="Enter amount"
              type="number"
            />
          </div>

          <Separator />
          <div>
            <ButtonLoading
              size={'sm'}
              isLoading={methods.formState.isSubmitting}
              type="submit"
              className="w-full"
            >
              Submit
            </ButtonLoading>
          </div>
        </div>
      </FormProviders>
    </EditDialogBox>
  );
}
