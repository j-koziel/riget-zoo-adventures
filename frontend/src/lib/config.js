const backendBaseUrl =
  process.env.REACT_APP_VERCEL_ENV === "production"
    ? "https://riget-zoo-adventures.onrender.com/api/v1"
    : "http://localhost:8000/api/v1";

/**
 * An object containing all (most) of the endpoints in the API that we are using
 */
export const backendRoutes = {
  user: {
    me: `${backendBaseUrl}/users/me`,
    newUser: `${backendBaseUrl}/users`,
    allUsers: `${backendBaseUrl}/users`,
    updateMemberStatus: (member) =>
      `${backendBaseUrl}/users/me/member-status?member=${member}`,
  },
  auth: {
    login: `${backendBaseUrl}/auth/token`,
  },
  booking: {
    zooTickets: {
      ticketAvailability: (date) =>
        `${backendBaseUrl}/booking/zoo-tickets/availability?date=${date}`,
      book: `${backendBaseUrl}/booking/zoo-tickets/book`,
    },
    hotelRooms: {
      getRooms: `${backendBaseUrl}/booking/hotel/available-rooms`,
      book: `${backendBaseUrl}/booking/hotel/book`,
    },
  },
  articles: {
    getAll: `${backendBaseUrl}/articles/`,
    getById: (id, user_id = "") =>
      `${backendBaseUrl}/articles?id=${id}${
        user_id ? `&user_id=${user_id}` : ""
      }`,
    getByName: (name, user_id) =>
      `${backendBaseUrl}/articles?name=${name}${
        user_id ? `&user_id=${user_id}` : ""
      }`,
  },
};
