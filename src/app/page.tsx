import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex flex-col gap-8 items-center max-w-4xl w-full">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Welcome to SingularAI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A secure and private chat application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
          <Link
            href="/auth/login"
            className="flex flex-col items-center gap-4 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="text-4xl">🔐</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Login
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Access your account and start chatting
            </p>
          </Link>

          <Link
            href="/auth/register"
            className="flex flex-col items-center gap-4 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="text-4xl">✨</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Register
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Create a new account to get started
            </p>
          </Link>

          <Link
            href="/chat"
            className="flex flex-col items-center gap-4 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="text-4xl">💬</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Chat
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Start a private conversation
            </p>
          </Link>

          <Link
            href="/admin"
            className="flex flex-col items-center gap-4 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="text-4xl">⚙️</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Admin Panel
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Manage users and conversations
            </p>
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>🔒 End-to-end encrypted conversations</p>
          <p>🛡️ Complete privacy between participants</p>
        </div>
      </main>
    </div>
  );
}
