import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Page from '@/components/helmet-page';
import { useApi, usePutMutation } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import {
  FormProviders,
  RHFTextField,
  ButtonLoading,
  RHFTextArea,
  FileUpload
} from '@/components/forms';
import { MEMBER_DETAIL} from './type';

import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '@/components/loaders/Spinner';
import { resizeFile } from '@/lib/resizeImage';

const schema = yup.object().shape({
  fullName: yup.string().required('Owner Name is required'),
  address: yup.string().required('Address is required'),
  mobile: yup.string().required('Mobile is required'),
  email: yup.string().notRequired().email().label('Email'),
  imageUrl: yup.mixed().nullable()
});

type UpdateMemberType = yup.InferType<typeof schema>;

export default function UpdateOwner() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [files, setFiles] = useState<File[] | null>(null);
  const [compressImg, setCompressImg] = useState<
    File | Blob | null | undefined
  >(null);
  const updateMemberMutation = usePutMutation({});


  const getMemberDetail = useApi<MEMBER_DETAIL>({
    api: `${gymApi.getOwner}/${id}`,
    key: 'getOwner',
    value: [id],
    options: {
      enabled: !!id
    }
  });
  const defaultValue = useMemo(() => {
    if (getMemberDetail.data?.data) {
      return {
        fullName: getMemberDetail.data?.data.fullName,
        address: getMemberDetail.data?.data.address,
        mobile: getMemberDetail.data?.data.mobile,
        email: getMemberDetail.data?.data.email,
        imageUrl: null
      };
    }
    return {
      fullName: '',
      address: '',
      mobile: '',
      email: '',
      imageUrl: null
    };
  }, [getMemberDetail.data?.data]); // add this line

  const method = useForm<UpdateMemberType>({
    defaultValues: defaultValue,
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: UpdateMemberType) => {

    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('address', data.address);
    formData.append('mobile', data.mobile);
    formData.append('email', data.email ?? '');
    formData.append('imageUrl', compressImg as Blob);

    try {
      const result = await updateMemberMutation.mutateAsync({
        api: `${gymApi.updateOwner}/${id}`,
        data: formData
      });
      if (result.data.success) {
        toast.success(result.data.message);
        navigate('/gym-app/owner-list?member-status=1');
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };


   useEffect(() => {
      if (defaultValue) {
        method.reset(defaultValue);
      }
    }, [defaultValue]);

  const handleFileChange = async () => {
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

  if (getMemberDetail.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <Page title="Update Owner">
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-base font-semibold text-muted-foreground">
          UPDATE OWNER
        </h1>
      </div>
      <div className="border-t border-secondary mt-3"></div>
      <FormProviders methods={method} onSubmit={method.handleSubmit(onSubmit)}>
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <RHFTextField
                name="fullName"
                label="Owner Name"
                placeholder="Enter Owner Name"
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

            <div className="col-span-2 mt-1">
              <FileUpload
                onChangeValue={setFiles}
                files={files}
                maxFiles={1}
                maxSize={20 * 1024 * 1024}
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
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <ButtonLoading
            type="submit"
            className="bg-primary text-white"
            isLoading={updateMemberMutation.isPending}
          >
            <h1 className="text-xs">Update Member</h1>
          </ButtonLoading>
        </div>
      </FormProviders>
    </Page>
  );
}
