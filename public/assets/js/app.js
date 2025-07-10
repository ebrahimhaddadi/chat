const socket = io('http://192.168.1.184:3001');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');
const username = prompt('لطفاً نام خود را وارد کنید:') || 'کاربر ناشناس';

// دیباگ اتصال
socket.on('connect', () => {
    console.log('اتصال به سرور Socket.IO برقرار شد');
});

socket.on('connect_error', (err) => {
    console.log('خطا در اتصال به سرور:', err.message);
});

// مدیریت submit فرم
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // جلوگیری از رفرش صفحه
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat message', { username, message });
        messageInput.value = '';
    }
});

// مدیریت ارسال با Enter
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});

// دریافت و نمایش پیام‌ها
socket.on('chat message', ({ username: sender, message }) => {
    console.log('پیام دریافت شد:', { sender, message }); // دیباگ
    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add(sender === username ? 'sent' : 'received');
    div.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});

// ثبت Service Worker (اختیاری)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker Registered'))
        .catch(err => console.log('Service Worker Error:', err));
}