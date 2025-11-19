# API Documentation

## Overview

SingularAI provides a RESTful API for managing users, conversations, messages, and admin operations. All endpoints except authentication require a valid JWT token.

## Authentication

### Register User

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword",
  "name": "John Doe" // optional
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx123456",
    "email": "user@example.com",
    "username": "johndoe",
    "name": "John Doe",
    "avatar": null,
    "isAdmin": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing required fields or user already exists
- `500` - Internal server error

### Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx123456",
    "email": "user@example.com",
    "username": "johndoe",
    "name": "John Doe",
    "avatar": null,
    "isAdmin": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Internal server error

## Users

### Get All Users

Get a list of all users except the current authenticated user.

**Endpoint:** `GET /api/users?search={query}`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `search` (optional) - Search by username, name, or email

**Response:**
```json
[
  {
    "id": "clx123456",
    "username": "johndoe",
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": null,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Error Responses:**
- `401` - Unauthorized (missing or invalid token)
- `500` - Internal server error

## Conversations

### Get User's Conversations

**Endpoint:** `GET /api/conversations`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": "clx789012",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "participants": [
      {
        "id": "clxpart123",
        "userId": "clx123456",
        "conversationId": "clx789012",
        "joinedAt": "2024-01-01T00:00:00.000Z",
        "user": {
          "id": "clx123456",
          "username": "johndoe",
          "name": "John Doe",
          "avatar": null
        }
      },
      {
        "id": "clxpart456",
        "userId": "clx654321",
        "conversationId": "clx789012",
        "joinedAt": "2024-01-01T00:00:00.000Z",
        "user": {
          "id": "clx654321",
          "username": "janedoe",
          "name": "Jane Doe",
          "avatar": null
        }
      }
    ],
    "messages": [
      {
        "id": "clxmsg123",
        "content": "Hello!",
        "senderId": "clx123456",
        "receiverId": "clx654321",
        "conversationId": "clx789012",
        "isRead": false,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
]
```

**Error Responses:**
- `401` - Unauthorized
- `500` - Internal server error

### Create Conversation

Create a new conversation or return existing one between two users.

**Endpoint:** `POST /api/conversations`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "participantId": "clx654321"
}
```

**Response:**
```json
{
  "id": "clx789012",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "participants": [
    {
      "id": "clxpart123",
      "userId": "clx123456",
      "conversationId": "clx789012",
      "joinedAt": "2024-01-01T00:00:00.000Z",
      "user": {
        "id": "clx123456",
        "username": "johndoe",
        "name": "John Doe",
        "avatar": null
      }
    },
    {
      "id": "clxpart456",
      "userId": "clx654321",
      "conversationId": "clx789012",
      "joinedAt": "2024-01-01T00:00:00.000Z",
      "user": {
        "id": "clx654321",
        "username": "janedoe",
        "name": "Jane Doe",
        "avatar": null
      }
    }
  ]
}
```

**Error Responses:**
- `400` - Missing participantId
- `401` - Unauthorized
- `500` - Internal server error

## Messages

### Get Messages

Get all messages for a specific conversation.

**Endpoint:** `GET /api/messages?conversationId={id}`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `conversationId` (required) - The conversation ID

**Response:**
```json
[
  {
    "id": "clxmsg123",
    "content": "Hello!",
    "senderId": "clx123456",
    "receiverId": "clx654321",
    "conversationId": "clx789012",
    "isRead": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "sender": {
      "id": "clx123456",
      "username": "johndoe",
      "name": "John Doe",
      "avatar": null
    },
    "receiver": {
      "id": "clx654321",
      "username": "janedoe",
      "name": "Jane Doe",
      "avatar": null
    }
  }
]
```

**Error Responses:**
- `400` - Missing conversationId
- `401` - Unauthorized
- `500` - Internal server error

### Send Message

**Endpoint:** `POST /api/messages`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "content": "Hello, how are you?",
  "receiverId": "clx654321",
  "conversationId": "clx789012"
}
```

**Response:**
```json
{
  "id": "clxmsg456",
  "content": "Hello, how are you?",
  "senderId": "clx123456",
  "receiverId": "clx654321",
  "conversationId": "clx789012",
  "isRead": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "sender": {
    "id": "clx123456",
    "username": "johndoe",
    "name": "John Doe",
    "avatar": null
  },
  "receiver": {
    "id": "clx654321",
    "username": "janedoe",
    "name": "Jane Doe",
    "avatar": null
  }
}
```

**Error Responses:**
- `400` - Missing required fields (content, receiverId, or conversationId)
- `401` - Unauthorized
- `500` - Internal server error

## Admin

All admin endpoints require the authenticated user to have `isAdmin: true`.

### Get Admin Dashboard Data

**Endpoint:** `GET /api/admin`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "users": [
    {
      "id": "clx123456",
      "email": "user@example.com",
      "username": "johndoe",
      "name": "John Doe",
      "avatar": null,
      "isAdmin": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "_count": {
        "sentMessages": 5,
        "receivedMessages": 3,
        "conversations": 2
      }
    }
  ],
  "conversations": [
    {
      "id": "clx789012",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "participants": [
        {
          "id": "clxpart123",
          "user": {
            "id": "clx123456",
            "username": "johndoe",
            "name": "John Doe"
          }
        },
        {
          "id": "clxpart456",
          "user": {
            "id": "clx654321",
            "username": "janedoe",
            "name": "Jane Doe"
          }
        }
      ],
      "_count": {
        "messages": 8
      }
    }
  ],
  "stats": {
    "totalUsers": 10,
    "totalConversations": 5,
    "totalMessages": 42
  }
}
```

**Error Responses:**
- `401` - Unauthorized or not admin
- `500` - Internal server error

### Delete User

**Endpoint:** `DELETE /api/admin?userId={id}`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `userId` (required) - The user ID to delete

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

**Error Responses:**
- `400` - Missing userId
- `401` - Unauthorized or not admin
- `500` - Internal server error

### Delete Conversation

**Endpoint:** `DELETE /api/admin?conversationId={id}`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `conversationId` (required) - The conversation ID to delete

**Response:**
```json
{
  "message": "Conversation deleted successfully"
}
```

**Error Responses:**
- `400` - Missing conversationId
- `401` - Unauthorized or not admin
- `500` - Internal server error

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing or invalid token)
- `500` - Internal Server Error

## Rate Limiting

Currently, no rate limiting is implemented. For production use, consider adding rate limiting middleware to prevent abuse.

## Authentication Flow

1. User registers or logs in via `/api/auth/register` or `/api/auth/login`
2. Server returns JWT token and user data
3. Client stores token (localStorage or httpOnly cookie)
4. Client includes token in `Authorization: Bearer {token}` header for all subsequent requests
5. Server validates token and extracts user information
6. Token expires after 7 days

## WebSocket Integration (Future)

For real-time messaging, Socket.IO can be integrated:

```javascript
// Server-side
io.on('connection', (socket) => {
  socket.on('join-conversation', (conversationId) => {
    socket.join(conversationId);
  });
  
  socket.on('send-message', (data) => {
    io.to(data.conversationId).emit('new-message', data.message);
  });
});

// Client-side
socket.emit('join-conversation', conversationId);
socket.on('new-message', (message) => {
  // Update UI with new message
});
```

## Best Practices

1. **Always use HTTPS in production**
2. **Never expose your JWT secret**
3. **Implement proper error handling on the client**
4. **Validate all input on both client and server**
5. **Use environment variables for configuration**
6. **Implement rate limiting for production**
7. **Log errors for debugging**
8. **Monitor API performance and usage**
