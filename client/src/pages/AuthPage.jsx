import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { TrendingUp, Sparkles } from "lucide-react";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <TrendingUp className="h-12 w-12 text-cyan-400" />
              <div className="absolute inset-0 h-12 w-12 text-cyan-400 animate-pulse blur-sm" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                FinanceAI
              </h1>
              <p className="text-sm text-slate-400">Future Finance</p>
            </div>
            <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-slate-300 text-lg">
            {isLogin
              ? "Welcome back to the future of finance"
              : "Join the financial revolution"}
          </p>
        </div>

        {/* Auth Form Container */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          {/* Tab Switcher */}
          <div className="flex mb-8 p-1 bg-slate-700/50 rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                isLogin
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                !isLogin
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          <div className="transition-all duration-500">
            {isLogin ? <Login /> : <Register />}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-400 text-sm">
          <p>Secure • Encrypted • Future-Ready</p>
          <div className="flex justify-center gap-4 mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
