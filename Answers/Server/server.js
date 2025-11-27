const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage
const users = new Map();
const messages = [];
const rooms = new Map([
  ['general', { name: 'General', messages: [] }],
  ['random', { name: 'Random', messages: [] }],
  ['tech', { name: 'Tech Talk', messages: [] }]
]);
const typingUsers = new Map();

// Helper functions
const getUsersList = () => {
  return Array.from(users.values()).map(user => ({
    id: user.id,
    username: user.username,
    online: user.online,
    room: user.room
  }));
};

const getRoomUsers = (room) => {
  return Array.from(users.values())
    .filter(user => user.room === room && user.online)
    .map(user => ({
      id: user.id,
      username: user.username
    }));
};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // User authentication
  socket.on('authenticate', ({ username }) => {
    const user = {
      id: socket.id,
      username,
      online: true,
      room: 'general'
    };
    
    users.set(socket.id, user);
    socket.join('general');
    
    socket.emit('authenticated', { 
      userId: socket.id, 
      username,
      rooms: Array.from(rooms.entries()).map(([id, room]) => ({
        id,
        name: room.name
      }))
    });
    
    // Send existing messages for general room
    socket.emit('load_messages', rooms.get('general').messages);
    
    // Notify others
    io.to('general').emit('user_joined', { 
      username, 
      userId: socket.id,
      users: getRoomUsers('general')
    });
    
    io.emit('users_update', getUsersList());
  });

  // Join room
  socket.on('join_room', ({ room }) => {
    const user = users.get(socket.id);
    if (!user) return;

    const oldRoom = user.room;
    socket.leave(oldRoom);
    
    user.room = room;
    socket.join(room);
    
    // Notify old room
    io.to(oldRoom).emit('user_left', { 
      username: user.username,
      users: getRoomUsers(oldRoom)
    });
    
    // Load messages for new room
    socket.emit('load_messages', rooms.get(room).messages);
    
    // Notify new room
    io.to(room).emit('user_joined', { 
      username: user.username,
      userId: socket.id,
      users: getRoomUsers(room)
    });
    
    socket.emit('room_changed', { room });
  });

  // Send message
  socket.on('send_message', ({ content, room }) => {
    const user = users.get(socket.id);
    if (!user) return;

    const message = {
      id: Date.now() + Math.random(),
      content,
      sender: user.username,
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      room,
      reactions: []
    };

    if (rooms.has(room)) {
      rooms.get(room).messages.push(message);
      io.to(room).emit('new_message', message);
    }
  });

  // Private message
  socket.on('private_message', ({ content, recipientId }) => {
    const sender = users.get(socket.id);
    const recipient = users.get(recipientId);
    
    if (!sender || !recipient) return;

    const message = {
      id: Date.now() + Math.random(),
      content,
      sender: sender.username,
      senderId: socket.id,
      recipient: recipient.username,
      recipientId,
      timestamp: new Date().toISOString(),
      private: true
    };

    // Send to recipient
    io.to(recipientId).emit('private_message', message);
    // Send back to sender
    socket.emit('private_message', message);
  });

  // Typing indicator
  socket.on('typing_start', ({ room }) => {
    const user = users.get(socket.id);
    if (!user) return;

    if (!typingUsers.has(room)) {
      typingUsers.set(room, new Set());
    }
    typingUsers.get(room).add(user.username);
    
    socket.to(room).emit('user_typing', { 
      username: user.username,
      typing: true 
    });
  });

  socket.on('typing_stop', ({ room }) => {
    const user = users.get(socket.id);
    if (!user) return;

    if (typingUsers.has(room)) {
      typingUsers.get(room).delete(user.username);
    }
    
    socket.to(room).emit('user_typing', { 
      username: user.username,
      typing: false 
    });
  });

  // Message reactions
  socket.on('add_reaction', ({ messageId, emoji, room }) => {
    const user = users.get(socket.id);
    if (!user || !rooms.has(room)) return;

    const roomData = rooms.get(room);
    const message = roomData.messages.find(m => m.id === messageId);
    
    if (message) {
      if (!message.reactions) message.reactions = [];
      
      const existingReaction = message.reactions.find(
        r => r.userId === socket.id && r.emoji === emoji
      );
      
      if (existingReaction) {
        message.reactions = message.reactions.filter(
          r => !(r.userId === socket.id && r.emoji === emoji)
        );
      } else {
        message.reactions.push({
          userId: socket.id,
          username: user.username,
          emoji
        });
      }
      
      io.to(room).emit('reaction_update', { 
        messageId, 
        reactions: message.reactions 
      });
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      user.online = false;
      
      io.to(user.room).emit('user_left', { 
        username: user.username,
        users: getRoomUsers(user.room)
      });
      
      io.emit('users_update', getUsersList());
      
      // Clean up typing indicators
      if (typingUsers.has(user.room)) {
        typingUsers.get(user.room).delete(user.username);
      }
    }
    
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
