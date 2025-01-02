import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import Page from '@/components/helmet-page';
import {  usePostMutation } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import {
  FormProviders,
  RHFTextField,
  ButtonLoading,
  RHFTextArea,
  FileUpload
} from '@/components/forms';


import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Confirm } from '@/components/react-confirm-box';
import { resizeFile } from '@/lib/resizeImage';

const schema = yup.object().shape({
  fullName: yup.string().required('Name is required'),
  gymName: yup.string().required('Gym Name is required'),
  address: yup.string().required('Address is required'),
  mobile: yup.string().required('Mobile is required'),
  password: yup.string().required('Password is required'),
  email: yup.string().required().email().label('Email'),
  // email: yup.string().notRequired().email().label('Email'),
  //  imageUrl not required
  imageUrl: yup.mixed().nullable(),
});

type AddMemberType = yup.InferType<typeof schema>;

export default function AddOwner() {
  const navigate = useNavigate();
  const createMemberMutation = usePostMutation({});
  
  const [files, setFiles] = useState<File[] | null>(null);
  const [compressImg, setCompressImg] = useState<
    File | Blob | null | undefined
  >(null);
  const method = useForm<AddMemberType>({
    defaultValues: {
      fullName: '',
      password: '',
      address: '',
      mobile: '',
      gymName: '',
      email: '',
      imageUrl: null,
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: AddMemberType) => {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('gymName', data.gymName);
    formData.append('password', data.password);
    formData.append('address', data.address);
    formData.append('mobile', data.mobile);
    formData.append('email', data?.email ?? '');
    formData.append('imageUrl', compressImg as Blob);

    Confirm('Are you sure?', 'Do you want to add this Owner?', async () => {
      try {
        const result = await createMemberMutation.mutateAsync({
          api: gymApi.createOwner,
          data: formData
        });
        if (result.data.success) {
          toast.success(result.data.message);

          // navigate(`/gym-app/view-owner/${result.data.data._id}`);
          navigate(`/gym-app/owner-list`);
        } else {
          toast.error(result.data.message);
        }
      } catch (error) {
        toast.error('Something went wrong');
      }
    });
  };

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
    <Page title="Registration Form " className='border  mx-2 bg-white shadow-md rounded-lg'>
      
      <div className="flex items-center justify-between mt-4 ">
        <h1 className="text-base font-semibold text-muted-foreground">
        Registration Form
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
            <div>
              <RHFTextField
                name="gymName"
                label="Gym Name"
                placeholder="Enter Gym Name"
              />
            </div>
            <div>
              <RHFTextField
                name="password"
                label="Password"
                placeholder="Enter Password"
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
          </div>
        </div>
      
            <div className="mt-8 flex justify-center mb-4">
              <ButtonLoading
                type="submit"
                className="bg-primary text-white"
                isLoading={createMemberMutation.isPending}
              >
                Add Owner
              </ButtonLoading>
            </div>
      </FormProviders>
    </Page>
  );
}
