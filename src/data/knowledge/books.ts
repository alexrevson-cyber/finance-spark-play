export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: string;
  difficulty: "Easy Read" | "Moderate" | "Dense";
  quote: string;
  summary: string[];
  takeaways: string[];
  application: string[];
  relatedBooks: string[];
}

export const books: Book[] = [
  {
    id: "rich-dad", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", year: 1997, category: "Mindset", difficulty: "Easy Read",
    quote: "The rich don't work for money. They make money work for them.",
    summary: [
      "Kiyosaki contrasts two father figures: his biological father ('poor dad'), a highly educated government employee who lived paycheck to paycheck, and his best friend's father ('rich dad'), a self-made entrepreneur who built lasting wealth through business and investing.",
      "The book challenges conventional wisdom about money — go to school, get a good job, save. Instead, it argues that financial literacy, not income, determines wealth. The rich buy assets that generate income; the poor and middle class accumulate liabilities they mistake for assets.",
      "Central to the book is the concept of the 'rat race' — working harder to earn more, only to spend more and owe more in taxes. Kiyosaki advocates breaking this cycle by building passive income streams through real estate, business ownership, and investing.",
      "While the book has been criticized for lacking specific investment advice, its greatest contribution is shifting the reader's mindset from 'I can't afford it' to 'How can I afford it?' — a fundamental reframe that has inspired millions."
    ],
    takeaways: [
      "Assets put money in your pocket; liabilities take it out. Your house is not an asset if it only costs you money.",
      "Financial literacy — understanding cash flow, taxes, and investing — is more important than a high salary.",
      "The rich focus on building and acquiring assets (businesses, real estate, stocks) rather than working for a paycheck.",
      "Fear and ignorance about money keep most people trapped in the rat race. Education is the antidote.",
      "Mind your own business: even while employed, build your asset column on the side."
    ],
    application: [
      "Track everything you own and owe. Classify each as an asset (generates income) or liability (costs you money). Commit to growing your asset column.",
      "Start small: invest even $50/month into an index fund or dividend stock. The habit matters more than the amount at first.",
      "Replace 'I can't afford it' with 'How can I afford it?' This simple question activates creative problem-solving about money."
    ],
    relatedBooks: ["millionaire-next-door", "think-grow-rich"]
  },
  {
    id: "intelligent-investor", title: "The Intelligent Investor", author: "Benjamin Graham", year: 1949, category: "Value Investing", difficulty: "Dense",
    quote: "The investor's chief problem — and even his worst enemy — is likely to be himself.",
    summary: [
      "Widely considered the greatest investment book ever written, The Intelligent Investor introduces the concept of 'value investing' — buying stocks that trade below their intrinsic worth and holding them with discipline and patience.",
      "Graham introduces 'Mr. Market,' an allegorical figure who shows up daily offering to buy or sell stocks at different prices. Sometimes Mr. Market is euphoric (overpricing stocks), sometimes depressed (underpricing them). The intelligent investor takes advantage of Mr. Market's mood swings rather than being influenced by them.",
      "The book distinguishes between 'defensive' investors (who want safety and minimal effort) and 'enterprising' investors (who are willing to put in research time). For most people, Graham recommends a diversified portfolio of high-quality stocks and bonds, purchased at reasonable prices.",
      "The concept of 'margin of safety' — buying investments at a significant discount to their calculated value — remains the cornerstone of value investing and has influenced every great investor from Warren Buffett to Seth Klarman."
    ],
    takeaways: [
      "Mr. Market is emotional and irrational. Use his mood swings to buy low and sell high, never let him dictate your decisions.",
      "Always invest with a 'margin of safety' — buy well below intrinsic value to protect against errors in analysis.",
      "Distinguish between investing (thorough analysis promising safety of principal and adequate return) and speculation (everything else).",
      "Defensive investors should hold a diversified portfolio of quality bonds and blue-chip stocks, rebalanced periodically.",
      "Your temperament — patience, discipline, emotional control — matters far more than your IQ in investing."
    ],
    application: [
      "Before buying any stock, estimate its intrinsic value. Only buy if the market price offers a meaningful discount (margin of safety).",
      "Build a simple portfolio: split between a total stock market index fund and a bond fund, adjusted for your age and risk tolerance.",
      "When markets crash and fear is everywhere, that's when Graham says the best opportunities exist. Have cash ready to deploy."
    ],
    relatedBooks: ["little-book", "common-stocks"]
  },
  {
    id: "psychology-of-money", title: "The Psychology of Money", author: "Morgan Housel", year: 2020, category: "Behavioral Finance", difficulty: "Easy Read",
    quote: "Wealth is what you don't see. It's the cars not purchased, the diamonds not bought, the renovations postponed.",
    summary: [
      "Morgan Housel argues that doing well with money has little to do with how smart you are and everything to do with how you behave. Financial success is a soft skill — where how you act matters more than what you know.",
      "Through 19 short stories, Housel explores the strange ways people think about money. He explains why a janitor can outperform a Harvard MBA at building wealth, why lottery winners go broke, and why saving money has more to do with psychology than math.",
      "A central theme is that everyone's relationship with money is shaped by their unique experiences. Someone who grew up during inflation thinks differently from someone who grew up during a boom. Neither is wrong — they just see the world differently.",
      "The book's most powerful idea is that true wealth is invisible. It's the money not spent. Getting rich requires optimism and risk-taking; staying rich requires humility, frugality, and a healthy dose of paranoia about what could go wrong."
    ],
    takeaways: [
      "No one is crazy about money — everyone makes decisions based on their unique experiences and worldview.",
      "Wealth is what you don't see: unspent money that compounds silently in your investment accounts.",
      "Getting wealthy requires optimism and taking calculated risks. Staying wealthy requires pessimism, humility, and saving.",
      "The most powerful financial force is compound growth, but it requires patience and not interrupting the process.",
      "Define 'enough' for yourself. The inability to say 'enough' has ruined more fortunes than bad investments."
    ],
    application: [
      "Define what 'enough' means for you — your target lifestyle, savings rate, and retirement number. Write it down and revisit yearly.",
      "Automate your investments and resist the urge to check them constantly. Let compound growth work uninterrupted.",
      "Save for the unexpected. Housel calls this 'saving for a reason you can't predict' — it buys you flexibility and freedom."
    ],
    relatedBooks: ["atomic-habits", "rich-dad"]
  },
  {
    id: "random-walk", title: "A Random Walk Down Wall Street", author: "Burton Malkiel", year: 1973, category: "Market Theory", difficulty: "Moderate",
    quote: "A blindfolded monkey throwing darts at a newspaper's financial pages could select a portfolio that would do just as well as one carefully selected by experts.",
    summary: [
      "Malkiel's landmark book argues that stock prices are essentially unpredictable in the short term — they follow a 'random walk.' Technical analysis (reading charts) and fundamental analysis (studying financials) both fail to consistently beat a simple index fund.",
      "The book surveys the history of market bubbles — from the Dutch tulip mania to the dot-com crash — showing that speculative excess follows predictable psychological patterns, but timing these events is nearly impossible.",
      "Malkiel presents overwhelming evidence that most professional money managers underperform the market after accounting for their fees. The few who do outperform can rarely repeat it consistently, suggesting luck plays a larger role than skill.",
      "His prescription is simple: invest in low-cost index funds, diversify across asset classes and geographies, rebalance periodically, and let compound growth do the heavy lifting. This remains the foundation of modern passive investing."
    ],
    takeaways: [
      "Stock prices in the short run are essentially random — past price movements don't predict future ones.",
      "Most active fund managers underperform their benchmark index over time, especially after fees.",
      "Diversification across asset classes, sectors, and countries is essential to managing risk.",
      "Time in the market beats timing the market — missing just the 10 best days in a decade can halve your returns.",
      "Low-cost index funds are the most reliable vehicle for building long-term wealth."
    ],
    application: [
      "Move the core of your portfolio (80%+) into low-cost total market index funds and stop trying to pick individual winners.",
      "Add international exposure (20-30% of stock allocation) to reduce country-specific risk.",
      "Rebalance your portfolio once or twice a year to maintain your target allocation — sell what's grown too large, buy what's shrunk."
    ],
    relatedBooks: ["little-book", "simple-path"]
  },
  {
    id: "think-grow-rich", title: "Think and Grow Rich", author: "Napoleon Hill", year: 1937, category: "Mindset", difficulty: "Easy Read",
    quote: "Whatever the mind can conceive and believe, it can achieve.",
    summary: [
      "Based on 20 years of research and interviews with over 500 of the most successful people of his era — including Andrew Carnegie, Henry Ford, and Thomas Edison — Napoleon Hill distills the common principles behind extraordinary achievement.",
      "The book's central thesis is that wealth begins with a definite purpose, a burning desire, and unwavering faith. Hill outlines 13 principles of success, from desire and faith to organized planning and persistence.",
      "While some concepts feel dated (Hill wrote in the 1930s), the core ideas remain powerful: clearly define what you want, create a specific plan, take immediate action, and persist through inevitable setbacks. The 'mastermind' concept — surrounding yourself with ambitious, supportive people — has been validated by modern psychology.",
      "Critics note the book oversimplifies wealth creation and leans heavily on positive thinking. However, as a framework for developing the mental discipline required for financial success, it has stood the test of nearly a century."
    ],
    takeaways: [
      "A burning desire backed by a concrete plan is the starting point of all achievement — vague wishes produce vague results.",
      "Your dominant thoughts shape your reality. Cultivate a wealth-building mindset through daily affirmation and visualization.",
      "Mastermind groups — alliances with like-minded, ambitious people — accelerate success exponentially.",
      "Persistence through temporary defeat separates those who succeed from those who don't.",
      "Every adversity carries within it the seed of an equal or greater benefit — but only if you look for it."
    ],
    application: [
      "Write a specific financial goal with a concrete deadline and the exact plan to achieve it. Read it aloud every morning and evening.",
      "Form or join a mastermind group of 3-5 people with similar financial ambitions. Meet regularly to share ideas and hold each other accountable.",
      "When you face a financial setback, write down three potential opportunities hidden within it before reacting emotionally."
    ],
    relatedBooks: ["atomic-habits", "rich-dad"]
  },
  {
    id: "atomic-habits", title: "Atomic Habits", author: "James Clear", year: 2018, category: "Habits & Productivity", difficulty: "Easy Read",
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    summary: [
      "James Clear's framework for building good habits and breaking bad ones has become the definitive guide to behavioral change. The core idea: tiny improvements — just 1% better each day — compound into remarkable results over time.",
      "The book introduces the Four Laws of Behavior Change: make it obvious, make it attractive, make it easy, and make it satisfying. These laws apply powerfully to financial habits like saving, investing, and budgeting.",
      "Clear argues that outcomes are a lagging measure of habits. Your net worth is a lagging measure of your financial habits. If you want better results, focus on your systems — the daily routines and decisions that compound over years.",
      "Perhaps the most powerful concept is identity-based habits: instead of 'I want to save more money,' adopt the identity 'I am a disciplined investor.' When your habits align with your identity, they become effortless and sustainable."
    ],
    takeaways: [
      "1% improvements compound massively — focus on systems and daily habits, not just ambitious goals.",
      "Make good financial habits obvious (auto-invest), attractive (track net worth growth), easy (one-click investing), and satisfying (celebrate milestones).",
      "Identity-based habits stick: adopt 'I am an investor' rather than 'I want to invest more.'",
      "Environment design matters more than willpower — remove friction from good habits and add friction to bad ones.",
      "Never miss twice: if you skip a day of investing or tracking, get back on track immediately."
    ],
    application: [
      "Set up automatic transfers on payday: checking → savings → investment account. Make good financial behavior the default.",
      "Create a visual tracker for your investing streak or savings rate. The satisfaction of maintaining a streak reinforces the habit.",
      "Design your environment: unsubscribe from shopping emails, delete shopping apps, and add investing app shortcuts to your home screen."
    ],
    relatedBooks: ["psychology-of-money", "think-grow-rich"]
  },
  {
    id: "little-book", title: "The Little Book of Common Sense Investing", author: "John Bogle", year: 2007, category: "Index Investing", difficulty: "Moderate",
    quote: "Don't look for the needle in the haystack. Just buy the haystack!",
    summary: [
      "John Bogle, founder of Vanguard and creator of the first index fund, makes the definitive case for low-cost passive investing. His argument is devastatingly simple: after costs, the average investor must underperform the market.",
      "The book demonstrates with decades of data that actively managed mutual funds consistently fail to beat their benchmark indices after accounting for management fees, trading costs, and taxes. Of funds that do outperform in one period, the vast majority fail to repeat that performance.",
      "Bogle's solution is elegant: own the entire stock market through a low-cost total market index fund. You'll capture the market's return (historically ~10% annually) minus minimal costs (~0.03% per year), beating the vast majority of professional money managers.",
      "The book also addresses bond investing, international diversification, and retirement planning, always returning to the same principle: simplicity, low costs, and staying the course through market ups and downs."
    ],
    takeaways: [
      "After fees and costs, the average actively managed fund must underperform the market — this is mathematical certainty.",
      "Low-cost index funds capture the entire market's return at virtually zero cost, beating most active managers over time.",
      "Don't look for the needle — buy the haystack. Own the whole market instead of trying to pick winners.",
      "Costs compound just like returns: a 1% higher fee can cost you 25-30% of your ending wealth over 30 years.",
      "Stay the course: the biggest enemy of index investing is the investor who panics and sells during downturns."
    ],
    application: [
      "Move your retirement savings into a total stock market index fund (like VTI or VTSAX) and a total bond market fund (like BND).",
      "Check the expense ratio of every fund you own. If it's above 0.20%, look for a cheaper alternative.",
      "Ignore market predictions and financial news. Set your allocation, automate contributions, and rebalance once a year."
    ],
    relatedBooks: ["random-walk", "simple-path"]
  },
  {
    id: "one-up", title: "One Up On Wall Street", author: "Peter Lynch", year: 1989, category: "Stock Picking", difficulty: "Moderate",
    quote: "Know what you own, and know why you own it.",
    summary: [
      "Peter Lynch managed Fidelity's Magellan Fund from 1977 to 1990, achieving an average annual return of 29.2% — making it the best-performing mutual fund in the world. In this book, he shares his approach for everyday investors.",
      "Lynch's core thesis is that individual investors have advantages over Wall Street professionals. You encounter potential investments in your daily life — the stores you shop at, the products you love, the trends you notice at work — often before analysts discover them.",
      "He categorizes stocks into six types: slow growers, stalwarts, fast growers, cyclicals, turnarounds, and asset plays. Each requires a different buying and selling strategy. Understanding which type you own prevents mismatched expectations.",
      "The book emphasizes doing your homework: understanding the company's story, checking its financials (P/E ratio, debt levels, cash flow), and having a clear reason for owning each stock. Lynch's folksy, accessible style makes complex concepts approachable."
    ],
    takeaways: [
      "Invest in what you know and understand — your everyday experience as a consumer gives you an edge over Wall Street.",
      "Always do your homework: understand the company's financials, growth story, and competitive position before investing.",
      "Categorize your stocks (slow grower, stalwart, fast grower, cyclical, turnaround, asset play) and set appropriate expectations.",
      "The best stock to buy may be one you already own — if the story hasn't changed, consider adding to winners.",
      "Avoid 'deworsification' — buying too many stocks dilutes your best ideas. Quality over quantity."
    ],
    application: [
      "Keep a notebook of companies you encounter as a consumer. If you love a product or see a store always packed, research the company.",
      "For every stock you own, write down in one paragraph why you own it. If you can't explain it simply, you don't understand it well enough.",
      "Check three things before buying: P/E ratio relative to growth rate, debt-to-equity ratio, and free cash flow trend."
    ],
    relatedBooks: ["intelligent-investor", "common-stocks"]
  },
  {
    id: "principles", title: "Principles", author: "Ray Dalio", year: 2017, category: "Strategy & Life", difficulty: "Moderate",
    quote: "Pain plus reflection equals progress.",
    summary: [
      "Ray Dalio built Bridgewater Associates into the world's largest hedge fund by following a unique set of principles rooted in radical transparency, systematic thinking, and learning from mistakes. This book shares those principles for both life and work.",
      "Dalio's investing framework centers on understanding how the 'economic machine' works — the interplay of credit, debt, productivity, and policy cycles. He argues that most economic events are variations of patterns that have occurred before.",
      "The book advocates for creating decision-making systems that remove emotion and bias. Rather than relying on gut feelings, Dalio builds algorithms and checklists that encode past lessons into repeatable processes.",
      "His concept of 'radical transparency' — welcoming criticism, recording mistakes, and openly debating ideas regardless of hierarchy — is controversial but has produced extraordinary results. The underlying principle: the best ideas should win, regardless of who they come from."
    ],
    takeaways: [
      "Pain + Reflection = Progress. Every mistake is a learning opportunity if you analyze what went wrong honestly.",
      "Create systematic decision-making rules rather than relying on emotions or gut feelings, especially in investing.",
      "Embrace radical transparency and open-mindedness — seek out people who disagree with you and understand why.",
      "The 'Holy Grail of Investing': find 15-20 uncorrelated return streams to dramatically reduce risk without sacrificing returns.",
      "Understand the economic machine: long-term debt cycles, short-term debt cycles, and productivity growth drive everything."
    ],
    application: [
      "After every investment decision (good or bad), write down what you expected, what happened, and what you'd do differently. Build your own principle set.",
      "Diversify across truly uncorrelated assets: stocks, bonds, gold, real estate, international markets. Don't just own 50 different stocks.",
      "Before making a major financial decision, find someone who disagrees with your view and genuinely try to understand their reasoning."
    ],
    relatedBooks: ["intelligent-investor", "psychology-of-money"]
  },
  {
    id: "millionaire-next-door", title: "The Millionaire Next Door", author: "Thomas Stanley & William Danko", year: 1996, category: "Wealth Building", difficulty: "Easy Read",
    quote: "Wealth is more often the result of a lifestyle of hard work, perseverance, planning, and most of all, self-discipline.",
    summary: [
      "Thomas Stanley spent 20 years studying millionaires and discovered something surprising: most don't drive luxury cars, wear designer clothes, or live in the fanciest neighborhoods. The typical millionaire is frugal, disciplined, and lives well below their means.",
      "The book introduces the concepts of UAWs (Under Accumulators of Wealth) and PAWs (Prodigious Accumulators of Wealth). High income doesn't equal high wealth — many doctors and lawyers earn $300k+ but have little savings because they spend to match their social status.",
      "Stanley found that most millionaires are self-employed or own small businesses, spend significant time planning their finances, and allocate money efficiently. They choose financial independence over social status displays.",
      "A particularly striking finding: 'economic outpatient care' — giving large financial gifts to adult children — often hinders the recipients' ability to build wealth independently, creating dependence rather than capability."
    ],
    takeaways: [
      "Most millionaires live below their means — they drive used cars, live in modest homes, and avoid conspicuous consumption.",
      "Looking wealthy and being wealthy are very different things. True wealth is hidden in investment accounts, not displayed on driveways.",
      "Time spent planning your finances correlates strongly with wealth accumulation. Budget, track, and optimize regularly.",
      "Self-employment and business ownership correlate strongly with millionaire status — you control your income ceiling.",
      "Avoid 'economic outpatient care': teaching financial skills to your children is worth more than giving them money."
    ],
    application: [
      "Calculate your expected net worth: Age × Pre-tax Income ÷ 10. If your actual net worth is below this, you're an Under Accumulator of Wealth.",
      "Track your spending for one month. Identify the biggest 'status' expenses that don't contribute to your happiness or wealth.",
      "Set a savings rate target of at least 20% of pre-tax income. Automate it so you never have to decide each month."
    ],
    relatedBooks: ["rich-dad", "total-money-makeover"]
  },
  {
    id: "iwill-teach", title: "I Will Teach You To Be Rich", author: "Ramit Sethi", year: 2009, category: "Personal Finance", difficulty: "Easy Read",
    quote: "Spend extravagantly on the things you love, and cut costs mercilessly on the things you don't.",
    summary: [
      "Ramit Sethi takes a refreshingly practical approach to personal finance, providing a 6-week program to automate your financial life. Unlike most finance books that preach deprivation, Sethi advocates for conscious spending — splurging guilt-free on what you love while cutting ruthlessly on what you don't.",
      "The book covers the full spectrum: optimizing credit cards, choosing the right bank accounts, opening and funding investment accounts (Roth IRAs and 401ks), and automating everything so your money flows to the right places without daily effort.",
      "Sethi's 'Conscious Spending Plan' divides after-tax income into four buckets: fixed costs (50-60%), investments (10%), savings (5-10%), and guilt-free spending (20-35%). This structure lets you enjoy life now while still building wealth.",
      "Written in a casual, sometimes brash tone aimed at 20- and 30-somethings, the book cuts through financial jargon and analysis paralysis. Its core message: a good-enough plan you actually follow beats a perfect plan you never start."
    ],
    takeaways: [
      "Automate your finances: set up automatic transfers for bills, savings, and investments so good behavior is the default.",
      "Conscious spending beats budgeting: spend generously on what you love, cut mercilessly on what you don't care about.",
      "Start investing now, even with small amounts. Time is your greatest asset — waiting for the 'perfect' moment costs you dearly.",
      "Negotiate your salary, bills, and fees. One successful salary negotiation can be worth $1M+ over your career.",
      "The best financial plan is one you'll actually follow. Perfection is the enemy of good-enough action."
    ],
    application: [
      "This week: open a Roth IRA (if eligible) and set up a $50/month automatic investment into a target-date fund.",
      "Create four automatic transfers on payday: rent/bills account, investment account, savings account, and spending account.",
      "Pick your two or three 'money dials' — things that truly make you happy — and redirect money from things you don't care about toward them."
    ],
    relatedBooks: ["atomic-habits", "simple-path"]
  },
  {
    id: "total-money-makeover", title: "The Total Money Makeover", author: "Dave Ramsey", year: 2003, category: "Debt & Budgeting", difficulty: "Easy Read",
    quote: "If you will live like no one else, later you can live like no one else.",
    summary: [
      "Dave Ramsey's no-nonsense approach to personal finance centers on getting out of debt, building an emergency fund, and then aggressively investing. His '7 Baby Steps' program has helped millions of Americans eliminate debt and start building wealth.",
      "The book's most distinctive feature is the 'debt snowball' method: pay off debts from smallest to largest balance, regardless of interest rate. While mathematically suboptimal, the psychological momentum of quick wins keeps people motivated.",
      "Ramsey is famously anti-debt. He advocates paying cash for everything (yes, even cars), using a written monthly budget, and avoiding credit cards entirely. While some critics call this extreme, his approach works especially well for people who've struggled with debt.",
      "Once debt-free, Ramsey recommends investing 15% of household income into growth stock mutual funds across four types: growth, growth and income, aggressive growth, and international. He also advocates paying off your mortgage early."
    ],
    takeaways: [
      "Debt is the enemy of wealth building. Attack it aggressively using the debt snowball (smallest balance first for psychological wins).",
      "Build a $1,000 starter emergency fund first, then a full 3-6 months of expenses after becoming debt-free.",
      "Live on a written budget every single month. Tell your money where to go instead of wondering where it went.",
      "Invest 15% of household income into retirement once you're debt-free with a full emergency fund.",
      "Avoid debt like the plague — including car loans. Save and pay cash, or buy used."
    ],
    application: [
      "List every debt you owe from smallest to largest balance. Make minimum payments on all except the smallest, and attack that one with every extra dollar.",
      "Write a detailed monthly budget before the month begins. Every dollar gets a job — give your money specific assignments.",
      "Build a $1,000 emergency fund in a separate savings account this month, even if it means selling things or picking up extra work."
    ],
    relatedBooks: ["millionaire-next-door", "your-money-or-life"]
  },
  {
    id: "common-stocks", title: "Common Stocks and Uncommon Profits", author: "Philip Fisher", year: 1958, category: "Growth Investing", difficulty: "Dense",
    quote: "The stock market is filled with individuals who know the price of everything, but the value of nothing.",
    summary: [
      "Philip Fisher pioneered growth investing — the strategy of finding exceptional companies with outstanding management and holding them for the very long term. His approach influenced Warren Buffett's evolution from pure value investing to quality-focused investing.",
      "Fisher's famous '15 Points' checklist for evaluating a company covers qualitative factors: Is the company's research and development effective? Does management have integrity? Is there a durable competitive advantage? These questions go beyond simple financial metrics.",
      "The 'scuttlebutt' method — gathering information by talking to customers, suppliers, competitors, and employees — was revolutionary for its time. Fisher believed that understanding a company's qualitative strengths was more important than just analyzing its financial statements.",
      "Fisher argued for concentration over diversification: own a handful of outstanding companies you truly understand, rather than spreading money across dozens of mediocre ones. His buy-and-hold philosophy (he held Motorola for decades) influenced generations of investors."
    ],
    takeaways: [
      "Focus on companies with outstanding management, strong R&D, and sustainable competitive advantages — not just cheap stocks.",
      "Use the 'scuttlebutt' method: talk to customers, suppliers, and industry experts to understand a company beyond its financials.",
      "Concentrate your portfolio in your best ideas. Owning 5-10 outstanding companies beats 50 mediocre ones.",
      "The time to sell is almost never. Hold great companies through temporary setbacks — sell only if the long-term story changes.",
      "Don't overfocus on dividends. Companies that reinvest profits into growth often create more shareholder value long-term."
    ],
    application: [
      "Before buying a stock, go through Fisher's 15 Points: Does the company have products with sufficient market potential? Is management honest and transparent with shareholders?",
      "Research companies like an investigative journalist — read customer reviews, talk to employees (on Glassdoor), and understand the competitive landscape.",
      "If you own a great company that drops 30% but nothing has changed about its competitive position, consider buying more rather than selling."
    ],
    relatedBooks: ["one-up", "intelligent-investor"]
  },
  {
    id: "buffett-way", title: "The Warren Buffett Way", author: "Robert Hagstrom", year: 1994, category: "Value Investing", difficulty: "Moderate",
    quote: "Time is the friend of the wonderful business and the enemy of the mediocre.",
    summary: [
      "Robert Hagstrom deconstructs Warren Buffett's investment methodology into a clear, repeatable framework. The book analyzes Buffett's major investments — from GEICO to Coca-Cola to American Express — to extract the principles behind each decision.",
      "Buffett's approach combines Benjamin Graham's margin-of-safety principles with Philip Fisher's focus on quality businesses. He looks for companies with strong brand moats, consistent earnings, high returns on equity, and honest, capable management.",
      "The book introduces Buffett's 'four tenets': business tenets (simple, consistent, favorable long-term prospects), management tenets (rational, candid, resists institutional imperative), financial tenets (high profit margins, good return on equity), and market tenets (buy below intrinsic value).",
      "Hagstrom also explores Buffett's psychological approach: thinking independently, being patient (sometimes holding cash for years waiting for the right opportunity), and having the courage to act decisively when conviction is high."
    ],
    takeaways: [
      "Invest in businesses you understand completely — Buffett calls this your 'circle of competence.'",
      "Look for companies with durable competitive advantages ('moats'): brand power, network effects, switching costs, or cost advantages.",
      "Management quality matters enormously. Look for leaders who are honest, rational, and treat shareholders as partners.",
      "Be patient. Buffett has said that his ideal holding period is forever — let great businesses compound undisturbed.",
      "When a great opportunity appears, bet big. Buffett's best returns came from concentrated positions in high-conviction ideas."
    ],
    application: [
      "Define your circle of competence — industries and businesses you genuinely understand. Only invest within that circle.",
      "When evaluating a company, ask: 'Would this business still be dominant in 10 years even with mediocre management?' If yes, it probably has a moat.",
      "Practice patience: keep a watchlist of great companies and the price you'd pay. Wait for market dips to act decisively."
    ],
    relatedBooks: ["intelligent-investor", "common-stocks"]
  },
  {
    id: "money-master", title: "Money: Master the Game", author: "Tony Robbins", year: 2014, category: "Financial Planning", difficulty: "Moderate",
    quote: "The secret to wealth is simple: Find a way to do more for others than anyone else does.",
    summary: [
      "Tony Robbins interviewed 50 of the world's most legendary investors — from Ray Dalio to Carl Icahn to Jack Bogle — and distilled their collective wisdom into a comprehensive financial playbook for everyday people.",
      "The book covers the full financial planning journey: understanding fees that secretly erode your wealth, creating an automated investment plan, building an 'All Weather' portfolio inspired by Ray Dalio, and planning for retirement income.",
      "Robbins makes complex concepts accessible: he explains asset allocation, tax-advantaged accounts, annuities, and the power of compound growth using simple analogies and real-world examples. The book's greatest strength is making readers feel they can actually take control of their finances.",
      "While some critics note the book is repetitive and could be shorter, its core advice is sound: minimize fees, diversify broadly, automate your savings, and stay the course. The All Weather portfolio breakdown (30% stocks, 55% bonds, 7.5% gold, 7.5% commodities) has been widely discussed."
    ],
    takeaways: [
      "Hidden fees are the silent killer of investment returns. Even 1% extra in fees can cost you decades of growth.",
      "The All Weather portfolio aims to perform reasonably well in all economic environments: growth, recession, inflation, and deflation.",
      "Automate everything: contributions, rebalancing, and bill payments. Remove emotion and effort from the equation.",
      "The power of asymmetric risk/reward: look for investments where you can lose a little but gain a lot. Never risk what you can't afford to lose.",
      "Speed of implementation matters — a good plan started today beats a perfect plan started next year."
    ],
    application: [
      "Audit your investment accounts for hidden fees: expense ratios, 12b-1 fees, front-end loads. Switch to low-cost alternatives where possible.",
      "Consider Ray Dalio's All Weather portfolio as a starting template: 30% stocks, 40% long-term bonds, 15% intermediate bonds, 7.5% gold, 7.5% commodities.",
      "Calculate your 'freedom number' — the amount of savings you need to cover your basic living expenses from investment income alone."
    ],
    relatedBooks: ["little-book", "principles"]
  },
  {
    id: "your-money-or-life", title: "Your Money or Your Life", author: "Vicki Robin & Joe Dominguez", year: 1992, category: "Financial Independence", difficulty: "Easy Read",
    quote: "Money is something we choose to trade our life energy for.",
    summary: [
      "This groundbreaking book reframes money not as currency but as 'life energy' — the hours of your life you trade for it. This simple perspective shift transforms every financial decision: is this purchase worth X hours of my life?",
      "The 9-step program guides readers to calculate their real hourly wage (accounting for commuting, work clothes, stress eating, etc.), track every penny, and evaluate whether their spending aligns with their values and life purpose.",
      "Robin and Dominguez introduced the concept of the 'crossover point' — when your investment income exceeds your expenses, making work optional. This book essentially launched the FIRE (Financial Independence, Retire Early) movement decades before it became mainstream.",
      "The book challenges the assumption that more spending equals more happiness. Research consistently shows that beyond a certain income threshold, additional spending adds little to life satisfaction. True wealth is having enough — and knowing it."
    ],
    takeaways: [
      "Money equals life energy. Before every purchase, ask: 'Is this worth the hours of my life I traded to earn this money?'",
      "Calculate your real hourly wage by subtracting all work-related costs (commuting, wardrobe, decompression). It's lower than you think.",
      "Track every single penny you earn and spend. Awareness alone changes behavior dramatically.",
      "The 'crossover point' — when passive income exceeds expenses — is the definition of financial independence.",
      "Enough is a powerful concept. Once basic needs and genuine pleasures are met, more money rarely adds more happiness."
    ],
    application: [
      "Calculate your real hourly wage: (Annual salary - work costs) ÷ (Work hours + commute + preparation time). Use this number for purchase decisions.",
      "Track every expense for 30 days. At month's end, rate each category: did this spending bring fulfillment proportional to the life energy spent?",
      "Calculate your crossover point: (Annual expenses) ÷ 0.04 = the investment portfolio size that could fund your life indefinitely (the '4% rule')."
    ],
    relatedBooks: ["millionaire-next-door", "simple-path"]
  },
  {
    id: "richest-man-babylon", title: "The Richest Man in Babylon", author: "George S. Clason", year: 1926, category: "Timeless Principles", difficulty: "Easy Read",
    quote: "A part of all you earn is yours to keep. It should be not less than a tenth no matter how little you earn.",
    summary: [
      "Set in ancient Babylon, this collection of parables teaches timeless financial principles through engaging stories. Despite being nearly a century old, the advice is as relevant today as when it was written — perhaps more so.",
      "The central character, Arkad — the richest man in Babylon — shares his 'Seven Cures for a Lean Purse': save at least 10% of income, control expenditures, make savings multiply through investment, protect wealth from loss, own your home, ensure future income, and increase your ability to earn.",
      "Through stories of chariot builders, merchants, and slaves, Clason illustrates that wealth-building principles are simple but require discipline. The parable of the 'Gold Lender' teaches the importance of only investing with people who have expertise in that area.",
      "The book's greatest strength is its simplicity. In an era of complex financial instruments and overwhelming information, these ancient parables remind us that the fundamentals of wealth — save consistently, invest wisely, avoid debt, protect what you have — haven't changed in 4,000 years."
    ],
    takeaways: [
      "Pay yourself first: save at least 10% of everything you earn, before any other expenses.",
      "Control your expenditures: what you call 'necessary expenses' will always grow to equal your income unless you resist.",
      "Make your savings work for you by investing them wisely — money sitting idle loses value to inflation.",
      "Guard your wealth from loss by only investing in areas where the principal is safe and can be reclaimed.",
      "Increase your ability to earn: invest in yourself through education, skills, and knowledge."
    ],
    application: [
      "Set up an automatic transfer of 10% of every paycheck to an investment account before you have a chance to spend it.",
      "Review your 'necessary' expenses. Challenge each one: is this truly necessary, or has it become a comfortable habit?",
      "Only invest money with people or institutions that have demonstrated expertise and a track record in that specific area."
    ],
    relatedBooks: ["rich-dad", "total-money-makeover"]
  },
  {
    id: "simple-path", title: "The Simple Path to Wealth", author: "JL Collins", year: 2016, category: "Index Investing", difficulty: "Easy Read",
    quote: "The beauty of VTSAX is that you own a piece of virtually every publicly traded company in America.",
    summary: [
      "Originally written as a series of letters to his daughter, JL Collins distills the principles of financial independence into the simplest possible terms. His advice boils down to: spend less than you earn, avoid debt, and invest the rest in VTSAX (Vanguard Total Stock Market Index Fund).",
      "Collins demolishes the complexity that the financial industry uses to justify its existence. He argues that you don't need a financial advisor, you don't need to understand technical analysis, and you certainly don't need complex strategies. A single low-cost index fund is enough.",
      "The book covers the 'wealth accumulation' phase (invest aggressively in stocks, specifically VTSAX) and the 'wealth preservation' phase (add bonds as you approach retirement). The 4% rule — withdrawing 4% of your portfolio annually in retirement — is explained clearly.",
      "Collins writes with warmth and clarity, making even readers who are intimidated by investing feel empowered. His no-nonsense approach has made this book a foundational text of the FIRE (Financial Independence, Retire Early) movement."
    ],
    takeaways: [
      "Investing doesn't need to be complicated. A single total stock market index fund (like VTSAX) is a perfectly sound strategy.",
      "Avoid debt like the plague — it's a chain that limits your freedom and compounds against you.",
      "F-You Money gives you options. Save aggressively not just for retirement, but for the freedom to walk away from anything that no longer serves you.",
      "The stock market always recovers. Every crash in history has been followed by new highs. Stay the course.",
      "The 4% rule: you can likely withdraw 4% of your portfolio annually in retirement without running out of money."
    ],
    application: [
      "Open a Vanguard account (or equivalent) and start investing in a total stock market index fund. Start with whatever you can afford.",
      "Calculate your savings rate: (Income - Expenses) ÷ Income. A 50% savings rate means you can retire in roughly 17 years.",
      "Build F-You Money: enough savings to cover 2+ years of expenses. This gives you negotiating power and freedom in every area of life."
    ],
    relatedBooks: ["little-book", "your-money-or-life"]
  },
  {
    id: "set-for-life", title: "Set for Life", author: "Scott Trench", year: 2017, category: "Financial Independence", difficulty: "Easy Read",
    quote: "Financial freedom is achieved in three stages: stability, strategy, and stewardship.",
    summary: [
      "Scott Trench, CEO of BiggerPockets, wrote this book specifically for people in their 20s and 30s who are starting from zero. Unlike many financial books that assume you already have money to invest, this one starts with the question: 'How do I go from nothing to financially free?'",
      "Trench breaks the journey into three stages. Stage 1 (first $25k): dramatically cut your biggest expenses (housing, transportation, food), earn more through career moves, and build a financial runway. Stage 2 ($25k-$100k): invest in stocks and real estate, build side income. Stage 3 ($100k+): deploy capital into cash-flowing assets.",
      "The book is particularly strong on 'house hacking' — buying a duplex or small multifamily property, living in one unit, and renting the others to eliminate your housing expense. Trench argues this single strategy can accelerate wealth building by years.",
      "Trench's approach is aggressive but practical. He acknowledges that building wealth requires sacrifice in the early years — but argues the freedom it buys is worth far more than the lattes and luxuries you give up."
    ],
    takeaways: [
      "Your biggest expenses (housing, cars, food) are your biggest levers. Cutting $500/month in housing beats 100 small frugality hacks.",
      "House hacking — buying a multifamily property and living in one unit — can eliminate your largest expense and build equity simultaneously.",
      "Career capital is your biggest asset early on. Invest in skills, negotiate raises, and make strategic job moves to maximize income.",
      "Build $25,000 in accessible savings as fast as possible — this is your financial runway and ticket to opportunity.",
      "Financial freedom is a continuum, not a binary state. Each dollar saved buys you more options and flexibility."
    ],
    application: [
      "Audit your three biggest expenses (housing, transport, food). Find a way to cut at least one by 30% this quarter.",
      "Research house hacking in your area: could you buy a duplex, live in one side, and rent the other to cover your mortgage?",
      "Calculate how many months your current savings could sustain you without income. Aim for 6+ months within the next year."
    ],
    relatedBooks: ["simple-path", "iwill-teach"]
  },
  {
    id: "bogleheads-guide", title: "The Bogleheads' Guide to Investing", author: "Taylor Larimore, Mel Lindauer & Michael LeBoeuf", year: 2006, category: "Index Investing", difficulty: "Moderate",
    quote: "The winning formula for success in investing is owning the entire stock market through an index fund, and then doing nothing. Just stay the course.",
    summary: [
      "Written by three passionate followers of John Bogle's investment philosophy, this book is the practical handbook for implementing index-fund-based investing. It covers everything from opening your first account to estate planning.",
      "The Bogleheads community (named after Vanguard founder John Bogle) has grown into one of the most respected online investing forums. This book codifies their collective wisdom into a comprehensive guide that has helped hundreds of thousands of investors.",
      "The book covers asset allocation (how to divide between stocks, bonds, and international), tax-efficient fund placement (which accounts to hold which funds in), and behavioral pitfalls to avoid. It's particularly strong on the practical details that other books skip.",
      "Unlike books focused on theory or philosophy, this is a how-to manual. It walks you through choosing your asset allocation, selecting specific funds, setting up automatic investments, tax-loss harvesting, and planning for retirement withdrawals."
    ],
    takeaways: [
      "Start early, invest regularly, and stay the course — these three actions account for most of investing success.",
      "Keep costs low: index funds, no-load funds, and tax-efficient placement. Every dollar saved in fees compounds for decades.",
      "Asset allocation — your mix of stocks and bonds — is the most important investment decision you'll make. Get this right first.",
      "Tax-efficient placement: hold bonds and REITs in tax-advantaged accounts (401k, IRA), and stock index funds in taxable accounts.",
      "Rebalance once a year to maintain your target allocation. This systematically buys low and sells high."
    ],
    application: [
      "Choose a simple three-fund portfolio: Total US Stock Market + Total International Stock + Total Bond Market. Adjust percentages for your age and risk tolerance.",
      "Place tax-inefficient holdings (bonds, REITs) in your 401k/IRA, and tax-efficient holdings (stock index funds) in taxable accounts.",
      "Set a calendar reminder to rebalance your portfolio once per year. Sell overweight positions and buy underweight ones to restore your target allocation."
    ],
    relatedBooks: ["little-book", "random-walk"]
  },
];
