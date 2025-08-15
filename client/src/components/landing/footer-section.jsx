import { TrendingUp, Mail, Twitter, Github, Linkedin } from "lucide-react"


export function FooterSection() {
  const footerLinks = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Demo", href: "#demo" },
      { name: "Security", href: "#security" },
    ],
    Company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    Resources: [
      { name: "Help Center", href: "/help" },
      { name: "API Docs", href: "/docs" },
      { name: "Community", href: "/community" },
      { name: "Status", href: "/status" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  }

  return (
    <footer className="py-16 px-4 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <TrendingUp className="h-8 w-8 text-cyan-400" />
                <div className="absolute inset-0 h-8 w-8 text-cyan-400 animate-pulse blur-sm" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  FinanceAI
                </h3>
                <p className="text-xs text-slate-400">Future Finance</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Empowering your financial future with AI-driven insights and intelligent budgeting.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="font-semibold text-white">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm">© 2024 FinanceAI. All rights reserved.</div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span>Made for your financial future</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
