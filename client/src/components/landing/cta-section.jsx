

import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react"


export function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 text-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-8">
            {/* Badge */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30 text-cyan-300 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Ready to Transform Your Finances?
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Your Financial Future
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Starts Today
                </span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Join thousands of users who have already transformed their financial lives with AI-powered insights and
                intelligent budgeting.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span>5-minute setup</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span>AI-powered insights</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/auth">
                <button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25 px-8 py-4 text-lg group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
              <div className="text-sm text-slate-400">No credit card required • Free forever plan available</div>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-slate-700/50">
              <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>25,000+ active users</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>$150M+ managed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span>4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
