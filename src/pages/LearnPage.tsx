import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Building2, PiggyBank, Shield, Landmark, BarChart3,
  LineChart, Percent, Scale, ArrowLeft, CheckCircle2, BookOpen,
  Search, ArrowRight, ToggleLeft, ToggleRight, Target, Wallet,
  RefreshCw, Layers, DollarSign, Brain, GraduationCap, Compass
} from "lucide-react";
import { Link } from "react-router-dom";

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
    simple: {
      what: "An ETF is like a basket that holds many investments at once. You buy one share and get a piece of everything in the basket.",
      how: "You buy ETFs through your brokerage just like a stock. The basket automatically stays balanced for you.",
      applies: "ETFs are perfect for beginners because you don't have to pick individual companies. One ETF can give you exposure to hundreds of stocks.",
    },
    detailed: {
      what: "An Exchange-Traded Fund is a pooled investment security that tracks an index, sector, commodity, or strategy. Unlike mutual funds, ETFs trade on exchanges throughout the day at market-determined prices. They offer tax efficiency through in-kind creation/redemption mechanisms and typically have lower expense ratios than comparable mutual funds.",
      how: "ETFs use an authorized participant (AP) mechanism to maintain prices close to Net Asset Value (NAV). Popular categories include broad market (VTI), sector-specific (XLK for tech), international (VXUS), bond (BND), and thematic ETFs. Expense ratios range from 0.03% for index ETFs to 0.75%+ for actively managed or niche ETFs.",
      applies: "ETFs are the building blocks of modern portfolio construction. A simple three-fund portfolio (U.S. stocks, international stocks, bonds via ETFs) provides comprehensive diversification at minimal cost. Consider tax-loss harvesting opportunities by swapping between similar-but-not-identical ETFs.",
    },
    example: "Instead of buying shares of Apple, Google, Amazon, and 497 other companies individually, you buy one share of an S&P 500 ETF like VOO for about $500. You now own a tiny piece of all 500 companies. If the market goes up 10%, your $500 becomes $550 — simple and diversified.",
  },
  {
    id: "mutual-funds", title: "Mutual Funds", icon: PiggyBank, tagline: "Professionally managed portfolios",
    simple: {
      what: "A mutual fund pools money from lots of people to buy a big mix of investments, managed by a professional.",
      how: "You invest money and a fund manager decides what to buy. Prices update once a day after markets close.",
      applies: "Many retirement accounts like 401(k)s offer mutual funds. Look for low fees — they eat into your returns over time.",
    },
    detailed: {
      what: "Mutual funds are professionally managed investment vehicles that pool capital from multiple investors to purchase diversified portfolios of securities. They're categorized by investment objective (growth, income, balanced), asset class (equity, fixed income, money market), and management style (active vs. passive). Each share represents proportional ownership in the fund's holdings.",
      how: "Funds are priced at end-of-day NAV. Key metrics include expense ratio, turnover rate, and load structure (front-end, back-end, or no-load). Morningstar ratings, historical performance, and manager tenure help evaluate funds. Minimum investments typically range from $1,000-$3,000 for retail shares.",
      applies: "For 401(k) participants, mutual funds are often the primary investment option. Compare expense ratios carefully — a 1% difference in fees can cost over $100,000 on a $500,000 portfolio over 25 years. Target-date funds automatically adjust your asset allocation as you approach retirement.",
    },
    example: "Your company 401(k) offers a 'Large Cap Growth Fund' with a 0.5% expense ratio. You invest $500/month. The fund manager buys stocks of fast-growing companies like Microsoft and Nvidia. Over 30 years at 8% average returns, your $180,000 in contributions could grow to over $700,000.",
  },
  {
    id: "bonds", title: "Bonds & Fixed Income", icon: Landmark, tagline: "Lending money for steady returns",
    simple: {
      what: "A bond is a loan you give to a government or company. They pay you interest and return your money later.",
      how: "You buy a bond, receive regular interest payments, and get your money back when it matures.",
      applies: "Bonds are less risky than stocks and provide steady income. They're great for balancing your portfolio.",
    },
    detailed: {
      what: "Bonds are debt securities where the investor (creditor) lends capital to an issuer (debtor) for a defined period at a fixed or variable interest rate. Key characteristics include face value (par), coupon rate, maturity date, and credit rating. Types include Treasury bonds (government), corporate bonds, municipal bonds (tax-exempt), and high-yield (junk) bonds.",
      how: "Bond prices have an inverse relationship with interest rates — when rates rise, existing bond prices fall (and vice versa). Duration measures price sensitivity to rate changes. Yield-to-maturity (YTM) represents total expected return. Credit ratings (AAA to D) indicate default risk. The yield curve (short vs. long-term rates) signals economic conditions.",
      applies: "Bonds serve as portfolio stabilizers and income generators. The classic 60/40 stock/bond split provides growth with downside protection. As you approach financial goals, increasing bond allocation preserves capital. Consider I-Bonds for inflation protection and municipal bonds for tax-free income in high tax brackets.",
    },
    example: "You buy a 10-year U.S. Treasury bond for $1,000 with a 4% coupon rate. Every year, you receive $40 in interest ($20 every six months). After 10 years, you get your $1,000 back. Total earned: $400 in interest with virtually zero default risk since it's backed by the U.S. government.",
  },
  {
    id: "index-funds", title: "Index Funds", icon: LineChart, tagline: "Match the market, beat most investors",
    simple: {
      what: "An index fund simply buys all the stocks in a market index, like the S&P 500. No picking, no guessing.",
      how: "The fund automatically holds the same stocks as the index. Fees are very low because no one is actively managing it.",
      applies: "Warren Buffett recommends index funds for most people. Just invest regularly and let time do the work.",
    },
    detailed: {
      what: "Index funds are passively managed investment vehicles designed to replicate the performance of a specific market benchmark. They follow a rules-based approach to portfolio construction, holding securities in the same proportions as their target index. This eliminates manager risk and selection bias while minimizing tracking error.",
      how: "Index construction methodologies vary: market-cap weighted (S&P 500), equal-weighted, fundamentally-weighted, or factor-based. Rebalancing occurs periodically to match index changes. Tracking error measures deviation from the benchmark. Internal costs include securities lending revenue, which can offset some expenses.",
      applies: "Research by S&P Dow Jones Indices (SPIVA) consistently shows that over 90% of actively managed funds underperform their benchmark index over 15-year periods. A total market index fund (like VTI or VTSAX) provides exposure to the entire U.S. stock market for an expense ratio as low as 0.03% per year.",
    },
    example: "You invest $500/month into a total stock market index fund for 30 years. Assuming the historical average return of ~10% annually, your $180,000 in total contributions grows to approximately $1,000,000. The fund charges just 0.03% in fees — that's $3 per $10,000 invested per year.",
  },
  {
    id: "reits", title: "REITs", icon: Building2, tagline: "Real estate without the hassle",
    simple: {
      what: "A REIT lets you invest in real estate without buying property. You own shares of a company that manages buildings.",
      how: "REITs are traded like stocks and must pay out 90% of income as dividends, so you get regular cash payments.",
      applies: "REITs add real estate to your portfolio with as little as the price of one share, plus you get regular dividend income.",
    },
    detailed: {
      what: "Real Estate Investment Trusts are companies that own, operate, or finance income-producing real estate across sectors including residential, commercial, healthcare, data centers, cell towers, and infrastructure. To qualify as a REIT, companies must distribute at least 90% of taxable income as dividends, invest at least 75% of assets in real estate, and derive 75%+ of revenue from real estate activities.",
      how: "REITs are categorized as equity REITs (own properties), mortgage REITs (finance real estate), or hybrid REITs. Key metrics include Funds From Operations (FFO), Net Asset Value (NAV), and dividend yield. REITs provide inflation hedging since rents typically rise with inflation. They have low correlation with stocks and bonds, enhancing portfolio diversification.",
      applies: "A 5-10% portfolio allocation to REITs can improve risk-adjusted returns. REIT dividends are taxed as ordinary income, so consider holding them in tax-advantaged accounts (IRA/401k). Publicly traded REIT ETFs (like VNQ) offer liquid, diversified real estate exposure without the illiquidity of direct property ownership.",
    },
    example: "You buy 20 shares of VNQ (Vanguard Real Estate ETF) at $85 each ($1,700). The fund holds over 150 REITs — shopping malls, apartments, hospitals, data centers. With a ~4% dividend yield, you'd receive about $68/year in dividends, plus potential price appreciation as property values grow.",
  },
  {
    id: "dca", title: "Dollar-Cost Averaging", icon: RefreshCw, tagline: "Invest consistently, worry less",
    simple: {
      what: "Dollar-cost averaging means investing the same amount of money on a regular schedule, no matter what the market is doing.",
      how: "Set up automatic investments — like $200 every payday. When prices are low, you buy more shares. When high, you buy fewer.",
      applies: "This removes the stress of trying to time the market. It's the simplest, most effective strategy for building wealth over time.",
    },
    detailed: {
      what: "Dollar-cost averaging (DCA) is a systematic investment strategy where a fixed dollar amount is invested at regular intervals regardless of asset price. This mechanical approach results in purchasing more shares when prices are low and fewer when prices are high, producing a cost basis that approximates the time-weighted average price.",
      how: "DCA reduces the impact of volatility on the overall purchase price. While lump-sum investing statistically outperforms DCA about 67% of the time (because markets trend upward), DCA significantly reduces regret risk and volatility drag. It's particularly valuable during bear markets when consistent buying accelerates portfolio recovery.",
      applies: "Automate your DCA by setting up recurring transfers from your bank to your brokerage on each payday. Most brokerages support fractional shares, so even $25/week works. This 'set it and forget it' approach removes emotion, builds discipline, and harnesses the power of compound growth.",
    },
    example: "You invest $500/month into an S&P 500 ETF. In January, shares cost $50, so you buy 10. In February, shares drop to $40, so you buy 12.5. In March, shares rise to $55, so you buy 9.1. Your average cost: $47.47/share — better than trying to pick the 'perfect' time to buy.",
  },
  {
    id: "retirement", title: "Retirement Accounts", icon: Wallet, tagline: "Tax-advantaged wealth building",
    simple: {
      what: "Retirement accounts like 401(k)s and IRAs let your investments grow without paying taxes every year.",
      how: "You contribute money before or after taxes. The money grows tax-free until you withdraw it in retirement.",
      applies: "If your employer matches 401(k) contributions, that's free money. Always contribute enough to get the full match.",
    },
    detailed: {
      what: "Tax-advantaged retirement accounts include employer-sponsored plans (401(k), 403(b)) and individual accounts (Traditional IRA, Roth IRA, SEP IRA). Each has distinct contribution limits, tax treatment, and withdrawal rules. Traditional accounts offer tax-deferred growth (pay taxes on withdrawal), while Roth accounts use after-tax contributions with tax-free qualified withdrawals.",
      how: "2026 contribution limits: $23,500 for 401(k) ($31,000 if 50+), $7,000 for IRA ($8,000 if 50+). Employer matches don't count toward employee limits. Required Minimum Distributions (RMDs) begin at age 73 for Traditional accounts (Roth IRAs have no RMDs). Early withdrawal (before 59½) generally incurs a 10% penalty plus income tax.",
      applies: "Priority order: 1) Contribute to 401(k) up to employer match (instant 50-100% return). 2) Max out Roth IRA for tax-free growth. 3) Return to 401(k) and max it out. 4) Consider taxable brokerage for additional savings. A Roth conversion ladder can provide tax-efficient early retirement income.",
    },
    example: "Your employer matches 50% of your 401(k) contributions up to 6% of salary. On a $60,000 salary, contributing 6% ($3,600/year) means your employer adds $1,800 — that's an instant 50% return. Over 30 years at 8% growth, that combined $5,400/year becomes over $600,000.",
  },
  {
    id: "taxes", title: "Tax-Smart Investing", icon: Percent, tagline: "Keep more of what you earn",
    simple: {
      what: "Tax-smart investing means arranging your investments to pay less in taxes. Small savings compound into big differences.",
      how: "Hold investments longer than a year for lower tax rates. Use retirement accounts. Offset gains by selling losers.",
      applies: "Taxes can be your biggest investment expense. Use tax-advantaged accounts first, and hold investments long-term.",
    },
    detailed: {
      what: "Tax-efficient investing encompasses strategies to minimize tax drag on portfolio returns. Key concepts include the preferential long-term capital gains rate (0%, 15%, or 20% vs. ordinary income rates up to 37%), qualified dividend taxation, tax-loss harvesting, asset location optimization, and the step-up in basis at death.",
      how: "Asset location strategy: hold tax-inefficient assets (bonds, REITs) in tax-advantaged accounts and tax-efficient assets (index funds, growth stocks) in taxable accounts. Tax-loss harvesting involves selling depreciated securities to realize losses that offset capital gains (up to $3,000 of ordinary income annually). The wash-sale rule prohibits repurchasing substantially identical securities within 30 days.",
      applies: "Tax-loss harvest systematically at year-end. Consider tax-gain harvesting if in the 0% capital gains bracket. Use specific lot identification for tax-efficient selling. Municipal bond interest is federally tax-exempt (and often state tax-exempt for in-state bonds). Charitable giving of appreciated securities avoids capital gains tax entirely.",
    },
    example: "You bought Stock A for $10,000 and it's now worth $15,000 (a $5,000 gain). Stock B, bought for $8,000, is now worth $5,000 (a $3,000 loss). By selling both, your net gain is only $2,000 instead of $5,000 — saving you $450+ in taxes at the 15% capital gains rate. You can then reinvest in a similar (but not identical) fund.",
  },
  {
    id: "diversification", title: "Asset Allocation", icon: Layers, tagline: "Don't put all eggs in one basket",
    simple: {
      what: "Asset allocation means spreading your money across different types of investments to reduce risk.",
      how: "Mix stocks (for growth), bonds (for stability), and other assets based on your age and goals.",
      applies: "A common rule of thumb: subtract your age from 110 to get your stock percentage. Age 30? About 80% stocks, 20% bonds.",
    },
    detailed: {
      what: "Asset allocation is the strategic distribution of portfolio investments across asset classes (equities, fixed income, real estate, commodities, cash) to optimize the risk-return tradeoff based on an investor's goals, time horizon, and risk tolerance. Modern Portfolio Theory (MPT) demonstrates that diversification across uncorrelated assets can improve risk-adjusted returns.",
      how: "Strategic asset allocation sets long-term target weights with periodic rebalancing (quarterly or when allocations drift 5%+ from targets). Tactical allocation makes short-term adjustments based on market conditions. Key factors: correlation coefficients between assets, expected returns, standard deviation, and the efficient frontier.",
      applies: "Start with a simple three-fund portfolio: U.S. total market (50-60%), international (20-30%), and bonds (10-30%). Rebalance annually by selling overweight positions and buying underweight ones. As you age, gradually shift toward bonds. Consider adding REITs (5-10%) and small-cap value exposure for additional diversification.",
    },
    example: "A 30-year-old with a 35-year horizon might use: 60% U.S. stocks (VTI), 25% international stocks (VXUS), and 15% bonds (BND). After a big stock rally, stocks might grow to 70% of the portfolio. Rebalancing means selling some stocks and buying bonds to return to target weights — systematically 'buying low and selling high.'",
  },
  {
    id: "dividends", title: "Dividends", icon: DollarSign, tagline: "Get paid to own great companies",
    simple: {
      what: "Dividends are cash payments companies send you just for owning their stock. It's like earning rent on your investments.",
      how: "Companies pay dividends quarterly. You can take the cash or reinvest it to buy more shares automatically.",
      applies: "Reinvesting dividends is one of the most powerful wealth-building strategies. It supercharges compound growth.",
    },
    detailed: {
      what: "Dividends are distributions of a company's earnings to shareholders, typically paid quarterly. Key metrics include dividend yield (annual dividend/share price), payout ratio (dividends/earnings), and dividend growth rate. Dividend Aristocrats are S&P 500 companies that have increased dividends for 25+ consecutive years.",
      how: "Ex-dividend date determines eligibility; you must own shares before this date to receive the dividend. DRIP (Dividend Reinvestment Plans) automatically reinvest dividends to purchase additional shares. Qualified dividends are taxed at the lower capital gains rate (0-20%), while ordinary dividends are taxed as regular income.",
      applies: "A dividend growth strategy combines income with appreciation. Companies that consistently raise dividends tend to be financially strong with sustainable competitive advantages. Over long periods, reinvested dividends account for roughly 40% of the S&P 500's total return. Consider holding dividend stocks in tax-advantaged accounts to defer taxation.",
    },
    example: "You own 100 shares of Johnson & Johnson at $160/share ($16,000). JNJ pays a $4.76 annual dividend per share, so you receive $476/year. With DRIP enabled, that buys ~3 more shares each year. Over 20 years with 6% dividend growth, your annual dividend income grows from $476 to over $1,500 — without adding any new money.",
  },
  {
    id: "behavioral", title: "Behavioral Finance", icon: Brain, tagline: "Master your investing psychology",
    simple: {
      what: "Behavioral finance studies why we make irrational money decisions. Our brains aren't wired for smart investing.",
      how: "Common traps include panic selling, chasing hot stocks, overconfidence, and loss aversion (fearing losses more than valuing gains).",
      applies: "Knowing your biases is half the battle. Automate your investing to remove emotion from the equation.",
    },
    detailed: {
      what: "Behavioral finance integrates psychological theory with conventional economics to explain why investors make irrational decisions. Key cognitive biases include: loss aversion (losses feel 2x more painful than equivalent gains), anchoring (over-relying on initial information), confirmation bias (seeking data that confirms beliefs), recency bias (overweighting recent events), and herd mentality (following the crowd).",
      how: "The disposition effect causes investors to sell winners too early and hold losers too long. Overconfidence bias leads to excessive trading (reducing returns by 2-4% annually). The endowment effect makes us overvalue what we already own. Mental accounting causes irrational treatment of money from different sources.",
      applies: "Combat biases with systematic strategies: 1) Automate investments via DCA to bypass emotional timing. 2) Write an Investment Policy Statement when calm to follow during panic. 3) Limit portfolio checking to quarterly reviews. 4) Use index funds to avoid individual stock selection bias. 5) Remember: the best investors are often the most patient, boring ones.",
    },
    example: "In March 2020, the market crashed 34% in weeks. Investors who panic-sold locked in massive losses. Those who stayed invested (or bought more) saw the market recover fully within 5 months and reach new all-time highs. The emotional urge to 'cut your losses' during a crash is exactly the wrong move — but it feels so right in the moment.",
  },
  {
    id: "options", title: "Options", icon: Scale, tagline: "Advanced strategies for experienced investors",
    simple: {
      what: "An option gives you the right to buy or sell a stock at a set price before a deadline. Think of it as a reservation.",
      how: "Call options = right to buy. Put options = right to sell. You pay a small premium for this right.",
      applies: "Options are complex and risky. Master the basics of stocks and ETFs first before exploring options.",
    },
    detailed: {
      what: "Options are derivative contracts granting the holder the right (but not obligation) to buy (call) or sell (put) an underlying asset at a predetermined strike price before/on the expiration date. Option pricing follows the Black-Scholes model, incorporating intrinsic value, time value, implied volatility, risk-free rate, and dividends.",
      how: "The Greeks measure option sensitivities: Delta (directional risk), Gamma (Delta acceleration), Theta (time decay), Vega (volatility sensitivity), and Rho (interest rate sensitivity). Common strategies range from basic (covered calls, protective puts) to complex (iron condors, straddles, spreads). Options provide leverage, hedging, and income generation capabilities.",
      applies: "Begin with covered calls on stocks you already own to generate income. Protective puts serve as portfolio insurance during uncertain markets. Never risk money you can't afford to lose. Options time decay (Theta) works against buyers — over 75% of options expire worthless. Paper trade options for 6+ months before using real money.",
    },
    example: "You own 100 shares of Apple at $180. You sell a covered call with a $200 strike price for $3/share ($300 premium). If Apple stays below $200, you keep the $300 and your shares. If it rises above $200, your shares are sold at $200 but you've still profited. This strategy generates income while you wait.",
  },
  {
    id: "hedge-funds", title: "Hedge Funds", icon: Shield, tagline: "Exclusive strategies for accredited investors",
    simple: {
      what: "Hedge funds are private investment clubs for wealthy investors that use complex strategies to make money in any market.",
      how: "They charge high fees (usually 2% + 20% of profits) and are only open to accredited investors with high net worth.",
      applies: "Most everyday investors don't need hedge funds. Simple index funds often outperform them with much lower fees.",
    },
    detailed: {
      what: "Hedge funds are private, pooled investment vehicles employing diverse strategies including long/short equity, global macro, event-driven, quantitative, and market-neutral approaches. They aim to generate absolute returns regardless of market direction. Access requires accredited investor status ($200K+ income or $1M+ net worth excluding primary residence).",
      how: "The typical '2 and 20' fee structure charges 2% management fee annually plus 20% performance fee on profits above a high-water mark. Strategies include: short selling to profit from declining stocks, leverage to amplify returns (and risks), and derivatives for hedging or speculation. Lock-up periods restrict withdrawals for 1-3+ years.",
      applies: "SPIVA data shows most hedge funds underperform a simple 60/40 portfolio after fees. Warren Buffett famously won a $1 million bet that an S&P 500 index fund would outperform a selection of hedge funds over 10 years. Understanding hedge funds helps appreciate why passive, low-cost investing works for the vast majority of investors.",
    },
    example: "A hedge fund charges 2% management + 20% performance fees. On a $1,000,000 investment earning 10% ($100,000 gross gain): management fee = $20,000, performance fee = $16,000 (20% of $80,000 remaining). Net return: $64,000 or 6.4%. A simple index fund earning 10% with 0.03% fees nets you ~$99,700. The fee difference: $35,700 per year.",
  },
];

