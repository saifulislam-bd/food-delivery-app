import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { createJSONStorage, persist } from "zustand/middleware";
import { SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:5000/api/v1/user";
axios.defaults.withCredentials = true;

type UserStoreState = {
  user: null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => void;
};

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      loading: false,
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,

      // signup API implementation
      signup: async (input) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          } else {
            // In case the response indicates failure, set loading to false
            set({ loading: false });
            toast.error("Signup failed. Please try again.");
          }
        } catch (error: unknown) {
          if (error instanceof AxiosError && error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An unknown error occurred");
          }
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
