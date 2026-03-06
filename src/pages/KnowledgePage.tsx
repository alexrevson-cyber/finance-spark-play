import { useState } from "react";
import { motion } from "framer-motion";
import { Library, BookOpen, ArrowLeft, Star, Lightbulb, Target, User, Headphones, Film, Brain, Sparkles, ExternalLink, Quote, Award, BookMarked } from "lucide-react";
import { books, Book } from "@/data/knowledge/books";
import { investors, Investor } from "@/data/knowledge/investors";
import { podcasts } from "@/data/knowledge/podcasts";
import { documentaries } from "@/data/knowledge/documentaries";
import { behavioralBiases, BehavioralBias } from "@/data/knowledge/behavioral";
import { mindsetArticles, MindsetArticle } from "@/data/knowledge/mindset";
import { conceptsOfTheWeek } from "@/data/knowledge/concepts";

const getWeeklyConceptIndex = () => {
  const start = new Date(2025, 0, 6);
  const now = new Date();
  const weeks = Math.floor((now.getTime() - start.getTime()) / (7 * 86400000));
  return weeks % conceptsOfTheWeek.length;
};

type View = "main" | "book" | "investor" | "behavioral" | "bias" | "podcasts" | "documentaries" | "mindset" | "mindset-article" | "concepts-archive";

