export type IssueModel = {
  id: number;
  number: number;
  title: string;
  state: string;
  locked: boolean;
  html_url: string;
  user: {
    id: number;
    login: string;
    avatar_url: string;
  };
  labels: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  created_at: Date | string;
  updated_at: Date | string;
};
