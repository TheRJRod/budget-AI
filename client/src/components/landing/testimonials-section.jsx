

import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Tech Startup",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "FinanceAI completely transformed how I manage my money. The AI insights helped me identify spending patterns I never noticed, and I've saved over $3,000 in just 6 months!",
      highlight: "Saved $3,000 in 6 months",
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Director",
      company: "Fortune 500",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "The goal tracking feature is incredible. I was able to save for my dream vacation 3 months ahead of schedule thanks to the personalized recommendations. The interface is beautiful too!",
      highlight: "Reached goals 3 months early",
    },
    {
      name: "Emily Watson",
      role: "Freelance Designer",
      company: "Self-Employed",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "As a freelancer with irregular income, budgeting was always a nightmare. FinanceAI's smart budgeting adapts to my income fluctuations and keeps me on track. Game changer!",
      highlight: "Perfect for irregular income",
    },
    {
      name: "David Kim",
      role: "Financial Analyst",
      company: "Investment Firm",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "Even as someone who works in finance, FinanceAI showed me blind spots in my personal finances. The AI recommendations are surprisingly sophisticated and actionable.",
      highlight: "Sophisticated AI insights",
    },
    {
      name: "Lisa Thompson",
      role: "Teacher",
      company: "Public School",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "I was skeptical about AI managing my finances, but FinanceAI made it so simple. The security features give me peace of mind, and I love the educational insights it provides.",
      highlight: "Simple and secure",
    },
    {
      name: "Alex Johnson",
      role: "Startup Founder",
      company: "Tech Entrepreneur",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "Managing both personal and business finances was chaotic until I found FinanceAI. The multi-account support and real-time tracking have been invaluable for my startup journey.",
      highlight: "Perfect for entrepreneurs",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-300 px-4 py-2">
            <Star className="h-4 w-4 mr-2" />
            Customer Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Loved by Users
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our users have to say about their FinanceAI experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/70 transition-all duration-300 group"
            >
              <div className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="h-8 w-8 text-cyan-400/50" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-slate-300 mb-6 leading-relaxed">"{testimonial.text}"</blockquote>

                {/* Highlight Badge */}
                <div
                  variant="outline"
                  className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30 text-cyan-300 mb-4"
                >
                  {testimonial.highlight}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12">
                    <img src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                    <div className="text-xs text-slate-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-8 py-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-white font-semibold">4.9/5</span>
            </div>
            <div className="w-1 h-8 bg-slate-600 rounded-full" />
            <div className="text-slate-300">
              <span className="font-semibold text-white">2,000+</span> reviews
            </div>
            <div className="w-1 h-8 bg-slate-600 rounded-full" />
            <div className="text-slate-300">
              <span className="font-semibold text-white">98%</span> satisfaction
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
