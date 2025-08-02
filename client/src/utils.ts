import { BACKEND_API_URL } from "./constants";

class Utils {
  hostName: string;
  endpoint: {
    hostName: string;
    LoginAPI: string;
    RegisterAPI:string;
    AvailableSlotsAPI: string;
    CreateBookingAPI: string,
    GetBookingsAPI: string,
    GetBookedSeatsBySlotAPI:string;
    ForgotPasswordAPI:string;
  };

  constructor() {
    const host = BACKEND_API_URL || ""; // Fallback to an empty string if BACKEND_API_URL is undefined
    this.hostName = host;
   
    this.endpoint = {
      hostName: host,
      // Uncomment and add more endpoints as needed
      // VerifyUserAPI: `${host}Registration/VerifyUser`,
      LoginAPI: `${host}auth/login`,
      RegisterAPI:`${host}auth/register`,
      ForgotPasswordAPI:`${host}auth/forgot-password`,
      AvailableSlotsAPI: `${host}slots/all`,
      CreateBookingAPI:  `${host}bookings`,
      GetBookingsAPI:  `${host}bookings/my-bookings`,
      GetBookedSeatsBySlotAPI:  `${host}bookings/slots`
    };
  }

  /**
   * Returns headers for API requests.
   * @param header - Additional headers to include.
   * @returns A promise resolving to the headers object.
   */
async getHeader(header: Record<string, string> = {}): Promise<Record<string, string>> {
  const token = localStorage.getItem('token'); // or sessionStorage if you prefer
  return {
    ...header,
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}


  /**
   * Checks if an object is empty.
   * @param obj - The object to check.
   * @returns True if the object is empty, false otherwise.
   */
  isEmptyObj(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
  }

  /**
   * Checks if a string is empty or null/undefined.
   * @param str - The string to check.
   * @returns True if the string is empty, false otherwise.
   */
  isStringEmpty(str: string | null | undefined): boolean {
    return !str || str.length === 0;
  }
}

export default new Utils();