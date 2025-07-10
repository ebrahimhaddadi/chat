const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// استفاده از CORS برای REST API (در صورت نیاز)
app.use(cors({
  origin: '*', // یا مثلاً: 'http://localhost:3000'
}));

// تنظیم CORS برای خود socket.io
const io = socketIo(server, {
  cors: {
    origin: '*', // یا: 'http://localhost:3000'
    methods: ['GET', 'POST']
  }
});

// ارائه فایل‌های استاتیک از پوشه public
app.use(express.static(path.join(__dirname, 'public')));

// مدیریت اتصال Socket.IO
io.on('connection', (socket) => {
    console.log('کاربر متصل شد');

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('کاربر قطع شد');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`سرور در حال اجرا در پورت ${PORT}`);
});
