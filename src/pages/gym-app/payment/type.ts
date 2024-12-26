export type I_DUE_AMOUNT = {
  success: boolean;
  data: {
    _id: string;
    memberName: string;
    address: string;
    mobile: string;
    email: string;
    generatedId: string;
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
        createdAt: number;
        updatedAt: number;
      }
    ];
    totalPaidAmount: number;
    totalDueAmount: number;
    totalAmount: number;
    actualPaidAmount: number;
  };
};
