"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RotateCcw, Share2, Download, ArrowLeft, Twitter, Copy } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ResultPage() {
  const [result, setResult] = useState<any>(null)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const searchParams = useSearchParams()
  const videoId = searchParams.get("id")

  useEffect(() => {
    if (!videoId) return

    fetch(`http://localhost:5000/api/videos/${videoId}`)
      .then((res) => res.json())
      .then((data) => setResult(data.analysis))
      .catch((err) => console.error("Failed to fetch result", err))
  }, [videoId])

  const handleShare = (platform: string) => {
    const text = `DeepFake Defender detected this video as ${result?.status === "REAL" ? "REAL" : "FAKE"} with ${result?.confidence}% confidence.`
    const url = window.location.href

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case "copy":
        navigator.clipboard.writeText(`${text} ${url}`)
        break
    }
    setShareMenuOpen(false)
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center">
        <p>Loading analysis...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Link href="/history" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to History
        </Link>

        <div className="text-center mb-12">
          <div
            className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full text-xl font-bold mb-4 ${
              result.status === "REAL"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            {result.status === "REAL" ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
            <span>{result.status}</span>
          </div>

          <div className="text-6xl font-bold text-[#FF1F1F] mb-2">{result.confidence}%</div>
          <p className="text-gray-400 text-lg">Confidence Score</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Why This Was Flagged</h3>
            <ul className="space-y-3">
              {result.reasons.map((reason: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#FF1F1F] rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Confidence Over Time</h3>
            <div className="h-48 flex items-end space-x-1">
              {result.perFrame.map((point: any, index: number) => (
                <div
                  key={index}
                  className="bg-[#FF1F1F] flex-1 rounded-t"
                  style={{ height: `${(point.confidence / 100) * 100}%` }}
                  title={`Frame ${point.frame}: ${point.confidence.toFixed(1)}%`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Frame 1</span>
              <span>Frame {result.perFrame.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Frame-by-Frame Analysis</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {result.perFrame.map((frame: any, i: number) => (
              <div
                key={i}
                className={`flex-shrink-0 w-24 h-16 rounded border-2 ${
                  frame.confidence > 75 ? "border-red-500" : "border-gray-600"
                } bg-gray-800 flex flex-col items-center justify-center`}
              >
                <div className="text-xs text-gray-400">#{frame.frame}</div>
                <div
                  className={`text-xs font-bold ${
                    frame.confidence > 75 ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {frame.confidence.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
            <RotateCcw className="w-4 h-4 mr-2" /> Re-analyze
          </Button>

          <div className="relative">
            <Button
              onClick={() => setShareMenuOpen(!shareMenuOpen)}
              className="bg-[#FF1F1F] hover:bg-[#8B0000] text-white"
            >
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>

            {shareMenuOpen && (
              <div className="absolute top-full mt-2 right-0 bg-gray-900 border border-gray-700 rounded-lg p-2 min-w-48 z-10">
                <button
                  onClick={() => handleShare("twitter")}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded text-left"
                >
                  <Twitter className="w-4 h-4" /> <span>Twitter</span>
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded text-left"
                >
                  <Copy className="w-4 h-4" /> <span>Copy Link</span>
                </button>
              </div>
            )}
          </div>

          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
            <Download className="w-4 h-4 mr-2" /> Download Report
          </Button>
        </div>
      </main>
    </div>
  )
}
