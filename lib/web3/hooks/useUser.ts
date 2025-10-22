import {
  useContractRead,
  useContractWrite,
  useTransactionReceipt,
} from "./useContract";
import type { User, RegisterUserParams } from "../types";

/**
 * Hook to get current user info
 */
export function useGetUser() {
  return useContractRead<User>("getUser");
}

/**
 * Hook to register a new user
 */
export function useRegisterUser() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const registerUser = (params: RegisterUserParams) => {
    write("registerUser", [params.name, params.summary, params.role]);
  };

  return {
    registerUser,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to edit user profile
 */
export function useEditUser() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const editUser = (params: RegisterUserParams) => {
    write("editUser", [params.name, params.summary, params.role]);
  };

  return {
    editUser,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
