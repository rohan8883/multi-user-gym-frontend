export type I_PLAN_MAPPING = {
  _id: string;
  planMappingName: string;
  planId: string;
  monthId: string;
  amount: number;
  status: number;
  plan: number;
  month: number;
  createdAt: string;
};

export type I_PLAN_MAPPING_TYPE = {
  success: boolean;
  data: I_PLAN_MAPPING[];
};

export type I_PLAN_MAPPING_DETAIL = {
  success: boolean;
  message: string;
  data: I_PLAN_MAPPING;
};
