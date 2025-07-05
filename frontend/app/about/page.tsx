"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Twitter, ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How accurate is the deepfake detection?",
    answer:
      "Our AI model achieves 90%+ accuracy on standard deepfake datasets. However, accuracy can vary depending on video quality, duration, and the sophistication of the manipulation technique used.",
  },
  {
    question: "What video formats are supported?",
    answer:
      "We currently support MP4, AVI, MOV, and WebM formats. Videos should be under 30 seconds and less than 100MB in size for optimal processing.",
  },
  {
    question: "Is my uploaded content stored or shared?",
    answer:
      "No, we do not store your videos permanently. Files are processed in real-time and automatically deleted from our servers after analysis. We prioritize your privacy and data security.",
  },
  {
    question: "Can I use this for commercial purposes?",
    answer:
      "Yes, DeepFake Defender is free to use for both personal and commercial purposes. We believe in democratizing access to deepfake detection technology.",
  },
  {
    question: "How does the AI detect deepfakes?",
    answer:
      "Our system analyzes multiple factors including facial inconsistencies, temporal artifacts, compression patterns, and audio-visual synchronization to identify potential manipulations.",
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-800 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-900/30 transition-colors"
      >
        <span className="font-medium text-white">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-[#FF1F1F]" /> : <ChevronDown className="w-5 h-5 text-[#FF1F1F]" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-400 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">About</span>
            <span className="text-[#FF1F1F]"> Us</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Helping journalists, citizens, and watchdogs uncover truth in an age of digital deception.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            In an era where synthetic media can be created with unprecedented ease, we believe everyone deserves access
            to tools that can help distinguish truth from fiction. DeepFake Defender democratizes advanced AI detection
            technology, making it accessible to journalists, researchers, and everyday users who need to verify video
            content.
          </p>
          <blockquote className="border-l-4 border-[#FF1F1F] pl-6 italic text-gray-400">
            "The best defense against misinformation is an informed public equipped with the right tools."
          </blockquote>
        </div>

        {/* Why It Matters */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Why It Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#FF1F1F] mb-3">Media Integrity</h3>
              <p className="text-gray-400">
                Protecting the credibility of journalism and media by providing tools to verify content authenticity.
              </p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#FF1F1F] mb-3">Public Trust</h3>
              <p className="text-gray-400">
                Empowering individuals to make informed decisions about the content they consume and share.
              </p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#FF1F1F] mb-3">Democratic Values</h3>
              <p className="text-gray-400">
                Supporting democratic processes by combating the spread of manipulated media in political contexts.
              </p>
            </div>
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#FF1F1F] mb-3">Accessibility</h3>
              <p className="text-gray-400">
                Making advanced AI detection technology free and accessible to everyone, regardless of technical
                expertise.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Have Questions or Concerns?</h2>
          <p className="text-gray-400 mb-6">
            We're here to help. Reach out to us for support, feedback, or collaboration opportunities.
          </p>
          <Button
            onClick={() => (window.location.href = "mailto:harshajain6114@gmail.com")}
            className="bg-[#FF1F1F] hover:bg-[#8B0000] text-white px-6 py-3"
          >
            <Mail className="w-5 h-5 mr-2" />
            Email us at harshajain6114@gmail.com
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 DeepFake Defender. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FF1F1F] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF1F1F] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF1F1F] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
