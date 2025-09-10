"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Video, VideoOff, Mic, MicOff, Camera, Users, Brain, Briefcase, Play, Square } from "lucide-react"

type InterviewType = "hr" | "technical" | "aptitude"

interface Question {
  id: string
  question: string
  type: InterviewType
  timeLimit: number
}

const mockQuestions: Record<InterviewType, Question[]> = {
  hr: [
    { id: "hr1", question: "Tell me about yourself and your career goals.", type: "hr", timeLimit: 120 },
    { id: "hr2", question: "Why do you want to work for our company?", type: "hr", timeLimit: 90 },
    {
      id: "hr3",
      question: "Describe a challenging situation you faced and how you handled it.",
      type: "hr",
      timeLimit: 120,
    },
  ],
  technical: [
    {
      id: "tech1",
      question: "Explain the difference between React hooks and class components.",
      type: "technical",
      timeLimit: 180,
    },
    {
      id: "tech2",
      question: "How would you optimize a slow-performing database query?",
      type: "technical",
      timeLimit: 240,
    },
    {
      id: "tech3",
      question: "Describe your approach to handling errors in a distributed system.",
      type: "technical",
      timeLimit: 200,
    },
  ],
  aptitude: [
    {
      id: "apt1",
      question: "If a train travels 60 mph for 2 hours, then 80 mph for 1 hour, what's the average speed?",
      type: "aptitude",
      timeLimit: 60,
    },
    {
      id: "apt2",
      question: "You have 8 balls, one is heavier. Using a balance scale twice, how do you find the heavy ball?",
      type: "aptitude",
      timeLimit: 120,
    },
    {
      id: "apt3",
      question: "A company's revenue increased 20% in Q1, then decreased 15% in Q2. What's the net change?",
      type: "aptitude",
      timeLimit: 90,
    },
  ],
}

export default function InterviewPage() {
  const [selectedType, setSelectedType] = useState<InterviewType | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [micEnabled, setMicEnabled] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [stream])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      setStream(mediaStream)
      setCameraEnabled(true)
      setMicEnabled(true)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      console.log("[v0] Camera and microphone access granted")
    } catch (error) {
      console.error("[v0] Error accessing camera:", error)
      alert("Camera access is required for the interview. Please allow camera permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setCameraEnabled(false)
    setMicEnabled(false)
  }

  const startInterview = (type: InterviewType) => {
    setSelectedType(type)
    setCurrentQuestion(0)
    setTimeLeft(mockQuestions[type][0].timeLimit)
    startTimer()
  }

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          nextQuestion()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const nextQuestion = () => {
    if (!selectedType) return

    const questions = mockQuestions[selectedType]
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setTimeLeft(questions[currentQuestion + 1].timeLimit)
    } else {
      endInterview()
    }
  }

  const endInterview = () => {
    setIsRecording(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    console.log("[v0] Interview completed")
    alert("Interview completed! Your responses have been recorded.")
  }

  const toggleRecording = () => {
    if (!cameraEnabled) {
      alert("Please enable camera first")
      return
    }

    setIsRecording(!isRecording)
    console.log("[v0] Recording toggled:", !isRecording)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (selectedType && cameraEnabled) {
    const questions = mockQuestions[selectedType]
    const currentQ = questions[currentQuestion]

    return (
      <div className="min-h-screen bg-background p-4 md:ml-64">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Interview Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Interview
              </h1>
              <p className="text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={timeLeft > 30 ? "default" : "destructive"} className="text-lg px-3 py-1">
                {formatTime(timeLeft)}
              </Badge>
              <Button onClick={endInterview} variant="outline" size="sm">
                End Interview
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Video Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Video Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Button
                      size="sm"
                      variant={cameraEnabled ? "default" : "secondary"}
                      onClick={() => setCameraEnabled(!cameraEnabled)}
                    >
                      {cameraEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant={micEnabled ? "default" : "secondary"}
                      onClick={() => setMicEnabled(!micEnabled)}
                    >
                      {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                  </div>
                  {isRecording && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      REC
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Question Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Current Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-lg font-medium">{currentQ.question}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={toggleRecording}
                    variant={isRecording ? "destructive" : "default"}
                    className="flex-1 gap-2"
                  >
                    {isRecording ? (
                      <>
                        <Square className="h-4 w-4" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Start Recording
                      </>
                    )}
                  </Button>
                  <Button onClick={nextQuestion} variant="outline" disabled={currentQuestion >= questions.length - 1}>
                    Next Question
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>• Speak clearly and maintain eye contact with the camera</p>
                  <p>• Take your time to think before answering</p>
                  <p>• You can skip to the next question anytime</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 md:ml-64">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-display font-bold text-foreground">Take My Interview</h1>
          <p className="text-muted-foreground text-lg">Practice with AI-powered mock interviews</p>
        </motion.div>

        {/* Camera Setup */}
        {!cameraEnabled && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Camera Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                To start your interview, we need access to your camera and microphone.
              </p>
              <Button onClick={startCamera} className="gap-2">
                <Video className="h-4 w-4" />
                Enable Camera & Microphone
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Interview Types */}
        {cameraEnabled && !selectedType && (
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer h-full"
                onClick={() => startInterview("hr")}
              >
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <CardTitle>HR Interview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">
                    Behavioral questions, company culture fit, and soft skills assessment
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-center">
                      3 Questions
                    </Badge>
                    <Badge variant="outline" className="w-full justify-center">
                      1.5-2 min each
                    </Badge>
                  </div>
                  <Button className="w-full gap-2">
                    <Play className="h-4 w-4" />
                    Start HR Interview
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer h-full"
                onClick={() => startInterview("technical")}
              >
                <CardHeader className="text-center">
                  <Briefcase className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <CardTitle>Technical Interview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">
                    Technical knowledge, problem-solving, and domain expertise
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-center">
                      3 Questions
                    </Badge>
                    <Badge variant="outline" className="w-full justify-center">
                      3-4 min each
                    </Badge>
                  </div>
                  <Button className="w-full gap-2">
                    <Play className="h-4 w-4" />
                    Start Technical Interview
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer h-full"
                onClick={() => startInterview("aptitude")}
              >
                <CardHeader className="text-center">
                  <Brain className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                  <CardTitle>Aptitude Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">
                    Logical reasoning, quantitative analysis, and problem-solving
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-center">
                      3 Questions
                    </Badge>
                    <Badge variant="outline" className="w-full justify-center">
                      1-2 min each
                    </Badge>
                  </div>
                  <Button className="w-full gap-2">
                    <Play className="h-4 w-4" />
                    Start Aptitude Test
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {cameraEnabled && (
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <Video className="h-8 w-8 text-green-600 mx-auto" />
                <h3 className="font-semibold text-green-800 dark:text-green-200">Camera Ready</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your camera and microphone are active. Select an interview type to begin.
                </p>
                <Button variant="outline" size="sm" onClick={stopCamera} className="mt-2 bg-transparent">
                  Disable Camera
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
