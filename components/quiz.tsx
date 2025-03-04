"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Question from "@/components/question"
import Results from "@/components/results"
import { Skeleton } from "@/components/ui/skeleton"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string
}

interface UserAnswer {
  questionIndex: number
  selectedOption: string
  isCorrect: boolean
}

export default function Quiz({ csvUrl }: { csvUrl: string }) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const fetchAndParseCSV = async () => {
      try {
        const response = await fetch(csvUrl)
        const csvText = await response.text()

        // Parse CSV
        const rows = csvText.split("\n")
        const parsedQuestions: QuizQuestion[] = []

        // Skip header row (index 0)
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].split(",")
          if (row.length >= 6) {
            const question = row[0].trim()
            const optionA = row[1].trim()
            const optionB = row[2].trim()
            const optionC = row[3].trim()
            const optionD = row[4].trim()
            const correctAnswer = row[5].trim()

            parsedQuestions.push({
              question,
              options: [optionA, optionB, optionC, optionD],
              correctAnswer,
            })
          }
        }

        setQuestions(parsedQuestions)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error)
        setIsLoading(false)
      }
    }

    fetchAndParseCSV()
  }, [csvUrl])

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleNextQuestion = () => {
    if (selectedOption) {
      const currentQuestion = questions[currentQuestionIndex]
      const isCorrect = selectedOption === currentQuestion.correctAnswer

      setUserAnswers([
        ...userAnswers,
        {
          questionIndex: currentQuestionIndex,
          selectedOption,
          isCorrect,
        },
      ])

      setSelectedOption(null)

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setShowResults(true)
      }
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setSelectedOption(null)
    setShowResults(false)
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center">Loading Quiz...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showResults) {
    return <Results questions={questions} userAnswers={userAnswers} restartQuiz={restartQuiz} />
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-center">Quiz</CardTitle>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-muted-foreground">
            Score: {userAnswers.filter((a) => a.isCorrect).length} / {userAnswers.length}
          </span>
        </div>
        <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
      </CardHeader>
      <CardContent>
        {questions.length > 0 && (
          <Question
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
            optionLabels={["A", "B", "C", "D"]}
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={restartQuiz} disabled={userAnswers.length === 0}>
          Restart
        </Button>
        <Button onClick={handleNextQuestion} disabled={!selectedOption}>
          {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  )
}