const KnowledgePage = () => {
  const [view, setView] = useState<View>("main");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [selectedBias, setSelectedBias] = useState<BehavioralBias | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<MindsetArticle | null>(null);

  const concept = conceptsOfTheWeek[getWeeklyConceptIndex()];

  const backToMain = () => { setView("main"); setSelectedBook(null); setSelectedInvestor(null); setSelectedBias(null); setSelectedArticle(null); };

  const BackButton = () => (
    <button onClick={backToMain} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-medium">
      <ArrowLeft className="w-4 h-4" /> Back to Library
    </button>
  );

  // Book detail
  if (view === "book" && selectedBook) {
    const relatedBooks = books.filter(b => selectedBook.relatedBooks.includes(b.id));
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <BackButton />
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-medium text-primary px-2 py-0.5 rounded-full bg-primary/10">{selectedBook.category}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${selectedBook.difficulty === "Easy Read" ? "bg-success/10 text-success" : selectedBook.difficulty === "Moderate" ? "bg-accent/10 text-accent-foreground" : "bg-destructive/10 text-destructive"}`}>{selectedBook.difficulty}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-1">{selectedBook.title}</h1>
          <p className="text-muted-foreground mb-8">by {selectedBook.author} · {selectedBook.year}</p>

          <div className="space-y-6">
            {/* Quote */}
            <div className="rounded-xl bg-accent/10 border border-accent/20 p-6">
              <Quote className="w-5 h-5 text-accent mb-2" />
              <p className="text-foreground font-serif text-lg italic leading-relaxed">"{selectedBook.quote}"</p>
            </div>

            {/* Summary */}
            <div className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-2 mb-3"><BookOpen className="w-4 h-4 text-primary" /><h3 className="font-serif font-bold text-lg text-foreground">Summary</h3></div>
              <div className="space-y-4">{selectedBook.summary.map((p, i) => <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>)}</div>
            </div>

            {/* Takeaways */}
            <div className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-2 mb-4"><Lightbulb className="w-4 h-4 text-accent" /><h3 className="font-serif font-bold text-lg text-foreground">5 Key Takeaways</h3></div>
              <ul className="space-y-3">{selectedBook.takeaways.map((t, i) => <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed"><Star className="w-4 h-4 text-accent mt-1 shrink-0" /><span>{t}</span></li>)}</ul>
            </div>

            {/* Application */}
            <div className="rounded-xl bg-card border border-border p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-2 mb-4"><Target className="w-4 h-4 text-primary" /><h3 className="font-serif font-bold text-lg text-foreground">How to Apply This</h3></div>
              <ol className="space-y-3">{selectedBook.application.map((a, i) => <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed"><span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span><span>{a}</span></li>)}</ol>
            </div>

            {/* Related */}
            {relatedBooks.length > 0 && (
              <div className="rounded-xl bg-secondary/50 border border-border p-6">
                <h3 className="font-serif font-bold text-foreground mb-3">You Might Also Like</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {relatedBooks.map(rb => (
                    <button key={rb.id} onClick={() => setSelectedBook(rb)} className="text-left rounded-lg bg-card border border-border p-4 hover:shadow-soft transition-all">
                      <p className="font-bold text-foreground text-sm">{rb.title}</p>
                      <p className="text-xs text-muted-foreground">by {rb.author}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Investor detail
  if (view === "investor" && selectedInvestor) {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <BackButton />
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><User className="w-8 h-8 text-primary" /></div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">{selectedInvestor.name}</h1>
              <p className="text-muted-foreground text-sm">{selectedInvestor.title}</p>
            </div>
          </div>
          <div className="flex gap-3 text-xs text-muted-foreground mb-8">
            <span>{selectedInvestor.nationality}</span>
            <span>·</span>
            <span>Net Worth: {selectedInvestor.netWorth}</span>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl bg-card border border-border p-6 shadow-card">
              <h3 className="font-serif font-bold text-lg text-foreground mb-2">Background</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedInvestor.background}</p>
            </div>
            <div className="rounded-xl bg-card border border-border p-6 shadow-card">
              <h3 className="font-serif font-bold text-lg text-foreground mb-2">Investment Philosophy</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedInvestor.philosophy}</p>
            </div>
            <div className="rounded-xl bg-card border border-border p-6 shadow-card">
              <h3 className="font-serif font-bold text-lg text-foreground mb-2">Famous Trades & Decisions</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedInvestor.famousTrades}</p>
            </div>
            <div className="rounded-xl bg-accent/10 border border-accent/20 p-6">
              <h3 className="font-serif font-bold text-lg text-foreground mb-4">Best Quotes</h3>
              <div className="space-y-4">
                {selectedInvestor.quotes.map((q, i) => (
                  <div key={i}>
                    <p className="text-foreground font-serif italic leading-relaxed">"{q.text}"</p>
                    <p className="text-sm text-muted-foreground mt-1">{q.context}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
              <h3 className="font-serif font-bold text-lg text-foreground mb-3">Key Lessons</h3>
              <ul className="space-y-2">{selectedInvestor.lessons.map((l, i) => <li key={i} className="flex gap-2 text-muted-foreground text-sm leading-relaxed"><Star className="w-3.5 h-3.5 text-primary mt-1 shrink-0" /><span>{l}</span></li>)}</ul>
            </div>
            <div className="rounded-xl bg-secondary/50 border border-border p-6">
              <h3 className="font-serif font-bold text-foreground mb-2">Recommended Reading</h3>
              <ul className="space-y-1">{selectedInvestor.recommendedBooks.map((b, i) => <li key={i} className="text-sm text-muted-foreground">📚 {b}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Bias detail
  if (view === "bias" && selectedBias) {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button onClick={() => { setView("behavioral"); setSelectedBias(null); }} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Back to Behavioral Finance</button>
          <Brain className="w-10 h-10 text-primary mb-3" />
          <h1 className="text-3xl font-serif font-bold text-foreground mb-6">{selectedBias.name}</h1>
          <div className="space-y-6">
            <div className="rounded-xl bg-card border border-border p-6 shadow-card">
              <h3 className="font-serif font-bold text-foreground mb-2">What It Is</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedBias.whatItIs}</p>
            </div>
            <div className="rounded-xl bg-card border border-border p-6 shadow-card">
              <h3 className="font-serif font-bold text-foreground mb-2">Why It Happens</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedBias.whyItHappens}</p>
            </div>
            <div className="rounded-xl bg-accent/10 border border-accent/20 p-6">
              <h3 className="font-serif font-bold text-foreground mb-2">Real-World Example</h3>
              <p className="text-foreground leading-relaxed">{selectedBias.example}</p>
            </div>
            <div className="rounded-xl bg-success/5 border border-success/20 p-6">
              <h3 className="font-serif font-bold text-foreground mb-3">How to Overcome It</h3>
              <ul className="space-y-3">{selectedBias.howToOvercome.map((h, i) => <li key={i} className="flex gap-2 text-muted-foreground leading-relaxed"><span className="text-success font-bold">✓</span><span>{h}</span></li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Behavioral list
  if (view === "behavioral") {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <BackButton />
          <div className="flex items-center gap-3 mb-2"><Brain className="w-8 h-8 text-primary" /><h1 className="text-3xl font-serif font-bold text-foreground">Behavioral Finance</h1></div>
          <p className="text-muted-foreground mb-8">Understanding the psychological traps that sabotage your investment returns — and how to overcome them.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {behavioralBiases.map(b => (
              <motion.button key={b.id} whileHover={{ y: -4 }} onClick={() => { setSelectedBias(b); setView("bias"); }}
                className="text-left rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated transition-all">
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">{b.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{b.whatItIs}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Podcasts page
  if (view === "podcasts") {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <BackButton />
          <div className="flex items-center gap-3 mb-2"><Headphones className="w-8 h-8 text-primary" /><h1 className="text-3xl font-serif font-bold text-foreground">Podcast Recommendations</h1></div>
          <p className="text-muted-foreground mb-8">Learn investing on the go with these top-rated financial podcasts.</p>
          <div className="space-y-4">
            {podcasts.map(p => (
              <div key={p.title} className="rounded-xl bg-card border border-border p-6 shadow-card">
                <h3 className="font-serif font-bold text-lg text-foreground mb-1">{p.title}</h3>
                <p className="text-xs text-primary font-medium mb-2">Hosted by {p.host}</p>
                <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                <p className="text-sm text-foreground mb-3"><strong>Start with:</strong> {p.bestEpisode}</p>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1">
                  Listen <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Documentaries page
  if (view === "documentaries") {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <BackButton />
          <div className="flex items-center gap-3 mb-2"><Film className="w-8 h-8 text-primary" /><h1 className="text-3xl font-serif font-bold text-foreground">Documentaries & Films</h1></div>
          <p className="text-muted-foreground mb-8">Watch and learn — the best financial films with key investment lessons.</p>
          <div className="space-y-4">
            {documentaries.map(d => (
              <div key={d.title} className="rounded-xl bg-card border border-border p-6 shadow-card">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-serif font-bold text-lg text-foreground">{d.title} ({d.year})</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{d.whereToWatch}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Directed by {d.director}</p>
                <p className="text-sm text-muted-foreground mb-4">{d.desc}</p>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground uppercase tracking-wider">Key Lessons</p>
                  {d.lessons.map((l, i) => <p key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-primary shrink-0">•</span>{l}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Mindset article detail
  if (view === "mindset-article" && selectedArticle) {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <button onClick={() => { setView("mindset"); setSelectedArticle(null); }} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm font-medium"><ArrowLeft className="w-4 h-4" /> Back to Investor Mindset</button>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-6">{selectedArticle.title}</h1>
          <div className="space-y-6">
            {selectedArticle.content.map((p, i) => <p key={i} className="text-muted-foreground leading-relaxed text-base">{p}</p>)}
          </div>
        </div>
      </div>
    );
  }

  // Mindset section
  if (view === "mindset") {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <BackButton />
          <div className="flex items-center gap-3 mb-2"><Award className="w-8 h-8 text-primary" /><h1 className="text-3xl font-serif font-bold text-foreground">Investor Mindset</h1></div>
          <p className="text-muted-foreground mb-8">Develop the mental frameworks and habits that separate successful investors from the rest.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {mindsetArticles.map(a => (
              <motion.button key={a.id} whileHover={{ y: -4 }} onClick={() => { setSelectedArticle(a); setView("mindset-article"); }}
                className="text-left rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated transition-all">
                <h3 className="font-serif font-bold text-foreground mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{a.content[0]}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Concepts archive
  if (view === "concepts-archive") {
    return (
      <div className="min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <BackButton />
          <div className="flex items-center gap-3 mb-2"><BookMarked className="w-8 h-8 text-primary" /><h1 className="text-3xl font-serif font-bold text-foreground">Concept Archive</h1></div>
          <p className="text-muted-foreground mb-8">Browse all past Concepts of the Week.</p>
          <div className="space-y-4">
            {conceptsOfTheWeek.map((c, i) => (
              <div key={c.id} className={`rounded-xl bg-card border p-6 shadow-card ${i === getWeeklyConceptIndex() ? "border-primary" : "border-border"}`}>
                {i === getWeeklyConceptIndex() && <span className="text-xs font-medium text-primary mb-2 block">📌 This Week</span>}
                <h3 className="font-serif font-bold text-lg text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{c.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main view
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><Sparkles className="w-5 h-5" /><span className="text-sm font-medium uppercase tracking-wider opacity-80">Concept of the Week</span></div>
            <button onClick={() => setView("concepts-archive")} className="text-xs underline opacity-70 hover:opacity-100">View Archive</button>
          </div>
          <h3 className="text-2xl font-serif font-bold mb-3">{concept.title}</h3>
          <p className="opacity-90 leading-relaxed mb-4">{concept.explanation}</p>
          <p className="opacity-80 text-sm leading-relaxed"><strong>Example:</strong> {concept.example}</p>
        </div>

        {/* Books */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> Book Summaries <span className="text-sm font-normal text-muted-foreground">({books.length})</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {books.map(book => (
              <motion.button key={book.id} whileHover={{ y: -4 }} onClick={() => { setSelectedBook(book); setView("book"); }}
                className="text-left rounded-xl bg-card border border-border p-5 shadow-card hover:shadow-elevated transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-primary">{book.category}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${book.difficulty === "Easy Read" ? "bg-success/10 text-success" : book.difficulty === "Moderate" ? "bg-accent/10 text-accent-foreground" : "bg-destructive/10 text-destructive"}`}>{book.difficulty}</span>
                </div>
                <h3 className="font-serif font-bold text-foreground mb-0.5 text-sm">{book.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{book.author} · {book.year}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{book.summary[0]}</p>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Investors */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4 flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Investor Spotlights <span className="text-sm font-normal text-muted-foreground">({investors.length})</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {investors.map(inv => (
              <motion.button key={inv.id} whileHover={{ y: -4 }} onClick={() => { setSelectedInvestor(inv); setView("investor"); }}
                className="text-left rounded-xl bg-card border border-border p-5 shadow-card hover:shadow-elevated transition-all">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3"><User className="w-5 h-5 text-primary" /></div>
                <h3 className="font-serif font-bold text-foreground mb-0.5">{inv.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{inv.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{inv.philosophy.slice(0, 120)}…</p>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Sub-sections row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <button onClick={() => setView("behavioral")} className="text-left rounded-xl bg-accent/10 border border-accent/20 p-6 hover:bg-accent/15 transition-colors">
            <Brain className="w-8 h-8 text-accent mb-2" />
            <h3 className="font-serif font-bold text-lg text-foreground">Behavioral Finance</h3>
            <p className="text-sm text-muted-foreground">{behavioralBiases.length} cognitive biases explained</p>
          </button>
          <button onClick={() => setView("mindset")} className="text-left rounded-xl bg-primary/5 border border-primary/20 p-6 hover:bg-primary/10 transition-colors">
            <Award className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-serif font-bold text-lg text-foreground">Investor Mindset</h3>
            <p className="text-sm text-muted-foreground">{mindsetArticles.length} articles on strategy & discipline</p>
          </button>
          <button onClick={() => setView("concepts-archive")} className="text-left rounded-xl bg-success/5 border border-success/20 p-6 hover:bg-success/10 transition-colors">
            <BookMarked className="w-8 h-8 text-success mb-2" />
            <h3 className="font-serif font-bold text-lg text-foreground">Concept Archive</h3>
            <p className="text-sm text-muted-foreground">{conceptsOfTheWeek.length} weeks of concepts</p>
          </button>
        </div>

        {/* Podcasts */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2"><Headphones className="w-5 h-5 text-primary" /> Podcasts</h2>
            <button onClick={() => setView("podcasts")} className="text-sm text-primary font-medium hover:underline">View All →</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {podcasts.slice(0, 6).map(p => (
              <div key={p.title} className="rounded-xl bg-card border border-border p-5 shadow-card">
                <h3 className="font-serif font-bold text-foreground mb-1 text-sm">{p.title}</h3>
                <p className="text-xs text-primary font-medium mb-2">{p.host}</p>
                <p className="text-xs text-muted-foreground line-clamp-3">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Documentaries */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2"><Film className="w-5 h-5 text-primary" /> Documentaries & Films</h2>
            <button onClick={() => setView("documentaries")} className="text-sm text-primary font-medium hover:underline">View All →</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentaries.slice(0, 6).map(d => (
              <div key={d.title} className="rounded-xl bg-card border border-border p-5 shadow-card">
                <h3 className="font-serif font-bold text-foreground mb-1 text-sm">{d.title} ({d.year})</h3>
                <p className="text-xs text-muted-foreground mb-2">{d.whereToWatch}</p>
                <p className="text-xs text-muted-foreground line-clamp-3">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default KnowledgePage;
