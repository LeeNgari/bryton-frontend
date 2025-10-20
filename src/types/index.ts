export interface StrapiResponse<T> {
  data: T[];
  meta: Meta;
}

export interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface Student {
  id: number;
  Name: string;
  StudentId: string;
  Active: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  receipts: Receipt[];
  boarding_passes: BoardingPass[];
}

export interface BoardingPass {
  id: number;
  active: boolean;
  semester: Semester;
}


export interface Receipt {
  id: number;
  ReceiptId: string;
  PaymentDate: string;
  ValidUntil: string;
  TotalAmount: string;
  student: Student ;
  semester: Semester ;
  pick_up_point:PickUpPoint ;
}

export interface Semester {
  id: number;
  Name: string;
  Active: boolean;
  StartDate: string;
  EndDate: string;
}

export interface PickUpPoint {
  id: number;
  Name: string;
}

export interface Price {
  id: number;
  Name: string;
  TotalAmount: string;
}

export interface User {
  username: string;
}
