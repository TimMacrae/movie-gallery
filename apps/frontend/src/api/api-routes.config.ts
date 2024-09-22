export const APIROUTES = {
  API: {
    ENDPOINT: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    SIGNOUT: "/auth/signout",
    GET_USER: "/auth/user",
    GET_MOVIES: "/movies",
    GET_MOVIE: "/movies/movie",
    POST_COMMENTS: "/comments",
    POST_CREATE_COMMENT: "/comments/create",
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
    MOVIES: "MOVIES",
    COMMENTS: "COMMENTS",
    CREATE_COMMENT: "CREATE_COMMENT",
  },
};
