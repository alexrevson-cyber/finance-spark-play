import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Library, BookOpen, ArrowLeft, Star, Lightbulb, Target, User, Headphones, Film, Brain, Sparkles } from "lucide-react";

const books = [
  { id: "rich-dad", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", year: 1997, category: "Mindset", summary: "Kiyosaki contrasts the financial philosophies of his two 'dads' — his biological father (poor dad) who valued job security, and his best friend's father (rich dad) who built wealth through assets and investments. The core lesson: the rich don't work for money; they make money work for them.", takeaways: ["Assets put money in your pocket; liabilities take it out.", "Financial literacy is more important than how much money you make.", "The rich focus on building businesses and investments, not just paychecks.", "Fear and ignorance keep people trapped in the 'rat race.'"], application: "Start tracking what you own — is it an asset or liability? Shift from 'I can't afford it' to 'How can I afford it?' Begin investing small amounts to build your asset column." },
  { id: "intelligent-investor", title: "The Intelligent Investor", author: "Benjamin Graham", year: 1949, category: "Value Investing", summary: "The bible of investing introduces 'value investing' — buying stocks priced below intrinsic value. Graham emphasizes emotional discipline, margin of safety, and treating investing as a business.", takeaways: ["Mr. Market is emotional — buy quality at a discount during pessimism.", "Always invest with a 'margin of safety.'", "Distinguish between investing (analysis) and speculation (guessing).", "Defensive investors should focus on diversified, high-quality portfolios."], application: "Before buying, ask: 'What is this actually worth?' Build a diversified portfolio of quality investments at reasonable prices and hold through market swings." },
  { id: "random-walk", title: "A Random Walk Down Wall Street", author: "Burton Malkiel", year: 1973, category: "Market Theory", summary: "Malkiel argues stock prices are essentially random short-term. Most fund managers can't beat the market consistently, and passive index fund investing is best for most people.", takeaways: ["Past price movements don't predict future ones.", "Most active funds underperform index funds after fees.", "Diversification across asset classes is essential.", "Time in the market beats timing the market."], application: "Stop trying to pick winners or time the market. Invest regularly in low-cost index funds, diversify globally, and let compound growth work over decades." },
  { id: "psychology-of-money", title: "The Psychology of Money", author: "Morgan Housel", year: 2020, category: "Behavioral Finance", summary: "Housel explores how psychology drives financial decisions more than spreadsheets. Doing well with money has little to do with intelligence and everything to do with behavior.", takeaways: ["Everyone makes decisions based on unique experiences.", "Wealth is what you don't see — money not spent.", "Getting wealthy requires optimism; staying wealthy requires caution.", "Compound growth requires patience above all."], application: "Define 'enough' for yourself. Save for flexibility and freedom. Focus on not interrupting compound growth. Your behavior matters more than brilliance." },
  { id: "think-grow-rich", title: "Think and Grow Rich", author: "Napoleon Hill", year: 1937, category: "Mindset", summary: "Based on studying 500+ successful people, Hill argues wealth begins with definite purpose, burning desire, and unwavering faith. It's about the mental framework for building wealth.", takeaways: ["A burning desire backed by a concrete plan is the starting point.", "Your thoughts shape your reality.", "Mastermind groups accelerate success.", "Persistence through defeat separates successful from unsuccessful."], application: "Write a specific financial goal with a deadline. Create a plan, read your goal daily, and find like-minded people for accountability." },
  { id: "atomic-habits", title: "Atomic Habits", author: "James Clear", year: 2018, category: "Habits & Mindset", summary: "Tiny behavioral changes compound into remarkable results. The framework applies powerfully to financial habits — from automating savings to building investing routines.", takeaways: ["1% improvements compound massively — focus on systems, not goals.", "Make good habits obvious, attractive, easy, and satisfying.", "Identity-based habits stick: 'I am an investor.'", "Environment design matters more than willpower."], application: "Automate investing on payday. Use a simple index fund. Track net worth monthly. Small, consistent actions beat dramatic occasional efforts." },
  { id: "little-book", title: "The Little Book of Common Sense Investing", author: "John Bogle", year: 2007, category: "Index Investing", summary: "Bogle makes the definitive case for low-cost index fund investing, demonstrating that beating the market is a loser's game for most investors. Simplicity wins.", takeaways: ["Market returns are zero-sum; costs make active investing a loser's game.", "Low-cost index funds capture the entire market's return.", "Don't look for the needle — buy the haystack.", "Stay the course through market fluctuations."], application: "Invest in a total market index fund with the lowest expense ratio. Contribute regularly, reinvest dividends, and ignore daily noise." },
  { id: "one-up", title: "One Up On Wall Street", author: "Peter Lynch", year: 1989, category: "Stock Picking", summary: "Lynch argues everyday investors have advantages over professionals — you can spot great investments in your daily life before Wall Street notices them.", takeaways: ["Invest in what you know and understand.", "Do your homework — understand the company's financials.", "Categorize stocks: slow growers, stalwarts, fast growers, cyclicals, turnarounds, asset plays.", "The best stock to buy may be one you already own."], application: "Pay attention to products and companies you love as a consumer. Research their financials before investing. Patience and knowledge are your edge over institutional investors." },
  { id: "principles", title: "Principles", author: "Ray Dalio", year: 2017, category: "Strategy", summary: "Dalio shares the unconventional principles that guided his success at Bridgewater Associates. Key themes: radical transparency, systematic decision-making, and learning from mistakes.", takeaways: ["Pain + Reflection = Progress.", "Create decision-making systems rather than relying on gut feelings.", "Embrace radical transparency and open-mindedness.", "Diversify well — the 'Holy Grail of Investing' is 15+ uncorrelated return streams."], application: "Document your investment decisions and reasons. Review them regularly. Build systematic rules for buying and selling. Seek diverse perspectives before making major financial decisions." },
  { id: "millionaire-next-door", title: "The Millionaire Next Door", author: "Thomas Stanley", year: 1996, category: "Wealth Building", summary: "Research reveals most millionaires live modestly, save aggressively, and avoid flashy spending. Wealth is built through discipline, not high income.", takeaways: ["Most millionaires live below their means.", "They allocate time and money efficiently toward wealth building.", "Economic outpatient care (financial gifts to adult children) often hinders wealth accumulation.", "Choosing the right occupation and being self-employed correlates with wealth."], application: "Track your spending for a month. Identify areas to reduce. Invest the difference. Remember: looking wealthy and being wealthy are very different things." },
];

const investors = [
  { name: "Warren Buffett", title: "The Oracle of Omaha", philosophy: "Value investing with a long-term focus. Buy wonderful companies at fair prices and hold them forever.", strategy: "Concentrated portfolio of companies with durable competitive advantages ('moats'), strong management, and predictable earnings. Avoids technology he doesn't understand.", quotes: ["Be fearful when others are greedy, and greedy when others are fearful.", "Our favorite holding period is forever.", "Price is what you pay; value is what you get."], lesson: "Patience, discipline, and understanding what you own are more important than any trading strategy." },
  { name: "Charlie Munger", title: "Buffett's Partner", philosophy: "Mental models and multidisciplinary thinking. Invert problems to avoid stupidity rather than seeking brilliance.", strategy: "Concentrated bets on high-conviction ideas. Emphasis on quality over quantity. 'All I want to know is where I'm going to die, so I'll never go there.'", quotes: ["The big money is not in the buying or selling, but in the waiting.", "Spend each day trying to be a little wiser than you were when you woke up.", "It is remarkable how much long-term advantage people like us have gotten by trying to be consistently not stupid, instead of trying to be very intelligent."], lesson: "Build a latticework of mental models from many disciplines. The best investment decisions come from understanding human psychology and business fundamentals." },
  { name: "Ray Dalio", title: "Founder, Bridgewater Associates", philosophy: "All-weather investing through radical diversification across uncorrelated assets and economic environments.", strategy: "Risk parity approach: balance portfolio risk across asset classes (stocks, bonds, gold, commodities) rather than just allocating by dollar amount. Systematic, rules-based decision making.", quotes: ["He who lives by the crystal ball will eat shattered glass.", "Pain + Reflection = Progress.", "If you're not failing, you're not pushing your limits."], lesson: "No one can consistently predict the future. Build a portfolio that performs reasonably well across all economic environments: growth, recession, inflation, and deflation." },
  { name: "Peter Lynch", title: "Former Fidelity Magellan Fund Manager", philosophy: "Invest in what you know. Everyday investors can spot great opportunities before Wall Street.", strategy: "Growth at a reasonable price (GARP). Categorized stocks into types (fast growers, stalwarts, cyclicals) and tailored strategies for each. Managed 1,400+ stocks at peak.", quotes: ["Know what you own, and know why you own it.", "The best stock to buy is the one you already own.", "Behind every stock is a company. Find out what it's doing."], lesson: "Your everyday experience as a consumer gives you an edge. The companies you love shopping at, the products you can't live without — those observations can lead to great investments." },
  { name: "Cathie Wood", title: "CEO, ARK Invest", philosophy: "Disruptive innovation investing. Focus on technologies that will reshape industries over the next 5-10 years.", strategy: "Concentrated positions in companies at the forefront of AI, genomics, fintech, autonomous vehicles, and energy storage. Willing to accept high volatility for transformative growth potential.", quotes: ["Innovation solves problems. The bigger the problem, the bigger the opportunity.", "We are investing in the future, not the past.", "Disruptive innovation is deflationary and increases productivity."], lesson: "Innovation creates massive wealth over long periods, but the path is volatile. Conviction in your research and a long time horizon are essential for thematic investing." },
];

const podcasts = [
  { title: "We Study Billionaires", host: "The Investor's Podcast Network", desc: "Deep dives into the strategies of the world's greatest investors. Breaks down books, market trends, and investment philosophies in an accessible way." },
  { title: "Planet Money", host: "NPR", desc: "Makes economics and finance entertaining and understandable. Short episodes explain complex concepts through real-world stories and investigations." },
  { title: "The Motley Fool Money", host: "Motley Fool", desc: "Weekly market analysis, stock picks, and investing discussions. Great for staying current on market trends with practical investing perspectives." },
  { title: "How I Built This", host: "Guy Raz / NPR", desc: "Stories behind the world's best-known companies. Learn how founders built their businesses — useful for understanding what makes great companies tick." },
  { title: "Invest Like the Best", host: "Patrick O'Shaughnessy", desc: "In-depth conversations with top investors, founders, and thinkers. More advanced content for those ready to deepen their investment knowledge." },
  { title: "The Rational Reminder", host: "Ben Felix & Cameron Passmore", desc: "Evidence-based investing discussions rooted in academic research. Perfect for understanding why index investing and factor-based strategies work." },
];

const documentaries = [
  { title: "The Big Short (2015)", desc: "The true story of investors who predicted and profited from the 2008 financial crisis. Brilliantly explains complex financial instruments like CDOs and credit default swaps in entertaining ways.", lesson: "Markets can be irrational for extended periods. Understanding what you're investing in — and what others don't understand — creates opportunity." },
  { title: "Inside Job (2010)", desc: "Academy Award-winning documentary examining the 2008 financial crisis, its causes, and the systemic failures that allowed it to happen.", lesson: "Financial systems have vulnerabilities. Diversification, understanding risk, and healthy skepticism of 'sure things' protect your wealth." },
  { title: "Becoming Warren Buffett (2017)", desc: "HBO documentary offering an intimate look at Buffett's life, habits, and investment philosophy. Shows how simple living and compound thinking create extraordinary wealth.", lesson: "Consistency, patience, and living below your means are the real secrets to building lasting wealth. Intelligence alone isn't enough — temperament matters more." },
  { title: "Money, Explained (2021)", desc: "Netflix series breaking down credit cards, student loans, retirement, gambling, and get-rich-quick schemes. Practical and accessible financial literacy.", lesson: "Understanding the financial products you use daily — credit, debt, savings — is the foundation for building wealth. Knowledge is your best defense against predatory practices." },
  { title: "Dirty Money (2018)", desc: "Netflix series exposing corporate fraud and financial wrongdoing. Covers payday lending, Volkswagen emissions scandal, HSBC money laundering, and more.", lesson: "Not all investments or companies are what they seem. Do your due diligence, read financial statements, and be skeptical of returns that seem too good to be true." },
];

const behavioralBiases = [
  { name: "Loss Aversion", desc: "We feel losses about 2x more intensely than equivalent gains. This causes us to hold losing investments too long and sell winners too early.", remedy: "Set predetermined sell rules. Automate rebalancing. Focus on total portfolio performance, not individual positions." },
  { name: "Herd Mentality", desc: "We follow the crowd — buying when everyone's buying (at peaks) and selling when everyone's selling (at bottoms). This is the opposite of 'buy low, sell high.'", remedy: "Have a written investment plan. Ignore financial news during volatile periods. Remember: the crowd is usually wrong at extremes." },
  { name: "Confirmation Bias", desc: "We seek information that confirms what we already believe, ignoring contradictory evidence. This leads to overconfidence in bad investments.", remedy: "Actively seek opposing viewpoints. Play devil's advocate with your investment thesis. Diversify to hedge against your own blind spots." },
  { name: "Recency Bias", desc: "We overweight recent events. After a crash, we expect more crashes. After a boom, we expect more gains. This distorts our risk assessment.", remedy: "Study long-term market history. The S&P 500 has returned ~10% annually over 100+ years despite wars, recessions, and pandemics. Zoom out." },
  { name: "Anchoring", desc: "We fixate on the first piece of information we receive. If you bought a stock at $100, you anchor to that price even if fundamentals have changed.", remedy: "Evaluate investments based on current fundamentals and future prospects — not what you paid. Ask: 'Would I buy this today at this price?'" },
  { name: "Overconfidence", desc: "We overestimate our ability to pick stocks and time the market. Studies show overconfident traders trade more and earn less.", remedy: "Track your actual investment performance vs. a benchmark index. Most active traders underperform. Consider indexing the majority of your portfolio." },
];

const conceptOfTheWeek = {
  title: "The Power of Compound Interest",
  summary: "Albert Einstein reportedly called compound interest the 'eighth wonder of the world.' It's the process where your investment earnings generate their own earnings, creating exponential growth over time. Unlike simple interest (which only earns on the original amount), compound interest earns on the original amount plus all accumulated interest.",
  history: "The concept dates back to ancient Mesopotamia around 2400 BCE. The rule of 72 — divide 72 by your interest rate to find doubling time — has been used since the 15th century. Benjamin Franklin left $1,000 each to Boston and Philadelphia in 1790, stipulating the money compound for 200 years. By 1990, the funds had grown to $6.5 million.",
  context: "At 8% annual returns: $10,000 becomes $21,589 in 10 years, $46,610 in 20 years, and $100,627 in 30 years — without adding a single dollar. Starting 10 years earlier can double your final wealth. The key variable isn't how much you invest, but how long your money compounds.",
};

type View = "main" | "book" | "investor" | "behavioral";

const KnowledgePage = () => {
  const [view, setView] = useState<View>("main");
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState<typeof investors[0] | null>(null);

  const backToMain = () => { setView("main"); setSelectedBook(null); setSelectedInvestor(null); };

  if (view === "book" && selectedBook) {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button onClick={backToMain} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Back to Library</button>
          <span className="text-sm font-medium text-primary mb-2 block">{selectedBook.category}</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-1">{selectedBook.title}</h1>
          <p className="text-muted-foreground mb-8">by {selectedBook.author} · {selectedBook.year}</p>
          <div className="space-y-6">
            <div className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-2 mb-3"><BookOpen className="w-4 h-4 text-primary" /><h3 className="font-serif font-bold text-lg text-foreground">Summary</h3></div>
              <p className="text-muted-foreground leading-relaxed">{selectedBook.summary}</p>
            </div>
            <div className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-2 mb-4"><Lightbulb className="w-4 h-4 text-accent" /><h3 className="font-serif font-bold text-lg text-foreground">Key Takeaways</h3></div>
              <ul className="space-y-3">{selectedBook.takeaways.map((t, i) => (<li key={i} className="flex gap-3 text-muted-foreground leading-relaxed"><Star className="w-4 h-4 text-accent mt-1 shrink-0" /><span>{t}</span></li>))}</ul>
            </div>
            <div className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-2 mb-3"><Target className="w-4 h-4 text-primary" /><h3 className="font-serif font-bold text-lg text-foreground">Practical Application</h3></div>
              <p className="text-muted-foreground leading-relaxed">{selectedBook.application}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "investor" && selectedInvestor) {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button onClick={backToMain} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Back to Library</button>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><User className="w-8 h-8 text-primary" /></div>
            <div><h1 className="text-3xl font-serif font-bold text-foreground">{selectedInvestor.name}</h1><p className="text-muted-foreground">{selectedInvestor.title}</p></div>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl bg-card border border-border p-6 shadow-card">
              <h3 className="font-serif font-bold text-lg text-foreground mb-2">Philosophy</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedInvestor.philosophy}</p>
            </div>
            <div className="rounded-xl bg-card border border-border p-6 shadow-card">
              <h3 className="font-serif font-bold text-lg text-foreground mb-2">Strategy</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedInvestor.strategy}</p>
            </div>
            <div className="rounded-xl bg-accent/10 border border-accent/20 p-6">
              <h3 className="font-serif font-bold text-lg text-foreground mb-3">Notable Quotes</h3>
              <ul className="space-y-3">{selectedInvestor.quotes.map((q, i) => (<li key={i} className="text-foreground italic leading-relaxed">"{q}"</li>))}</ul>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
              <h3 className="font-serif font-bold text-lg text-foreground mb-2">Key Lesson</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedInvestor.lesson}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "behavioral") {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button onClick={backToMain} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Back to Library</button>
          <div className="flex items-center gap-3 mb-2"><Brain className="w-8 h-8 text-primary" /><h1 className="text-3xl font-serif font-bold text-foreground">Behavioral Finance</h1></div>
          <p className="text-muted-foreground mb-8">Understanding the psychological traps that sabotage your investment returns — and how to overcome them.</p>
          <div className="space-y-4">
            {behavioralBiases.map((b) => (
              <div key={b.name} className="rounded-xl bg-card border border-border p-6 shadow-card">
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">{b.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">{b.desc}</p>
                <div className="rounded-lg bg-success/5 border border-success/20 p-3">
                  <p className="text-sm text-foreground"><strong className="text-success">Remedy:</strong> {b.remedy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"><Library className="w-3.5 h-3.5" /> Curated Wisdom</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">Knowledge Library</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Key insights from the world's best books, investors, and resources on building wealth.</p>
        </div>

        {/* Concept of the Week */}
        <div className="rounded-2xl bg-hero-gradient text-primary-foreground p-8 sm:p-10 shadow-elevated mb-10">
          <div className="flex items-center gap-2 mb-4"><Sparkles className="w-5 h-5" /><span className="text-sm font-medium uppercase tracking-wider opacity-80">Concept of the Week</span></div>
          <h3 className="text-2xl font-serif font-bold mb-3">{conceptOfTheWeek.title}</h3>
          <p className="opacity-90 leading-relaxed mb-4">{conceptOfTheWeek.summary}</p>
          <p className="opacity-80 text-sm leading-relaxed mb-3"><strong>Historical Note:</strong> {conceptOfTheWeek.history}</p>
          <p className="opacity-80 text-sm leading-relaxed"><strong>In Practice:</strong> {conceptOfTheWeek.context}</p>
        </div>

        {/* Books */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> Book Summaries</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <motion.button key={book.id} whileHover={{ y: -4 }} onClick={() => { setSelectedBook(book); setView("book"); }}
                className="text-left rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated transition-all">
                <span className="text-xs font-medium text-primary mb-2 block">{book.category}</span>
                <h3 className="font-serif font-bold text-lg text-foreground mb-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{book.summary}</p>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Investor Spotlights */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4 flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Investor Spotlights</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {investors.map((inv) => (
              <motion.button key={inv.name} whileHover={{ y: -4 }} onClick={() => { setSelectedInvestor(inv); setView("investor"); }}
                className="text-left rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated transition-all">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3"><User className="w-5 h-5 text-primary" /></div>
                <h3 className="font-serif font-bold text-lg text-foreground mb-1">{inv.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{inv.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{inv.philosophy}</p>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Behavioral Finance */}
        <section className="mb-10">
          <button onClick={() => setView("behavioral")} className="w-full text-left rounded-xl bg-accent/10 border border-accent/20 p-6 hover:bg-accent/15 transition-colors">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-accent" />
              <div>
                <h2 className="text-xl font-serif font-bold text-foreground">Behavioral Finance</h2>
                <p className="text-sm text-muted-foreground">Understand the psychological biases that sabotage investors — and how to overcome them.</p>
              </div>
            </div>
          </button>
        </section>

        {/* Podcasts */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4 flex items-center gap-2"><Headphones className="w-5 h-5 text-primary" /> Recommended Podcasts</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {podcasts.map((p) => (
              <div key={p.title} className="rounded-xl bg-card border border-border p-5 shadow-card">
                <h3 className="font-serif font-bold text-foreground mb-1">{p.title}</h3>
                <p className="text-xs text-primary font-medium mb-2">{p.host}</p>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Documentaries */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4 flex items-center gap-2"><Film className="w-5 h-5 text-primary" /> Documentaries & Films</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {documentaries.map((d) => (
              <div key={d.title} className="rounded-xl bg-card border border-border p-5 shadow-card">
                <h3 className="font-serif font-bold text-foreground mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{d.desc}</p>
                <p className="text-sm text-foreground"><strong className="text-primary">Key Lesson:</strong> {d.lesson}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default KnowledgePage;
