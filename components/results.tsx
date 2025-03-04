"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

interface ResultsProps {
  questions: QuizQuestion[]
  userAnswers: UserAnswer[]
  restartQuiz: () => void
}

export default function Results({ questions, userAnswers, restartQuiz }: ResultsProps) {
  const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length
  const totalQuestions = questions.length
  const score = (correctAnswers / totalQuestions) * 100

  const incorrectAnswers = userAnswers.filter((answer) => !answer.isCorrect)

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-center">Quiz Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">{score.toFixed(0)}%</h2>
          <p className="text-muted-foreground">
            You got {correctAnswers} out of {totalQuestions} questions correct
          </p>
        </div>

        {incorrectAnswers.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Questions You Missed</h3>
            <Accordion type="single" collapsible className="w-full">
              {incorrectAnswers.map((answer, index) => {
                const question = questions[answer.questionIndex]
                const optionLabels = ["A", "B", "C", "D"]

                return (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <span className="text-base">{question.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 pl-7">
                      <p>
                        <span className="font-medium">Your answer:</span> Option {answer.selectedOption} -{" "}
                        {question.options[optionLabels.indexOf(answer.selectedOption)]}
                      </p>
                      <p>
                        <span className="font-medium">Correct answer:</span> Option {question.correctAnswer} -{" "}
                        {question.options[optionLabels.indexOf(question.correctAnswer)]}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 bg-primary/10 rounded-lg">
            <CheckCircle className="h-12 w-12 text-primary mb-2" />
            <h3 className="text-lg font-semibold">Perfect Score!</h3>
            <p className="text-center text-muted-foreground">Congratulations! You answered all questions correctly.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={restartQuiz}>Restart Quiz</Button>
      </CardFooter>
    </Card>
  )
}

