import { create }
from "zustand";

import api
from "../services/api";

const useAuthStore =
create((set) => ({

  token:
  localStorage.getItem(
    "token"
  ) || null,

  user:
  JSON.parse(
    localStorage.getItem(
      "user"
    )
  ) || null,

  login:
  async (
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

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",

        JSON.stringify(
          res.data.user
        )
      );

      set({

        token:
        res.data.token,

        user:
        res.data.user,

      });

    } catch (error) {

      alert(
        error.response.data.message
      );
    }
  },

  register:
  async (
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

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",

        JSON.stringify(
          res.data.user
        )
      );

      set({

        token:
        res.data.token,

        user:
        res.data.user,

      });

    } catch (error) {

      alert(
        error.response.data.message
      );
    }
  },

  logout: () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    set({

      token: null,
      user: null,

    });
  },

}));

export default
useAuthStore;