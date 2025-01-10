import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EditDialogBox from '@/components/edit-dialog-box'
import * as yup from 'yup';
import Page from '@/components/helmet-page';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { gymApi } from '@/lib';
import {
  FormProviders,
  RHFTextField,
  ButtonLoading,
  RHFTextArea,
  FileUpload
} from '@/components/forms';

import Footer from '../landing-page/Footer'
import Navbar from '../landing-page/Navbar'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Confirm } from '@/components/react-confirm-box';
import { resizeFile } from '@/lib/resizeImage';
// import { Button } from '@/components/ui/button';


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
  const sendOtpMutation = usePostMutation({});
  const verifyOtpMutation = usePostMutation({});
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false)
  const [otp, setOtp] = useState('');
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
  console.log(closeModal);

  const onSubmit = async () => {
Confirm('Are you sure?', 'Do you want to add this Owner?', async () => {
  handleEmailSubmit()
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

  const handleEmailSubmit = async () => {
    try {
      const response = await sendOtpMutation.mutateAsync({
        api: gymApi.sendOtp,
        data: { email: method.watch('email') },
      });

      if (response?.data?.success) {
        toast.success('OTP sent to your email');
        setOpenOtpModal(true);
      } else {
        toast.error('Error sending OTP');
      }
    } catch (error) {
    }
  };

  // Handle OTP verification
  const verifyOtp = async () => {
    try {
      const response = await verifyOtpMutation.mutateAsync({
        api: gymApi.verifyEmailOtp,
        data: { otp, email: method.watch('email') },
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setOpenOtpModal(false);
        submitData()

      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
    }
  };

const submitData = async() =>  {
  const formData = new FormData();
  formData.append('fullName', method.watch('fullName'));
  formData.append('gymName', method.watch('gymName'));
  formData.append('password', method.watch('password'));
  formData.append('address',method.watch('address'));
  formData.append('mobile', method.watch('mobile'));
  formData.append('email', method.watch('email')?? '');
  formData.append('imageUrl', compressImg as Blob);
  try {
    const result = await createMemberMutation.mutateAsync({
      api: gymApi.createOwner,
      data: formData
    });
    if (result.data.success) {
      toast.success(result.data.message);
      navigate(`/gym-app/auth/login`);
    } else {
      toast.error(result.data.message);
    }
  } catch (error) {
    toast.error('Something went wrong');
  }
};
  return (
    <>
      <EditDialogBox open={openOtpModal} setOpen={setOpenOtpModal} title="OTP Send to your Registered Email" setEdit={setCloseModal}>
        <div style={{ zIndex: 100000 }} className="">
          <h1 className='text-sm font-semibold'>After verifying the OTP, you can proceed with the registration.</h1>
          <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              className="input-field w-full border border-gray-300 rounded-md p-2"
            />
            <div>
              <ButtonLoading
                type="button"
                onClick={verifyOtp}
                className="w-full rounded-xl py-5 px-4 mt-2 shadow-none"
                variant="outline"
              >
                Verify & Register
              </ButtonLoading>
            </div>
          </form>
        </div>
      </EditDialogBox>

      <div className='space-y-3 min-h-screen bg-gradient-to-b from-blue-50 to-blue-100'>
        <Navbar />
        <Page title="Registration Form " className='border mx-auto md:w-1/2 bg-white shadow-md rounded-lg'>

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
                Registration
              </ButtonLoading>
            </div>
          </FormProviders>
        </Page>

        <Footer />
      </div>
    </>

  );
}
