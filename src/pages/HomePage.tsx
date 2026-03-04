import { motion } from "framer-motion";
import { Sparkles, TrendingUp, ArrowRight, Quote, Lightbulb, Newspaper, BarChart3, Flame, Trophy, BookOpen, AlertTriangle, TrendingDown } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const dailyQuotes = [
  { text: "The stock market is a device for transferring money from the impatient to the patient.", author: "Warren Buffett", type: "quote" as const },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", type: "quote" as const },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", type: "quote" as const },
  { text: "Do not save what is left after spending, but spend what is left after saving.", author: "Warren Buffett", type: "quote" as const },
  { text: "Risk comes from not knowing what you're doing.", author: "Warren Buffett", type: "quote" as const },
  { text: "The individual investor should act consistently as an investor and not as a speculator.", author: "Benjamin Graham", type: "quote" as const },
  { text: "In investing, what is comfortable is rarely profitable.", author: "Robert Arnott", type: "quote" as const },
  { text: "The four most dangerous words in investing are: 'This time it's different.'", author: "Sir John Templeton", type: "quote" as const },
  { text: "Wide diversification is only required when investors do not understand what they are doing.", author: "Warren Buffett", type: "quote" as const },
  { text: "How many millionaires do you know who have become wealthy by investing in savings accounts? I rest my case.", author: "Robert G. Allen", type: "quote" as const },
  { text: "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it.", author: "Albert Einstein", type: "quote" as const },
  { text: "Know what you own, and know why you own it.", author: "Peter Lynch", type: "quote" as const },
  { text: "The biggest risk of all is not taking one.", author: "Mellody Hobson", type: "quote" as const },
  { text: "It's not how much money you make, but how much money you keep.", author: "Robert Kiyosaki", type: "quote" as const },
  { text: "The goal isn't more money. The goal is living life on your terms.", author: "Chris Brogan", type: "quote" as const },
  { text: "Price is what you pay. Value is what you get.", author: "Warren Buffett", type: "quote" as const },
  { text: "Investing should be more like watching paint dry or watching grass grow. If you want excitement, take $800 and go to Las Vegas.", author: "Paul Samuelson", type: "quote" as const },
  { text: "The stock market is filled with individuals who know the price of everything, but the value of nothing.", author: "Philip Fisher", type: "quote" as const },
  { text: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make.", author: "Dave Ramsey", type: "quote" as const },
  { text: "Money is a terrible master but an excellent servant.", author: "P.T. Barnum", type: "quote" as const },
  { text: "What percentage of your income are you investing each month? If the answer is zero, what's one small step you can take this week?", author: "", type: "question" as const },
  { text: "If you had to explain your investment strategy to a 10-year-old, could you? Simplicity is a superpower.", author: "", type: "question" as const },
  { text: "What would your financial life look like in 10 years if you started investing just $100 a month today?", author: "", type: "question" as const },
  { text: "Are you investing out of fear or out of confidence? Understanding your emotions is the first step to better decisions.", author: "", type: "question" as const },
  { text: "What's one financial concept you've been avoiding because it seems too complex? Today might be the day to tackle it.", author: "", type: "question" as const },
  { text: "If you lost 20% of your portfolio tomorrow, would you panic sell or buy more? Your answer reveals your risk tolerance.", author: "", type: "question" as const },
  { text: "Do you know the expense ratio of your investments? Even 1% more in fees can cost you hundreds of thousands over a lifetime.", author: "", type: "question" as const },
  { text: "What's the difference between being rich and being wealthy? Wealth is freedom — how are you building yours?", author: "", type: "question" as const },
  { text: "Have you reviewed your investment portfolio in the last 6 months? Regular check-ins keep you aligned with your goals.", author: "", type: "question" as const },
  { text: "Formal education will make you a living; self-education will make you a fortune.", author: "Jim Rohn", type: "quote" as const },
  { text: "Time in the market beats timing the market.", author: "Ken Fisher", type: "quote" as const },
];

