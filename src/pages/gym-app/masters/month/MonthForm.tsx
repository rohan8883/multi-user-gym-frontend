'use client';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonLoading, RHFTextField, FormProviders } from '@/components/forms';
import { Separator } from '@/components/ui/separator';
import EditDialogBox from '@/components/dialog-box';
import {
  useApi,
  usePostMutation,
  usePutMutation
} from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import { I_MONTH_DETAIL } from './type';

const schema = yup.object().shape({
  monthName: yup.string().required('Month name is required')
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

export default function ClassForm({
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
  const { data, isFetching } = useApi<I_MONTH_DETAIL>({
    api: `${gymApi.getMonthById}/${id}`,
    options: {
      enabled: edit
    }
  });

  const methods = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (edit && data) {
        const res = await putMutation.mutateAsync({
          api: `${gymApi.updateMonthById}/${id}`,
          data: data
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await postMutation.mutateAsync({
          api: gymApi.createMonth,
          data: data
        });
        if (res.data?.success) {
          toast.success(res?.data?.message);
        } else {
          toast.error('Month not created successfully');
        }
        methods.reset({ monthName: '' });
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
        monthName: data.data.monthName
      });
    } else {
      methods.reset({ monthName: '' });
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
            <RHFTextField name="monthName" placeholder="Enter month name" />
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
