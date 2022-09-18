import { getUserInfo } from "../api/auth";
import { IUser } from "../types/auth";

export const useAuth = async () => {
  const currentUser = await getUserInfo();

  return currentUser as IUser;
}