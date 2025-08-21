import express,{ type Request, type Response} from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app =express();
const port = 3000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
})

const users: Record<string, string> = {};

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with Socket.IO!');   
})

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    })

    socket.on('chat message', (data) => {
        const username = (socket as any).username || "Anonymous";

        const new_data = {
            ...data,
            from: username,
            id: socket.id,
        }

    io.emit('chat message', new_data);
    })

    socket.on("register", ({username}) => {
        users[username] = socket.id;
        (socket as any).username = username; 

    })
});

httpServer.listen(port,'0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
})