"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionProps {
  question: string
  options: string[]
  selectedOption: string | null
  onOptionSelect: (option: string) => void
  optionLabels: string[]
}

export default function Question({ question, options, selectedOption, onOptionSelect, optionLabels }: QuestionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question}</h2>
      <RadioGroup value={selectedOption || ""} onValueChange={onOptionSelect} className="space-y-3">
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-colors ${
              selectedOption === optionLabels[index] ? "bg-primary/10 border-primary" : "hover:bg-muted"
            }`}
            onClick={() => onOptionSelect(optionLabels[index])}
          >
            <RadioGroupItem value={optionLabels[index]} id={`option-${index}`} className="sr-only" />
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground font-medium">
              {optionLabels[index]}
            </div>
            <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer text-base">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

