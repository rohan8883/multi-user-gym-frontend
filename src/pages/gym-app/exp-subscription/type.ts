import { I_WITH_PAGINATION } from '@/types/paginationType';

export type expSubTyp = {
  _id: string;
  startDate: string;
  endDate: string;
  amount: number;
  paidAmount: number;
  dueAmount: number;
  planName: string;
  member: {
    _id: string;
    memberName: string;
    address: string;
    mobile: string;
    email: string;
    dob: string;
    fullImgUrl: string;
    imageUrl: string;
    planName: string;
    generatedId: string;
  };
};

export type EXP_SUB_TYPE = I_WITH_PAGINATION<expSubTyp>;
