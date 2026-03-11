import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, Flame, Clock, Filter, Medal, AlertTriangle, BookOpen, Link2, Share2, Zap, Timer } from "lucide-react";
import confetti from "canvas-confetti";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { allQuestions, type Question } from "@/data/questions";

const topicOptions = [
  { value: "all", label: "All Topics" },
  { value: "stocks", label: "Stocks" },
  { value: "etfs", label: "ETFs" },
  { value: "bonds", label: "Bonds" },
  { value: "index-funds", label: "Index Funds" },
  { value: "reits", label: "REITs" },
  { value: "dca", label: "DCA" },
  { value: "retirement", label: "Retirement" },
  { value: "taxes", label: "Taxes" },
  { value: "dividends", label: "Dividends" },
  { value: "diversification", label: "Allocation" },
  { value: "behavioral", label: "Behavioral Finance" },
  { value: "options", label: "Options" },
  { value: "hedge-funds", label: "Hedge Funds" },
  { value: "general", label: "General" },
];

const mockLeaderboard = [
  { name: "InvestorPro", score: 198, streak: 12 },
  { name: "MarketMaven", score: 185, streak: 9 },
  { name: "WealthBuilder", score: 172, streak: 15 },
  { name: "StockSavvy", score: 164, streak: 7 },
  { name: "DividendKing", score: 158, streak: 11 },
  { name: "IndexFundFan", score: 145, streak: 6 },
  { name: "BondBaron", score: 138, streak: 8 },
  { name: "ETFExpert", score: 132, streak: 5 },
];

const mockTimedLeaderboard = [
  { name: "SpeedTrader", score: 14, streak: 8 },
  { name: "QuickMind", score: 12, streak: 6 },
  { name: "FlashInvestor", score: 11, streak: 5 },
  { name: "RapidRecall", score: 10, streak: 4 },
  { name: "SwiftAnalyst", score: 9, streak: 3 },
];

const difficultyColors = {
  beginner: "bg-success/10 text-success",
  intermediate: "bg-accent/20 text-accent-foreground",
  advanced: "bg-destructive/10 text-destructive",
};

type QuizMode = "menu" | "quiz" | "daily" | "timed" | "complete" | "timed-result" | "timed-complete";

const DAILY_QUESTIONS_COUNT = 5;
const TIMED_SECONDS = 120;

// Helper to get seen question IDs from localStorage
const getSeenDailyIds = (): number[] => {
  try { return JSON.parse(localStorage.getItem("daily_seen_ids") || "[]"); } catch { return []; }
};
const saveSeenDailyIds = (ids: number[]) => localStorage.setItem("daily_seen_ids", JSON.stringify(ids));

const getSeenTimedIds = (): number[] => {
  try { return JSON.parse(localStorage.getItem("timed_seen_ids") || "[]"); } catch { return []; }
};
const saveSeenTimedIds = (ids: number[]) => localStorage.setItem("timed_seen_ids", JSON.stringify(ids));

