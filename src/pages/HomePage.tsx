import { motion } from "framer-motion";
import { Sparkles, TrendingUp, ArrowRight, Quote, Lightbulb, Newspaper, BarChart3, Flame, Trophy, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

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
  { title: "Consider a Broad Market Index Fund", ticker: "VTI / VTSAX", reasoning: "With markets showing resilience despite mixed economic signals, a total market index fund remains one of the smartest long-term plays. You get instant diversification across thousands of companies, ultra-low fees, and historically strong returns.", risk: "Low", timeHorizon: "Long-term (5+ years)" },
  { title: "High-Yield Savings or Treasury Bills", ticker: "T-Bills / HYSA", reasoning: "With interest rates still elevated, parking your emergency fund in a high-yield savings account or short-term Treasury bills gives you solid risk-free returns. This is your financial foundation.", risk: "Very Low", timeHorizon: "Short-term (0-2 years)" },
  { title: "International Diversification via ETF", ticker: "VXUS / IXUS", reasoning: "International markets are trading at historically lower valuations compared to U.S. stocks. Adding international exposure can reduce portfolio risk through diversification.", risk: "Moderate", timeHorizon: "Long-term (5+ years)" },
];

const didYouKnowFacts = [
  "If you invested $10,000 in the S&P 500 in 1980, it would be worth over $1 million today — without adding a single dollar more.",
  "Albert Einstein reportedly called compound interest the 'eighth wonder of the world.'",
  "The average millionaire has 7 streams of income. Diversification isn't just for portfolios.",
  "Women investors tend to outperform men by about 1% per year, partly because they trade less frequently.",
  "The word 'stock' comes from the old English word for 'trunk' — as in a tree trunk that grows over time.",
  "Warren Buffett made 99% of his wealth after his 50th birthday. Patience is the ultimate edge.",
  "Index funds were considered a terrible idea when John Bogle launched the first one in 1976. Critics called it 'Bogle's Folly.'",
];

const mockNews = [
  { title: "Fed Signals Steady Rates Through Mid-2026", summary: "The Federal Reserve maintained its current rate policy, suggesting economic stability. This is generally positive for long-term investors.", time: "2h ago" },
  { title: "Tech Sector Continues to Lead Market Gains", summary: "Major tech companies reported strong earnings, pushing the NASDAQ to new highs. A reminder that staying invested pays off.", time: "4h ago" },
  { title: "New Investors Surge: Record Brokerage Signups", summary: "More people are opening investment accounts than ever before. Financial literacy is on the rise.", time: "6h ago" },
];

const marketData = [
  { name: "S&P 500", value: "5,842.31", change: "+0.73%", up: true },
  { name: "NASDAQ", value: "18,493.67", change: "+1.12%", up: true },
  { name: "DOW", value: "43,127.84", change: "-0.15%", up: false },
  { name: "VIX", value: "14.82", change: "-2.31%", up: false },
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
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

const HomePage = () => {
  const dailyQuote = getDailyItem(dailyQuotes);
  const dailyRec = getDailyItem(dailyRecommendations);
  const dailyFact = getDailyItem(didYouKnowFacts);
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" className="space-y-6">
              <motion.div custom={0} variants={fadeUp}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  {user ? `Welcome back, ${profile?.display_name || 'investor'}!` : 'Start your journey'}
                </span>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight text-foreground">
                Investing made{" "}
                <span className="text-gradient-primary">simple</span> &{" "}
                <span className="text-gradient-gold">rewarding</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Learn at your own pace, test your knowledge with fun quizzes, and build the confidence to grow your wealth. No jargon, no judgment — just clear guidance.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} className="flex gap-3">
                {user ? (
                  <>
                    <Link to="/learn" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5">
                      Continue Learning <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-all duration-200">
                      Open Tools
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/auth" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/learn" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-all duration-200">
                      Explore Lessons
                    </Link>
                  </>
                )}
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="hidden lg:block">
              <img src={heroImage} alt="Financial growth illustration showing a tree growing from rising chart lines" className="w-full rounded-2xl shadow-elevated" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Snapshot */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Market Snapshot</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {marketData.map((item) => (
              <div key={item.name} className="rounded-xl bg-card border border-border p-4 shadow-card">
                <p className="text-xs text-muted-foreground mb-1">{item.name}</p>
                <p className="text-lg font-bold text-foreground">{item.value}</p>
                <p className={`text-sm font-medium ${item.up ? "text-success" : "text-destructive"}`}>
                  {item.change}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* User Dashboard (logged in only) */}
      {user && profile && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="rounded-2xl bg-card border border-border p-6 shadow-card">
            <h3 className="font-serif font-bold text-lg text-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Your Dashboard
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-secondary/50 p-4 text-center">
                <Flame className="w-6 h-6 text-accent mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div className="rounded-xl bg-secondary/50 p-4 text-center">
                <BookOpen className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-xs text-muted-foreground">Lessons Completed</p>
              </div>
              <div className="rounded-xl bg-secondary/50 p-4 text-center">
                <Trophy className="w-6 h-6 text-accent mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">—</p>
                <p className="text-xs text-muted-foreground">Last Quiz Score</p>
              </div>
            </div>
            <Link to="/learn" className="mt-4 block text-sm text-primary font-medium hover:underline text-center">
              Continue where you left off →
            </Link>
          </motion.div>
        </section>
      )}

      {/* Daily Prompt */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-2xl bg-card shadow-card border border-border p-8 sm:p-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              {dailyQuote.type === "quote" ? <Quote className="w-4 h-4 text-accent" /> : <Sparkles className="w-4 h-4 text-accent" />}
            </div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {dailyQuote.type === "quote" ? "Daily Inspiration" : "Daily Reflection"}
            </span>
          </div>
          <blockquote className="text-xl sm:text-2xl font-serif text-foreground leading-relaxed mb-3">
            "{dailyQuote.text}"
          </blockquote>
          {dailyQuote.author && <p className="text-sm text-muted-foreground font-medium">— {dailyQuote.author}</p>}
        </motion.div>
      </section>

      {/* Did You Know? */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="rounded-2xl bg-accent/10 border border-accent/20 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent-foreground uppercase tracking-wider">Did You Know?</span>
          </div>
          <p className="text-foreground text-lg leading-relaxed font-medium">{dailyFact}</p>
        </motion.div>
      </section>

      {/* Daily Recommendation */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
          className="rounded-2xl bg-hero-gradient text-primary-foreground p-8 sm:p-10 shadow-elevated">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">Today's Investment Idea</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-2">{dailyRec.title}</h3>
          <p className="text-sm font-medium opacity-80 mb-4">{dailyRec.ticker}</p>
          <p className="text-base leading-relaxed opacity-90 mb-6 max-w-3xl">{dailyRec.reasoning}</p>
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
          <p className="text-xs opacity-60 mt-6">* This is educational content, not financial advice. Always do your own research.</p>
        </motion.div>
      </section>

      {/* News Feed */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Financial News</span>
          </div>
          <div className="space-y-3">
            {mockNews.map((item, i) => (
              <div key={i} className="rounded-xl bg-card border border-border p-5 shadow-card hover:shadow-soft transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-serif font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.summary}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
