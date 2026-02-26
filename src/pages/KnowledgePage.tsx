import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Library, BookOpen, ArrowLeft, Star, Lightbulb, Target } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: string;
  summary: string;
  takeaways: string[];
  application: string;
}

const books: Book[] = [
  {
    id: "rich-dad",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    year: 1997,
    category: "Mindset",
    summary: "Kiyosaki contrasts the financial philosophies of his two 'dads' — his biological father (poor dad) who valued job security, and his best friend's father (rich dad) who built wealth through assets and investments. The core lesson: the rich don't work for money; they make money work for them.",
    takeaways: [
      "Assets put money in your pocket; liabilities take it out. Focus on acquiring assets.",
      "Financial literacy is more important than how much money you make.",
      "The rich focus on building and buying businesses and investments, not just earning a paycheck.",
      "Fear and ignorance keep people trapped in the 'rat race' of working for money.",
    ],
    application: "Start by tracking what you own — is it an asset (generates income) or a liability (costs you money)? Shift your mindset from 'I can't afford it' to 'How can I afford it?' Begin investing, even small amounts, to start building your asset column.",
  },
  {
    id: "intelligent-investor",
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    year: 1949,
    category: "Value Investing",
    summary: "Often called the bible of investing, Graham introduces the concept of 'value investing' — buying stocks when they're priced below their intrinsic value. He emphasizes the importance of emotional discipline, margin of safety, and treating investing as a business rather than a gamble.",
    takeaways: [
      "Mr. Market is emotional — take advantage of market pessimism to buy quality at a discount.",
      "Always invest with a 'margin of safety' — buy below intrinsic value to cushion against mistakes.",
      "Distinguish between investing (thorough analysis) and speculation (guessing).",
      "Defensive investors should focus on diversified, high-quality portfolios; enterprising investors can seek bargains.",
    ],
    application: "Before buying any investment, ask: 'What is this actually worth?' Don't chase trends or hot tips. Build a diversified portfolio of quality investments purchased at reasonable prices, and have the patience to hold through market swings.",
  },
  {
    id: "random-walk",
    title: "A Random Walk Down Wall Street",
    author: "Burton Malkiel",
    year: 1973,
    category: "Market Theory",
    summary: "Malkiel argues that stock prices are essentially random and unpredictable in the short term. He makes a compelling case that most professional fund managers can't consistently beat the market, and that passive index fund investing is the best strategy for most people.",
    takeaways: [
      "Stock prices follow a 'random walk' — past movements don't predict future ones.",
      "Most actively managed funds underperform index funds over time, especially after fees.",
      "Diversification across asset classes and geographies is essential.",
      "Time in the market beats timing the market.",
    ],
    application: "Stop trying to pick individual winners or time the market. Instead, invest regularly in low-cost index funds, diversify globally, and let compound growth work over decades. This strategy beats most professional investors.",
  },
  {
    id: "psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    year: 2020,
    category: "Behavioral Finance",
    summary: "Housel explores how personal history, emotions, and psychology drive financial decisions more than spreadsheets and formulas. He argues that doing well with money has little to do with intelligence and everything to do with behavior.",
    takeaways: [
      "No one is crazy — everyone makes financial decisions based on their unique experiences.",
      "Wealth is what you don't see — it's the money not spent.",
      "Getting wealthy requires optimism; staying wealthy requires pessimism (paranoia about risks).",
      "The most powerful financial force is compound growth, which requires patience above all.",
    ],
    application: "Define 'enough' for yourself. Save not for a specific goal but for flexibility and freedom. Accept that you'll make mistakes, build margin for error, and focus on not interrupting compound growth. Your behavior matters more than your brilliance.",
  },
  {
    id: "think-and-grow-rich",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    year: 1937,
    category: "Mindset",
    summary: "Based on Hill's study of 500+ successful individuals, this classic argues that wealth begins with a definite purpose, burning desire, and unwavering faith. It's less about specific tactics and more about the mental framework required to build wealth.",
    takeaways: [
      "A definite, burning desire backed by a concrete plan is the starting point of all achievement.",
      "Your thoughts shape your reality — cultivate a wealth-oriented mindset.",
      "Mastermind groups and surrounding yourself with ambitious people accelerates success.",
      "Persistence through temporary defeat separates the successful from the unsuccessful.",
    ],
    application: "Write down a specific financial goal with a deadline. Create a plan to achieve it. Read your goal daily and take consistent action. Find a group of like-minded people to learn from and hold you accountable.",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    category: "Habits & Mindset",
    summary: "Clear reveals how tiny changes in behavior compound into remarkable results over time. The framework applies powerfully to financial habits — from automating savings to building consistent investing routines.",
    takeaways: [
      "1% improvements compound into massive change over time — focus on systems, not goals.",
      "Make good habits obvious, attractive, easy, and satisfying.",
      "Identity-based habits stick: say 'I am an investor' not 'I want to invest'.",
      "Environment design matters more than willpower — automate your financial behaviors.",
    ],
    application: "Automate your investing: set up a recurring transfer on payday to your investment account. Make it easy by using a simple index fund. Track your net worth monthly to make progress visible and satisfying. Small, consistent actions beat dramatic occasional efforts.",
  },
  {
    id: "little-book",
    title: "The Little Book of Common Sense Investing",
    author: "John Bogle",
    year: 2007,
    category: "Index Investing",
    summary: "Bogle, founder of Vanguard and pioneer of index funds, makes the definitive case for low-cost index fund investing. He demonstrates with data that trying to beat the market is a loser's game for most investors, and simplicity wins.",
    takeaways: [
      "The stock market returns are a zero-sum game — costs (fees, taxes) make it a loser's game for active investors.",
      "Low-cost index funds capture the entire market's return at minimal expense.",
      "Don't look for the needle in the haystack — buy the haystack.",
      "Stay the course: resist the urge to react to market fluctuations.",
    ],
    application: "Open a brokerage account and invest in a total market index fund with the lowest expense ratio you can find. Contribute regularly, reinvest dividends, and ignore the daily market noise. Boring investing is the most profitable investing.",
  },
];

const KnowledgePage = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {selectedBook ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedBook(null)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Library
              </button>

              <div className="mb-8">
                <span className="text-sm font-medium text-primary mb-2 block">{selectedBook.category}</span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-1">
                  {selectedBook.title}
                </h1>
                <p className="text-muted-foreground">
                  by {selectedBook.author} · {selectedBook.year}
                </p>
              </div>

              <div className="space-y-8 max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                  className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-card"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <h3 className="font-serif font-bold text-lg text-foreground">Summary</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{selectedBook.summary}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-card"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    <h3 className="font-serif font-bold text-lg text-foreground">Key Takeaways</h3>
                  </div>
                  <ul className="space-y-3">
                    {selectedBook.takeaways.map((t, i) => (
                      <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <Star className="w-4 h-4 text-accent mt-1 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-card"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-primary" />
                    <h3 className="font-serif font-bold text-lg text-foreground">Practical Application</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{selectedBook.application}</p>
                </motion.div>
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
                  <Library className="w-3.5 h-3.5" />
                  Curated Wisdom
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">
                  Knowledge Library
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Key insights from the world's best books on investing, money, and building wealth.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book, i) => (
                  <motion.button
                    key={book.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    onClick={() => setSelectedBook(book)}
                    className="text-left rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <span className="text-xs font-medium text-primary mb-3 block">{book.category}</span>
                    <h3 className="font-serif font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">by {book.author}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{book.summary}</p>
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

export default KnowledgePage;