const glossaryTerms = [
  { term: "Asset", definition: "Anything of value that can generate income or appreciate. In investing, assets include stocks, bonds, real estate, and cash." },
  { term: "Bear Market", definition: "A market decline of 20% or more from recent highs, typically accompanied by widespread pessimism and negative investor sentiment." },
  { term: "Bull Market", definition: "A sustained period of rising stock prices, usually 20% or more from recent lows, characterized by investor optimism." },
  { term: "Capital Gains", definition: "The profit earned from selling an investment for more than you paid. Long-term (held 1+ year) gains are taxed at lower rates." },
  { term: "Compound Interest", definition: "Earning returns on your returns. Your interest earns interest, creating exponential growth over time." },
  { term: "Diversification", definition: "Spreading investments across different asset types, sectors, and geographies to reduce overall portfolio risk." },
  { term: "Dividend", definition: "A portion of a company's earnings paid to shareholders, typically quarterly. Represents income from owning stock." },
  { term: "Expense Ratio", definition: "The annual fee charged by a fund, expressed as a percentage of assets. Lower is better — even 0.5% difference compounds significantly." },
  { term: "Index", definition: "A benchmark measuring the performance of a group of stocks. The S&P 500 tracks 500 large U.S. companies." },
  { term: "Inflation", definition: "The rate at which prices increase over time, reducing purchasing power. Historically averages about 3% per year in the U.S." },
  { term: "Liquidity", definition: "How easily an investment can be converted to cash without significant loss in value. Stocks are liquid; real estate is not." },
  { term: "Market Capitalization", definition: "The total value of a company's outstanding shares. Calculated as share price × number of shares." },
  { term: "P/E Ratio", definition: "Price-to-Earnings ratio. Compares stock price to earnings per share. Helps assess if a stock is over or undervalued." },
  { term: "Portfolio", definition: "Your complete collection of investments — stocks, bonds, funds, real estate, etc." },
  { term: "Rebalancing", definition: "Periodically adjusting your portfolio back to target allocations by selling overweight and buying underweight positions." },
  { term: "Risk Tolerance", definition: "Your ability and willingness to endure investment losses. Depends on time horizon, financial situation, and personality." },
  { term: "Volatility", definition: "The degree to which an investment's price fluctuates. Higher volatility means bigger swings — both up and down." },
  { term: "Yield", definition: "The income return on an investment, expressed as a percentage. For stocks, it's the dividend yield; for bonds, it's the coupon rate." },
];

