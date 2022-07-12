import { atom, atomFamily } from "recoil";

export const isLoginState = atom({
  key: "isLoginState",
  default: false,
});

type regCategory =
  | ""
  | "TYPE_TRANS_EDU"
  | "ROLE_TRANS_MANAGER"
  | "TYPE_TRAFFIC_SAFETY_EDU"
  | "ROLE_TRAFFIC_SAFETY_MANAGER"
  | "ROLE_ADMIN";

interface userInfoType {
  username: string;
  regCategory: regCategory[];
}

export const userInfo = atom<userInfoType>({
  key: "userInfo",
  default: {
    username: "",
    regCategory: [],
  },
});
