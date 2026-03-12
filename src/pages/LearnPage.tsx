import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Building2, PiggyBank, Shield, Landmark, BarChart3,
  LineChart, Percent, Scale, ArrowLeft, CheckCircle2, BookOpen,
  Search, ArrowRight, ToggleLeft, ToggleRight, Target, Wallet,
  RefreshCw, Layers, DollarSign, Brain, GraduationCap, Compass, Sparkles, Check
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Topic {
  id: string;
  title: string;
  icon: React.ElementType;
  tagline: string;
  simple: { what: string; how: string; applies: string };
  detailed: { what: string; how: string; applies: string };
  example: string;
}

const topics: Topic[] = [
  {
    id: "stocks", title: "Stocks", icon: TrendingUp, tagline: "Own a piece of a company",
    simple: {
      what: "A stock is a tiny piece of a company. When you buy one, you own a small part of that business.",
      how: "You buy stocks through an app or brokerage. Prices go up and down every day based on how the company is doing.",
      applies: "Stocks are one of the best ways to grow your money over time. Even $50 a month can grow significantly over 20 years.",
    },
    detailed: {
      what: "A stock represents a share of ownership (equity) in a publicly traded company. Shareholders have a proportional claim on the company's assets and earnings. Stocks are traded on exchanges like NYSE and NASDAQ, with prices determined by supply and demand dynamics, company fundamentals, macroeconomic factors, and investor sentiment.",
      how: "Companies issue stock through IPOs (Initial Public Offerings) to raise capital. Secondary market trading occurs through brokerages. Stock valuation involves analyzing metrics like P/E ratio, earnings growth, revenue trends, and competitive positioning. Market capitalization (share price × shares outstanding) categorizes companies as large-cap, mid-cap, or small-cap.",
      applies: "Equities have historically returned approximately 10% annually (before inflation) over long periods. A well-diversified stock portfolio forms the growth engine of most investment strategies. Consider your time horizon: stocks are volatile short-term but have always recovered and grown over 20+ year periods in U.S. markets.",
    },
    example: "Imagine you buy 10 shares of Apple at $150 each ($1,500 total). If Apple grows and the stock rises to $200 per share, your investment is now worth $2,000 — a $500 gain. Plus, Apple pays dividends, so you'd also receive quarterly cash payments just for holding the stock.",
  },
  {
    id: "etfs", title: "ETFs", icon: BarChart3, tagline: "Diversified investing, simplified",
    simple: { what: "An ETF is like a basket that holds many investments at once. You buy one share and get a piece of everything in the basket.", how: "You buy ETFs through your brokerage just like a stock. The basket automatically stays balanced for you.", applies: "ETFs are perfect for beginners because you don't have to pick individual companies. One ETF can give you exposure to hundreds of stocks." },
    detailed: { what: "An Exchange-Traded Fund is a pooled investment security that tracks an index, sector, commodity, or strategy. Unlike mutual funds, ETFs trade on exchanges throughout the day at market-determined prices. They offer tax efficiency through in-kind creation/redemption mechanisms and typically have lower expense ratios than comparable mutual funds.", how: "ETFs use an authorized participant (AP) mechanism to maintain prices close to Net Asset Value (NAV). Popular categories include broad market (VTI), sector-specific (XLK for tech), international (VXUS), bond (BND), and thematic ETFs. Expense ratios range from 0.03% for index ETFs to 0.75%+ for actively managed or niche ETFs.", applies: "ETFs are the building blocks of modern portfolio construction. A simple three-fund portfolio (U.S. stocks, international stocks, bonds via ETFs) provides comprehensive diversification at minimal cost. Consider tax-loss harvesting opportunities by swapping between similar-but-not-identical ETFs." },
    example: "Instead of buying shares of Apple, Google, Amazon, and 497 other companies individually, you buy one share of an S&P 500 ETF like VOO for about $500. You now own a tiny piece of all 500 companies.",
  },
  {
    id: "mutual-funds", title: "Mutual Funds", icon: PiggyBank, tagline: "Professionally managed portfolios",
    simple: { what: "A mutual fund pools money from lots of people to buy a big mix of investments, managed by a professional.", how: "You invest money and a fund manager decides what to buy. Prices update once a day after markets close.", applies: "Many retirement accounts like 401(k)s offer mutual funds. Look for low fees — they eat into your returns over time." },
    detailed: { what: "Mutual funds are professionally managed investment vehicles that pool capital from multiple investors to purchase diversified portfolios of securities.", how: "Funds are priced at end-of-day NAV. Key metrics include expense ratio, turnover rate, and load structure.", applies: "For 401(k) participants, mutual funds are often the primary investment option. Compare expense ratios carefully." },
    example: "Your company 401(k) offers a 'Large Cap Growth Fund'. You invest $500/month. Over 30 years at 8% average returns, your $180,000 in contributions could grow to over $700,000.",
  },
  {
    id: "bonds", title: "Bonds & Fixed Income", icon: Landmark, tagline: "Lending money for steady returns",
    simple: { what: "A bond is a loan you give to a government or company. They pay you interest and return your money later.", how: "You buy a bond, receive regular interest payments, and get your money back when it matures.", applies: "Bonds are less risky than stocks and provide steady income. They're great for balancing your portfolio." },
    detailed: { what: "Bonds are debt securities where the investor lends capital to an issuer for a defined period at a fixed or variable interest rate.", how: "Bond prices have an inverse relationship with interest rates. Duration measures price sensitivity to rate changes.", applies: "Bonds serve as portfolio stabilizers and income generators. The classic 60/40 stock/bond split provides growth with downside protection." },
    example: "You buy a 10-year U.S. Treasury bond for $1,000 with a 4% coupon rate. Every year, you receive $40 in interest. After 10 years, you get your $1,000 back.",
  },
  {
    id: "index-funds", title: "Index Funds", icon: LineChart, tagline: "Match the market, beat most investors",
    simple: { what: "An index fund simply buys all the stocks in a market index, like the S&P 500. No picking, no guessing.", how: "The fund automatically holds the same stocks as the index. Fees are very low.", applies: "Warren Buffett recommends index funds for most people. Just invest regularly and let time do the work." },
    detailed: { what: "Index funds are passively managed investment vehicles designed to replicate the performance of a specific market benchmark.", how: "Index construction methodologies vary: market-cap weighted, equal-weighted, fundamentally-weighted, or factor-based.", applies: "Research consistently shows over 90% of actively managed funds underperform their benchmark over 15-year periods." },
    example: "You invest $500/month into a total stock market index fund for 30 years. Assuming ~10% annually, your $180,000 grows to approximately $1,000,000.",
  },
  {
    id: "reits", title: "REITs", icon: Building2, tagline: "Real estate without the hassle",
    simple: { what: "A REIT lets you invest in real estate without buying property.", how: "REITs are traded like stocks and must pay out 90% of income as dividends.", applies: "REITs add real estate to your portfolio with as little as the price of one share." },
    detailed: { what: "Real Estate Investment Trusts own, operate, or finance income-producing real estate across sectors.", how: "Key metrics include Funds From Operations (FFO), Net Asset Value (NAV), and dividend yield.", applies: "A 5-10% portfolio allocation to REITs can improve risk-adjusted returns." },
    example: "You buy 20 shares of VNQ at $85 each ($1,700). With a ~4% dividend yield, you'd receive about $68/year in dividends.",
  },
  {
    id: "dca", title: "Dollar-Cost Averaging", icon: RefreshCw, tagline: "Invest consistently, worry less",
    simple: { what: "Dollar-cost averaging means investing the same amount on a regular schedule, no matter what the market is doing.", how: "Set up automatic investments. When prices are low, you buy more shares. When high, fewer.", applies: "This removes the stress of trying to time the market." },
    detailed: { what: "Dollar-cost averaging (DCA) is a systematic investment strategy where a fixed dollar amount is invested at regular intervals regardless of asset price.", how: "DCA reduces the impact of volatility on the overall purchase price.", applies: "Automate your DCA by setting up recurring transfers from your bank to your brokerage on each payday." },
    example: "You invest $500/month. In January, shares cost $50 (10 shares). In February, $40 (12.5 shares). Your average cost: $47.47/share.",
  },
  {
    id: "retirement", title: "Retirement Accounts", icon: Wallet, tagline: "Tax-advantaged wealth building",
    simple: { what: "Retirement accounts like 401(k)s and IRAs let your investments grow without paying taxes every year.", how: "You contribute money before or after taxes. The money grows tax-free until withdrawal.", applies: "If your employer matches 401(k) contributions, that's free money. Always get the full match." },
    detailed: { what: "Tax-advantaged retirement accounts include employer-sponsored plans (401(k), 403(b)) and individual accounts (Traditional IRA, Roth IRA, SEP IRA).", how: "2026 contribution limits: $23,500 for 401(k) ($31,000 if 50+), $7,000 for IRA ($8,000 if 50+).", applies: "Priority: 1) 401(k) to match. 2) Max Roth IRA. 3) Max 401(k). 4) Taxable brokerage." },
    example: "Your employer matches 50% up to 6%. On $60,000 salary, contributing 6% ($3,600) means your employer adds $1,800. Over 30 years at 8%, that $5,400/year becomes over $600,000.",
  },
  {
    id: "taxes", title: "Tax-Smart Investing", icon: Percent, tagline: "Keep more of what you earn",
    simple: { what: "Tax-smart investing means arranging your investments to pay less in taxes.", how: "Hold investments longer than a year for lower tax rates. Use retirement accounts. Offset gains by selling losers.", applies: "Taxes can be your biggest investment expense." },
    detailed: { what: "Tax-efficient investing encompasses strategies to minimize tax drag on portfolio returns.", how: "Asset location strategy: hold tax-inefficient assets in tax-advantaged accounts.", applies: "Tax-loss harvest systematically at year-end." },
    example: "You bought Stock A for $10,000 (now $15,000 gain) and Stock B for $8,000 (now $5,000 loss). Selling both nets only $2,000 gain — saving $450+ in taxes.",
  },
  {
    id: "diversification", title: "Asset Allocation", icon: Layers, tagline: "Don't put all eggs in one basket",
    simple: { what: "Asset allocation means spreading your money across different types of investments to reduce risk.", how: "Mix stocks, bonds, and other assets based on your age and goals.", applies: "A common rule: subtract your age from 110 to get your stock percentage." },
    detailed: { what: "Asset allocation is the strategic distribution of portfolio investments across asset classes to optimize the risk-return tradeoff.", how: "Strategic allocation sets long-term target weights with periodic rebalancing.", applies: "Start with a three-fund portfolio: U.S. total market (50-60%), international (20-30%), bonds (10-30%)." },
    example: "A 30-year-old might use: 60% U.S. stocks, 25% international, 15% bonds. After a rally, rebalancing means selling some stocks and buying bonds.",
  },
  {
    id: "dividends", title: "Dividends", icon: DollarSign, tagline: "Get paid to own great companies",
    simple: { what: "Dividends are cash payments companies send you for owning their stock.", how: "Companies pay quarterly. You can take the cash or reinvest it.", applies: "Reinvesting dividends supercharges compound growth." },
    detailed: { what: "Dividends are distributions of a company's earnings to shareholders. Key metrics include dividend yield, payout ratio, and growth rate.", how: "Ex-dividend date determines eligibility. DRIP automatically reinvests dividends.", applies: "Over long periods, reinvested dividends account for ~40% of the S&P 500's total return." },
    example: "You own 100 shares of JNJ at $160/share. JNJ pays $4.76/share annually ($476/year). With DRIP, over 20 years your annual dividend grows to over $1,500.",
  },
  {
    id: "behavioral", title: "Behavioral Finance", icon: Brain, tagline: "Master your investing psychology",
    simple: { what: "Behavioral finance studies why we make irrational money decisions.", how: "Common traps: panic selling, chasing hot stocks, overconfidence, and loss aversion.", applies: "Knowing your biases is half the battle. Automate your investing to remove emotion." },
    detailed: { what: "Behavioral finance integrates psychological theory with economics. Key biases: loss aversion, anchoring, confirmation bias, recency bias, herd mentality.", how: "The disposition effect causes selling winners too early and holding losers too long.", applies: "Combat biases: automate via DCA, write an Investment Policy Statement, limit checking to quarterly reviews." },
    example: "In March 2020, the market crashed 34%. Those who panic-sold locked in losses. Those who stayed invested saw full recovery within 5 months.",
  },
  {
    id: "options", title: "Options", icon: Scale, tagline: "Advanced strategies for experienced investors",
    simple: { what: "An option gives you the right to buy or sell a stock at a set price before a deadline.", how: "Call = right to buy. Put = right to sell. You pay a small premium.", applies: "Options are complex and risky. Master stocks and ETFs first." },
    detailed: { what: "Options are derivative contracts. Pricing follows the Black-Scholes model.", how: "The Greeks: Delta, Gamma, Theta, Vega, Rho. Strategies: covered calls, protective puts, iron condors.", applies: "Begin with covered calls. Over 75% of options expire worthless." },
    example: "You own 100 shares of Apple at $180. You sell a $200 call for $300. If Apple stays below $200, you keep the $300 and shares.",
  },
  {
    id: "hedge-funds", title: "Hedge Funds", icon: Shield, tagline: "Exclusive strategies for accredited investors",
    simple: { what: "Hedge funds are private investment clubs for wealthy investors using complex strategies.", how: "They charge high fees (2% + 20% of profits). Accredited investors only.", applies: "Most everyday investors don't need hedge funds. Index funds often outperform." },
    detailed: { what: "Hedge funds employ strategies including long/short equity, global macro, event-driven, and quantitative approaches.", how: "The '2 and 20' fee structure. Lock-up periods of 1-3+ years.", applies: "SPIVA data shows most hedge funds underperform a simple 60/40 portfolio after fees." },
    example: "On a $1M investment earning 10%: management fee $20k, performance fee $16k. Net return: 6.4%. An index fund nets you ~9.97%.",
  },
];

