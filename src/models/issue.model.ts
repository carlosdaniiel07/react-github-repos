export type IssueModel = {
  id: number;
  number: number;
  title: string;
  state: string;
  locked: boolean;
  created_at: Date | string;
  updated_at: Date | string ;
};
