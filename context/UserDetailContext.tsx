import React from "react";

export interface UserDetailType {
  _creationTime?: number;
  _id?: string;
  email?: string;
  name?: string;
  picture?: string;
}

interface UserDetailContextType {
  userDetail: UserDetailType;
  setUserDetail: (detail: UserDetailType) => void;
}

export const UserDetailContext = React.createContext<UserDetailContextType>({
  userDetail: {},
  setUserDetail: () => {},
});