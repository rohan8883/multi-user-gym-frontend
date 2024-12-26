import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trash2 } from 'lucide-react';
import * as yup from 'yup';
import Page from '@/components/helmet-page';
import { useApi, usePostMutation } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import {
  FormProviders,
  RHFTextField,
  RHFSelectField,
  ButtonLoading,
  RHFTextArea,
  FileUpload
} from '@/components/forms';
import { planListType, planType } from './type';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Confirm } from '@/components/react-confirm-box';
import { resizeFile } from '@/lib/resizeImage';

const schema = yup.object().shape({
  memberName: yup.string().required('Member Name is required'),
  address: yup.string().required('Address is required'),
  mobile: yup.string().required('Mobile is required'),
  dob: yup.string().required('Date of Birth is required'),
  email: yup.string().notRequired().email().label('Email'),
  gender: yup.string().required().label('Gender'),
  //  imageUrl not required
  imageUrl: yup.mixed().nullable(),
  weight: yup.string().required('Weight is required'),
  planMapping: yup.string()
});

type AddMemberType = yup.InferType<typeof schema>;

export default function AddMember() {
  const navigate = useNavigate();
  const createMemberMutation = usePostMutation({});
  const [planMappingId, setPlanMappingId] = useState<planListType['data']>([]);
  const [files, setFiles] = useState<File[] | null>(null);
  const [compressImg, setCompressImg] = useState<
    File | Blob | null | undefined
  >(null);
  const method = useForm<AddMemberType>({
    defaultValues: {
      memberName: '',
      address: '',
      mobile: '',
      gender: '',
      dob: '',
      email: '',
      weight: '',
      imageUrl: null,
      planMapping: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: AddMemberType) => {
    if (planMappingId.length === 0) {
      return alert('Please add at least one plan List');
    }
    const formData = new FormData();
    formData.append('memberName', data.memberName);
    formData.append('address', data.address);
    formData.append('mobile', data.mobile);
    formData.append('dob', data.dob);
    formData.append('email', data?.email ?? '');
    formData.append(
      'planMappingId',
      JSON.stringify(planMappingId.map((data) => data._id))
    );
    formData.append('gender', data.gender);
    formData.append('weight', data.weight);
    formData.append('imageUrl', compressImg as Blob);

    Confirm('Are you sure?', 'Do you want to add this member?', async () => {
      try {
        const result = await createMemberMutation.mutateAsync({
          api: gymApi.createMember,
          data: formData
        });
        if (result.data.success) {
          setPlanMappingId([]);
          toast.success(result.data.message);

          navigate(`/gym-app/view-member/${result.data.data._id}`);
        } else {
          toast.error(result.data.message);
        }
      } catch (error) {
        toast.error('Something went wrong');
      }
    });
  };

  const getPlanMapping = useApi<planListType>({
    api: gymApi.getAllPlanMapping,
    key: 'get-plan-mapping',
    options: {
      enabled: true
    }
  });

  const getPlanMappingByIdData = useApi<planType>({
    api: `${gymApi.getPlanMappingById}?id=${method.watch('planMapping')}`,
    key: 'get-plan-mapping-by-id-save',
    value: [method.watch('planMapping')],
    options: {
      enabled: !!method.watch('planMapping')
    }
  });

  const handleFileChange = async () => {
    // file greater than 8MB
    if (files?.[0]?.size! > 20 * 1024 * 1024) {
      return toast.error('File size is too large');
    }
    const file = files?.[0];
    console.log(file);
    if (!file) return;
    const compressImg = await resizeFile(file);
    const Cfile = new File([compressImg], file?.name, {
      type: file?.type
    });
    setCompressImg(Cfile);
  };

  useEffect(() => {
    if (files) {
      handleFileChange();
    }
  }, [files]);

  return (
    <Page title="Add Member">
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-base font-semibold text-muted-foreground">
          ADD MEMBER
        </h1>
      </div>
      <div className="border-t border-secondary mt-3"></div>
      <FormProviders methods={method} onSubmit={method.handleSubmit(onSubmit)}>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <RHFTextField
                name="memberName"
                label="Member Name"
                placeholder="Enter Member Name"
              />
            </div>
            <div>
              <RHFTextField
                name="email"
                label="Email"
                placeholder="Enter Email"
              />
            </div>

            <div>
              <RHFTextField
                name="mobile"
                label="Mobile"
                placeholder="Enter Mobile"
                inputValidation={['mobile', 'number']}
              />
            </div>
            <div>
              <RHFTextField
                type="date"
                name="dob"
                label="Date of Birth"
                placeholder="Enter Date of Birth"
              />
            </div>
            <div>
              <RHFTextField
                name="weight"
                label="Weight"
                placeholder="Enter Weight"
              />
            </div>
            <div>
              <RHFSelectField
                label="Gender"
                name="gender"
                data={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Other', value: 'other' }
                ]}
              />
            </div>
            <div className="col-span-2">
              <FileUpload
                onChangeValue={setFiles}
                files={files}
                maxFiles={1}
                maxSize={
                  // 20MB
                  20 * 1024 * 1024
                }
                accept="image/*"
                multiple={false}
              />
            </div>

            <div className="col-span-2">
              <RHFTextArea
                name="address"
                label="Address"
                placeholder="Enter Address"
              />
            </div>

            <div className="col-span-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <RHFSelectField
                    name="planMapping"
                    label="Select Plan List"
                    data={
                      getPlanMapping.data?.data.map((data) => ({
                        label: data.plan + ' - ' + `month ${data.month}`,
                        value: data._id
                      })) || []
                    }
                  />
                </div>
                {/* add button */}
                <div className="mt-6">
                  <ButtonLoading
                    isLoading={getPlanMappingByIdData.isFetching}
                    disabled={getPlanMappingByIdData.isFetching}
                    type="button"
                    onClick={() => {
                      if (method.watch('planMapping') === '') {
                        return toast.error('Please select plan List');
                      }
                      const isPlanExist = planMappingId.find(
                        (data) =>
                          data.plan == getPlanMappingByIdData?.data?.data?.plan
                      );
                      if (isPlanExist) {
                        return toast.error('Plan already added');
                      }
                      setPlanMappingId((prev) => [
                        ...prev,
                        getPlanMappingByIdData.data?.data!
                      ]);
                    }}
                    className="bg-primary text-white w-full h-9"
                  >
                    <h1 className="text-xs">Add Plan</h1>
                  </ButtonLoading>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* line */}
        <div className="border-t border-secondary mt-5"></div>
        {planMappingId.length > 0 && (
          <>
            <div className="mt-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Plan</TableHead>
                    <TableHead className="text-xs">Month</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {planMappingId.map((item, index) => (
                    <TableRow key={index + 1}>
                      <TableCell className="text-xs py-2.5">
                        {item?.plan}
                      </TableCell>
                      <TableCell className="text-xs py-2.5">
                        {item?.month}
                      </TableCell>
                      <TableCell className="text-xs py-2.5">
                        {item?.amount}
                      </TableCell>
                      <TableCell className="text-xs py-2.5">
                        <Button
                          type="button"
                          className="bg-red-100 text-white   flex items-center justify-center p-3"
                          onClick={() => {
                            setPlanMappingId((prev) =>
                              prev.filter((data) => data?._id !== item?._id)
                            );
                          }}
                        >
                          <Trash2 size={16} className="text-red-700" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="border-t border-secondary mt-5"></div>
            <div className="mt-8 flex justify-center">
              <ButtonLoading
                type="submit"
                className="bg-primary text-white"
                isLoading={createMemberMutation.isPending}
              >
                Add Member
              </ButtonLoading>
            </div>
          </>
        )}
      </FormProviders>
    </Page>
  );
}
