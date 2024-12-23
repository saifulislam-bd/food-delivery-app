import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { createJSONStorage, persist } from "zustand/middleware";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:5000/api/v1/user";
axios.defaults.withCredentials = true;

type User = {
  fullName: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      loading: false,
      user: null,
      isAuthenticated: false,
      isCheckingAuth: false,

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
      // login API implementation
      login: async (input) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/login`, input, {
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
          }
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An unknown error occurred");
          }
          set({ loading: false });
        }
      },
      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An unknown error occurred");
          }
          set({ loading: false });
        }
      },
      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const response = await axios.get(`${API_END_POINT}/check-auth`);
          if (response.data.success) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An unknown error occurred");
          }
          set({ loading: false });
        }
      },
      //  log out API implementation
      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: null, isAuthenticated: false });
          }
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An unknown error occurred");
          }
          set({ loading: false });
        }
      },
      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/forgot-password`,
            { email }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An unknown error occurred");
          }
          set({ loading: false });
        }
      },
      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/reset-password/${token}`,
            { newPassword }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An unknown error occurred");
          }
          set({ loading: false });
        }
      },
      updateProfile: async (input: any) => {
        try {
          const response = await axios.put(
            `${API_END_POINT}/profile/update`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ user: response.data.user, isAuthenticated: true });
          }
        } catch (error) {
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
