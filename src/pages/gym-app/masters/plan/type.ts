export type I_PLAN = {
  _id: string;
  planName: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};

export type I_PLAN_TYPE = {
  success: boolean;
  data: I_PLAN[];
};

export type I_PLAN_DETAIL = {
  success: boolean;
  message: string;
  data: I_PLAN;
};
