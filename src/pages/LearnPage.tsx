import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Building2, PiggyBank, Shield, Landmark, BarChart3,
  LineChart, Percent, Scale, ArrowLeft, CheckCircle2, BookOpen
} from "lucide-react";

interface Topic {
  id: string;
  title: string;
  icon: React.ElementType;
  tagline: string;
  what: string;
  how: string;
  applies: string;
}

const topics: Topic[] = [
  {
    id: "stocks",
    title: "Stocks",
    icon: TrendingUp,
    tagline: "Own a piece of a company",
    what: "A stock represents a share of ownership in a company. When you buy a stock, you become a part-owner of that business — entitled to a portion of its profits and growth.",
    how: "Companies sell shares on stock exchanges like the NYSE or NASDAQ. You buy and sell through a brokerage account. Stock prices rise and fall based on company performance, market conditions, and investor sentiment.",
    applies: "Stocks are one of the most powerful wealth-building tools available. Even small, regular investments in quality companies can grow significantly over decades thanks to compound growth. Start with companies you know and understand.",
  },
  {
    id: "etfs",
    title: "ETFs",
    icon: BarChart3,
    tagline: "Diversified investing, simplified",
    what: "An ETF (Exchange-Traded Fund) is a basket of investments — stocks, bonds, or other assets — bundled together and traded on the stock exchange like a single stock.",
    how: "ETFs track an index, sector, or strategy. For example, an S&P 500 ETF holds all 500 companies in the index. You buy shares through your brokerage, and the fund automatically stays diversified.",
    applies: "ETFs are perfect for beginners. Instead of picking individual stocks, you get instant diversification with low fees. One ETF can give you exposure to the entire U.S. stock market.",
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    icon: PiggyBank,
    tagline: "Professionally managed portfolios",
    what: "A mutual fund pools money from many investors to buy a diversified portfolio of stocks, bonds, or other securities, managed by professional fund managers.",
    how: "You invest money into the fund, and the fund manager decides what to buy and sell. Unlike ETFs, mutual funds are priced once per day after markets close. They often have minimum investment requirements.",
    applies: "Mutual funds are great for hands-off investors who want professional management. Many retirement accounts (401k, IRA) offer mutual funds. Look for low expense ratios — even small fee differences compound over time.",
  },
  {
    id: "bonds",
    title: "Bonds & Fixed Income",
    icon: Landmark,
    tagline: "Lending money for steady returns",
    what: "A bond is essentially a loan you give to a government or corporation. In return, they pay you regular interest and return your principal when the bond matures.",
    how: "You buy bonds at face value, receive regular interest payments (coupons), and get your principal back at maturity. Bond prices move inversely to interest rates — when rates rise, bond prices fall.",
    applies: "Bonds add stability to your portfolio. They're less volatile than stocks and provide predictable income. As you get closer to needing your money (like retirement), shifting toward bonds helps protect your wealth.",
  },
  {
    id: "index-funds",
    title: "Index Funds",
    icon: LineChart,
    tagline: "Match the market, beat most investors",
    what: "An index fund is a type of mutual fund or ETF designed to replicate the performance of a specific market index, like the S&P 500 or the total stock market.",
    how: "Instead of trying to pick winners, index funds simply buy all the stocks in an index. This passive approach results in very low fees and, historically, better long-term performance than most actively managed funds.",
    applies: "Index funds are the cornerstone of smart investing. Warren Buffett himself recommends them for most investors. Set up automatic monthly investments into a broad index fund and let compound growth do the work.",
  },
  {
    id: "reits",
    title: "REITs",
    icon: Building2,
    tagline: "Real estate without the hassle",
    what: "A REIT (Real Estate Investment Trust) is a company that owns, operates, or finances income-producing real estate. You can invest in real estate without buying property.",
    how: "REITs are traded on exchanges like stocks. They're required to distribute at least 90% of taxable income as dividends, making them popular for income-seeking investors.",
    applies: "REITs let you add real estate to your portfolio with as little as the price of one share. They provide diversification beyond stocks and bonds, plus regular dividend income.",
  },
  {
    id: "options",
    title: "Options",
    icon: Scale,
    tagline: "Advanced strategies for experienced investors",
    what: "An option is a contract giving you the right (but not obligation) to buy or sell a stock at a specific price before a certain date. They come in two types: calls (right to buy) and puts (right to sell).",
    how: "Options are priced based on the underlying stock, time until expiration, and market volatility. They can be used for speculation, hedging, or generating income through strategies like covered calls.",
    applies: "Options are complex and best approached after mastering the basics. Start by understanding calls and puts conceptually. Never risk money you can't afford to lose with options.",
  },
  {
    id: "hedge-funds",
    title: "Hedge Funds",
    icon: Shield,
    tagline: "Exclusive strategies for accredited investors",
    what: "Hedge funds are private investment partnerships that use advanced strategies — short selling, leverage, derivatives — to generate returns regardless of market direction.",
    how: "Typically only available to accredited investors (high net worth individuals). They charge higher fees (often 2% management + 20% of profits) and have less regulatory oversight than mutual funds.",
    applies: "Most everyday investors don't need hedge funds. The high fees eat into returns, and many hedge funds underperform simple index funds. Understanding them helps you appreciate why passive investing works.",
  },
  {
    id: "taxes",
    title: "Tax-Smart Investing",
    icon: Percent,
    tagline: "Keep more of what you earn",
    what: "Tax-efficient investing means structuring your portfolio and transactions to minimize taxes. This includes understanding capital gains, tax-loss harvesting, and using tax-advantaged accounts.",
    how: "Long-term capital gains (held 1+ year) are taxed at lower rates. Tax-loss harvesting means selling losers to offset gains. Tax-advantaged accounts like 401(k)s and Roth IRAs let investments grow tax-free or tax-deferred.",
    applies: "Taxes can be one of your biggest investment expenses. Use retirement accounts first, hold investments long-term, and consider tax-loss harvesting at year-end. Small tax savings compound into big differences.",
  },
];

const LearnPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {selectedTopic ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedTopic(null)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <selectedTopic.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                    {selectedTopic.title}
                  </h1>
                  <p className="text-muted-foreground">{selectedTopic.tagline}</p>
                </div>
              </div>

              <div className="space-y-8 max-w-3xl">
                {[
                  { label: "What is it?", content: selectedTopic.what, icon: BookOpen },
                  { label: "How does it work?", content: selectedTopic.how, icon: BarChart3 },
                  { label: "How does it apply to you?", content: selectedTopic.applies, icon: CheckCircle2 },
                ].map((section, i) => (
                  <motion.div
                    key={section.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-card"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <section.icon className="w-4 h-4 text-primary" />
                      <h3 className="font-serif font-bold text-lg text-foreground">{section.label}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <BookOpen className="w-3.5 h-3.5" />
                  Learn at your pace
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">
                  Investment Fundamentals
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Tap on any topic to dive in. Each lesson is written in plain English — no finance degree required.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topics.map((topic, i) => (
                  <motion.button
                    key={topic.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    onClick={() => setSelectedTopic(topic)}
                    className="text-left rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <topic.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-foreground mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{topic.tagline}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LearnPage;
