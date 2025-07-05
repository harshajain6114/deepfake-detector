"use client"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Upload, Brain, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    icon: Upload,
    title: "Upload a video",
    description: "Upload your video file (30 seconds or less) in MP4 format",
    details: "Our system accepts various video formats and automatically optimizes them for analysis.",
  },
  {
    icon: Brain,
    title: "AI analyzes patterns",
    description: "AI analyzes key facial, audio & visual patterns using deep learning",
    details: "Advanced neural networks examine micro-expressions, compression artifacts, and temporal inconsistencies.",
  },
  {
    icon: FileText,
    title: "Get detailed results",
    description: "Receive results with reasoning & frame-by-frame insights",
    details: "Comprehensive report with confidence scores, flagged frames, and technical explanations.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/10 via-transparent to-[#FF1F1F]/5" />

      {/* Glitch overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-1 bg-[#FF1F1F] animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-24 h-1 bg-[#FF1F1F] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-[#FF1F1F] animate-pulse delay-500" />
      </div>

      <Header />

      <main className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">How It</span>
            <span className="text-[#FF1F1F]"> Works</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Deep learning meets digital forensics. Our AI system uses advanced neural networks to detect the subtle
            signs of manipulation that human eyes often miss.
          </p>
          <div className="inline-block px-6 py-2 bg-[#FF1F1F]/10 border border-[#FF1F1F]/30 rounded-full">
            <span className="text-[#FF1F1F] font-medium">Forensic-Level Analysis</span>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-16 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center gap-12">
              <div className={`flex-1 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-[#FF1F1F]/10 rounded-full flex items-center justify-center mr-4">
                    <step.icon className="w-8 h-8 text-[#FF1F1F]" />
                  </div>
                  <div className="text-4xl font-bold text-gray-600">{String(index + 1).padStart(2, "0")}</div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-xl text-gray-300 mb-4">{step.description}</p>
                <p className="text-gray-400 leading-relaxed">{step.details}</p>
              </div>

              <div className={`flex-1 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8 h-64 flex items-center justify-center">
                  <step.icon className="w-24 h-24 text-[#FF1F1F]/30" />
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center">
                  <ArrowRight className="w-8 h-8 text-[#FF1F1F] rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-900/30 border border-gray-800 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Try It?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Upload your first video and see our AI in action. Get detailed analysis with frame-by-frame insights in
            seconds.
          </p>
          <Link href="/">
            <Button className="bg-[#FF1F1F] hover:bg-[#8B0000] text-white px-8 py-3 text-lg font-medium">
              Try It Now
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
