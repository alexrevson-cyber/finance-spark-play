export interface Investor {
  id: string;
  name: string;
  title: string;
  nationality: string;
  netWorth: string;
  background: string;
  philosophy: string;
  famousTrades: string;
  quotes: { text: string; context: string }[];
  lessons: string[];
  recommendedBooks: string[];
}

export const investors: Investor[] = [
  {
    id: "buffett", name: "Warren Buffett", title: "The Oracle of Omaha", nationality: "American", netWorth: "~$130 billion",
    background: "Warren Buffett bought his first stock at age 11 and filed his first tax return at 13. After studying under Benjamin Graham at Columbia Business School, he started a series of investment partnerships in the 1950s. In 1965, he took control of a failing textile company called Berkshire Hathaway and transformed it into a holding company that now owns dozens of major businesses and holds massive stock positions.",
    philosophy: "Buffett practices value investing with a quality twist. He looks for wonderful companies at fair prices rather than fair companies at wonderful prices. Key criteria: durable competitive advantage ('moat'), honest and capable management, consistent earnings, and a price that makes sense. He holds his best investments forever, letting compound growth work undisturbed.",
    famousTrades: "Coca-Cola (bought in 1988 after the crash, still holds — gained over 1,600%). GEICO (gradually acquired over decades, now wholly owned). Apple (began buying in 2016, grew to Berkshire's largest position worth over $150 billion). American Express (bought during the 1960s 'Salad Oil Scandal' when everyone else was selling).",
    quotes: [
      { text: "Be fearful when others are greedy, and greedy when others are fearful.", context: "This captures Buffett's contrarian approach — the best time to buy is when others are panicking, and the best time to be cautious is when everyone else is euphoric." },
      { text: "Our favorite holding period is forever.", context: "Buffett believes that selling a great business is almost never the right decision. Compound growth requires patience and a long-term perspective." },
      { text: "Price is what you pay; value is what you get.", context: "A stock's market price and its intrinsic value are two different things. Smart investors focus on value and only buy when price is at or below it." }
    ],
    lessons: [
      "Stay within your circle of competence — invest in what you understand.",
      "Temperament beats IQ in investing. Patience and emotional control are your greatest edges.",
      "The best time to invest was yesterday. The second best time is today. Start early and let compounding work.",
      "Read voraciously — Buffett reads 500+ pages per day. Knowledge compounds just like money."
    ],
    recommendedBooks: ["The Intelligent Investor by Benjamin Graham", "Common Stocks and Uncommon Profits by Philip Fisher", "Business Adventures by John Brooks"]
  },
  {
    id: "munger", name: "Charlie Munger", title: "Buffett's Indispensable Partner", nationality: "American", netWorth: "~$2.6 billion (at passing)",
    background: "Charlie Munger practiced law before transitioning to investing. He partnered with Warren Buffett at Berkshire Hathaway, serving as Vice Chairman until his passing in 2023 at age 99. Munger is credited with evolving Buffett's approach from buying 'cigar butt' cheap stocks to buying quality businesses at fair prices.",
    philosophy: "Munger championed multidisciplinary thinking — applying mental models from psychology, physics, mathematics, biology, and history to investment decisions. He believed that avoiding stupidity is more profitable than seeking brilliance. His concentrated portfolio approach meant making few bets, but making them large when conviction was high.",
    famousTrades: "Costco (Munger was a board member and longtime advocate, recognizing its cult-like customer loyalty). BYD (the Chinese electric vehicle company — Munger pushed Berkshire to invest early, generating massive returns). See's Candies (the acquisition that taught Buffett and Munger the value of brand-driven pricing power).",
    quotes: [
      { text: "The big money is not in the buying or selling, but in the waiting.", context: "Munger reinforced that patience — not clever trading — is what creates extraordinary wealth. Most investors trade too much and think too little." },
      { text: "Spend each day trying to be a little wiser than you were when you woke up.", context: "Continuous learning was Munger's obsession. He believed that the investor who reads and thinks the most will outperform over decades." },
      { text: "Invert, always invert. Turn a situation or problem upside down.", context: "Instead of asking 'How do I succeed in investing?' Munger asks 'What would guarantee failure?' Then he avoids those things. Avoiding mistakes often matters more than finding winners." }
    ],
    lessons: [
      "Build a latticework of mental models from multiple disciplines to make better decisions.",
      "Avoid stupidity rather than seeking brilliance — most investing success comes from not making big mistakes.",
      "Concentrate your portfolio on your highest-conviction ideas rather than diversifying into things you understand less.",
      "Read widely and voraciously — Munger was known as 'a book with legs attached.'"
    ],
    recommendedBooks: ["Poor Charlie's Almanack", "Influence by Robert Cialdini", "The Selfish Gene by Richard Dawkins"]
  },
  {
    id: "dalio", name: "Ray Dalio", title: "Founder, Bridgewater Associates", nationality: "American", netWorth: "~$15 billion",
    background: "Ray Dalio started investing at age 12 when he bought shares of Northeast Airlines for $300 — the stock tripled. He founded Bridgewater Associates in his apartment in 1975. Through systematic, principles-based investing and a culture of radical transparency, he built it into the world's largest hedge fund managing over $150 billion.",
    philosophy: "Dalio's approach is deeply systematic and macro-economic. He studies how the 'economic machine' works — the interplay of credit cycles, debt cycles, productivity, and government policy. His All Weather portfolio strategy aims to perform well in all economic environments by balancing risk across asset classes rather than just dollar amounts.",
    famousTrades: "Predicted the 2008 financial crisis (Bridgewater's flagship fund gained 14% while most lost heavily). Correctly positioned for European debt crisis. Pioneer of risk parity investing — balancing portfolio risk rather than dollar allocation across stocks, bonds, gold, and commodities.",
    quotes: [
      { text: "He who lives by the crystal ball will eat shattered glass.", context: "No one can predict the future consistently. Instead of trying, build a portfolio and decision system that works across multiple scenarios." },
      { text: "Pain plus reflection equals progress.", context: "Every mistake — financial or personal — is a learning opportunity, but only if you honestly analyze what went wrong and encode the lesson into your system." },
      { text: "Diversifying well is the most important thing you need to do in order to invest well.", context: "Dalio's 'Holy Grail of Investing': finding 15-20 uncorrelated return streams can reduce risk by 80% while maintaining returns. True diversification goes far beyond owning different stocks." }
    ],
    lessons: [
      "Build systematic decision-making processes — encode your lessons into rules and checklists.",
      "Diversify across truly uncorrelated assets, not just different stocks.",
      "Understand the economic machine: long-term debt cycles, short-term cycles, and productivity drive markets.",
      "Radical transparency — seek honest feedback and challenge your assumptions ruthlessly."
    ],
    recommendedBooks: ["Principles by Ray Dalio", "Thinking, Fast and Slow by Daniel Kahneman", "The Lessons of History by Will and Ariel Durant"]
  },
  {
    id: "lynch", name: "Peter Lynch", title: "Legendary Magellan Fund Manager", nationality: "American", netWorth: "~$450 million",
    background: "Peter Lynch started as a caddy at a golf course where he overheard investment ideas from wealthy club members. He joined Fidelity as an intern and eventually took over the Magellan Fund in 1977. Over 13 years, he achieved a 29.2% average annual return — the best track record of any mutual fund manager in history. He retired at 46 to spend time with his family.",
    philosophy: "Lynch's philosophy is 'invest in what you know.' He believes individual investors have a natural advantage over Wall Street because they encounter investment opportunities in their daily lives — the stores they shop at, the products they love, the trends they notice — often before professional analysts catch on.",
    famousTrades: "Dunkin' Donuts (noticed packed stores everywhere — bought early). Hanes (after his wife raved about L'eggs pantyhose — recognized a consumer phenomenon). Taco Bell (saw explosive growth before Wall Street). At his peak, Lynch managed 1,400+ stocks in the Magellan Fund.",
    quotes: [
      { text: "Know what you own, and know why you own it.", context: "Lynch insisted that every investor should be able to explain their investment thesis in simple language. If you can't explain why you own something, you shouldn't own it." },
      { text: "The best stock to buy is the one you already own.", context: "If your research and thesis are sound, adding to a winning position often makes more sense than searching for the next new idea." },
      { text: "Behind every stock is a company. Find out what it's doing.", context: "Stock prices fluctuate daily, but the underlying business changes much more slowly. Focus on the business, not the ticker." }
    ],
    lessons: [
      "Your everyday experience as a consumer gives you an information edge. Pay attention to products and companies you love.",
      "Categorize your stocks and set appropriate expectations for each type.",
      "Do your homework — understand financials, competitive position, and growth potential before buying.",
      "Be patient — 'tenbaggers' (10x returns) don't happen overnight. Lynch held many winners for years."
    ],
    recommendedBooks: ["One Up On Wall Street by Peter Lynch", "Beating the Street by Peter Lynch", "The Intelligent Investor by Benjamin Graham"]
  },
  {
    id: "wood", name: "Cathie Wood", title: "CEO & CIO, ARK Invest", nationality: "American", netWorth: "~$250 million",
    background: "Cathie Wood spent 12 years at AllianceBernstein before founding ARK Invest in 2014. She became one of the most prominent investors of the early 2020s, with her flagship ARK Innovation ETF (ARKK) delivering extraordinary returns by focusing on disruptive innovation. Her willingness to publish her research and trades openly made her a unique figure on Wall Street.",
    philosophy: "Wood focuses exclusively on disruptive innovation — technologies she believes will reshape entire industries over 5-10 year periods. Her themes include artificial intelligence, genomic sequencing, autonomous vehicles, energy storage, and blockchain technology. She accepts high volatility as the price of transformative growth potential.",
    famousTrades: "Tesla (bought early and held through enormous volatility — one of ARKK's best-performing positions). Roku (identified the streaming platform trend before mainstream adoption). CRISPR Therapeutics (early bet on gene-editing technology). Coinbase (conviction in crypto infrastructure despite skepticism).",
    quotes: [
      { text: "Innovation solves problems. The bigger the problem, the bigger the opportunity.", context: "Wood frames investing as identifying the world's biggest challenges and backing the companies most likely to solve them. This gives her a long-term, thesis-driven approach." },
      { text: "We are investing in the future, not the past.", context: "Traditional valuation metrics (P/E ratios, book value) may not capture the potential of companies creating entirely new markets. Wood argues for forward-looking analysis." },
      { text: "Disruptive innovation is deflationary and increases productivity.", context: "Technologies like AI and robotics reduce costs across industries. This creates massive value for the companies driving the disruption and for consumers who benefit." }
    ],
    lessons: [
      "Innovation creates massive wealth over long periods, but the path is volatile. Conviction and a long time horizon are essential.",
      "Transparency in investing builds trust and accountability. Sharing your research and reasoning openly forces discipline.",
      "Not every disruptive bet will work. Portfolio construction matters — diversify across multiple innovation themes.",
      "The best returns come from investing in technologies before they reach mainstream adoption."
    ],
    recommendedBooks: ["The Innovator's Dilemma by Clayton Christensen", "Zero to One by Peter Thiel", "Exponential Organizations by Salim Ismail"]
  },
  {
    id: "bogle", name: "John Bogle", title: "Founder of Vanguard & Father of Index Investing", nationality: "American", netWorth: "~$80 million (at passing)",
    background: "John 'Jack' Bogle founded The Vanguard Group in 1975 and created the first index fund available to individual investors. Critics called it 'Bogle's Folly,' but the idea revolutionized investing. Unlike most financial industry leaders, Bogle structured Vanguard as a client-owned company, meaning profits go back to investors through lower fees. He passed away in 2019 at age 89.",
    philosophy: "Bogle's philosophy is radical simplicity: buy the entire stock market through a low-cost index fund and hold it forever. He demonstrated mathematically that after fees, the average active fund must underperform the index. Rather than trying to find the needle in the haystack, just buy the haystack.",
    famousTrades: "Bogle didn't make 'trades' — that was his whole point. His greatest contribution was creating Vanguard's index funds and proving that low-cost passive investing beats active management for the vast majority of investors. Vanguard now manages over $7 trillion in assets.",
    quotes: [
      { text: "Don't look for the needle in the haystack. Just buy the haystack!", context: "Why waste time and money trying to pick winning stocks when you can own the entire market at virtually zero cost?" },
      { text: "In investing, you get what you don't pay for.", context: "Unlike most products where higher price means higher quality, in investing, lower fees directly translate to higher returns for investors." },
      { text: "The stock market is a giant distraction from the business of investing.", context: "Daily price movements, financial news, and market predictions are noise. Real investing means owning great businesses for the long term." }
    ],
    lessons: [
      "Costs are the most reliable predictor of fund performance. Low-cost funds consistently outperform high-cost funds over time.",
      "You don't need to beat the market — just participate in its long-term growth with minimal drag from fees.",
      "Stay the course. Market timing and frequent trading are the biggest destroyers of investor returns.",
      "Simplicity is a superpower. One or two index funds is all most investors need."
    ],
    recommendedBooks: ["The Little Book of Common Sense Investing by John Bogle", "Enough by John Bogle", "Common Sense on Mutual Funds by John Bogle"]
  },
  {
    id: "graham", name: "Benjamin Graham", title: "The Father of Value Investing", nationality: "British-American", netWorth: "~$50 million (at passing, adjusted)",
    background: "Born in London in 1894, Graham moved to New York as a child. After graduating from Columbia University, he started working on Wall Street and eventually became a professor at Columbia Business School, where his most famous student was Warren Buffett. Graham survived the 1929 crash (which cost him dearly) and developed his investment framework to prevent future losses.",
    philosophy: "Graham introduced the concepts of 'intrinsic value,' 'margin of safety,' and 'Mr. Market.' He believed that the stock market is a voting machine in the short run (driven by emotion) but a weighing machine in the long run (driven by fundamentals). Investors should buy when prices are well below calculated intrinsic value.",
    famousTrades: "GEICO (Graham-Newman Corp bought 50% of GEICO in 1948 for $712,000 — it eventually became worth hundreds of millions). His approach focused on buying deeply undervalued 'net-net' stocks trading below their liquidation value — a strategy that produced consistent returns.",
    quotes: [
      { text: "The investor's chief problem — and even his worst enemy — is likely to be himself.", context: "Graham recognized that psychology, not analysis, is the biggest challenge in investing. Emotional decisions destroy more wealth than bad analysis." },
      { text: "In the short run, the market is a voting machine but in the long run, it is a weighing machine.", context: "Short-term prices reflect popularity and emotion. Long-term prices reflect actual business value. Patient investors are rewarded." },
      { text: "The essence of investment management is the management of risks, not the management of returns.", context: "Focus on what you can control — downside protection. Manage risk well, and the returns will take care of themselves." }
    ],
    lessons: [
      "Always invest with a margin of safety — the gap between price and intrinsic value is your protection against being wrong.",
      "Distinguish between investing and speculation. Most people who think they're investing are actually speculating.",
      "Mr. Market is there to serve you, not guide you. Take advantage of his emotional extremes.",
      "Defensive investing — diversification, quality, and patience — beats aggressive stock picking for most people."
    ],
    recommendedBooks: ["The Intelligent Investor", "Security Analysis by Benjamin Graham & David Dodd"]
  },
  {
    id: "soros", name: "George Soros", title: "The Man Who Broke the Bank of England", nationality: "Hungarian-American", netWorth: "~$6.7 billion",
    background: "George Soros survived the Nazi occupation of Hungary as a teenager, later studying at the London School of Economics under philosopher Karl Popper. He founded Soros Fund Management and the Quantum Fund, which generated average annual returns of over 30% from 1969 to 2000. He is also one of the world's most prominent philanthropists.",
    philosophy: "Soros's approach is built on his theory of 'reflexivity' — the idea that market participants' biased perceptions can actually influence the fundamentals they're trying to predict, creating feedback loops. He looks for situations where market consensus is wrong and positions himself accordingly. Unlike value investors who wait, Soros acts aggressively when he identifies market disequilibrium.",
    famousTrades: "Shorted the British pound in 1992 ('Black Wednesday'), earning $1 billion in a single day when the UK was forced to exit the European Exchange Rate Mechanism. Bet against the Thai baht during the 1997 Asian financial crisis. Identified and profited from the Japanese asset bubble and tech bubble.",
    quotes: [
      { text: "It's not whether you're right or wrong that's important, but how much money you make when you're right and how much you lose when you're wrong.", context: "Position sizing and risk management matter more than batting average. A few big wins can more than offset many small losses." },
      { text: "Markets are constantly in a state of uncertainty and flux, and money is made by discounting the obvious and betting on the unexpected.", context: "Soros profits by identifying what the consensus is missing. By the time something is obvious, it's already priced in." },
      { text: "Once we realize that imperfect understanding is the human condition, there is no shame in being wrong, only in failing to correct our mistakes.", context: "Soros is famous for changing his mind quickly when evidence contradicts his thesis. Ego has no place in investing." }
    ],
    lessons: [
      "Markets are not always efficient — human biases create exploitable mispricings, especially at extremes.",
      "Risk management is more important than being right. Size your positions so that being wrong doesn't ruin you.",
      "Be willing to change your mind immediately when the evidence changes. The market doesn't care about your ego.",
      "Understand the macro environment: currencies, interest rates, and government policy all affect your investments."
    ],
    recommendedBooks: ["The Alchemy of Finance by George Soros", "Fooled by Randomness by Nassim Taleb"]
  },
  {
    id: "marks", name: "Howard Marks", title: "Co-founder, Oaktree Capital Management", nationality: "American", netWorth: "~$2.2 billion",
    background: "Howard Marks co-founded Oaktree Capital Management in 1995, specializing in distressed debt and credit investing. He is best known for his insightful memos to clients, which are read widely across the investment industry — Warren Buffett has said they're the first thing he reads when they arrive.",
    philosophy: "Marks focuses on understanding market cycles and investor psychology. He emphasizes 'second-level thinking' — going beyond the obvious to understand what the consensus is missing. His approach is contrarian but disciplined: buy when others are fearful (and prices are low), sell when others are greedy (and prices are high).",
    famousTrades: "Invested heavily in distressed debt during the 2008 financial crisis, deploying $6 billion in just 15 weeks when most investors were frozen with fear. Oaktree generated exceptional returns as distressed assets recovered. His timely 2000 memo 'bubble.com' warned about the tech bubble before it burst.",
    quotes: [
      { text: "The most important thing is being attentive to cycles. Everything is cyclical, and cycles always win.", context: "Markets swing between fear and greed, boom and bust. Understanding where you are in the cycle is the most valuable information an investor can have." },
      { text: "You can't predict. You can prepare.", context: "Instead of trying to forecast the future, build a portfolio and strategy that can withstand multiple scenarios. Preparation beats prediction." },
      { text: "The biggest investing errors come not from factors that are informational or analytical, but from those that are psychological.", context: "The data and analysis are usually available to everyone. What separates great investors from average ones is psychological discipline." }
    ],
    lessons: [
      "Second-level thinking: don't just ask 'What will happen?' Ask 'What does the consensus expect, and how might they be wrong?'",
      "Understanding market cycles is the most valuable skill in investing. Know where you are in the cycle.",
      "Risk is not volatility — risk is the permanent loss of capital. Focus on avoiding permanent losses.",
      "The best opportunities arise when others are fearful. Have the courage and cash to act during crises."
    ],
    recommendedBooks: ["The Most Important Thing by Howard Marks", "Mastering the Market Cycle by Howard Marks"]
  },
  {
    id: "tudor-jones", name: "Paul Tudor Jones", title: "Legendary Macro Trader", nationality: "American", netWorth: "~$8 billion",
    background: "Paul Tudor Jones founded Tudor Investment Corp in 1980 and became famous for predicting the 1987 stock market crash ('Black Monday') and profiting enormously from it. He is known for his macro trading style, philanthropic work through the Robin Hood Foundation, and his intense focus on risk management.",
    philosophy: "Jones is a global macro trader who focuses on identifying major economic and market trends before they become obvious. He combines fundamental analysis of economic indicators with technical analysis of price patterns. Risk management is his first priority — he cuts losses quickly and lets winners run.",
    famousTrades: "Predicted and profited from the 1987 crash — reportedly tripling his money while the market fell 22% in one day. The documentary 'Trader' filmed his preparation. Known for catching major turns in currencies, bonds, and commodities based on macro analysis.",
    quotes: [
      { text: "The secret to being successful from a trading perspective is to have an indefatigable and an undying and unquenchable thirst for information and knowledge.", context: "Continuous learning and information gathering are non-negotiable for Jones. The best investors are also the most curious." },
      { text: "Don't ever average losers. Decrease your trading volume when you are trading poorly; increase your volume when you are trading well.", context: "Adding to losing positions is one of the most destructive habits in investing. Cut losses quickly and allocate more to what's working." },
      { text: "Where you want to be is always in control, never wishing, always trading, and always, first and foremost protecting your butt.", context: "Risk management comes before profit seeking. You can't compound wealth if you suffer catastrophic losses." }
    ],
    lessons: [
      "Protect your capital above all else. You can always make money back, but you can't come back from a catastrophic loss.",
      "Cut losses quickly and without hesitation. The first loss is usually the smallest loss.",
      "Stay curious and constantly gather information. The best investors are voracious learners.",
      "Position sizing matters more than being right. Risk only what you can afford to lose on any single idea."
    ],
    recommendedBooks: ["Reminiscences of a Stock Operator by Edwin Lefèvre", "Market Wizards by Jack Schwager"]
  },
  {
    id: "livermore", name: "Jesse Livermore", title: "The Boy Plunger (Historical)", nationality: "American", netWorth: "$100 million (1929, ~$1.5B adjusted)",
    background: "Jesse Livermore (1877-1940) is one of the most famous traders in history. He began trading at age 14 in 'bucket shops' and by age 15 had earned his first $1,000. He made and lost several fortunes during his career, most notably earning $100 million (equivalent to ~$1.5 billion today) by shorting stocks during the 1929 crash.",
    philosophy: "Livermore was a pure speculator focused on price action and market timing. He studied how stocks moved, identified patterns, and made enormous bets on his convictions. He believed in following the path of least resistance — trading in the direction of the major trend — and in the importance of patience: waiting for the right moment to act.",
    famousTrades: "Shorted the stock market before the 1907 panic, earning $3 million. Made $100 million shorting during the 1929 crash — making him one of the richest people in America. Also suffered catastrophic losses multiple times, going bankrupt at least four times before rebuilding.",
    quotes: [
      { text: "There is nothing new in Wall Street. There can't be because speculation is as old as the hills.", context: "Human emotions — fear, greed, hope, regret — drive markets today just as they did a century ago. The patterns repeat because human nature doesn't change." },
      { text: "The market does not beat them. They beat themselves, because though they have brains they cannot sit tight.", context: "Livermore believed that patience — the ability to wait for the right setup and then hold through fluctuations — was the rarest and most valuable quality in trading." },
      { text: "It never was my thinking that made the big money for me. It always was my sitting.", context: "The biggest profits came not from frequent trading but from identifying a major trend and staying with it until the trend clearly ended." }
    ],
    lessons: [
      "Patience is the most profitable quality in investing. Wait for high-probability setups and let winners run.",
      "The market is driven by human nature, which never changes. Greed and fear will always create cycles.",
      "Risk management is survival. Livermore's multiple bankruptcies show what happens when position sizing fails.",
      "Learn from history — market patterns repeat because psychology is eternal."
    ],
    recommendedBooks: ["Reminiscences of a Stock Operator by Edwin Lefèvre", "How to Trade in Stocks by Jesse Livermore"]
  },
  {
    id: "fisher", name: "Philip Fisher", title: "Pioneer of Growth Investing", nationality: "American", netWorth: "~$100 million (at passing, estimated)",
    background: "Philip Fisher founded Fisher & Company in 1931 and managed money for nearly 70 years until retiring in 1999 at age 91. His book 'Common Stocks and Uncommon Profits' (1958) introduced the growth investing approach and his famous '15 Points to Look for in a Common Stock.' Warren Buffett has said his investing approach is '85% Graham and 15% Fisher.'",
    philosophy: "Fisher focused on finding outstanding companies with exceptional management, strong R&D, and sustainable competitive advantages — then holding them for the very long term. His 'scuttlebutt' method involved talking to customers, competitors, and industry experts to develop a deep qualitative understanding of a company.",
    famousTrades: "Motorola (bought in 1955 and held until his death in 2004 — an extraordinary multi-decade compounding story). Texas Instruments (identified the semiconductor revolution early). Dow Chemical (recognized long-term chemical industry growth potential).",
    quotes: [
      { text: "The stock market is filled with individuals who know the price of everything, but the value of nothing.", context: "Fisher distinguished between price (what the market quotes today) and value (the long-term worth of a great business). Focus on value, not price." },
      { text: "I don't want a lot of good investments; I want a few outstanding ones.", context: "Quality over quantity. Fisher's concentrated approach meant deep knowledge of fewer companies rather than superficial knowledge of many." },
      { text: "Conservative investors sleep well.", context: "True conservatism in investing isn't avoiding stocks — it's owning outstanding businesses bought at reasonable prices and holding them through market fluctuations." }
    ],
    lessons: [
      "Invest in companies with outstanding management and sustainable competitive advantages, not just cheap valuations.",
      "The 'scuttlebutt' method: research companies by talking to customers, competitors, suppliers, and employees.",
      "Concentrate on your best ideas. Deep knowledge of 5-10 companies beats shallow knowledge of 50.",
      "The time to sell a great company is almost never. Hold through temporary setbacks if the long-term thesis is intact."
    ],
    recommendedBooks: ["Common Stocks and Uncommon Profits by Philip Fisher", "Conservative Investors Sleep Well by Philip Fisher"]
  },
];
