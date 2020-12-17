export type LoginStatusType = {
  authResponse: {
    accessToken: string;
    data_access_expiration_time: number;
    expiresIn: number;
    graphDomain: string;
    signedRequest: string;
    userID: string;
  };
  status: "connected" | "not_authorized" | "unknown";
};

export type FbPageInfoType = {
  access_token: string;
  category: string;
  category_list: Array<any>;
  id: string;
  name: string;
  tasks: Array<string>;
};
