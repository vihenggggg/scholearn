"use client";

import { useCallback, useState } from "react";
import Landing from "@/components/Landing";
import Demographics from "@/components/Demographics";
import Assessment from "@/components/assessment/Assessment";
import Results from "@/components/results/Results";

export default function HomeFlow() {
  const [step, setStep] = useState("landing"); // 'landing' | 'demographics' | 'assessment' | 'results'
  const [demographics, setDemographics] = useState(null);
  const [answers, setAnswers] = useState({});

  const handleAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleRetake = useCallback(() => {
    setAnswers({});
    setDemographics(null);
    setStep("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (step === "demographics") {
    return (
      <Demographics
        onContinue={(data) => {
          setDemographics(data);
          setStep("assessment");
        }}
        onBack={() => setStep("landing")}
      />
    );
  }

  if (step === "assessment") {
    return (
      <Assessment
        answers={answers}
        onAnswer={handleAnswer}
        onComplete={() => setStep("results")}
        onExit={() => setStep("demographics")}
      />
    );
  }

  if (step === "results") {
    return <Results answers={answers} demographics={demographics} onRetake={handleRetake} />;
  }

  return <Landing onStart={() => setStep("demographics")} />;
}