const BEGINNER_PATH_TOPICS = ["stocks", "etfs", "index-funds", "diversification", "retirement", "behavioral"];

const glossaryTerms = [
  { term: "Asset", definition: "Anything of value that can generate income or appreciate." },
  { term: "Bear Market", definition: "A market decline of 20% or more from recent highs." },
  { term: "Bull Market", definition: "A sustained period of rising stock prices, usually 20% or more from recent lows." },
  { term: "Capital Gains", definition: "The profit earned from selling an investment for more than you paid." },
  { term: "Compound Interest", definition: "Earning returns on your returns." },
  { term: "Diversification", definition: "Spreading investments across different asset types to reduce risk." },
  { term: "Dividend", definition: "A portion of a company's earnings paid to shareholders." },
  { term: "Expense Ratio", definition: "The annual fee charged by a fund, expressed as a percentage of assets." },
  { term: "Index", definition: "A benchmark measuring the performance of a group of stocks." },
  { term: "Inflation", definition: "The rate at which prices increase over time." },
  { term: "Liquidity", definition: "How easily an investment can be converted to cash." },
  { term: "Market Capitalization", definition: "Total value of a company's outstanding shares." },
  { term: "P/E Ratio", definition: "Price-to-Earnings ratio. Compares stock price to earnings per share." },
  { term: "Portfolio", definition: "Your complete collection of investments." },
  { term: "Rebalancing", definition: "Adjusting your portfolio back to target allocations." },
  { term: "Risk Tolerance", definition: "Your ability and willingness to endure investment losses." },
  { term: "Volatility", definition: "The degree to which an investment's price fluctuates." },
  { term: "Yield", definition: "The income return on an investment, expressed as a percentage." },
];

