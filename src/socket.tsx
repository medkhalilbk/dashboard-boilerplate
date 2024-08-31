import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";

 const socket = isBrowser ? io(process.env.NEXT_PUBLIC_SOCKET_URL as string , {
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 1000, 
    transports: ["websocket"],
 }) : null;


 export default socket;