import { motion } from "framer-motion";
import { Sparkles, TrendingUp, ArrowRight, Quote, Lightbulb, Newspaper, BarChart3, Flame, Trophy, BookOpen, AlertTriangle, TrendingDown, Brain, Library } from "lucide-react";
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
  { text: "Investing should be more like watching paint dry or watching grass grow.", author: "Paul Samuelson", type: "quote" as const },
  { text: "The stock market is filled with individuals who know the price of everything, but the value of nothing.", author: "Philip Fisher", type: "quote" as const },
  { text: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make.", author: "Dave Ramsey", type: "quote" as const },
  { text: "Money is a terrible master but an excellent servant.", author: "P.T. Barnum", type: "quote" as const },
  { text: "What percentage of your income are you investing each month?", author: "", type: "question" as const },
  { text: "If you had to explain your investment strategy to a 10-year-old, could you?", author: "", type: "question" as const },
  { text: "What would your financial life look like in 10 years if you invested $100 a month today?", author: "", type: "question" as const },
  { text: "Are you investing out of fear or out of confidence?", author: "", type: "question" as const },
  { text: "What's one financial concept you've been avoiding?", author: "", type: "question" as const },
  { text: "If you lost 20% of your portfolio tomorrow, would you panic sell or buy more?", author: "", type: "question" as const },
  { text: "Do you know the expense ratio of your investments?", author: "", type: "question" as const },
  { text: "What's the difference between being rich and being wealthy?", author: "", type: "question" as const },
  { text: "Have you reviewed your portfolio in the last 6 months?", author: "", type: "question" as const },
  { text: "Formal education will make you a living; self-education will make you a fortune.", author: "Jim Rohn", type: "quote" as const },
  { text: "Time in the market beats timing the market.", author: "Ken Fisher", type: "quote" as const },
];

