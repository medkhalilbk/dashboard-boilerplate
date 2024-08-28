import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";

 const socket = isBrowser ? io(process.env.NEXT_PUBLIC_SOCKET_URL as string) : null;


 export default socket;