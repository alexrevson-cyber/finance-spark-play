export interface MindsetArticle {
  id: string;
  title: string;
  content: string[];
}

export const mindsetArticles: MindsetArticle[] = [
  {
    id: "long-term-thinking", title: "How to Think Long-Term in a Short-Term World",
    content: [
      "We live in an era of instant gratification — same-day delivery, real-time stock quotes, 24/7 financial news. Yet the greatest wealth-building tool available to any investor is time. Warren Buffett made 99% of his wealth after age 50. The S&P 500 has never lost money over any 20-year rolling period. Long-term thinking isn't just a strategy — it's the strategy.",
      "The key to thinking long-term is reframing how you measure success. Instead of checking your portfolio daily (or hourly), measure your progress in years and decades. Set a quarterly review cadence: once every three months, review your portfolio, rebalance if needed, and otherwise leave it alone. The urge to 'do something' is your biggest enemy.",
      "Practical steps: Remove stock tickers from your phone's home screen. Unsubscribe from daily market newsletters. Set calendar reminders for quarterly reviews. When you feel the urge to trade, write down what you want to do and why — then wait 48 hours. Most impulsive decisions look foolish with two days of distance.",
      "Long-term thinking also means accepting that short-term losses are normal and expected. The S&P 500 experiences a 10%+ correction roughly every 18 months and a 20%+ bear market every 3-5 years. These are features of the system, not bugs. If you can't stomach a 30% paper loss, you need less stock exposure — not more trading."
    ]
  },
  {
    id: "consistent-investing", title: "Building the Habit of Consistent Investing",
    content: [
      "Consistency beats intensity in investing, just as in fitness. Investing $500 every month for 30 years at 8% annual returns produces over $745,000 — regardless of whether markets are up or down along the way. The habit of regular investing is more valuable than any stock pick or market timing strategy.",
      "The most powerful tool for consistent investing is automation. Set up automatic transfers from your paycheck or checking account to your investment account on the same day every month (ideally, payday). When investing is automatic, you remove willpower from the equation — and willpower is an unreliable resource.",
      "Start with whatever amount you can afford, even if it's $25 per month. The dollar amount matters less than the habit. Once the habit is established, gradually increase the amount as your income grows. A 'savings escalator' — increasing your investment by 1% of income each year — can dramatically accelerate wealth building without lifestyle pain.",
      "Track your streak. How many consecutive months have you invested? The gamification of streaks (just like daily quiz streaks on this platform) creates positive psychological reinforcement. Never miss twice — if you skip a month for any reason, make it your top priority to invest the following month."
    ]
  },
  {
    id: "market-crash-calm", title: "How to Stay Calm During a Market Crash",
    content: [
      "Market crashes are inevitable. They're also the most important test of your investing temperament. The investors who stay calm — or even buy more — during crashes tend to dramatically outperform those who panic sell. Your behavior during the worst 5% of market days determines a disproportionate share of your long-term returns.",
      "Step one: expect crashes. If you're surprised when the market drops 30%, you haven't studied history. The S&P 500 has dropped 20%+ twelve times since 1950 and recovered to new highs every single time. Knowing this in advance doesn't eliminate fear, but it provides a rational anchor when emotions run high.",
      "Step two: have a plan written before the crash happens. Write an 'Investment Policy Statement' that includes: your asset allocation, your rebalancing rules, and explicit instructions for what you'll do during a crash ('I will not sell. I will continue my automatic investments. If the market drops 30%+, I will deploy my extra cash reserves.').",
      "Step three: limit your information intake during crashes. Turn off financial news. Stop checking your portfolio daily. The media profits from your attention, and fear drives attention. Instead of watching CNBC, review the long-term chart of the S&P 500 and remind yourself that every previous crash on that chart is now just a small dip on the road to higher highs."
    ]
  },
  {
    id: "speculation-vs-investing", title: "The Difference Between Speculation and Investing",
    content: [
      "Benjamin Graham defined investing as 'an operation which, upon thorough analysis, promises safety of principal and an adequate return.' Everything else is speculation. Understanding the difference is crucial because speculation masquerades as investing constantly — especially during bull markets.",
      "Investing is buying an ownership stake in a productive asset (stocks, real estate, a business) that generates income or grows in value based on fundamental economic activity. Speculation is buying something primarily because you believe someone else will pay more for it later (the 'greater fool' theory).",
      "The distinction matters because investing has a positive expected return over time — businesses create value, economies grow, earnings increase. Speculation is zero-sum: for every winner, there's a loser. Day trading, meme stocks, most cryptocurrency trading, and options gambling are forms of speculation, not investing.",
      "This doesn't mean speculation is always wrong — just that you should be honest about what you're doing. Allocate 90%+ of your portfolio to genuine investing (index funds, quality stocks, real estate) and limit speculation to money you can afford to lose entirely. The two require different mindsets, strategies, and expectations."
    ]
  },
  {
    id: "managing-risk", title: "How Successful Investors Manage Risk",
    content: [
      "Risk management is the most underappreciated skill in investing. Beginners focus on returns; experts focus on risk. As Howard Marks says, 'The road to long-term investment success runs through risk control more than through aggressiveness.' The best investors aren't those who make the most money in bull markets — they're those who lose the least in bear markets.",
      "Diversification is the first and most important risk management tool. Own multiple asset classes (stocks, bonds, real estate), multiple sectors, multiple geographies, and multiple time horizons. True diversification means some part of your portfolio should always be underperforming — if everything is going up together, you're not actually diversified.",
      "Position sizing is the second critical tool. Never put so much into a single investment that if it goes to zero, your financial life is ruined. A simple rule: no single stock should be more than 5% of your portfolio. Index funds inherently solve this by spreading risk across hundreds or thousands of companies.",
      "The third tool is having a cash reserve. Keeping 6-12 months of living expenses in a savings account means you'll never be forced to sell investments at the wrong time. Forced selling — needing to liquidate during a downturn because you need the cash — is the number one destroyer of long-term returns."
    ]
  },
  {
    id: "goal-setting-fi", title: "Goal Setting for Financial Independence",
    content: [
      "Financial independence — the point where your investment income covers your living expenses — is a concrete, achievable goal. But it requires specific planning, not vague aspiration. The first step is calculating your 'FI number': your annual expenses multiplied by 25 (based on the 4% safe withdrawal rate).",
      "If you spend $50,000/year, your FI number is $1.25 million. If you spend $30,000/year, it's $750,000. This immediately reveals the two levers you control: increasing income and decreasing expenses. Most people focus exclusively on income, but reducing expenses is often faster and has a double benefit — it directly lowers your FI number.",
      "Break your FI number into milestones: first $10k (proof of concept), $50k (momentum), $100k (the hardest milestone — after this, your money starts generating meaningful returns), $250k, $500k, and finally your full FI number. Celebrate each milestone. The journey is long, and acknowledging progress sustains motivation.",
      "Set a savings rate target, not just a dollar amount. A 20% savings rate means roughly 37 years to FI. A 50% rate: about 17 years. A 65% rate: about 10 years. The math is clear — savings rate, more than investment returns, determines how fast you reach financial independence. Track your savings rate monthly."
    ]
  },
  {
    id: "filter-financial-news", title: "How to Filter Financial News and Avoid Noise",
    content: [
      "The financial media industry generates billions of dollars by capturing your attention with dramatic headlines. Unfortunately, consuming financial news makes most investors worse, not better. Studies show that investors who check their portfolios frequently underperform those who check infrequently, primarily because exposure to noise triggers emotional reactions.",
      "Not all financial information is noise. Signal includes: changes in your company's fundamental business (revenue, earnings, competitive position), significant macroeconomic shifts (recessions, inflation spikes), and changes in your personal financial situation (job loss, inheritance, marriage). Everything else — daily market movements, analyst predictions, CEO tweets — is noise.",
      "Create a personal information diet: (1) Check your portfolio quarterly, not daily. (2) Read one high-quality annual market summary instead of hundreds of daily articles. (3) Follow 3-5 trusted long-term thinkers instead of dozens of daily commentators. (4) Unsubscribe from financial newsletters that make you want to trade.",
      "The most successful investors read broadly but act rarely. Warren Buffett reads 500+ pages per day but makes perhaps 2-3 significant investment decisions per year. The reading builds understanding; the inaction preserves returns. Read to learn, not to react."
    ]
  },
  {
    id: "patience-wealth", title: "The Power of Patience in Wealth Building",
    content: [
      "Patience is the most undervalued currency in investing. Charlie Munger said, 'The big money is not in the buying or selling, but in the waiting.' This isn't a platitude — it's mathematical truth. At 8% annual returns, your money doubles roughly every 9 years. Most of the magic happens in the final doubling periods, which means the last 10 years of a 30-year investment horizon generate more wealth than the first 20.",
      "Consider this: $10,000 invested at 8% grows to $21,589 after 10 years, $46,610 after 20 years, and $100,627 after 30 years. The gain from year 20 to 30 ($54,017) is more than double the gain from year 1 to 20 ($36,610). Patience doesn't just help — it's the mechanism through which wealth is actually created.",
      "The enemy of patience is action bias — the feeling that you should always be 'doing something' with your investments. In most fields, effort correlates with results. In investing, the opposite is often true. The more you trade, the worse your returns (on average). The urge to 'do something' during market volatility is your portfolio's greatest threat.",
      "How to cultivate patience: Zoom out on your investment charts — look at 10-year and 30-year performance, not daily. Set a rule: no trades for 30 days after a major market move. Read about investors who built wealth slowly (Buffett, Bogle, Lynch). Remind yourself that the goal isn't excitement — it's freedom."
    ]
  },
  {
    id: "personal-philosophy", title: "How to Develop a Personal Investment Philosophy",
    content: [
      "Every successful investor has a personal investment philosophy — a coherent set of beliefs about how markets work, what drives returns, and how to manage risk. Your philosophy guides every decision and keeps you consistent when emotions run high. Without one, you'll chase every new strategy and sell at every dip.",
      "Start by answering these core questions: Do I believe markets are efficient (index investing) or inefficient (active stock picking)? Am I a growth investor (betting on future earnings) or value investor (buying below intrinsic value)? What's my time horizon (5 years, 20 years, 40+ years)? How much volatility can I actually stomach? What's my circle of competence?",
      "Your philosophy should fit your personality, time availability, and knowledge level. If you don't enjoy researching companies, a total market index fund philosophy (à la John Bogle) is perfect. If you love business analysis, a quality-focused approach (Buffett/Munger) might suit you. If you're drawn to macro trends, a diversified multi-asset approach (Ray Dalio) could work.",
      "Write your philosophy down in one page or less. Include: what you invest in, why you believe it works, what you won't do, and how you'll handle market crashes. Review it annually and update it as you learn. A written philosophy is an anchor — it keeps you grounded when markets are chaotic and media is screaming."
    ]
  },
  {
    id: "learning-from-mistakes", title: "Learning From Your Investing Mistakes",
    content: [
      "Every investor makes mistakes. Warren Buffett has lost billions on bad investments. Ray Dalio was so wrong about the 1982 economy that he had to lay off his entire staff. The difference between good investors and bad investors isn't mistake avoidance — it's mistake response. Good investors encode lessons; bad investors repeat errors.",
      "Keep an investment journal. For every buy and sell decision, write: what you bought, why (your thesis), what would make you sell, and what you expect to happen. After 6-12 months, review: was your thesis correct? Did you follow your rules? What did you miss? This creates a feedback loop that accelerates learning.",
      "Common investing mistakes to learn from: (1) Buying based on tips without research. (2) Letting emotions drive timing decisions. (3) Not diversifying enough. (4) Paying too much in fees. (5) Selling during panics. (6) Confusing speculation with investing. Identify which of these you're prone to and build specific safeguards.",
      "The most expensive lesson most investors learn is the importance of humility. The market is bigger, faster, and more complex than any individual. Acknowledging what you don't know is strength, not weakness. As Socrates said, 'The wisest man is he who knows he knows nothing.' In investing, this translates to: diversify broadly, keep costs low, and stay humble."
    ]
  },
];
