import { useAppSelector } from "./redux";

export const useAuth = () => {
  const { email, uid } = useAppSelector((state) => state.authSlice);
  return { isAuth: !!(uid && email), email, uid };
};
