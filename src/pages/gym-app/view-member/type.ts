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
  planId: string;
  planName: string;
  monthId: string;
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

type ExpStatusData = {
  _id: string;
  subsId: string;
  endDate: string;
  startDate: string;
  amount: number;
  paidAmount: number;
  dueAmount: number;
  paidStatus: number;
  expInStatus: number;
  planName: string;
  month: string;
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
  generatedId: string;
  fullImgUrl: string;
  subscription: subscriptionData[];
  ExpStatus: ExpStatusData[];
};

export type MEMBER_DETAIL = {
  success: boolean;
  message: string;
  data: memberType;

};