const learningPaths = [
  { id: "beginner", title: "Complete Beginner", icon: GraduationCap, desc: "Start from zero and build a solid foundation", topics: ["stocks", "etfs", "index-funds", "dca", "diversification"] },
  { id: "retirement", title: "Retirement Planning", icon: Target, desc: "Understand 401(k)s, IRAs, and building your nest egg", topics: ["retirement", "index-funds", "taxes", "diversification", "dividends"] },
  { id: "tax-smart", title: "Tax-Efficient Investing", icon: Percent, desc: "Keep more of your returns with smart tax strategies", topics: ["taxes", "retirement", "mutual-funds", "etfs", "dividends"] },
  { id: "advanced", title: "Advanced Concepts", icon: Compass, desc: "Explore options, hedge funds, and behavioral finance", topics: ["options", "hedge-funds", "behavioral", "bonds", "reits"] },
];

type ViewMode = "topics" | "glossary" | "paths" | "risk" | "detail";

const riskQuestions = [
  { q: "If your portfolio dropped 20% in one month, you would:", opts: [{ l: "Sell everything immediately", s: 1 }, { l: "Sell some to reduce risk", s: 2 }, { l: "Do nothing and wait", s: 3 }, { l: "Buy more at lower prices", s: 4 }] },
  { q: "Your investment time horizon is:", opts: [{ l: "Less than 2 years", s: 1 }, { l: "2-5 years", s: 2 }, { l: "5-15 years", s: 3 }, { l: "15+ years", s: 4 }] },
  { q: "Which statement best describes you?", opts: [{ l: "I can't afford any losses", s: 1 }, { l: "I prefer stability over growth", s: 2 }, { l: "I want balanced growth and safety", s: 3 }, { l: "I want maximum growth, accepting volatility", s: 4 }] },
  { q: "How much investing experience do you have?", opts: [{ l: "None at all", s: 1 }, { l: "A little — I have a 401(k)", s: 2 }, { l: "Moderate — I actively invest", s: 3 }, { l: "Extensive — I trade regularly", s: 4 }] },
  { q: "How would you feel if an investment lost 10% in a week?", opts: [{ l: "Extremely anxious", s: 1 }, { l: "Uncomfortable but manageable", s: 2 }, { l: "Unbothered — normal market behavior", s: 3 }, { l: "Excited — buying opportunity", s: 4 }] },
];

