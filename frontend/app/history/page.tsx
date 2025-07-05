"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, RotateCcw, Calendar, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function HistoryPage() {
  const [scans, setScans] = useState<any[]>([])
  const [filter, setFilter] = useState<"all" | "fake" | "real">("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch real data from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/videos/history")
      .then((res) => res.json())
      .then((data) => {
        // Only show analyzed videos
        const analyzedVideos = data.filter((video: any) => video.analysis?.status)
        setScans(analyzedVideos)
      })
      .catch((err) => {
        console.error("Failed to load history", err)
      })
  }, [])

  // Apply filter + search
  const filteredScans = scans.filter((scan) => {
    const matchesFilter = filter === "all" || scan.analysis.status.toLowerCase() === filter
    const matchesSearch = scan.originalname.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Scan History</h1>
            <p className="text-gray-400">View and manage your previous video analyses</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
              Sign In to Save History
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by filename..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-[#FF1F1F] text-white" : "bg-transparent border-gray-600 text-white"}
            >
              All
            </Button>
            <Button
              variant="outline"
              onClick={() => setFilter("fake")}
              className={filter === "fake" ? "bg-[#FF1F1F] text-white" : "bg-transparent border-gray-600 text-white"}
            >
              Fake Only
            </Button>
            <Button
              variant="outline"
              onClick={() => setFilter("real")}
              className={filter === "real" ? "bg-[#FF1F1F] text-white" : "bg-transparent border-gray-600 text-white"}
            >
              Real Only
            </Button>
          </div>
        </div>

        {/* History Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScans.map((scan) => (
            <div
              key={scan._id}
              className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
            >
              <div className="aspect-video bg-gray-800 rounded mb-4 flex items-center justify-center">
                <img src="/placeholder.svg" alt={scan.originalname} className="w-full h-full object-cover rounded" />
              </div>
              <div className="space-y-3">
                <h3 className="font-medium text-white truncate">{scan.originalname}</h3>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                      scan.analysis.status === "REAL"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {scan.analysis.status === "REAL" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    <span>{scan.analysis.status}</span>
                  </div>
                  <span className="text-[#FF1F1F] font-bold">
                    {scan.analysis.confidence.toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(scan.analysis.analyzedAt).toLocaleDateString()}
                </div>
                <div className="flex gap-2 pt-2">
                  <Link href={`/result/${scan._id}`} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                    >
                      View Details
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredScans.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No results found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  )
}
