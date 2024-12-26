import { I_WITH_PAGINATION } from '@/types/paginationType';

export type memberType = {
  _id: string;
  generatedId: string;
  userId: string;
  memberName: string;
  address: string;
  mobile: string;
  gender: string;
  email: string;
  dob: string;
  imageUrl: string;
  fullImgUrl: string;
  planMappingId: [
    {
      _id: string;
      monthId: string;
      amount: number;
      status: number;
      month: string;
      plan: string;
    }
  ];
  status: number;
  createdAt: string;
  updatedAt: string;
  subscription: [
    {
      _id: string;
      memberId: string;
      planMappingId: string;
      planName: string;
      month: string;
      startDate: string;
      endDate: string;
      amount: number;
      paidAmount: number;
      dueAmount: number;
      paidStatus: number;
      status: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
};

export type MEMBER_LIST = I_WITH_PAGINATION<memberType>;