const dailyRecommendations = [
  { title: "Consider a Broad Market Index Fund", ticker: "VTI / VTSAX", reasoning: "A total market index fund remains one of the smartest long-term plays. You get instant diversification across thousands of companies, ultra-low fees, and historically strong returns. This is the foundation of any solid portfolio.", risk: "Low", timeHorizon: "Long-term (5+ years)" },
  { title: "High-Yield Savings or Treasury Bills", ticker: "T-Bills / HYSA", reasoning: "With interest rates still elevated, parking your emergency fund in a high-yield savings account or short-term Treasury bills gives you solid risk-free returns. Before investing in the market, ensure your emergency fund is secure.", risk: "Very Low", timeHorizon: "Short-term (0-2 years)" },
  { title: "International Diversification via ETF", ticker: "VXUS / IXUS", reasoning: "International markets are trading at historically lower valuations compared to U.S. stocks. Adding 20-30% international exposure can reduce overall portfolio risk through geographic diversification.", risk: "Moderate", timeHorizon: "Long-term (5+ years)" },
  { title: "Dividend Growth ETF", ticker: "VIG / SCHD", reasoning: "Companies that consistently grow their dividends tend to be well-managed, financially healthy businesses. A dividend growth ETF provides both income and capital appreciation potential.", risk: "Low-Moderate", timeHorizon: "Medium-Long (3-10 years)" },
  { title: "Bond Market ETF for Stability", ticker: "BND / AGG", reasoning: "High-quality bond funds offer attractive yields and can provide a stabilizing counterbalance to stocks in your portfolio. Consider allocating 20-40% to bonds based on your risk tolerance.", risk: "Low", timeHorizon: "Medium-term (2-5 years)" },
  { title: "Real Estate Investment Trust ETF", ticker: "VNQ / SCHH", reasoning: "REITs provide exposure to real estate without the hassle of owning property. They're required to pay out 90% of income as dividends, making them excellent income generators.", risk: "Moderate", timeHorizon: "Long-term (5+ years)" },
  { title: "Target-Date Retirement Fund", ticker: "VTTSX / FFFHX", reasoning: "If you want a truly hands-off approach, target-date funds automatically adjust your stock-to-bond ratio as you approach retirement. Pick the fund closest to your expected retirement year.", risk: "Varies by date", timeHorizon: "Until retirement" },
  { title: "S&P 500 Index Fund", ticker: "VOO / SPY", reasoning: "The S&P 500 represents 500 of America's largest companies and has averaged ~10% annual returns over the long run. It's Warren Buffett's #1 recommendation for most investors.", risk: "Low-Moderate", timeHorizon: "Long-term (5+ years)" },
  { title: "Emerging Markets Exposure", ticker: "VWO / IEMG", reasoning: "Emerging markets offer higher growth potential with higher volatility. Countries like India, Brazil, and Indonesia have growing middle classes and expanding economies that can diversify your portfolio.", risk: "High", timeHorizon: "Long-term (7+ years)" },
  { title: "Developed International Markets", ticker: "EFA / VEA", reasoning: "Developed markets outside the U.S. (Europe, Japan, Australia) often trade at lower valuations. Adding exposure provides diversification without the volatility of emerging markets.", risk: "Moderate", timeHorizon: "Long-term (5+ years)" },
  { title: "Treasury Inflation-Protected Securities", ticker: "TIP / SCHP", reasoning: "TIPS adjust their principal based on inflation, protecting your purchasing power. They're ideal when inflation is a concern and provide a guaranteed real (after-inflation) return.", risk: "Low", timeHorizon: "Medium-term (3-7 years)" },
  { title: "Short-Term Government Bonds", ticker: "SGOV / SHV", reasoning: "Ultra-short Treasury ETFs provide the safety of government bonds with minimal interest rate risk. They're a great alternative to savings accounts for cash you might need within 1-2 years.", risk: "Very Low", timeHorizon: "Short-term (0-1 year)" },
  { title: "High Dividend Yield ETF", ticker: "HDV / DVY", reasoning: "High-dividend ETFs focus on companies paying above-average yields. They can provide a steady income stream and tend to be more stable during market downturns due to their value-oriented holdings.", risk: "Low-Moderate", timeHorizon: "Medium-Long (3+ years)" },
  { title: "Technology Sector ETF", ticker: "XLK / VGT", reasoning: "Technology continues to drive innovation and economic growth. A tech sector ETF gives concentrated exposure to leaders in AI, cloud computing, and semiconductors, though with higher volatility.", risk: "Moderate-High", timeHorizon: "Long-term (5+ years)" },
  { title: "Healthcare Sector ETF", ticker: "XLV / VHT", reasoning: "Healthcare is a defensive sector with steady demand regardless of economic cycles. An aging population globally provides a structural tailwind for healthcare companies.", risk: "Moderate", timeHorizon: "Long-term (5+ years)" },
  { title: "Energy Sector ETF", ticker: "XLE / VDE", reasoning: "Energy companies often benefit from inflation and geopolitical events. They typically pay healthy dividends and can serve as a hedge against rising oil prices affecting other parts of your portfolio.", risk: "Moderate-High", timeHorizon: "Medium-term (3-5 years)" },
  { title: "Financial Sector ETF", ticker: "XLF / VFH", reasoning: "Banks and financial companies benefit from higher interest rates through wider net interest margins. The sector tends to perform well during economic expansions.", risk: "Moderate", timeHorizon: "Medium-Long (3-7 years)" },
  { title: "Small-Cap Value ETF", ticker: "AVUV / VBR", reasoning: "Small-cap value stocks have historically outperformed large caps over long periods (the 'size' and 'value' premiums). They're more volatile but offer higher expected returns for patient investors.", risk: "High", timeHorizon: "Long-term (10+ years)" },
  { title: "Quality Factor ETF", ticker: "QUAL / DGRW", reasoning: "Quality factor ETFs focus on companies with high profitability, stable earnings, and strong balance sheets. They tend to outperform during market downturns while keeping pace during rallies.", risk: "Low-Moderate", timeHorizon: "Long-term (5+ years)" },
  { title: "Consumer Staples for Defense", ticker: "XLP / VDC", reasoning: "Consumer staples companies (P&G, Coca-Cola, Walmart) sell products people buy regardless of the economy. This defensive sector provides stability and dividends during uncertain times.", risk: "Low", timeHorizon: "Medium-Long (3+ years)" },
  { title: "Utilities Sector ETF", ticker: "XLU / VPU", reasoning: "Utilities provide essential services (electricity, water, gas) with regulated revenue. They offer high dividend yields and defensive characteristics, performing well when the economy slows.", risk: "Low", timeHorizon: "Medium-Long (3+ years)" },
  { title: "REIT Focused on Data Centers", ticker: "O / DLR", reasoning: "Realty Income (O) is a monthly dividend payer, while Digital Realty (DLR) operates data centers powering the AI revolution. Both offer inflation protection through real assets.", risk: "Moderate", timeHorizon: "Long-term (5+ years)" },
  { title: "I-Bonds for Inflation Protection", ticker: "I-Bonds (TreasuryDirect)", reasoning: "I-Bonds are U.S. savings bonds with an interest rate that adjusts for inflation. They're virtually risk-free and limited to $10,000/year per person — a perfect complement to your emergency fund.", risk: "Very Low", timeHorizon: "Medium-term (1-5 years)" },
  { title: "HSA Investment Strategy", ticker: "HSA Funds", reasoning: "If you have a high-deductible health plan, max out your HSA. It offers a triple tax advantage: deductible contributions, tax-free growth, and tax-free withdrawals for medical expenses. After 65, it works like a Traditional IRA.", risk: "Varies", timeHorizon: "Long-term (5+ years)" },
  { title: "Emergency Fund Optimization", ticker: "HYSA / Money Market", reasoning: "Before investing aggressively, ensure your emergency fund (3-6 months of expenses) is in a high-yield savings account earning 4-5%. This safety net prevents you from selling investments during emergencies.", risk: "Very Low", timeHorizon: "Immediate" },
  { title: "Total International Bond Fund", ticker: "BNDX / IAGG", reasoning: "International bonds provide diversification beyond U.S. fixed income. Currency-hedged versions reduce exchange rate risk while capturing yields from developed global bond markets.", risk: "Low", timeHorizon: "Medium-term (3-5 years)" },
  { title: "Mid-Cap Growth ETF", ticker: "VO / IJH", reasoning: "Mid-cap companies are often past the riskiest startup phase but still have significant room to grow. They represent a sweet spot between the stability of large caps and the growth potential of small caps.", risk: "Moderate", timeHorizon: "Long-term (5+ years)" },
  { title: "Balanced Fund for Simplicity", ticker: "VBIAX / FBALX", reasoning: "A balanced fund holds ~60% stocks and ~40% bonds in a single fund, automatically rebalancing for you. It's perfect for investors who want broad diversification without managing multiple holdings.", risk: "Moderate", timeHorizon: "Medium-Long (5+ years)" },
  { title: "Clean Energy / ESG ETF", ticker: "ICLN / ESGU", reasoning: "ESG-focused and clean energy funds invest in companies addressing environmental and social challenges. Government incentives for green energy provide a structural tailwind for this growing sector.", risk: "Moderate-High", timeHorizon: "Long-term (7+ years)" },
  { title: "Gold ETF as Portfolio Insurance", ticker: "GLD / IAU", reasoning: "Gold serves as a store of value and portfolio diversifier, often rising when stocks fall. A small allocation (5-10%) can reduce overall portfolio volatility and provide a hedge against extreme events.", risk: "Moderate", timeHorizon: "Long-term (5+ years)" },
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
  "The average 401(k) balance for people aged 60-69 is around $200,000 — far less than most experts recommend.",
  "Dollar-cost averaging into an index fund has outperformed lump-sum investing about 30% of the time — but reduces stress significantly.",
  "The first stock exchange was established in Amsterdam in 1602.",
  "Approximately 90% of actively managed funds underperform their benchmark index over a 15-year period.",
  "The Rule of 72: divide 72 by your annual return rate to estimate how many years it takes to double your money.",
  "Berkshire Hathaway stock was $19 per share when Buffett took over in 1965. Today it trades at over $600,000 per share.",
  "The longest bull market in U.S. history lasted 11 years, from March 2009 to February 2020.",
  "Jack Bogle estimated that investors lose about 2.5% per year to fees, taxes, and poor timing decisions.",
  "Only about 55% of Americans own stocks, either directly or through retirement accounts.",
  "The average annual return of the S&P 500 over the last 50 years is approximately 10.5% before inflation.",
  "Tax-loss harvesting can save the average investor between 0.5% to 1.5% in taxes annually.",
  "The 'Latte Factor': saving $5 per day invested at 8% annual return would grow to over $250,000 in 30 years.",
  "Japan's stock market took 34 years to recover its 1989 peak — a reminder that diversification across countries matters.",
  "REITs have outperformed stocks over many 20-year periods while providing consistent dividend income.",
  "The first mutual fund was created in the Netherlands in 1774, predating the United States itself.",
  "Benjamin Graham said the market is a voting machine in the short run but a weighing machine in the long run.",
  "The average holding period for a stock has dropped from 8 years in the 1960s to less than 6 months today.",
  "Inflation averaging 3% per year means your money loses half its purchasing power every 24 years if not invested.",
  "The Roth IRA was introduced in 1997 and named after Senator William Roth of Delaware.",
  "Approximately 80% of day traders lose money. Long-term investing remains the most reliable path to wealth.",
  "Dollar-cost averaging works because you buy more shares when prices are low and fewer when prices are high.",
];

