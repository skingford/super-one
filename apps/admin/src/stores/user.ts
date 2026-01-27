import { defineStore } from "pinia";

interface UserState {
  id: number | null;
  name: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    id: null,
    name: "",
    email: "",
    role: "",
    isLoggedIn: false,
  }),

  getters: {
    isAdmin: (state) => state.role === "admin",
  },

  actions: {
    login(userData: Omit<UserState, "isLoggedIn">) {
      this.id = userData.id;
      this.name = userData.name;
      this.email = userData.email;
      this.role = userData.role;
      this.isLoggedIn = true;
    },

    logout() {
      this.id = null;
      this.name = "";
      this.email = "";
      this.role = "";
      this.isLoggedIn = false;
    },
  },
});