const learningPaths = [
  { id: "beginner", title: "Complete Beginner", icon: GraduationCap, desc: "Start from zero and build a solid foundation", topics: ["stocks", "etfs", "index-funds", "dca", "diversification"] },
  { id: "retirement", title: "Retirement Planning", icon: Target, desc: "Understand 401(k)s, IRAs, and building your nest egg", topics: ["retirement", "index-funds", "taxes", "diversification", "dividends"] },
  { id: "tax-smart", title: "Tax-Efficient Investing", icon: Percent, desc: "Keep more of your returns with smart tax strategies", topics: ["taxes", "retirement", "mutual-funds", "etfs", "dividends"] },
  { id: "advanced", title: "Advanced Concepts", icon: Compass, desc: "Explore options, hedge funds, and behavioral finance", topics: ["options", "hedge-funds", "behavioral", "bonds", "reits"] },
];

type ViewMode = "topics" | "glossary" | "paths" | "risk" | "detail" | "beginner-path";

const riskQuestions = [
  { q: "If your portfolio dropped 20% in one month, you would:", opts: [{ l: "Sell everything immediately", s: 1 }, { l: "Sell some to reduce risk", s: 2 }, { l: "Do nothing and wait", s: 3 }, { l: "Buy more at lower prices", s: 4 }] },
  { q: "Your investment time horizon is:", opts: [{ l: "Less than 2 years", s: 1 }, { l: "2-5 years", s: 2 }, { l: "5-15 years", s: 3 }, { l: "15+ years", s: 4 }] },
  { q: "Which statement best describes you?", opts: [{ l: "I can't afford any losses", s: 1 }, { l: "I prefer stability over growth", s: 2 }, { l: "I want balanced growth and safety", s: 3 }, { l: "I want maximum growth, accepting volatility", s: 4 }] },
  { q: "How much investing experience do you have?", opts: [{ l: "None at all", s: 1 }, { l: "A little — I have a 401(k)", s: 2 }, { l: "Moderate — I actively invest", s: 3 }, { l: "Extensive — I trade regularly", s: 4 }] },
  { q: "How would you feel if an investment lost 10% in a week?", opts: [{ l: "Extremely anxious", s: 1 }, { l: "Uncomfortable but manageable", s: 2 }, { l: "Unbothered — normal market behavior", s: 3 }, { l: "Excited — buying opportunity", s: 4 }] },
];

