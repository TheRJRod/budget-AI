
import { Check, Sparkles, Crown, Zap, ArrowRight } from "lucide-react"


export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "Forever",
      description: "Perfect for getting started with financial tracking",
      icon: Zap,
      color: "from-emerald-500 to-green-500",
      popular: false,
      features: [
        "Basic income & expense tracking",
        "Up to 3 financial goals",
        "Monthly budget insights",
        "Mobile app access",
        "Email support",
        "Basic AI recommendations",
      ],
      limitations: ["Limited to 1 bank account", "Basic reporting only"],
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "Advanced features for serious financial planning",
      icon: Sparkles,
      color: "from-cyan-500 to-purple-500",
      popular: true,
      features: [
        "Everything in Starter",
        "Unlimited financial goals",
        "Advanced AI insights & predictions",
        "Multiple bank account connections",
        "Investment tracking",
        "Custom budget categories",
        "Detailed analytics & reports",
        "Priority support",
        "Export data capabilities",
      ],
      limitations: [],
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "per month",
      description: "Complete financial management for power users",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      popular: false,
      features: [
        "Everything in Pro",
        "Personal financial advisor AI",
        "Tax optimization suggestions",
        "Investment recommendations",
        "Multi-currency support",
        "Family account sharing",
        "Advanced security features",
        "White-glove onboarding",
        "24/7 phone support",
        "Custom integrations",
      ],
      limitations: [],
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-300 px-4 py-2">
            <Crown className="h-4 w-4 mr-2" />
            Simple Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Choose Your
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Financial Journey
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Start free and upgrade as your financial needs grow. All plans include our core AI-powered insights and
            bank-level security.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <div
                key={index}
                className={`relative bg-slate-800/50 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/70 transition-all duration-300 ${
                  plan.popular ? "ring-2 ring-cyan-500/50 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-1">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center pb-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-2xl text-white">{plan.name}</div>
                  <div className="text-slate-400">{plan.description}</div>
                  <div className="pt-4">
                    <div className="text-4xl font-bold text-white">{plan.price}</div>
                    <div className="text-slate-400">{plan.period}</div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-slate-700">
                      <div className="text-xs text-slate-500 mb-2">Limitations:</div>
                      {plan.limitations.map((limitation, i) => (
                        <div key={i} className="text-xs text-slate-500">
                          • {limitation}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <a href="/auth">
                    <button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white shadow-lg shadow-cyan-500/25"
                          : "bg-slate-700 hover:bg-slate-600 text-white"
                      } group`}
                    >
                      {plan.price === "Free" ? "Get Started Free" : "Start Free Trial"}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* FAQ */}
        <div className="text-center space-y-8">
          <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Can I change plans anytime?</h4>
              <p className="text-slate-400 text-sm">
                Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect
                immediately.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Is my financial data secure?</h4>
              <p className="text-slate-400 text-sm">
                Absolutely. We use bank-level 256-bit encryption and are SOC 2 compliant. Your data is never shared or
                sold.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Do you offer refunds?</h4>
              <p className="text-slate-400 text-sm">
                Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Can I connect multiple banks?</h4>
              <p className="text-slate-400 text-sm">
                Pro and Premium plans support unlimited bank connections. Starter is limited to one account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
