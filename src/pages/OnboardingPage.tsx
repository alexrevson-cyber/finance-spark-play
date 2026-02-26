import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const questions = [
  {
    id: "experience",
    question: "How would you describe your investing experience?",
    options: [
      { value: "beginner", label: "Complete beginner", desc: "I've never invested before" },
      { value: "intermediate", label: "Some experience", desc: "I know the basics but want to learn more" },
      { value: "advanced", label: "Experienced", desc: "I invest regularly and want to deepen my knowledge" },
    ],
  },
  {
    id: "goals",
    question: "What are your main investing goals?",
    multi: true,
    options: [
      { value: "retirement", label: "Retirement savings", desc: "Build long-term wealth for the future" },
      { value: "passive-income", label: "Passive income", desc: "Generate regular income from investments" },
      { value: "education", label: "Learn investing", desc: "Understand how markets work" },
      { value: "grow-wealth", label: "Grow my wealth", desc: "Make my money work harder" },
    ],
  },
  {
    id: "time",
    question: "How much time can you dedicate to learning each week?",
    options: [
      { value: "5min", label: "5 minutes", desc: "Quick daily lessons" },
      { value: "15min", label: "15 minutes", desc: "A few focused sessions" },
      { value: "30min+", label: "30+ minutes", desc: "Deep dives and extensive reading" },
    ],
  },
];

const OnboardingPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();

  const current = questions[step];
  const isMulti = current?.multi;
  const selectedValue = answers[current?.id];

  const handleSelect = (value: string) => {
    if (isMulti) {
      const prev = (selectedValue as string[]) || [];
      const next = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      setAnswers({ ...answers, [current.id]: next });
    } else {
      setAnswers({ ...answers, [current.id]: value });
    }
  };

  const canContinue = isMulti
    ? Array.isArray(selectedValue) && selectedValue.length > 0
    : !!selectedValue;

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Save to profile
      if (user) {
        await supabase
          .from("profiles")
          .update({
            experience_level: answers.experience as string,
            investing_goals: answers.goals as string[],
            onboarding_completed: true,
          })
          .eq("user_id", user.id);
        await refreshProfile();
      }
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Let's personalize your experience
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Welcome to InvestWise</h1>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="rounded-2xl bg-card border border-border p-8 shadow-card"
          >
            <h2 className="text-xl font-serif font-bold text-foreground mb-6">
              {current.question}
            </h2>
            <div className="space-y-3">
              {current.options.map((opt) => {
                const isSelected = isMulti
                  ? (selectedValue as string[])?.includes(opt.value)
                  : selectedValue === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30 bg-background"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={!canContinue}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft hover:shadow-elevated transition-all disabled:opacity-40"
            >
              {step < questions.length - 1 ? "Continue" : "Get Started"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => navigate("/")}
          className="block mx-auto mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;
