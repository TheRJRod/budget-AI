import {
  Brain,
  TrendingUp,
  Target,
  Shield,
  Zap,
  BarChart3,
  Bell,
  Smartphone,
  DollarSign,
  PieChart,
  Calendar,
  Lock,
} from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get personalized financial advice that learns from your spending patterns and goals",
      color: "from-cyan-500 to-blue-500",
      badge: "Smart",
      details: ["Predictive analytics", "Spending pattern recognition", "Goal optimization"],
    },
    {
      icon: TrendingUp,
      title: "Real-Time Tracking",
      description: "Monitor your income, expenses, and savings with live updates and beautiful visualizations",
      color: "from-emerald-500 to-green-500",
      badge: "Live",
      details: ["Instant updates", "Visual dashboards", "Trend analysis"],
    },
    {
      icon: Target,
      title: "Smart Goal Setting",
      description: "Set and achieve financial goals with AI-assisted planning and progress tracking",
      color: "from-purple-500 to-pink-500",
      badge: "Goals",
      details: ["Automated planning", "Progress tracking", "Achievement rewards"],
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep dive into your financial data with comprehensive reports and forecasting",
      color: "from-orange-500 to-red-500",
      badge: "Analytics",
      details: ["Detailed reports", "Future projections", "Spending insights"],
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Stay on top of your finances with intelligent alerts and reminders",
      color: "from-yellow-500 to-orange-500",
      badge: "Alerts",
      details: ["Bill reminders", "Budget alerts", "Goal milestones"],
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your financial data is protected with enterprise-grade encryption and security",
      color: "from-indigo-500 to-purple-500",
      badge: "Secure",
      details: ["256-bit encryption", "Two-factor auth", "Privacy first"],
    },
  ]

  const additionalFeatures = [
    { icon: Smartphone, title: "Mobile First", description: "Access anywhere, anytime" },
    { icon: DollarSign, title: "Multi-Currency", description: "Support for global currencies" },
    { icon: PieChart, title: "Budget Planning", description: "Intelligent budget recommendations" },
    { icon: Calendar, title: "Bill Scheduling", description: "Never miss a payment again" },
    { icon: Lock, title: "Data Privacy", description: "Your data stays private, always" },
    { icon: Zap, title: "Lightning Fast", description: "Optimized for speed and performance" },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300 px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Master Your Money
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Our comprehensive suite of tools and AI-powered features work together to give you complete control over
            your financial future.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="rounded-lg border text-card-foreground shadow-2xs bg-slate-800/50 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/70 transition-all duration-300 group"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div variant="outline" className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-slate-700/50 text-slate-300 border-slate-600">
                      {feature.badge}
                    </div>
                  </div>
                  <div className="text-white text-xl">{feature.title}</div>
                  <div className="text-slate-400 text-base leading-relaxed">
                    {feature.description}
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Features */}
        <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-8">And Much More...</h3>
          <div className="flex gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center space-y-3 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto group-hover:from-cyan-500 group-hover:to-purple-500 transition-all duration-300">
                    <Icon className="h-6 w-6 text-slate-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                    <p className="text-xs text-slate-400">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