const riskProfiles = [
  { min: 5, max: 8, label: "Conservative", color: "text-primary", desc: "You prefer safety and stability. Focus on bonds, high-yield savings, and conservative index funds.", allocation: "20% Stocks, 50% Bonds, 30% Cash/Savings" },
  { min: 9, max: 13, label: "Moderate-Conservative", color: "text-primary", desc: "You want some growth but value stability. A balanced approach suits you best.", allocation: "40% Stocks, 40% Bonds, 20% Cash/REITs" },
  { min: 14, max: 16, label: "Moderate", color: "text-accent", desc: "You're comfortable with some ups and downs in exchange for better long-term returns.", allocation: "60% Stocks, 30% Bonds, 10% REITs/Other" },
  { min: 17, max: 18, label: "Moderate-Aggressive", color: "text-accent", desc: "You have a long time horizon and can handle significant volatility for higher growth potential.", allocation: "75% Stocks, 15% Bonds, 10% REITs/International" },
  { min: 19, max: 20, label: "Aggressive", color: "text-destructive", desc: "You're focused on maximum growth and can stomach large short-term losses. Time is on your side.", allocation: "90% Stocks, 5% Bonds, 5% Alternative Investments" },
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

  const filteredGlossary = glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      t.definition.toLowerCase().includes(glossarySearch.toLowerCase())
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

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {view === "detail" && selectedTopic ? (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <button onClick={backToMain} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to Topics
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <selectedTopic.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">{selectedTopic.title}</h1>
                  <p className="text-muted-foreground">{selectedTopic.tagline}</p>
                </div>
              </div>

              {/* Reading Level Toggle */}
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => setReadingLevel(readingLevel === "simple" ? "detailed" : "simple")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
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
                {/* Real-world example */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="rounded-xl bg-accent/10 border border-accent/20 p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-accent" />
                    <h3 className="font-serif font-bold text-lg text-foreground">Real-World Example</h3>
                  </div>
                  <p className="text-foreground leading-relaxed">{selectedTopic.example}</p>
                </motion.div>

                {/* Link to quiz */}
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
                <input
                  type="text" placeholder="Search terms..." value={glossarySearch} onChange={(e) => setGlossarySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-3">
                {filteredGlossary.map((t) => (
                  <div key={t.term} className="rounded-xl bg-card border border-border p-5 shadow-card">
                    <h4 className="font-serif font-bold text-foreground mb-1">{t.term}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.definition}</p>
                  </div>
                ))}
                {filteredGlossary.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No terms found matching "{glossarySearch}". Try a different search.</p>
                )}
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
                      return (
                        <button key={tid} onClick={() => openTopic(t)}
                          className="w-full text-left flex items-center gap-4 rounded-xl bg-card border border-border p-5 shadow-card hover:shadow-soft transition-all">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold text-primary">{i + 1}</span>
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
                  <p className="text-muted-foreground mb-8">Guided journeys tailored to your goals. Pick a path and follow the steps.</p>
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
              <p className="text-muted-foreground mb-8">Discover your risk profile to find investments that match your comfort level.</p>

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
                    className="w-full py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors">
                    Retake Assessment
                  </button>
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
                          if (riskStep + 1 >= riskQuestions.length) {
                            setRiskComplete(true);
                          } else {
                            setRiskStep(riskStep + 1);
                          }
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
                {topics.map((topic, i) => (
                  <motion.button key={topic.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    onClick={() => openTopic(topic)}
                    className="text-left rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <topic.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-foreground mb-1">{topic.title}</h3>
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