const dailyRecommendations = [
  { title: "Consider a Broad Market Index Fund", ticker: "VTI / VTSAX", reasoning: "With markets showing resilience despite mixed economic signals, a total market index fund remains one of the smartest long-term plays. You get instant diversification across thousands of companies, ultra-low fees, and historically strong returns. This is the foundation of any solid portfolio.", risk: "Low", timeHorizon: "Long-term (5+ years)" },
  { title: "High-Yield Savings or Treasury Bills", ticker: "T-Bills / HYSA", reasoning: "With interest rates still elevated, parking your emergency fund in a high-yield savings account or short-term Treasury bills gives you solid risk-free returns. Before investing in the market, ensure your emergency fund is secure and earning competitive rates.", risk: "Very Low", timeHorizon: "Short-term (0-2 years)" },
  { title: "International Diversification via ETF", ticker: "VXUS / IXUS", reasoning: "International markets are trading at historically lower valuations compared to U.S. stocks. Adding 20-30% international exposure can reduce overall portfolio risk through geographic diversification while capturing growth in emerging economies.", risk: "Moderate", timeHorizon: "Long-term (5+ years)" },
  { title: "Dividend Growth ETF", ticker: "VIG / SCHD", reasoning: "Companies that consistently grow their dividends tend to be well-managed, financially healthy businesses. A dividend growth ETF provides both income and capital appreciation potential, making it ideal for investors who want their portfolio to generate cash flow.", risk: "Low-Moderate", timeHorizon: "Medium-Long (3-10 years)" },
  { title: "Bond Market ETF for Stability", ticker: "BND / AGG", reasoning: "With the interest rate cycle potentially shifting, high-quality bond funds offer attractive yields and can provide a stabilizing counterbalance to stocks in your portfolio. Consider allocating 20-40% of your portfolio to bonds based on your risk tolerance.", risk: "Low", timeHorizon: "Medium-term (2-5 years)" },
  { title: "Real Estate Investment Trust ETF", ticker: "VNQ / SCHH", reasoning: "REITs provide exposure to real estate without the hassle of owning property. They're required to pay out 90% of income as dividends, making them excellent income generators. Real estate often moves independently of stocks, adding diversification.", risk: "Moderate", timeHorizon: "Long-term (5+ years)" },
  { title: "Target-Date Retirement Fund", ticker: "VTTSX / FFFHX", reasoning: "If you want a truly hands-off approach, target-date funds automatically adjust your stock-to-bond ratio as you approach retirement. Pick the fund closest to your expected retirement year and contribute consistently. Simplicity is an underrated investment strategy.", risk: "Varies by date", timeHorizon: "Until retirement" },
];

const didYouKnowFacts = [
  "If you invested $10,000 in the S&P 500 in 1980, it would be worth over $1 million today — without adding a single dollar more.",
  "Albert Einstein reportedly called compound interest the 'eighth wonder of the world.'",
  "The average millionaire has 7 streams of income. Diversification isn't just for portfolios.",
  "Women investors tend to outperform men by about 1% per year, partly because they trade less frequently.",
  "The word 'stock' comes from the old English word for 'trunk' — as in a tree trunk that grows over time.",
  "Warren Buffett made 99% of his wealth after his 50th birthday. Patience is the ultimate edge.",
  "Index funds were considered a terrible idea when John Bogle launched the first one in 1976. Critics called it 'Bogle's Folly.'",
  "The S&P 500 has had positive annual returns in roughly 73% of all years since its inception.",
  "A penny doubled every day for 30 days becomes over $5.3 million. That's the power of compounding.",
  "The average 401(k) balance for people aged 60-69 is around $200,000 — far less than most experts recommend for retirement.",
  "Dollar-cost averaging into an index fund has outperformed lump-sum investing about 30% of the time — but it also reduces regret and stress significantly.",
  "The first stock exchange was established in Amsterdam in 1602 when the Dutch East India Company offered shares to the public.",
  "Approximately 90% of actively managed funds underperform their benchmark index over a 15-year period.",
  "The Rule of 72: divide 72 by your annual return rate to estimate how many years it takes to double your money. At 8%, that's about 9 years.",
  "Berkshire Hathaway stock was $19 per share when Buffett took over in 1965. Today it trades at over $600,000 per share.",
  "The longest bull market in U.S. history lasted 11 years, from March 2009 to February 2020.",
  "Jack Bogle, founder of Vanguard, estimated that investors lose about 2.5% per year to fees, taxes, and poor timing decisions.",
  "Only about 55% of Americans own stocks, either directly or through retirement accounts.",
  "The average annual return of the S&P 500 over the last 50 years is approximately 10.5% before inflation.",
  "Tax-loss harvesting can save the average investor between 0.5% to 1.5% in taxes annually.",
  "The 'Latte Factor': saving $5 per day invested at 8% annual return would grow to over $250,000 in 30 years.",
  "Japan's stock market took 34 years to recover its 1989 peak — a reminder that diversification across countries matters.",
  "REITs have outperformed stocks over many 20-year periods while providing consistent dividend income.",
  "The first mutual fund was created in the Netherlands in 1774, predating the United States itself.",
  "Dollar-cost averaging works because you buy more shares when prices are low and fewer when prices are high.",
  "Benjamin Graham, Warren Buffett's mentor, said the market is a voting machine in the short run but a weighing machine in the long run.",
  "The average holding period for a stock has dropped from 8 years in the 1960s to less than 6 months today.",
  "Inflation averaging 3% per year means your money loses half its purchasing power every 24 years if not invested.",
  "The Roth IRA was introduced in 1997 and named after Senator William Roth of Delaware.",
  "Approximately 80% of day traders lose money. Long-term investing remains the most reliable path to wealth.",
];

