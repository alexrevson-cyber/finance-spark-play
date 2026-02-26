import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, PieChart, Target, ArrowLeft } from "lucide-react";

// --- Compound Interest Calculator ---
const CompoundInterestCalc = () => {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(200);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);

  const r = rate / 100 / 12;
  const n = years * 12;
  const futureValue = initial * Math.pow(1 + r, n) + monthly * ((Math.pow(1 + r, n) - 1) / r);
  const totalContributed = initial + monthly * n;
  const interestEarned = futureValue - totalContributed;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: "Starting Amount ($)", value: initial, set: setInitial, min: 0, max: 1000000, step: 100 },
          { label: "Monthly Contribution ($)", value: monthly, set: setMonthly, min: 0, max: 10000, step: 25 },
          { label: "Annual Return (%)", value: rate, set: setRate, min: 1, max: 20, step: 0.5 },
          { label: "Years", value: years, set: setYears, min: 1, max: 50, step: 1 },
        ].map((field) => (
          <div key={field.label}>
            <label className="text-sm font-medium text-foreground mb-1.5 block">{field.label}</label>
            <input
              type="number"
              value={field.value}
              onChange={(e) => field.set(Number(e.target.value))}
              min={field.min}
              max={field.max}
              step={field.step}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="range"
              value={field.value}
              onChange={(e) => field.set(Number(e.target.value))}
              min={field.min}
              max={field.max}
              step={field.step}
              className="w-full mt-2 accent-primary"
            />
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <ResultCard label="Future Value" value={futureValue} accent />
        <ResultCard label="Total Contributed" value={totalContributed} />
        <ResultCard label="Interest Earned" value={interestEarned} />
      </div>

      {/* Simple bar visualization */}
      <div className="rounded-xl bg-secondary/50 p-4">
        <div className="flex items-end gap-1 h-24">
          {Array.from({ length: Math.min(years, 30) }, (_, i) => {
            const yr = i + 1;
            const rr = rate / 100 / 12;
            const nn = yr * 12;
            const fv = initial * Math.pow(1 + rr, nn) + monthly * ((Math.pow(1 + rr, nn) - 1) / rr);
            const height = (fv / futureValue) * 100;
            return (
              <div
                key={yr}
                className="flex-1 bg-primary/60 rounded-t-sm hover:bg-primary transition-colors"
                style={{ height: `${height}%` }}
                title={`Year ${yr}: $${fv.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              />
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">Growth over {years} years</p>
      </div>
    </div>
  );
};

// --- DCA Calculator ---
const DCACalculator = () => {
  const [monthlyAmount, setMonthlyAmount] = useState(500);
  const [months, setMonths] = useState(60);
  const [avgReturn, setAvgReturn] = useState(10);

  const r = avgReturn / 100 / 12;
  const dcaValue = monthlyAmount * ((Math.pow(1 + r, months) - 1) / r);
  const lumpSum = monthlyAmount * months;
  const lumpValue = lumpSum * Math.pow(1 + avgReturn / 100, months / 12);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Monthly Investment ($)</label>
          <input
            type="number"
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Duration (months)</label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Avg Annual Return (%)</label>
          <input
            type="number"
            value={avgReturn}
            onChange={(e) => setAvgReturn(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <ResultCard label="DCA Final Value" value={dcaValue} accent />
        <ResultCard label="Total Invested" value={monthlyAmount * months} />
        <ResultCard label="Lump Sum Value" value={lumpValue} />
      </div>
      <p className="text-sm text-muted-foreground">
        Dollar-cost averaging reduces the impact of volatility by investing consistently over time, regardless of price swings.
      </p>
    </div>
  );
};

// --- Retirement Planner ---
const RetirementPlanner = () => {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [savings, setSavings] = useState(20000);
  const [monthlyContrib, setMonthlyContrib] = useState(500);
  const [returnRate, setReturnRate] = useState(7);
  const [targetAmount, setTargetAmount] = useState(1000000);

  const years = Math.max(retireAge - age, 1);
  const r = returnRate / 100 / 12;
  const n = years * 12;
  const projected = savings * Math.pow(1 + r, n) + monthlyContrib * ((Math.pow(1 + r, n) - 1) / r);
  const onTrack = projected >= targetAmount;
  const percentToGoal = Math.min((projected / targetAmount) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Current Age", value: age, set: setAge },
          { label: "Retirement Age", value: retireAge, set: setRetireAge },
          { label: "Current Savings ($)", value: savings, set: setSavings },
          { label: "Monthly Contribution ($)", value: monthlyContrib, set: setMonthlyContrib },
          { label: "Expected Return (%)", value: returnRate, set: setReturnRate },
          { label: "Retirement Goal ($)", value: targetAmount, set: setTargetAmount },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-sm font-medium text-foreground mb-1.5 block">{f.label}</label>
            <input
              type="number"
              value={f.value}
              onChange={(e) => f.set(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <ResultCard label="Projected at Retirement" value={projected} accent />
        <div className={`rounded-xl p-6 border ${onTrack ? "border-success bg-success/5" : "border-accent bg-accent/5"}`}>
          <p className="text-sm text-muted-foreground mb-1">Progress to Goal</p>
          <p className={`text-2xl font-bold ${onTrack ? "text-success" : "text-accent"}`}>
            {percentToGoal.toFixed(0)}%
          </p>
          <div className="w-full h-2 rounded-full bg-secondary mt-2">
            <div
              className={`h-full rounded-full transition-all ${onTrack ? "bg-success" : "bg-accent"}`}
              style={{ width: `${percentToGoal}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {onTrack ? "🎉 You're on track!" : "Consider increasing your contributions"}
          </p>
        </div>
      </div>
    </div>
  );
};

const ResultCard = ({ label, value, accent }: { label: string; value: number; accent?: boolean }) => (
  <div className={`rounded-xl p-6 border ${accent ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
    <p className="text-sm text-muted-foreground mb-1">{label}</p>
    <p className={`text-2xl font-bold ${accent ? "text-primary" : "text-foreground"}`}>
      ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
    </p>
  </div>
);

const tools = [
  { id: "compound", title: "Compound Interest Calculator", icon: Calculator, desc: "See how your money grows over time", component: CompoundInterestCalc },
  { id: "dca", title: "Dollar-Cost Averaging", icon: TrendingUp, desc: "Compare DCA vs. lump-sum investing", component: DCACalculator },
  { id: "retirement", title: "Retirement Planner", icon: Target, desc: "Check if you're on track for your goals", component: RetirementPlanner },
];

const ToolsPage = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const active = tools.find((t) => t.id === activeTool);

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {active ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              onClick={() => setActiveTool(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Tools
            </button>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <active.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">{active.title}</h1>
                <p className="text-muted-foreground">{active.desc}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-card">
              <active.component />
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Calculator className="w-3.5 h-3.5" />
                Interactive Tools
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">
                Financial Calculators
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Turn knowledge into action. Use these tools to plan, simulate, and visualize your financial future.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, i) => (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveTool(tool.id)}
                  className="text-left rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <tool.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-foreground mb-1">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ToolsPage;
