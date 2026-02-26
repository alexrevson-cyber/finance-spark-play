import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, Flame } from "lucide-react";
import confetti from "canvas-confetti";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const questions: Question[] = [
  { id: 1, question: "What does owning a stock mean?", options: ["You lent money to a company", "You own a piece of a company", "You guaranteed a company's debt", "You work for the company"], correct: 1, explanation: "A stock represents partial ownership in a company. You become a shareholder!", difficulty: "beginner" },
  { id: 2, question: "What is an ETF?", options: ["A type of bank account", "A government bond", "A basket of investments traded like a stock", "An insurance product"], correct: 2, explanation: "ETFs bundle multiple investments together and trade on exchanges, giving you instant diversification.", difficulty: "beginner" },
  { id: 3, question: "What is compound interest?", options: ["Interest only on your original investment", "Interest on interest plus principal", "A fixed interest rate", "Interest paid monthly"], correct: 1, explanation: "Compound interest means you earn returns on your returns — it's the most powerful force in wealth building!", difficulty: "beginner" },
  { id: 4, question: "What is diversification?", options: ["Putting all money in one stock", "Spreading investments across different assets", "Only investing in bonds", "Timing the market"], correct: 1, explanation: "Diversification reduces risk by spreading your money across different investments. Don't put all eggs in one basket!", difficulty: "beginner" },
  { id: 5, question: "What is a bond?", options: ["Ownership in a company", "A loan you give to a government or corporation", "A type of stock", "A savings account"], correct: 1, explanation: "When you buy a bond, you're essentially lending money and earning interest in return.", difficulty: "beginner" },
  { id: 6, question: "What is the P/E ratio?", options: ["Price to Earnings ratio", "Profit to Expense ratio", "Payment to Equity ratio", "Percentage of Earnings"], correct: 0, explanation: "The P/E ratio compares a stock's price to its earnings per share — it helps you evaluate if a stock is over or undervalued.", difficulty: "intermediate" },
  { id: 7, question: "What happens to bond prices when interest rates rise?", options: ["They go up", "They go down", "They stay the same", "They become worthless"], correct: 1, explanation: "Bond prices move inversely to interest rates. When rates rise, existing bonds become less attractive, so their prices fall.", difficulty: "intermediate" },
  { id: 8, question: "What is tax-loss harvesting?", options: ["Paying extra taxes on gains", "Selling losing investments to offset gains", "Avoiding all stock sales", "Only buying tax-free bonds"], correct: 1, explanation: "Tax-loss harvesting means strategically selling investments at a loss to offset capital gains taxes — a smart year-end strategy!", difficulty: "advanced" },
  { id: 9, question: "What is a REIT required to distribute as dividends?", options: ["25% of income", "50% of income", "75% of income", "90% of income"], correct: 3, explanation: "REITs must distribute at least 90% of their taxable income as dividends, making them great for income investors.", difficulty: "intermediate" },
  { id: 10, question: "What is dollar-cost averaging?", options: ["Buying at the lowest price", "Investing a fixed amount at regular intervals", "Only investing in dollars", "Averaging your returns"], correct: 1, explanation: "Dollar-cost averaging means investing the same amount regularly, regardless of price. It removes emotion from investing!", difficulty: "beginner" },
  { id: 11, question: "What's the difference between a Roth IRA and Traditional IRA?", options: ["Roth has no tax benefits", "Roth is taxed now, Traditional is taxed later", "Traditional is taxed now, Roth is taxed later", "They are the same"], correct: 1, explanation: "With a Roth IRA, you pay taxes now and withdraw tax-free in retirement. Traditional IRAs give you a tax break now but you pay taxes on withdrawals.", difficulty: "intermediate" },
  { id: 12, question: "What does 'bull market' mean?", options: ["A market that's declining", "A market that's rising", "A market with no change", "A market for agriculture"], correct: 1, explanation: "A bull market means prices are rising or expected to rise. Think of a bull charging upward with its horns!", difficulty: "beginner" },
];

const difficultyColors = {
  beginner: "bg-success/10 text-success",
  intermediate: "bg-accent/20 text-accent-foreground",
  advanced: "bg-destructive/10 text-destructive",
};

const TestPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQ = questions[currentIndex];

  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2d7a5f", "#d4a017", "#f0c040", "#4ade80"],
    });
  }, []);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    setAnswered((a) => a + 1);

    if (index === currentQ.correct) {
      setScore((s) => s + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      fireConfetti();
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      setQuizComplete(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
    setStreak(0);
    setShowResult(false);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Brain className="w-3.5 h-3.5" />
            Test Your Knowledge
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">
            Investment Quiz
          </h1>
          <p className="text-muted-foreground">
            Challenge yourself and learn something new with every question!
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-1.5 text-sm">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="font-medium text-foreground">{score}/{answered}</span>
            <span className="text-muted-foreground">correct</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Flame className="w-4 h-4 text-destructive" />
            <span className="font-medium text-foreground">{streak}</span>
            <span className="text-muted-foreground">streak</span>
          </div>
          {bestStreak > 0 && (
            <div className="flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="font-medium text-foreground">{bestStreak}</span>
              <span className="text-muted-foreground">best</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-secondary mb-8">
          <motion.div
            className="h-full rounded-full bg-hero-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {quizComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center rounded-2xl bg-card border border-border p-10 shadow-card"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
                Quiz Complete!
              </h2>
              <p className="text-4xl font-bold text-primary mb-2">{score}/{questions.length}</p>
              <p className="text-muted-foreground mb-2">
                {score === questions.length
                  ? "Perfect score! You're an investment genius! 🎉"
                  : score >= questions.length * 0.7
                  ? "Great job! You really know your stuff! 💪"
                  : score >= questions.length * 0.5
                  ? "Good effort! Keep learning and you'll master it! 📚"
                  : "Every expert was once a beginner. Keep going! 🌱"}
              </p>
              {bestStreak > 1 && (
                <p className="text-sm text-accent font-medium mb-6">
                  Best streak: {bestStreak} in a row! 🔥
                </p>
              )}
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft hover:shadow-elevated transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-card"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColors[currentQ.difficulty]}`}>
                  {currentQ.difficulty}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-6">
                {currentQ.question}
              </h2>

              <div className="space-y-3">
                {currentQ.options.map((option, i) => {
                  const isCorrect = i === currentQ.correct;
                  const isSelected = i === selected;
                  let optionClass = "border-border bg-background hover:bg-secondary/50";
                  if (showResult) {
                    if (isCorrect) optionClass = "border-success bg-success/10";
                    else if (isSelected && !isCorrect) optionClass = "border-destructive bg-destructive/10";
                    else optionClass = "border-border bg-background opacity-50";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={showResult}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${optionClass} ${
                        !showResult ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-medium text-secondary-foreground shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-foreground font-medium text-sm">{option}</span>
                      {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-success ml-auto shrink-0" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive ml-auto shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <div className={`rounded-xl p-4 ${selected === currentQ.correct ? "bg-success/10" : "bg-accent/10"}`}>
                      <p className="text-sm text-foreground leading-relaxed">
                        {currentQ.explanation}
                      </p>
                    </div>
                    <button
                      onClick={nextQuestion}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft hover:shadow-elevated transition-all"
                    >
                      {currentIndex + 1 >= questions.length ? "See Results" : "Next Question"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestPage;
