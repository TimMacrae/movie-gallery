export const APIROUTES = {
  API: {
    ENDPOINT: process.env.API_ENDPOINT || "http://localhost:3000",
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    SIGNOUT: "/auth/signout",
    GET_USER: "/auth/user",
  },
  URL: {
    HOME: "/",
    SIGNIN: "/signin",
    SIGNUP: "/signup",
    LOGOUT: "/logout",
    MOVIES: "/movies",
    MOVIE: "/movies/[id]",
    MY_GALLERY: "/my-gallery",
  },
  QUERY_KEYS: {
    USER: "USER",
  },
};
