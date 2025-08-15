import { useEffect, useState } from "react"
import { TrendingUp, Users, DollarSign, Target, Zap, Shield } from "lucide-react"

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    savings: 0,
    goals: 0,
    satisfaction: 0,
  })

  const finalStats = {
    users: 25000,
    savings: 150000000,
    goals: 75000,
    satisfaction: 98,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setAnimatedStats({
          users: Math.floor(finalStats.users * progress),
          savings: Math.floor(finalStats.savings * progress),
          goals: Math.floor(finalStats.goals * progress),
          satisfaction: Math.floor(finalStats.satisfaction * progress),
        })

        if (currentStep >= steps) {
          clearInterval(interval)
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }
  }, [isVisible])

  const stats = [
    {
      icon: Users,
      value: animatedStats.users.toLocaleString(),
      suffix: "+",
      label: "Active Users",
      description: "Trust FinanceAI with their financial future",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: DollarSign,
      value: `$${(animatedStats.savings / 1000000).toFixed(0)}M`,
      suffix: "+",
      label: "Money Managed",
      description: "In total assets tracked and optimized",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: Target,
      value: animatedStats.goals.toLocaleString(),
      suffix: "+",
      label: "Goals Achieved",
      description: "Financial milestones reached by our users",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      value: animatedStats.satisfaction,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Users report improved financial health",
      color: "from-orange-500 to-red-500",
    },
  ]

  const achievements = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Average setup time under 5 minutes",
      color: "text-yellow-400",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "256-bit encryption & SOC 2 compliant",
      color: "text-green-400",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Users save 23% more on average",
      color: "text-cyan-400",
    },
  ]

  return (
    <section id="stats-section" className="py-20 px-4 bg-slate-800/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Trusted by Thousands,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Proven Results
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Join a growing community of financially empowered individuals who have transformed their relationship with
            money using FinanceAI.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl text-center group hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-white">
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <div className="text-lg font-semibold text-slate-300">{stat.label}</div>
                    <div className="text-sm text-slate-400">{stat.description}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">
                  <Icon className={`h-12 w-12 ${achievement.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                  <p className="text-slate-400">{achievement.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
