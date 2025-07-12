"use client"

import { AnimatedCounter } from "./animated-counter"
import { useTheme } from "@/contexts/theme-context"
import { Users, TrendingUp, Shield, Globe, Zap, Clock } from "lucide-react"

export function StatsSection() {
  const { isDarkMode } = useTheme()

  const stats = [
    {
      icon: Users,
      number: 10000,
      suffix: "+",
      label: "Verified Professionals",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: isDarkMode
        ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
        : "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      number: 25000,
      suffix: "+",
      label: "Successful Exchanges",
      gradient: "from-purple-500 to-pink-500",
      bgColor: isDarkMode
        ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
        : "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      number: 98,
      suffix: "%",
      label: "Satisfaction Rate",
      gradient: "from-green-500 to-emerald-500",
      bgColor: isDarkMode
        ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
        : "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      number: 150,
      suffix: "+",
      label: "Countries Served",
      gradient: "from-orange-500 to-red-500",
      bgColor: isDarkMode
        ? "bg-gradient-to-br from-orange-500/20 to-red-500/20"
        : "bg-gradient-to-br from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      number: 99.9,
      suffix: "%",
      label: "Platform Uptime",
      decimals: 1,
      gradient: "from-yellow-500 to-orange-500",
      bgColor: isDarkMode
        ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20"
        : "bg-gradient-to-br from-yellow-500 to-orange-500",
    },
    {
      icon: Clock,
      number: 24,
      suffix: "/7",
      label: "Support Coverage",
      gradient: "from-indigo-500 to-purple-500",
      bgColor: isDarkMode
        ? "bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
        : "bg-gradient-to-br from-indigo-500 to-purple-500",
    },
  ]

  return (
    <section className={`py-20 px-6 lg:px-8 ${isDarkMode ? "bg-gray-900/20" : "bg-slate-50"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Trusted by professionals worldwide
          </h2>
          <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-slate-600"}`}>
            Join thousands of experts who are already transforming their careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className={`${stat.bgColor} rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-500 relative overflow-hidden`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  boxShadow: isDarkMode
                    ? `0 0 40px ${
                        stat.gradient.includes("blue")
                          ? "rgba(59, 130, 246, 0.2)"
                          : stat.gradient.includes("purple")
                            ? "rgba(168, 85, 247, 0.2)"
                            : stat.gradient.includes("green")
                              ? "rgba(34, 197, 94, 0.2)"
                              : stat.gradient.includes("orange")
                                ? "rgba(249, 115, 22, 0.2)"
                                : stat.gradient.includes("yellow")
                                  ? "rgba(234, 179, 8, 0.2)"
                                  : "rgba(99, 102, 241, 0.2)"
                      }`
                    : "0 10px 30px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/20" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/10" />
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${
                    isDarkMode ? "bg-white/10 backdrop-blur-sm" : "bg-white/20 backdrop-blur-sm"
                  } flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Counter */}
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 relative z-10">
                  <AnimatedCounter
                    end={stat.number}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    duration={2500}
                  />
                </div>

                {/* Label */}
                <div className={`text-lg font-medium relative z-10 ${isDarkMode ? "text-white/90" : "text-white/95"}`}>
                  {stat.label}
                </div>

                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${stat.gradient} blur-xl`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
