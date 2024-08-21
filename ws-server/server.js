const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Object to store clients with their IDs
const clients = {};

// rooms by companyId and userId

const rooms = {};

// Event listener for new connections
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Event listener for messages from clients
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        // Handle login message
        if (data.type === 'login') {
            const userId = data.userId;
            clients[userId] = ws;
            ws.userId = userId;  // Store userId in the WebSocket object
            console.log(`Client logged in with ID: ${userId}`);
            ws.send(`Login successful for user ID: ${userId}`);
        } 
        if(data.type === 'join') {
            const companyId = data.companyId;
            const order = data.order; 
            if(!rooms[companyId]) {
                rooms[companyId] = [];
            }
            rooms[companyId].push(ws);
            ws.room = companyId;
            ws.send(`Joined room ${companyId}`);
        }
        
        else {
            // Handle other message types (e.g., sending messages to specific users)
            const targetUserId = data.targetUserId;
            const targetMessage = data.message;

            if (clients[targetUserId]) {
                clients[targetUserId].send(`Message from ${ws.userId}: ${targetMessage}`);
            } else {
                ws.send(`User with ID ${targetUserId} not found`);
            }
        }
    });

    // Event listener for client disconnection
    ws.on('close', () => {
        console.log(`Client with ID ${ws.userId} disconnected`);
        delete clients[ws.userId];  // Remove the user from the list of clients
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