const TestPage = () => {
  const [mode, setMode] = useState<QuizMode>("menu");
  const [topicFilter, setTopicFilter] = useState("all");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<{ q: Question; selectedIdx: number }[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [dailyCompleted, setDailyCompleted] = useState(false);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [timedScore, setTimedScore] = useState(0);
  const [timedTotal, setTimedTotal] = useState(0);
  const [timedPersonalBest, setTimedPersonalBest] = useState<number | null>(null);
  const [timedWinStreak, setTimedWinStreak] = useState(0);
  const [showTimedLeaderboard, setShowTimedLeaderboard] = useState(false);
  const [timedWrongAnswers, setTimedWrongAnswers] = useState<{ q: Question; selectedIdx: number }[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { user } = useAuth();

  // Load daily quiz state & streak
  useEffect(() => {
    const key = `daily_quiz_${new Date().toISOString().slice(0, 10)}`;
    if (localStorage.getItem(key)) setDailyCompleted(true);
    setDailyStreak(parseInt(localStorage.getItem("daily_streak") || "0", 10));
    setTimedPersonalBest(localStorage.getItem("timed_pb") ? parseInt(localStorage.getItem("timed_pb")!) : null);
    setTimedWinStreak(parseInt(localStorage.getItem("timed_win_streak") || "0", 10));
  }, []);

  // Timer for timed mode — counts down, ends challenge when 0
  useEffect(() => {
    if (mode === "timed" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setMode("timed-complete");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current!);
    }
  }, [mode, timeLeft]);

  const fireConfetti = useCallback(() => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ["#2d7a5f", "#d4a017", "#f0c040", "#4ade80"] });
  }, []);

  const pickDailyQuestions = (): Question[] => {
    const seenIds = getSeenDailyIds();
    let unseen = allQuestions.filter(q => !seenIds.includes(q.id));
    if (unseen.length < DAILY_QUESTIONS_COUNT) {
      // Reset cycle with new order
      saveSeenDailyIds([]);
      unseen = [...allQuestions];
    }
    // Shuffle and pick 5 from diverse topics/difficulties
    const shuffled = unseen.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, DAILY_QUESTIONS_COUNT);
  };

  const pickTimedQuestions = (): Question[] => {
    const pool = allQuestions.filter(q => q.difficulty === "intermediate" || q.difficulty === "advanced");
    const seenIds = getSeenTimedIds();
    let unseen = pool.filter(q => !seenIds.includes(q.id));
    if (unseen.length === 0) {
      saveSeenTimedIds([]);
      unseen = [...pool];
    }
    return unseen.sort(() => Math.random() - 0.5);
  };

  const startQuiz = (quizMode: "quiz" | "timed" | "daily", topic = "all") => {
    let filtered: Question[];

    if (quizMode === "daily") {
      filtered = pickDailyQuestions();
    } else if (quizMode === "timed") {
      filtered = pickTimedQuestions();
    } else {
      filtered = topic === "all" ? [...allQuestions] : allQuestions.filter(q => q.topic === topic);
      filtered = filtered.sort(() => Math.random() - 0.5).slice(0, 10);
    }

    setQuestions(filtered);
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
    setStreak(0);
    setBestStreak(0);
    setShowResult(false);
    setWrongAnswers([]);
    setTimedScore(0);
    setTimedTotal(0);
    setTimedWrongAnswers([]);
    setMode(quizMode);
    if (quizMode === "timed") {
      setTimeLeft(TIMED_SECONDS);
    }
  };

  const handleSelect = (index: number) => {
    if (showResult) return;
    const q = questions[currentIndex];
    setSelected(index);
    setShowResult(true);
    setAnswered(a => a + 1);

    if (index === q.correct) {
      setScore(s => s + 1);
      const ns = streak + 1;
      setStreak(ns);
      if (ns > bestStreak) setBestStreak(ns);
      fireConfetti();

      if (mode === "timed") {
        setTimedScore(s => s + 1);
        setTimedTotal(t => t + 1);
        const seenIds = getSeenTimedIds();
        saveSeenTimedIds([...seenIds, q.id]);
      }
    } else {
      setStreak(0);
      setWrongAnswers(w => [...w, { q, selectedIdx: index }]);
      if (mode === "timed") {
        setTimedTotal(t => t + 1);
        setTimedWrongAnswers(w => [...w, { q, selectedIdx: index }]);
        const seenIds = getSeenTimedIds();
        saveSeenTimedIds([...seenIds, q.id]);
      }
    }
  };

  const nextQuestion = () => {
    if (mode === "timed") {
      // In timed mode, immediately go to next question (no end until timer expires)
      if (currentIndex + 1 >= questions.length) {
        // Exhausted pool, end early
        clearInterval(timerRef.current!);
        finishTimedChallenge();
        return;
      }
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setShowResult(false);
      return;
    }

    if (currentIndex + 1 >= questions.length) {
      setMode("complete");

      if (mode === "daily") {
        const today = new Date().toISOString().slice(0, 10);
        localStorage.setItem(`daily_quiz_${today}`, "true");
        setDailyCompleted(true);
        const seenIds = getSeenDailyIds();
        const newSeen = [...seenIds, ...questions.map(q => q.id)];
        saveSeenDailyIds(newSeen);
        const lastDate = localStorage.getItem("daily_last_date");
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        let newStreak = 1;
        if (lastDate === yesterday) {
          newStreak = dailyStreak + 1;
        } else if (lastDate === today) {
          newStreak = dailyStreak;
        }
        setDailyStreak(newStreak);
        localStorage.setItem("daily_streak", String(newStreak));
        localStorage.setItem("daily_last_date", today);

        if (user) {
          supabase.from("daily_streaks").upsert({ user_id: user.id, current_streak: newStreak, best_streak: Math.max(newStreak, dailyStreak), last_activity_date: today }, { onConflict: "user_id" });
        }
      }

      if (user) {
        supabase.from("quiz_scores").insert({
          user_id: user.id, score, total_questions: questions.length,
          topic: mode === "daily" ? "daily" : topicFilter, difficulty: "mixed", streak: bestStreak,
        });
      }
    } else {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const finishTimedChallenge = () => {
    // Update personal best (most correct answers)
    const finalScore = timedScore + (selected !== null && questions[currentIndex] && selected === questions[currentIndex].correct ? 0 : 0);
    // timedScore is already updated by handleSelect
    const pb = timedPersonalBest;
    if (pb === null || timedScore > pb) {
      setTimedPersonalBest(timedScore);
      localStorage.setItem("timed_pb", String(timedScore));
    }
    setMode("timed-complete");
  };

  const currentQ = questions[currentIndex];

  // Timed challenge complete screen
  if (mode === "timed-complete") {
    const pct = timedTotal > 0 ? Math.round((timedScore / timedTotal) * 100) : 0;
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center rounded-2xl bg-card border border-border p-10 shadow-card mb-8">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Time's Up! ⏰</h2>
            <p className="text-5xl font-bold text-primary my-4">{timedScore}/{timedTotal}</p>
            <p className="text-muted-foreground mb-1">
              You answered <span className="font-bold text-foreground">{timedTotal}</span> questions in 2 minutes
              — <span className="font-bold text-foreground">{timedScore}</span> correct ({pct}%)
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {timedScore >= 10 ? "Incredible speed and accuracy! 🔥" :
               timedScore >= 7 ? "Great performance — you're sharp! 💪" :
               timedScore >= 4 ? "Solid effort — keep practicing! 📚" :
               "Every round makes you faster. Try again! 🌱"}
            </p>
            <div className="flex justify-center gap-4 text-sm mb-6">
              {timedPersonalBest !== null && (
                <div className="bg-accent/10 px-4 py-2 rounded-lg">
                  <p className="text-xs text-muted-foreground">Personal Best</p>
                  <p className="font-bold text-foreground">{timedPersonalBest} correct</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={() => startQuiz("timed")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft">
                <Zap className="w-4 h-4" /> Try Again
              </button>
              <button onClick={() => setMode("menu")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm">
                <RotateCcw className="w-4 h-4" /> Back to Menu
              </button>
              <button onClick={() => setShowTimedLeaderboard(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm">
                <Medal className="w-4 h-4" /> Leaderboard
              </button>
            </div>
          </motion.div>

          {timedWrongAnswers.length > 0 && (
            <div>
              <h3 className="font-serif font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Review Missed Questions
              </h3>
              <div className="space-y-4">
                {timedWrongAnswers.map(({ q, selectedIdx }) => (
                  <div key={q.id} className="rounded-xl bg-card border border-border p-5 shadow-card">
                    <p className="font-medium text-foreground mb-2">{q.question}</p>
                    <p className="text-sm text-destructive mb-1">Your answer: {q.options[selectedIdx]}</p>
                    <p className="text-sm text-success mb-2">Correct answer: {q.options[q.correct]}</p>
                    <p className="text-sm text-muted-foreground mb-3">{q.explanation}</p>
                    <Link to="/learn" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                      <Link2 className="w-3 h-3" /> Learn more about this topic
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Timed leaderboard
  if (showTimedLeaderboard) {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <button onClick={() => setShowTimedLeaderboard(false)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-medium">← Back</button>
          <div className="flex items-center gap-3 mb-8"><Timer className="w-8 h-8 text-accent" /><h1 className="text-3xl font-serif font-bold text-foreground">Timed Challenge Leaderboard</h1></div>
          <p className="text-sm text-muted-foreground mb-6">Most correct answers in 2 minutes</p>
          <div className="space-y-3">
            {mockTimedLeaderboard.map((e, i) => (
              <div key={e.name} className={`flex items-center gap-4 rounded-xl bg-card border border-border p-4 shadow-card ${i < 3 ? "border-accent/30" : ""}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${i === 0 ? "bg-accent/20 text-accent" : "bg-secondary text-muted-foreground"}`}>{i + 1}</div>
                <div className="flex-1"><p className="font-medium text-foreground">{e.name}</p><p className="text-xs text-muted-foreground">{e.streak} game streak</p></div>
                <p className="text-lg font-bold text-foreground">{e.score} correct</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showLeaderboard) {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <button onClick={() => setShowLeaderboard(false)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-medium">← Back to Quiz Menu</button>
          <div className="flex items-center gap-3 mb-8"><Medal className="w-8 h-8 text-accent" /><h1 className="text-3xl font-serif font-bold text-foreground">Leaderboard</h1></div>
          <div className="space-y-3">
            {mockLeaderboard.map((entry, i) => (
              <div key={entry.name} className={`flex items-center gap-4 rounded-xl bg-card border border-border p-4 shadow-card ${i < 3 ? "border-accent/30" : ""}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${i === 0 ? "bg-accent/20 text-accent" : "bg-secondary text-muted-foreground"}`}>{i + 1}</div>
                <div className="flex-1"><p className="font-medium text-foreground">{entry.name}</p><p className="text-xs text-muted-foreground">{entry.streak} day streak</p></div>
                <p className="text-lg font-bold text-foreground">{entry.score}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Menu
  if (mode === "menu") {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl bg-accent/10 border border-accent/20 p-4 mb-8 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-accent-foreground">This quiz is for educational purposes only and does not constitute financial advice.</p>
          </div>

          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"><Brain className="w-3.5 h-3.5" /> Test Your Knowledge</span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">Investment Quiz</h1>
            <p className="text-muted-foreground">Challenge yourself and learn something new with every question!</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {/* Daily Quiz */}
            <button onClick={() => !dailyCompleted && startQuiz("daily")} disabled={dailyCompleted}
              className={`text-left rounded-xl bg-card border border-border p-6 shadow-card transition-all ${dailyCompleted ? "opacity-60" : "hover:shadow-elevated hover:-translate-y-1"}`}>
              <div className="flex items-center justify-between mb-3">
                <Sparkles className="w-8 h-8 text-accent" />
                {dailyStreak > 0 && <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full flex items-center gap-1"><Flame className="w-3 h-3" />{dailyStreak} day streak</span>}
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground mb-1">Daily Quiz</h3>
              <p className="text-sm text-muted-foreground">{dailyCompleted ? "✅ Completed today! Come back tomorrow." : "5 questions per day. Build your streak!"}</p>
            </button>

            {/* Timed Challenge */}
            <button onClick={() => startQuiz("timed")}
              className="text-left rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-3">
                <Zap className="w-8 h-8 text-destructive" />
                <div className="flex gap-2">
                  {timedPersonalBest !== null && <span className="text-xs bg-accent/10 text-accent-foreground px-2 py-1 rounded-full">Best: {timedPersonalBest}</span>}
                </div>
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground mb-1">Timed Challenge</h3>
              <p className="text-sm text-muted-foreground">Answer as many as you can in 2 minutes!</p>
            </button>

            {/* Topic Quiz */}
            <div className="rounded-xl bg-card border border-border p-6 shadow-card sm:col-span-2">
              <div className="flex items-center gap-2 mb-4"><Filter className="w-5 h-5 text-primary" /><h3 className="font-serif font-bold text-lg text-foreground">Topic Quiz</h3></div>
              <p className="text-sm text-muted-foreground mb-4">Choose a topic and difficulty to test your knowledge.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {topicOptions.map(t => (
                  <button key={t.value} onClick={() => setTopicFilter(t.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${topicFilter === t.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                    {t.label}
                  </button>
                ))}
              </div>
              <button onClick={() => startQuiz("quiz", topicFilter)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft hover:shadow-elevated transition-all">
                Start Quiz <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button onClick={() => setShowLeaderboard(true)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors">
            <Medal className="w-4 h-4" /> View Leaderboard
          </button>
        </div>
      </div>
    );
  }

  // Complete screen (daily & topic quiz)
  if (mode === "complete") {
    const coveredTopics = [...new Set(questions.map(q => q.topic))];
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center rounded-2xl bg-card border border-border p-10 shadow-card mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
              {dailyCompleted && questions.length === DAILY_QUESTIONS_COUNT ? "Daily Quiz Complete!" : "Quiz Complete!"}
            </h2>
            <p className="text-4xl font-bold text-primary mb-2">{score}/{questions.length}</p>
            <p className="text-muted-foreground mb-2">
              {score === questions.length ? "Perfect score! You're an investment genius! 🎉"
                : score >= questions.length * 0.7 ? "Great job! You really know your stuff! 💪"
                : score >= questions.length * 0.5 ? "Good effort! Keep learning and you'll master it! 📚"
                : "Every expert was once a beginner. Keep going! 🌱"}
            </p>
            {bestStreak > 1 && <p className="text-sm text-accent font-medium mb-2">Best streak: {bestStreak} in a row! 🔥</p>}

            {/* Topics covered */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
              {coveredTopics.map(t => <span key={t} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{t}</span>)}
            </div>

            {dailyCompleted && (
              <div className="bg-accent/10 rounded-lg p-4 mb-4">
                <p className="text-sm text-foreground flex items-center justify-center gap-1.5"><Flame className="w-4 h-4 text-accent" /> {dailyStreak} day streak — keep it going, come back tomorrow!</p>
              </div>
            )}

            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={() => setMode("menu")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft">
                <RotateCcw className="w-4 h-4" /> Back to Menu
              </button>
              <button onClick={() => {
                const text = `I scored ${score}/${questions.length} on InvestWise! 📈 Test your investing knowledge too!`;
                if (navigator.share) { navigator.share({ title: "InvestWise Quiz Score", text }); } else { navigator.clipboard.writeText(text); alert("Score copied to clipboard!"); }
              }} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors">
                <Share2 className="w-4 h-4" /> Share Score
              </button>
            </div>
          </motion.div>

          {wrongAnswers.length > 0 && (
            <div>
              <h3 className="font-serif font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Review Missed Questions
              </h3>
              <div className="space-y-4">
                {wrongAnswers.map(({ q, selectedIdx }) => (
                  <div key={q.id} className="rounded-xl bg-card border border-border p-5 shadow-card">
                    <p className="font-medium text-foreground mb-2">{q.question}</p>
                    <p className="text-sm text-destructive mb-1">Your answer: {q.options[selectedIdx]}</p>
                    <p className="text-sm text-success mb-2">Correct answer: {q.options[q.correct]}</p>
                    <p className="text-sm text-muted-foreground mb-3">{q.explanation}</p>
                    <Link to="/learn" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                      <Link2 className="w-3 h-3" /> Learn more about this topic
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Active quiz / timed question
  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Stats bar */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 flex-wrap">
          {mode !== "timed" && (
            <>
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
            </>
          )}
          {mode === "timed" && (
            <div className="flex items-center gap-4 sm:gap-6">
              <div className={`flex items-center gap-2 text-lg font-bold ${timeLeft < 30 ? "text-destructive animate-pulse" : "text-foreground"}`}>
                <Clock className="w-5 h-5" />
                <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Trophy className="w-4 h-4 text-accent" />
                <span className="font-medium text-foreground">{timedScore}</span>
                <span className="text-muted-foreground">correct</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <span className="font-medium text-foreground">{timedTotal}</span>
                <span className="text-muted-foreground">answered</span>
              </div>
            </div>
          )}
        </div>

        {/* Progress bar (not for timed) */}
        {mode !== "timed" && (
          <div className="w-full h-2 rounded-full bg-secondary mb-8">
            <motion.div className="h-full rounded-full bg-hero-gradient" initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {currentQ && (
            <motion.div key={currentQ.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">
                  {mode === "timed" ? "Timed Challenge" : `Question ${currentIndex + 1} of ${questions.length}`}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColors[currentQ.difficulty]}`}>
                  {currentQ.difficulty}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-6">{currentQ.question}</h2>
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
                    <button key={i} onClick={() => handleSelect(i)} disabled={showResult}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${optionClass} ${!showResult ? "cursor-pointer" : "cursor-default"}`}>
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
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-6">
                    <div className={`rounded-xl p-4 ${selected === currentQ.correct ? "bg-success/10" : "bg-destructive/5"}`}>
                      <p className="text-sm text-foreground leading-relaxed">{currentQ.explanation}</p>
                      {selected !== currentQ.correct && (
                        <Link to="/learn" className="text-xs text-primary font-medium hover:underline mt-2 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> Review this topic in Learn
                        </Link>
                      )}
                    </div>
                    <button onClick={nextQuestion}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft hover:shadow-elevated transition-all">
                      {mode === "timed" ? "Next Question" : currentIndex + 1 >= questions.length ? "See Results" : "Next Question"} <ArrowRight className="w-4 h-4" />
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
