import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";

 const socket = isBrowser ? io(process.env.NEXT_PUBLIC_SOCKET_URL as string , {
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ["polling"],
 }) : null;


 export default socket;