const educationalArticles = [
  { title: "Why Index Funds Beat Active Management", summary: "Research consistently shows over 90% of active fund managers fail to beat their benchmark index over 15 years. Learn why passive investing is the winning strategy.", source: "Investment Research" },
  { title: "The Power of Starting Early: A Compound Interest Story", summary: "How investing just $200/month starting at age 25 vs. 35 can mean a difference of over $400,000 by retirement, thanks to compound growth.", source: "Financial Education" },
  { title: "Understanding Your Risk Tolerance", summary: "Your risk tolerance affects every investment decision. Learn how to assess yours and build a portfolio that lets you sleep at night.", source: "Portfolio Strategy" },
  { title: "Tax-Advantaged Accounts Explained: IRA, 401k, HSA", summary: "Maximize your wealth by understanding which accounts to fund first and how each provides unique tax benefits for your financial goals.", source: "Tax Strategy" },
  { title: "The Psychology of Market Crashes", summary: "Why we panic sell at the worst possible time and how to build systems that protect you from your own behavioral biases during downturns.", source: "Behavioral Finance" },
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
  const dailyQuizDone = typeof window !== "undefined" && !!localStorage.getItem(`daily_quiz_${new Date().toISOString().slice(0, 10)}`);

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
              <motion.p custom={1} variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase text-accent">
                Invest smarter. Start today.
              </motion.p>
              <motion.h1 custom={2} variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight text-foreground">
                Investing made{" "}
                <span className="text-gradient-primary">simple</span> &{" "}
                <span className="text-gradient-gold">rewarding</span>
              </motion.h1>
              <motion.p custom={3} variants={fadeUp} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Learn at your own pace, test your knowledge with fun quizzes, and build the confidence to grow your wealth. No jargon, no judgment — just clear guidance.
              </motion.p>
              <motion.div custom={4} variants={fadeUp} className="flex flex-wrap gap-3">
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
              <img src={heroImage} alt="Financial growth illustration showing a tree growing from rising chart lines" className="w-full rounded-2xl shadow-elevated" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Highlight Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: BookOpen, title: "Learn", desc: "Master investing fundamentals from stocks to retirement planning with simple, jargon-free lessons.", to: "/learn", color: "bg-primary/10 text-primary" },
            { icon: Brain, title: "Test", desc: "Challenge yourself with quizzes, earn streaks, and compete on the leaderboard to solidify your knowledge.", to: "/test", color: "bg-accent/10 text-accent" },
            { icon: Library, title: "Knowledge", desc: "Explore book summaries, investor spotlights, and curated resources from the world's best financial minds.", to: "/knowledge", color: "bg-success/10 text-success" },
          ].map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <Link to={card.to} className="block rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-11 h-11 rounded-lg ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{card.desc}</p>
                <span className="text-sm font-medium text-primary flex items-center gap-1">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Daily Quiz Reminder */}
      {!dailyQuizDone && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Link to="/test" className="block rounded-xl bg-accent/10 border border-accent/20 p-5 hover:bg-accent/15 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-serif font-bold text-foreground">Your Daily Quiz is waiting!</p>
                  <p className="text-sm text-muted-foreground">Answer 5 questions to keep your streak alive.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-accent shrink-0" />
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* Continue Learning Prompt */}
      {user && lessonsCompleted > 0 && lessonsCompleted < 13 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }}>
            <Link to="/learn" className="block rounded-xl bg-primary/5 border border-primary/20 p-5 hover:bg-primary/10 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-serif font-bold text-foreground">Continue Learning</p>
                  <p className="text-sm text-muted-foreground">{lessonsCompleted} of 13 lessons completed — keep going!</p>
                </div>
                <ArrowRight className="w-5 h-5 text-primary shrink-0" />
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* Market Snapshot */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Market Snapshot</span>
            <span className="text-xs text-muted-foreground ml-auto">Illustrative data · For educational purposes</span>
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

      {/* Educational Articles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Featured Learning</span>
          </div>
          <div className="space-y-3">
            {educationalArticles.map((item, i) => (
              <Link key={i} to="/learn" className="block rounded-xl bg-card border border-border p-5 shadow-card hover:shadow-soft transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-serif font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap mt-1">{item.source}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
