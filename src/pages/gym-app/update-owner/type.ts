type planData = {
  _id: string;
  planId: string;
  monthId: string;
  amount: number;
  status: number;
  plan: string;
  month: string;
};

type subscriptionData = {
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
};

export type planType = {
  success: boolean;
  data: planData;
};

export type planListType = {
  success: boolean;
  data: planData[];
};

export type memberType = {
  _id: string;
  userId: string;
  fullName: string;
  memberName: string;
  address: string;
  mobile: string;
  gender: string;
  email: string;
  weight: string;
  dob: string;
  planMappingId: planData[];
  status: number;
  createdAt: string;
  updatedAt: string;
  subscription: subscriptionData[];
};

export type MEMBER_DETAIL = {
  success: boolean;
  message: string;
  data: memberType;
};
