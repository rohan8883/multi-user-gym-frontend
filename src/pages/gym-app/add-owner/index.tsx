import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EditDialogBox from '@/components/edit-dialog-box'
import * as yup from 'yup';
// import Page from '@/components/helmet-page';
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
  cPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Enter Confirm Password'),
  email: yup.string().required().email().label('Email'),
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

  const submitData = async () => {
    const formData = new FormData();
    formData.append('fullName', method.watch('fullName'));
    formData.append('gymName', method.watch('gymName'));
    formData.append('password', method.watch('password'));
    formData.append('address', method.watch('address'));
    formData.append('mobile', method.watch('mobile'));
    formData.append('email', method.watch('email') ?? '');
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

      <div className="flex flex-col min-h-screen">
  {/* Fixed Navbar */}
  <div className="sticky top-0 z-50">
    <Navbar />
  </div>

  {/* Scrollable Content Area (including main content and footer) */}
  <div className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">
        {/* Left: Form Section */}
        <div className="w-full md:w-3/5 bg-white p-6 md:p-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Gym Registration</h1>
          </div>

          <FormProviders methods={method} onSubmit={method.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div>
                <RHFTextField
                  name="cPassword"
                  label="Confirm Password"
                  placeholder="Enter Confirm Password"
                />
              </div>

              <div className="col-span-full">
                <FileUpload
                  onChangeValue={setFiles}
                  files={files}
                  maxFiles={1}
                  maxSize={20 * 1024 * 1024}
                  accept="image/*"
                  multiple={false}
                />
              </div>

              <div className="col-span-full">
                <RHFTextArea
                  name="address"
                  label="Address"
                  placeholder="Enter Address"
                />
              </div>
            </div>

            <div className="mt-6">
              <ButtonLoading
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                isLoading={createMemberMutation.isPending}
              >
                Complete Registration
              </ButtonLoading>
            </div>
          </FormProviders>
        </div>

        {/* Right: Image and Text Overlay */}
        <div className="w-full md:w-2/5 bg-indigo-600 relative hidden md:block">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-70" 
            style={{ backgroundImage: `url('/bgImg.jpg')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-700/40 to-indigo-900/80"></div>
          <div className="relative h-full flex flex-col justify-center p-8 text-white z-10">
            <h2 className="text-3xl font-bold mb-4">Join Our Fitness Community</h2>
            <p className="text-indigo-100 mb-6">Register your gym today and gain access to our state-of-the-art management platform designed specifically for fitness professionals.</p>
            <div className="flex items-center space-x-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Member management made easy</span>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Schedule and track classes</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Grow your business with insights</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Footer is now inside the scrollable area */}
    <Footer />
  </div>
</div>
    </>

  );
}
