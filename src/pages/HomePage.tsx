import { motion } from "framer-motion";
import { Sparkles, TrendingUp, ArrowRight, Quote } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";

const dailyQuotes = [
  { text: "The stock market is a device for transferring money from the impatient to the patient.", author: "Warren Buffett", type: "quote" as const },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", type: "quote" as const },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", type: "quote" as const },
  { text: "Do not save what is left after spending, but spend what is left after saving.", author: "Warren Buffett", type: "quote" as const },
  { text: "Risk comes from not knowing what you're doing.", author: "Warren Buffett", type: "quote" as const },
  { text: "What percentage of your income are you investing each month? If the answer is zero, what's one small step you can take this week?", author: "", type: "question" as const },
  { text: "If you had to explain your investment strategy to a 10-year-old, could you? Simplicity is a superpower.", author: "", type: "question" as const },
];

const dailyRecommendations = [
  {
    title: "Consider a Broad Market Index Fund",
    ticker: "VTI / VTSAX",
    reasoning: "With markets showing resilience despite mixed economic signals, a total market index fund remains one of the smartest long-term plays. You get instant diversification across thousands of companies, ultra-low fees, and historically strong returns. Perfect for building wealth steadily over time.",
    risk: "Low",
    timeHorizon: "Long-term (5+ years)",
  },
  {
    title: "High-Yield Savings or Treasury Bills",
    ticker: "T-Bills / HYSA",
    reasoning: "With interest rates still elevated, parking your emergency fund in a high-yield savings account or short-term Treasury bills gives you solid risk-free returns. This is your financial foundation — build it before reaching for higher returns.",
    risk: "Very Low",
    timeHorizon: "Short-term (0-2 years)",
  },
  {
    title: "International Diversification via ETF",
    ticker: "VXUS / IXUS",
    reasoning: "International markets are trading at historically lower valuations compared to U.S. stocks. Adding international exposure can reduce portfolio risk through diversification while potentially capturing growth in emerging and developed markets outside the U.S.",
    risk: "Moderate",
    timeHorizon: "Long-term (5+ years)",
  },
];

const getDailyItem = <T,>(items: T[]): T => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return items[dayOfYear % items.length];
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

const HomePage = () => {
  const dailyQuote = getDailyItem(dailyQuotes);
  const dailyRec = getDailyItem(dailyRecommendations);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div custom={0} variants={fadeUp}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Start your journey
                </span>
              </motion.div>
              <motion.h1
                custom={1}
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight text-foreground"
              >
                Investing made{" "}
                <span className="text-gradient-primary">simple</span> &{" "}
                <span className="text-gradient-gold">rewarding</span>
              </motion.h1>
              <motion.p
                custom={2}
                variants={fadeUp}
                className="text-lg text-muted-foreground max-w-lg leading-relaxed"
              >
                Learn at your own pace, test your knowledge with fun quizzes, and build the confidence to grow your wealth. No jargon, no judgment — just clear guidance.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} className="flex gap-3">
                <a
                  href="/learn"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/test"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-all duration-200"
                >
                  Take a Quiz
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden lg:block"
            >
              <img
                src={heroImage}
                alt="Financial growth illustration showing a tree growing from rising chart lines"
                className="w-full rounded-2xl shadow-elevated"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Daily Prompt */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-2xl bg-card shadow-card border border-border p-8 sm:p-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              {dailyQuote.type === "quote" ? (
                <Quote className="w-4 h-4 text-accent" />
              ) : (
                <Sparkles className="w-4 h-4 text-accent" />
              )}
            </div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {dailyQuote.type === "quote" ? "Daily Inspiration" : "Daily Reflection"}
            </span>
          </div>
          <blockquote className="text-xl sm:text-2xl font-serif text-foreground leading-relaxed mb-3">
            "{dailyQuote.text}"
          </blockquote>
          {dailyQuote.author && (
            <p className="text-sm text-muted-foreground font-medium">— {dailyQuote.author}</p>
          )}
        </motion.div>
      </section>

      {/* Daily Recommendation */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="rounded-2xl bg-hero-gradient text-primary-foreground p-8 sm:p-10 shadow-elevated"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              Today's Investment Idea
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-2">
            {dailyRec.title}
          </h3>
          <p className="text-sm font-medium opacity-80 mb-4">{dailyRec.ticker}</p>
          <p className="text-base leading-relaxed opacity-90 mb-6 max-w-3xl">
            {dailyRec.reasoning}
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider opacity-70">Risk Level</span>
              <p className="font-medium text-sm">{dailyRec.risk}</p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider opacity-70">Time Horizon</span>
              <p className="font-medium text-sm">{dailyRec.timeHorizon}</p>
            </div>
          </div>
          <p className="text-xs opacity-60 mt-6">
            * This is educational content, not financial advice. Always do your own research.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
