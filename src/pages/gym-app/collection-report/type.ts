import { I_WITH_PAGINATION } from '@/types/paginationType';

type ACTUALAMOUNT = {
  data: {
    actualAmount: {
      _id: null;
      totalAmount: number;
      totalPaidAmount: number;
      totalDueAmount: number;
    };
  };
};

export type I_COLLECTION = {
  _id: string;
  amount: number;
  paidAmount: number;
  dueAmount: number;

  member: {
    _id: string;
    planName: string;
    memberName: string;
    mobile: string;
    email: string;
    dob: string;
    address: string;
    generatedId: string;
  };
  startDate: string;
  endDate: string;
  paidStatus: number;
};

export type I_COLLECTION_LIST = ACTUALAMOUNT & I_WITH_PAGINATION<I_COLLECTION>;
