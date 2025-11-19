# SingularAI - Private Chat Application

A secure and private chat application built with Next.js, featuring real-time messaging between two users and a comprehensive admin panel for database management.

## Features

### User Features
- 🔐 **Secure Authentication**: Register and login with JWT-based authentication
- 💬 **Private Messaging**: One-on-one chat between users with complete privacy
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🌙 **Dark Mode**: Automatic dark mode support based on system preferences
- ⚡ **Real-time Updates**: Instant message delivery and updates

### Admin Features
- 📊 **Dashboard**: View statistics including total users, conversations, and messages
- 👥 **User Management**: View all users with their activity metrics
- 💬 **Conversation Management**: Monitor and manage all conversations
- 🗑️ **Data Management**: Delete users and conversations as needed

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.IO (ready to implement)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Manishwath2/SingularAI.git
cd SingularAI
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` file with your database credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/singularai?schema=public"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
SingularAI/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── messages/     # Message endpoints
│   │   │   ├── conversations/# Conversation endpoints
│   │   │   ├── users/        # User endpoints
│   │   │   └── admin/        # Admin endpoints
│   │   ├── auth/             # Auth pages (login, register)
│   │   ├── chat/             # Chat page
│   │   ├── admin/            # Admin panel
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── ChatInterface.tsx # Chat UI component
│   │   └── AdminDashboard.tsx# Admin dashboard component
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client
│   │   └── auth.ts           # Authentication utilities
│   └── types/                # TypeScript type definitions
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (except current user)

### Conversations
- `GET /api/conversations` - Get user's conversations
- `POST /api/conversations` - Create a new conversation

### Messages
- `GET /api/messages?conversationId={id}` - Get messages for a conversation
- `POST /api/messages` - Send a new message

### Admin
- `GET /api/admin` - Get admin dashboard data (admin only)
- `DELETE /api/admin?userId={id}` - Delete a user (admin only)
- `DELETE /api/admin?conversationId={id}` - Delete a conversation (admin only)

## Database Schema

### User
- id, email, username, password, name, avatar
- isAdmin flag for admin access
- Relations: sent/received messages, conversations

### Conversation
- id, timestamps
- Relations: messages, participants

### ConversationParticipant
- Links users to conversations
- Two participants per conversation (private chat)

### Message
- id, content, timestamps
- senderId, receiverId, conversationId
- isRead flag for read receipts

## Creating an Admin User

To create an admin user, you'll need to manually update the database after registration:

1. Register a user through the app
2. Connect to your database
3. Run:
```sql
UPDATE users SET "isAdmin" = true WHERE email = 'admin@example.com';
```

## Future Enhancements

- [ ] Socket.IO integration for real-time messaging
- [ ] File and image sharing
- [ ] Message editing and deletion
- [ ] Typing indicators
- [ ] Online/offline status
- [ ] Push notifications
- [ ] Message search functionality
- [ ] User profiles with avatars
- [ ] End-to-end encryption
- [ ] Message reactions and emojis

## UI Kit Integration

This application is ready to integrate with a custom UI kit. The current implementation uses Tailwind CSS for styling, which can be easily customized or replaced with your design system.

To integrate a custom UI kit:
1. Add your UI kit components to the `src/components` directory
2. Replace the existing components with your custom designs
3. Update the styling in the components to match your theme
4. Adjust the Tailwind configuration if needed

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Admin-only endpoints
- Input validation
- SQL injection protection via Prisma

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the GitHub repository.