const riskProfiles = [
  { min: 5, max: 8, label: "Conservative", color: "text-primary", desc: "Focus on bonds, high-yield savings, and conservative index funds.", allocation: "20% Stocks, 50% Bonds, 30% Cash/Savings" },
  { min: 9, max: 13, label: "Moderate-Conservative", color: "text-primary", desc: "A balanced approach suits you best.", allocation: "40% Stocks, 40% Bonds, 20% Cash/REITs" },
  { min: 14, max: 16, label: "Moderate", color: "text-accent", desc: "Comfortable with some ups and downs.", allocation: "60% Stocks, 30% Bonds, 10% REITs/Other" },
  { min: 17, max: 18, label: "Moderate-Aggressive", color: "text-accent", desc: "Long time horizon, can handle volatility.", allocation: "75% Stocks, 15% Bonds, 10% REITs/International" },
  { min: 19, max: 20, label: "Aggressive", color: "text-destructive", desc: "Focused on maximum growth.", allocation: "90% Stocks, 5% Bonds, 5% Alternative Investments" },
];

const LearnPage = () => {
  const [view, setView] = useState<ViewMode>("topics");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [readingLevel, setReadingLevel] = useState<"simple" | "detailed">("simple");
  const [glossarySearch, setGlossarySearch] = useState("");
  const [selectedPath, setSelectedPath] = useState<typeof learningPaths[0] | null>(null);
  const [riskAnswers, setRiskAnswers] = useState<number[]>([]);
  const [riskStep, setRiskStep] = useState(0);
  const [riskComplete, setRiskComplete] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [beginnerStep, setBeginnerStep] = useState(0);
  const [beginnerComplete, setBeginnerComplete] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Load completion state
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        const { data } = await supabase.from("user_progress").select("topic_slug").eq("user_id", user.id).eq("completed", true);
        if (data) setCompletedTopics(new Set(data.map(d => d.topic_slug)));
      } else {
        try {
          const stored = JSON.parse(localStorage.getItem("completed_lessons") || "[]");
          setCompletedTopics(new Set(stored));
        } catch { /* empty */ }
      }
    };
    loadProgress();
  }, [user]);

  // Handle incoming topic from quiz review links
  useEffect(() => {
    const state = location.state as { topic?: string } | null;
    if (state?.topic) {
      const t = topics.find(tp => tp.id === state.topic);
      if (t) {
        setSelectedTopic(t);
        setView("detail");
      }
    }
  }, [location.state]);

  const markComplete = async (topicId: string) => {
    const updated = new Set(completedTopics);
    updated.add(topicId);
    setCompletedTopics(updated);
    if (user) {
      await supabase.from("user_progress").upsert(
        { user_id: user.id, topic_slug: topicId, completed: true, completed_at: new Date().toISOString() },
        { onConflict: "user_id,topic_slug" }
      );
    } else {
      localStorage.setItem("completed_lessons", JSON.stringify([...updated]));
    }
  };

  const filteredGlossary = glossaryTerms.filter(
    (t) => t.term.toLowerCase().includes(glossarySearch.toLowerCase()) || t.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  const riskScore = riskAnswers.reduce((a, b) => a + b, 0);
  const riskProfile = riskProfiles.find((p) => riskScore >= p.min && riskScore <= p.max) || riskProfiles[2];

  const openTopic = (t: Topic) => {
    setSelectedTopic(t);
    setView("detail");
  };

  const backToMain = () => {
    setView("topics");
    setSelectedTopic(null);
    setSelectedPath(null);
    setRiskAnswers([]);
    setRiskStep(0);
    setRiskComplete(false);
  };

  const totalTopics = topics.length;
  const completedCount = [...completedTopics].filter(id => topics.some(t => t.id === id)).length;

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {/* Beginner Path */}
          {view === "beginner-path" ? (
            <motion.div key="beginner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button onClick={backToMain} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to Learn
              </button>
              {beginnerComplete ? (
                <div className="max-w-2xl mx-auto text-center">
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="rounded-2xl bg-card border border-border p-10 shadow-card">
                    <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-success" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-foreground mb-3">🎉 Congratulations!</h2>
                    <p className="text-muted-foreground mb-6">You've completed the beginner investing path! You now have a solid foundation.</p>
                    <Link to="/test" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft">
                      Take the Beginner Quiz <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Beginner Investing Path</h1>
                  <p className="text-muted-foreground mb-6">Follow these 6 lessons in order to build a solid foundation.</p>
                  <div className="w-full h-2 rounded-full bg-secondary mb-8">
                    <div className="h-full rounded-full bg-hero-gradient transition-all" style={{ width: `${(beginnerStep / BEGINNER_PATH_TOPICS.length) * 100}%` }} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Step {beginnerStep + 1} of {BEGINNER_PATH_TOPICS.length}</p>
                  {(() => {
                    const topicId = BEGINNER_PATH_TOPICS[beginnerStep];
                    const topic = topics.find(t => t.id === topicId);
                    if (!topic) return null;
                    return (
                      <div className="max-w-3xl space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                            <topic.icon className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-serif font-bold text-foreground">{topic.title}</h2>
                            <p className="text-muted-foreground">{topic.tagline}</p>
                          </div>
                        </div>
                        {[
                          { label: "What is it?", content: topic.simple.what },
                          { label: "How does it work?", content: topic.simple.how },
                          { label: "How does it apply to you?", content: topic.simple.applies },
                        ].map((s, i) => (
                          <div key={i} className="rounded-xl bg-card border border-border p-6 shadow-card">
                            <h3 className="font-serif font-bold text-foreground mb-2">{s.label}</h3>
                            <p className="text-muted-foreground leading-relaxed">{s.content}</p>
                          </div>
                        ))}
                        <div className="rounded-xl bg-accent/10 border border-accent/20 p-6">
                          <h3 className="font-serif font-bold text-foreground mb-2">Real-World Example</h3>
                          <p className="text-foreground leading-relaxed">{topic.example}</p>
                        </div>
                        <button
                          onClick={() => {
                            markComplete(topicId);
                            if (beginnerStep + 1 >= BEGINNER_PATH_TOPICS.length) {
                              setBeginnerComplete(true);
                            } else {
                              setBeginnerStep(s => s + 1);
                            }
                          }}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft"
                        >
                          {beginnerStep + 1 >= BEGINNER_PATH_TOPICS.length ? "Complete Path 🎉" : "Next Lesson"} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })()}
                </>
              )}
            </motion.div>
          ) : view === "detail" && selectedTopic ? (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <button onClick={backToMain} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to Topics
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <selectedTopic.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">{selectedTopic.title}</h1>
                  <p className="text-muted-foreground">{selectedTopic.tagline}</p>
                </div>
                {completedTopics.has(selectedTopic.id) && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                    <Check className="w-3 h-3" /> Completed
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 mb-8">
                <button onClick={() => setReadingLevel(readingLevel === "simple" ? "detailed" : "simple")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                  {readingLevel === "simple" ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4 text-primary" />}
                  {readingLevel === "simple" ? "Simple Explanation" : "Detailed Explanation"}
                </button>
              </div>

              <div className="space-y-6 max-w-3xl">
                {[
                  { label: "What is it?", content: selectedTopic[readingLevel].what, icon: BookOpen },
                  { label: "How does it work?", content: selectedTopic[readingLevel].how, icon: BarChart3 },
                  { label: "How does it apply to you?", content: selectedTopic[readingLevel].applies, icon: CheckCircle2 },
                ].map((section, i) => (
                  <motion.div key={section.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-card">
                    <div className="flex items-center gap-2 mb-3">
                      <section.icon className="w-4 h-4 text-primary" />
                      <h3 className="font-serif font-bold text-lg text-foreground">{section.label}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="rounded-xl bg-accent/10 border border-accent/20 p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-accent" />
                    <h3 className="font-serif font-bold text-lg text-foreground">Real-World Example</h3>
                  </div>
                  <p className="text-foreground leading-relaxed">{selectedTopic.example}</p>
                </motion.div>

                {!completedTopics.has(selectedTopic.id) && (
                  <button onClick={() => markComplete(selectedTopic.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-success text-success-foreground font-medium text-sm shadow-soft hover:bg-success/90 transition-colors">
                    <CheckCircle2 className="w-4 h-4" /> Mark as Complete
                  </button>
                )}

                <Link to="/test" className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-hero-gradient text-primary-foreground font-medium text-sm shadow-soft hover:shadow-elevated transition-all">
                  Test Your Knowledge on {selectedTopic.title} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ) : view === "glossary" ? (
            <motion.div key="glossary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button onClick={backToMain} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to Learn
              </button>
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Financial Glossary</h1>
              <p className="text-muted-foreground mb-6">Search and browse investing terms explained in plain English.</p>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search terms..." value={glossarySearch} onChange={(e) => setGlossarySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="space-y-3">
                {filteredGlossary.map((t) => (
                  <div key={t.term} className="rounded-xl bg-card border border-border p-5 shadow-card">
                    <h4 className="font-serif font-bold text-foreground mb-1">{t.term}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.definition}</p>
                  </div>
                ))}
                {filteredGlossary.length === 0 && <p className="text-center text-muted-foreground py-8">No terms found.</p>}
              </div>
            </motion.div>
          ) : view === "paths" ? (
            <motion.div key="paths" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button onClick={backToMain} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to Learn
              </button>
              {selectedPath ? (
                <>
                  <h1 className="text-3xl font-serif font-bold text-foreground mb-2">{selectedPath.title}</h1>
                  <p className="text-muted-foreground mb-8">{selectedPath.desc}</p>
                  <div className="space-y-3 max-w-2xl">
                    {selectedPath.topics.map((tid, i) => {
                      const t = topics.find((tp) => tp.id === tid);
                      if (!t) return null;
                      const done = completedTopics.has(tid);
                      return (
                        <button key={tid} onClick={() => openTopic(t)}
                          className="w-full text-left flex items-center gap-4 rounded-xl bg-card border border-border p-5 shadow-card hover:shadow-soft transition-all">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${done ? "bg-success/10" : "bg-primary/10"}`}>
                            {done ? <Check className="w-5 h-5 text-success" /> : <span className="text-sm font-bold text-primary">{i + 1}</span>}
                          </div>
                          <div>
                            <h4 className="font-serif font-bold text-foreground">{t.title}</h4>
                            <p className="text-sm text-muted-foreground">{t.tagline}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Learning Paths</h1>
                  <p className="text-muted-foreground mb-8">Guided journeys tailored to your goals.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {learningPaths.map((p) => (
                      <button key={p.id} onClick={() => setSelectedPath(p)}
                        className="text-left rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all group">
                        <p.icon className="w-8 h-8 text-primary mb-3" />
                        <h3 className="font-serif font-bold text-lg text-foreground mb-1">{p.title}</h3>
                        <p className="text-sm text-muted-foreground">{p.desc}</p>
                        <p className="text-xs text-primary font-medium mt-3">{p.topics.length} lessons →</p>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ) : view === "risk" ? (
            <motion.div key="risk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button onClick={backToMain} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to Learn
              </button>
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Risk Tolerance Assessment</h1>
              <p className="text-muted-foreground mb-8">Discover your risk profile.</p>
              {riskComplete ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-card border border-border p-8 shadow-card max-w-2xl">
                  <div className="text-center mb-6">
                    <h2 className={`text-3xl font-serif font-bold ${riskProfile.color} mb-2`}>{riskProfile.label}</h2>
                    <p className="text-muted-foreground">{riskProfile.desc}</p>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-6 mb-6">
                    <h3 className="font-serif font-bold text-foreground mb-2">Suggested Allocation</h3>
                    <p className="text-foreground font-medium">{riskProfile.allocation}</p>
                  </div>
                  <button onClick={() => { setRiskAnswers([]); setRiskStep(0); setRiskComplete(false); }}
                    className="w-full py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm">Retake Assessment</button>
                </motion.div>
              ) : (
                <div className="max-w-2xl">
                  <div className="w-full h-2 rounded-full bg-secondary mb-6">
                    <div className="h-full rounded-full bg-hero-gradient transition-all" style={{ width: `${(riskStep / riskQuestions.length) * 100}%` }} />
                  </div>
                  <div className="rounded-2xl bg-card border border-border p-8 shadow-card">
                    <p className="text-sm text-muted-foreground mb-2">Question {riskStep + 1} of {riskQuestions.length}</p>
                    <h2 className="text-xl font-serif font-bold text-foreground mb-6">{riskQuestions[riskStep].q}</h2>
                    <div className="space-y-3">
                      {riskQuestions[riskStep].opts.map((opt) => (
                        <button key={opt.l} onClick={() => {
                          const newAnswers = [...riskAnswers, opt.s];
                          setRiskAnswers(newAnswers);
                          if (riskStep + 1 >= riskQuestions.length) setRiskComplete(true);
                          else setRiskStep(riskStep + 1);
                        }}
                          className="w-full text-left px-5 py-4 rounded-xl border-2 border-border bg-background hover:border-primary/30 hover:bg-secondary/50 transition-all text-sm font-medium text-foreground">
                          {opt.l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <BookOpen className="w-3.5 h-3.5" /> Learn at your pace
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">Investment Fundamentals</h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Tap on any topic to dive in. Each lesson is written in plain English — no finance degree required.
                </p>
              </div>

              {/* Progress bar */}
              <div className="rounded-xl bg-card border border-border p-4 mb-6 flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">{completedCount} of {totalTopics} lessons completed</p>
                  <div className="w-full h-2 rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-hero-gradient transition-all" style={{ width: `${(completedCount / totalTopics) * 100}%` }} />
                  </div>
                </div>
                {completedCount === totalTopics && <span className="text-success text-sm font-bold">🎉 All done!</span>}
              </div>

              {/* Start Here banner for beginners */}
              {completedCount === 0 && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                  <button onClick={() => setView("beginner-path")}
                    className="w-full text-left rounded-xl bg-hero-gradient text-primary-foreground p-6 shadow-elevated hover:shadow-soft transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif font-bold text-lg">New to investing? Start with our recommended beginner path →</p>
                        <p className="text-sm opacity-80">6 essential lessons to build your foundation</p>
                      </div>
                      <ArrowRight className="w-5 h-5 shrink-0" />
                    </div>
                  </button>
                </motion.div>
              )}

              {/* Quick access buttons */}
              <div className="flex flex-wrap gap-3 justify-center mb-10">
                <button onClick={() => setView("paths")} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                  <Compass className="w-4 h-4" /> Learning Paths
                </button>
                <button onClick={() => setView("glossary")} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                  <Search className="w-4 h-4" /> Financial Glossary
                </button>
                <button onClick={() => setView("risk")} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent/10 text-accent-foreground text-sm font-medium hover:bg-accent/20 transition-colors">
                  <Target className="w-4 h-4" /> Risk Assessment
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topics.map((topic, i) => {
                  const done = completedTopics.has(topic.id);
                  return (
                    <motion.button key={topic.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      onClick={() => openTopic(topic)}
                      className="text-left rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group relative">
                      {done && (
                        <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-success" />
                        </span>
                      )}
                      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <topic.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-serif font-bold text-lg text-foreground mb-1">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground">{topic.tagline}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LearnPage;
