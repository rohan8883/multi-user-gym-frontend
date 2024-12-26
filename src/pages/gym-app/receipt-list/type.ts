import { I_WITH_PAGINATION } from '@/types/paginationType';

export type RECEIPT_LIST_DETAIL = {
  _id: string;
  memberId: string;
  member: {
    _id: string;
    generatedId: string;
    memberName: string;
  };
  subscriptionId: [
    {
      subscriptionId: string;
      paidAmount: number;
      dueAmount: number;
      startDate: string;
      endDate: string;
      amount: number;
      planName: string;
      month: number;
      paidStatus: number;
    }
  ];
  receiptNo: string;
  receiptDate: string;
  totalPaidAmount: number;
  totalDueAmount: number;
  paymentMode: string;
  paymentStatus: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};

export type RECEIPT_LIST = I_WITH_PAGINATION<RECEIPT_LIST_DETAIL>;
