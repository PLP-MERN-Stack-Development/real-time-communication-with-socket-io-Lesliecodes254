# 💬 ChatFlow - Real-Time Chat Application

A feature-rich real-time chat application built with Socket.io, React, and Node.js that demonstrates bidirectional communication with advanced features.

![ChatFlow Banner](https://via.placeholder.com/800x200/667eea/ffffff?text=ChatFlow+-+Real-Time+Chat+Application)

## 🌟 Features

### Core Functionality
- ✅ **Real-time messaging** - Instant message delivery using Socket.io
- ✅ **User authentication** - Simple username-based authentication
- ✅ **Multiple chat rooms** - Switch between General, Random, and Tech Talk rooms
- ✅ **Online status** - See who's currently online in each room
- ✅ **Typing indicators** - Know when someone is composing a message

### Advanced Features
- ✅ **Message reactions** - React to messages with emojis (👍 ❤️ 😂 😮 😢 🎉 🔥 ✨)
- ✅ **Real-time notifications** - Toast notifications for new messages and user activities
- ✅ **Browser notifications** - Native desktop notifications for new messages
- ✅ **Sound notifications** - Audio alerts for incoming messages
- ✅ **Unread message counter** - Track unread messages per room
- ✅ **Auto-reconnection** - Automatic reconnection on connection loss
- ✅ **Message timestamps** - See when each message was sent
- ✅ **Responsive design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Socket.io Client
- Tailwind CSS
- Lucide React (icons)
- Vite (build tool)

**Backend:**
- Node.js
- Express.js
- Socket.io Server
- CORS middleware

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Modern web browser with Web Notifications API support

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd chatflow
```

### 2. Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start the development server
npm run dev
```

The server will start on `http://localhost:3001`

### 3. Client Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The client will start on `http://localhost:5173`

### 4. Open the Application

Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
chatflow/
├── server/
│   ├── server.js           # Socket.io server implementation
│   ├── package.json
│   └── node_modules/
├── client/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Tailwind CSS
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── node_modules/
└── README.md
```

## 🎮 Usage Guide

### Joining the Chat

1. Enter your desired username
2. Click "Join Chat"
3. You'll be automatically placed in the General room

### Sending Messages

1. Type your message in the input field
2. Press Enter or click the Send button
3. Your message will appear instantly for all users in the room

### Switching Rooms

1. Click on any room name in the sidebar
2. The chat will load messages from that room
3. Other users will see you've joined the new room

### Adding Reactions

1. Hover over any message
2. Click the smile icon that appears
3. Select an emoji reaction
4. Click again to remove your reaction

### Viewing Online Users

- Check the "Online" section in the sidebar
- See all users currently in your room
- Green dot indicates online status

## 🎯 Features Implemented

### Task 1: Project Setup ✅
- [x] Node.js server with Express
- [x] Socket.io server configuration
- [x] React front-end with Vite
- [x] Socket.io client setup
- [x] Client-server connection

### Task 2: Core Chat Functionality ✅
- [x] User authentication (username-based)
- [x] Global chat room
- [x] Message display with sender name and timestamp
- [x] Typing indicators
- [x] Online/offline status

### Task 3: Advanced Chat Features ✅
- [x] Multiple chat rooms (General, Random, Tech Talk)
- [x] "User is typing" indicator
- [x] Message reactions
- [x] Real-time user list updates

### Task 4: Real-Time Notifications ✅
- [x] New message notifications
- [x] User join/leave notifications
- [x] Unread message count
- [x] Sound notifications
- [x] Browser notifications (Web Notifications API)

### Task 5: Performance and UX Optimization ✅
- [x] Reconnection logic
- [x] Socket.io rooms optimization
- [x] Responsive design (mobile & desktop)
- [x] Smooth animations and transitions
- [x] Error handling and loading states

## 🔧 Configuration

### Server Configuration

Edit `server/server.js` to change:
- Port number (default: 3001)
- CORS settings
- Room configuration

### Client Configuration

Edit `client/src/App.jsx` to change:
- Server URL (default: http://localhost:3001)
- Notification settings
- UI preferences

## 🚢 Deployment

### Server Deployment (Render/Railway/Heroku)

1. Create a new web service
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variable: `PORT=3001`

### Client Deployment (Vercel/Netlify)

1. Create a new site
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Update `SERVER_URL` in `App.jsx` to your deployed server URL

## 📸 Screenshots

### Login Screen
![Login](https://via.placeholder.com/600x400/667eea/ffffff?text=Login+Screen)

### Chat Interface
![Chat](https://via.placeholder.com/600x400/667eea/ffffff?text=Chat+Interface)

### Multiple Rooms
![Rooms](https://via.placeholder.com/600x400/667eea/ffffff?text=Multiple+Rooms)

## 🐛 Troubleshooting

### Connection Issues
- Ensure both server and client are running
- Check that the server URL in client matches your server
- Verify firewall settings aren't blocking connections

### Notifications Not Working
- Allow browser notifications when prompted
- Check browser notification settings
- Ensure HTTPS is used in production

## 🔮 Future Enhancements

- [ ] Private messaging between users
- [ ] File and image sharing
- [ ] Message search functionality
- [ ] Message editing and deletion
- [ ] User profiles with avatars
- [ ] Message persistence (database integration)
- [ ] Read receipts
- [ ] Video/voice calling
- [ ] End-to-end encryption

## 📄 License

MIT License - feel free to use this project for learning and development!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Built with ❤️ as a Socket.io demonstration project

## 🙏 Acknowledgments

- Socket.io documentation
- React documentation
- Tailwind CSS
- Lucide React icons

---

**Happy Chatting! 💬**
