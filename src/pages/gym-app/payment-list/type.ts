export type I_PAYMENT_LIST_TYPE = {
  success: boolean;
  message: string;
  data: {
    docs: [
      {
        _id: string;
        startDate: string;
        endDate: string;
        amount: number;
        paidAmount: number;
        dueAmount: number;
        member: {
          _id: string;
          memberName: string;
          address: string;
          mobile: string;
          email: string;
          dob: string;
          planName: string;
        };
      }
    ];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: any;
    nextPage: number;
    totalAmt: {
      totalAmount: number;
      totalPaidAmount: number;
      totalDueAmount: number;
      totalUnpaidAmount: number;
    };
  };
};
