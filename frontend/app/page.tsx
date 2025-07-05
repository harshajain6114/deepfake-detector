"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, Shield, Eye, Zap, CheckCircle, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { MatrixBackground } from "@/components/ui/matrix-background"
import { useRouter } from "next/navigation"

function FileUploadCard() {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const router = useRouter()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const videoFile = files.find((file) => file.type.startsWith("video/"))

    if (videoFile) {
      setUploadedFile(videoFile)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }, [])

  const handleStartScan = async () => {
  if (!uploadedFile) return

  const formData = new FormData()
  formData.append("video", uploadedFile)

  try {
    // Step 1: Upload
    const uploadRes = await fetch("http://localhost:5000/api/videos/upload", {
      method: "POST",
      body: formData
    })

    const uploadData = await uploadRes.json()
    const videoId = uploadData.video._id

    // Step 2: Analyze
    const analyzeRes = await fetch(`http://localhost:5000/api/videos/analyze/${videoId}`, {
      method: "POST"
    })

    const analyzeData = await analyzeRes.json()

    // Step 3: Redirect to results with ID
    router.push(`/result?id=${videoId}`)
  } catch (err) {
    console.error("Upload/Analysis failed", err)
    alert("Something went wrong. Please try again.")
  }
}


  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300
          ${isDragOver ? "border-[#FF1F1F] bg-[#FF1F1F]/5" : "border-gray-600 hover:border-[#FF1F1F]/50"}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="video-upload"
        />

        <div className="space-y-6">
          <div className="mx-auto w-16 h-16 bg-[#FF1F1F]/10 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-[#FF1F1F]" />
          </div>

          {uploadedFile ? (
            <div className="space-y-2">
              <CheckCircle className="w-8 h-8 text-[#FF1F1F] mx-auto" />
              <p className="text-white font-medium">{uploadedFile.name}</p>
              <p className="text-gray-400 text-sm">{(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-white text-lg font-medium">Drop your video file here</p>
              <p className="text-gray-400">or click to browse • MP4 format • Max 30 seconds</p>
            </div>
          )}
        </div>
      </div>

      {uploadedFile && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleStartScan}
            className="bg-[#FF1F1F] hover:bg-[#8B0000] text-white px-8 py-3 text-lg font-medium transition-all duration-200 hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Scan
          </Button>
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white relative">
      <MatrixBackground />
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-white">Unmask</span>
              <span className="text-[#FF1F1F]"> Deepfakes</span>
              <span className="text-white"> with AI</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Detect manipulated videos in seconds using forensic-level deep learning.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <FileUploadCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2 p-6 border border-gray-800 rounded-lg bg-gray-900/20 backdrop-blur-sm">
            <div className="w-12 h-12 bg-[#FF1F1F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-[#FF1F1F]" />
            </div>
            <div className="text-3xl font-bold text-[#FF1F1F]">
              <AnimatedCounter end={1000} suffix="+" />
            </div>
            <p className="text-gray-400">Videos Scanned</p>
          </div>

          <div className="text-center space-y-2 p-6 border border-gray-800 rounded-lg bg-gray-900/20 backdrop-blur-sm">
            <div className="w-12 h-12 bg-[#FF1F1F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-[#FF1F1F]" />
            </div>
            <div className="text-3xl font-bold text-[#FF1F1F]">
              <AnimatedCounter end={90} suffix="%" />
            </div>
            <p className="text-gray-400">Detection Accuracy</p>
          </div>

          <div className="text-center space-y-2 p-6 border border-gray-800 rounded-lg bg-gray-900/20 backdrop-blur-sm">
            <div className="w-12 h-12 bg-[#FF1F1F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-[#FF1F1F]" />
            </div>
            <div className="text-3xl font-bold text-[#FF1F1F]">
              <AnimatedCounter end={99} suffix="%" />
            </div>
            <p className="text-gray-400">User Trust Score</p>
          </div>
        </div>
      </main>
    </div>
  )
}
