"use client";

import { useCallback, useState } from "react";
import Landing from "@/components/Landing";
import Assessment from "@/components/assessment/Assessment";
import Results from "@/components/results/Results";

export default function HomeFlow() {
  const [step, setStep] = useState("landing"); // 'landing' | 'assessment' | 'results'
  const [answers, setAnswers] = useState({});

  const handleAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleRetake = useCallback(() => {
    setAnswers({});
    setStep("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (step === "assessment") {
    return (
      <Assessment
        answers={answers}
        onAnswer={handleAnswer}
        onComplete={() => setStep("results")}
        onExit={() => setStep("landing")}
      />
    );
  }

  if (step === "results") {
    return <Results answers={answers} onRetake={handleRetake} />;
  }

  return <Landing onStart={() => setStep("assessment")} />;
}
