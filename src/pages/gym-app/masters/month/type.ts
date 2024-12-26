export type I_MONTH = {
  _id: string;
  monthName: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};

export type I_MONTH_TYPE = {
  success: boolean;
  data: I_MONTH[];
};

export type I_MONTH_DETAIL = {
  success: boolean;
  message: string;
  data: I_MONTH;
};
