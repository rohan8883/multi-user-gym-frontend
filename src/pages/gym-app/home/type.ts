export type I_COUNT_TYPE = {
  success: boolean;
  message: string;
  data: {
    totalMember: number | null;
    activeMember: number | null;
    inActiveMember: number | null;
    totalAmount: number | null;
    totalPaidAmount: number | null;
    totalUnpaidAmount: number | null;
    totalDueAmount: number | null;
    expiredSub: number | null;
    expiredSubsBeforeSevenDay: number | null;
    expSubscriptionCount: number | null;
  };
};

export type I_SUB_EXP_TYPE = {
  success: boolean;
  message: string;
  data: [
    {
      _id: string;
      startDate: string;
      endDate: string;
      amount: number;
      paidAmount: number;
      dueAmount: number;
      paidStatus: number;
      planName: string;
      member: {
        _id: number;
        generatedId: string;
        memberName: string;
        address: string;
        status: number;
        mobile: string;
        email: string;
        dob: string;
        planName: string;
        fullImgUrl: string;
      };
    }
  ];
};
