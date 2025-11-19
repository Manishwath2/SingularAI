import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatar: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            sentMessages: true,
            receivedMessages: true,
            conversations: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Get all conversations
    const conversations = await prisma.conversation.findMany({
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Get all messages count
    const totalMessages = await prisma.message.count();

    // Get stats
    const stats = {
      totalUsers: users.length,
      totalConversations: conversations.length,
      totalMessages,
    };

    return NextResponse.json({
      users,
      conversations,
      stats,
    });
  } catch (error) {
    console.error('Get admin data error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const conversationId = searchParams.get('conversationId');

    if (userId) {
      // Delete user
      await prisma.user.delete({
        where: { id: userId },
      });
      return NextResponse.json({ message: 'User deleted successfully' });
    }

    if (conversationId) {
      // Delete conversation
      await prisma.conversation.delete({
        where: { id: conversationId },
      });
      return NextResponse.json({ message: 'Conversation deleted successfully' });
    }

    return NextResponse.json(
      { error: 'User ID or Conversation ID is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