const mockNews = [
  { title: "Fed Signals Steady Rates Through Mid-2026", summary: "The Federal Reserve maintained its current rate policy, suggesting economic stability. This is generally positive for long-term investors as it reduces uncertainty about borrowing costs.", time: "2h ago" },
  { title: "Tech Sector Continues to Lead Market Gains", summary: "Major tech companies reported strong earnings, pushing the NASDAQ to new highs. A reminder that staying invested in quality companies pays off over time.", time: "4h ago" },
  { title: "New Investors Surge: Record Brokerage Signups in Q1", summary: "More people are opening investment accounts than ever before, with fintech platforms reporting record signups. Financial literacy is on the rise globally.", time: "6h ago" },
  { title: "Global Supply Chains Show Signs of Recovery", summary: "International shipping rates and delivery times are improving, which could benefit consumer goods companies and reduce inflationary pressures across the economy.", time: "8h ago" },
  { title: "Renewable Energy Investments Hit Record $500B", summary: "Clean energy investments reached a new milestone globally. ESG-focused investors are seeing strong returns as governments worldwide accelerate green energy transitions.", time: "12h ago" },
];

const marketData = [
  { name: "S&P 500", value: "5,842.31", change: "+0.73%", up: true, icon: TrendingUp },
  { name: "NASDAQ", value: "18,493.67", change: "+1.12%", up: true, icon: TrendingUp },
  { name: "DOW", value: "43,127.84", change: "-0.15%", up: false, icon: TrendingDown },
  { name: "VIX", value: "14.82", change: "-2.31%", up: false, icon: BarChart3 },
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
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const HomePage = () => {
  const dailyQuote = getDailyItem(dailyQuotes);
  const dailyRec = getDailyItem(dailyRecommendations);
  const dailyFact = getDailyItem(didYouKnowFacts);
  const { user, profile } = useAuth();

  const [streakData, setStreakData] = useState({ current_streak: 0, best_streak: 0 });
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [lastQuizScore, setLastQuizScore] = useState<string>("—");

  useEffect(() => {
    if (!user) return;
    const loadDashboard = async () => {
      const [streakRes, progressRes, quizRes] = await Promise.all([
        supabase.from("daily_streaks").select("current_streak, best_streak").eq("user_id", user.id).single(),
        supabase.from("user_progress").select("id").eq("user_id", user.id).eq("completed", true),
        supabase.from("quiz_scores").select("score, total_questions").eq("user_id", user.id).order("completed_at", { ascending: false }).limit(1),
      ]);
      if (streakRes.data) setStreakData(streakRes.data as any);
      if (progressRes.data) setLessonsCompleted(progressRes.data.length);
      if (quizRes.data && quizRes.data.length > 0) setLastQuizScore(`${quizRes.data[0].score}/${quizRes.data[0].total_questions}`);
    };
    loadDashboard();
  }, [user]);

  return (
    <div className="min-h-screen">
      {/* Disclaimer Banner */}
      <div className="bg-accent/10 border-b border-accent/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-2 justify-center">
          <AlertTriangle className="w-3.5 h-3.5 text-accent shrink-0" />
          <p className="text-xs text-accent-foreground">
            <strong>Educational purposes only.</strong> This platform does not provide licensed financial advice. Always consult a qualified advisor.
          </p>
        </div>
      </div>

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
              <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-3">
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
            <span className="text-xs text-muted-foreground ml-auto">Delayed data · For educational purposes</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {marketData.map((item) => (
              <div key={item.name} className="rounded-xl bg-card border border-border p-4 shadow-card hover:shadow-soft transition-shadow">
                <p className="text-xs text-muted-foreground mb-1">{item.name}</p>
                <p className="text-lg font-bold text-foreground">{item.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {item.up ? (
                    <TrendingUp className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                  )}
                  <p className={`text-sm font-medium ${item.up ? "text-success" : "text-destructive"}`}>
                    {item.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* User Dashboard (logged in only) */}
      {user && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="rounded-2xl bg-card border border-border p-6 shadow-card">
            <h3 className="font-serif font-bold text-lg text-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Your Dashboard
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-xl bg-secondary/50 p-4 text-center">
                <Flame className="w-6 h-6 text-accent mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">{streakData.current_streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div className="rounded-xl bg-secondary/50 p-4 text-center">
                <BookOpen className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">{lessonsCompleted}</p>
                <p className="text-xs text-muted-foreground">Lessons Done</p>
              </div>
              <div className="rounded-xl bg-secondary/50 p-4 text-center">
                <Trophy className="w-6 h-6 text-accent mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">{lastQuizScore}</p>
                <p className="text-xs text-muted-foreground">Last Quiz</p>
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
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider opacity-70">Risk Level</span>
              <p className="font-medium text-sm">{dailyRec.risk}</p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
              <span className="text-xs uppercase tracking-wider opacity-70">Time Horizon</span>
              <p className="font-medium text-sm">{dailyRec.timeHorizon}</p>
            </div>
          </div>
          <p className="text-xs opacity-60 mt-6">* This is educational content, not financial advice. Always do your own research before making investment decisions.</p>
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
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap mt-1">{item.time}</span>
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
