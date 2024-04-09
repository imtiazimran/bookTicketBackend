import config from './config';
import mongoose from 'mongoose';
import { WebSocketServer } from 'ws';
import app from './app';

// Define wss variable outside the startServers function
let wss: WebSocketServer;

async function startServers() {
    try {
        await mongoose.connect(config.DB as unknown as string);
        console.log('Connected to MongoDB.');
        const PORT = config.port || 4000;
        const server = app.listen(PORT, () => {
            console.log(`HTTP server running on port ${PORT}`);
        });
        wss = new WebSocketServer({ server }); // Assign the wss instance here

        wss.on('connection', (ws)=>{
           console.log('Client connected');
           ws.on('message', (message)=>{
               console.log(message.toString('utf-8'));
               ws.send('Hello, client!');
           })
        })

    } catch (error) {
        console.error('Error starting servers:', error);
    }
}

startServers();

// Export wss along with other exports
export { wss };
