import { create }
from "zustand";

import {
  persist,
} from "zustand/middleware";

import api from "../services/api";

const useAuthStore =
create(

  persist(

    (set) => ({

      token: null,

      user: null,

      login: async (
        email,
        password
      ) => {

        try {

          const res =
          await api.post(

            "/auth/login",

            {

              email,
              password,

            }

          );

          set({

            token:
            res.data.token,

            user:
            res.data.user,

          });

          return true;

        } catch (error) {

          return false;
        }
      },

      register: async (
        email,
        password
      ) => {

        try {

          const res =
          await api.post(

            "/auth/register",

            {

              email,
              password,

            }

          );

          set({

            token:
            res.data.token,

            user:
            res.data.user,

          });

          return true;

        } catch (error) {

          return false;
        }
      },

      logout: () => {

        set({

          token: null,

          user: null,

        });
      },

    }),

    {

      name: "auth-storage",

    }

  )

);

export default useAuthStore;