import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Store {
  token: string;
  setToken: (data: string) => void;
}

const useTokenStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (data: string) => set(() => ({ token: data })),
      }),
      {
        name: "token-storage",
      }
    )
  )
);

export default useTokenStore;
