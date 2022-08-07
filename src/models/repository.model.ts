export type RepositoryModel = {
  id: number;
  full_name: string;
  html_url: string;
  description: string;
  owner: {
    id: number;
    login: string;
    avatar_url: string;
    url: string;
  };
};
