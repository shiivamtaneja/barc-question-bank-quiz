import Quiz from "@/components/quiz"

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Quiz csvUrl="/questions.csv" />
    </main>
  )
}

