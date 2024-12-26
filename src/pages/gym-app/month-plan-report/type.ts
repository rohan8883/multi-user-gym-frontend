import { I_WITH_PAGINATION } from '@/types/paginationType';

export type I_MONTH_PLAN_RPT = {
  _id: string;
  amount: number;
  paidAmount: number;
  dueAmount: number;
  paidStatus: number;
  expInStatus: number;
  member: {
    _id: string;
    memberName: string;
    mobile: string;
    email: string;
    dob: string;
    address: string;
    generatedId: string;
  };
  planMapping: {
    _id: string;
    amount: number;
  };
  plan: {
    _id: string;
    planName: string;
    amount: number;
  };
  month: {
    _id: string;
    month: string;
  };
};

export type I_MONTH_PLAN_LIST = I_WITH_PAGINATION<I_MONTH_PLAN_RPT>;
