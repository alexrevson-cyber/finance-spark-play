import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Target, ArrowLeft, PieChart, Percent, Shield, DollarSign } from "lucide-react";

const ResultCard = ({ label, value, accent }: { label: string; value: number; accent?: boolean }) => (
  <div className={`rounded-xl p-5 border ${accent ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
    <p className="text-sm text-muted-foreground mb-1">{label}</p>
    <p className={`text-2xl font-bold ${accent ? "text-primary" : "text-foreground"}`}>
      ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
    </p>
  </div>
);

const InputField = ({ label, value, onChange, min, max, step, showSlider = false }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; showSlider?: boolean;
}) => (
  <div>
    <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
    <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} min={min} max={max} step={step}
      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    {showSlider && <input type="range" value={value} onChange={(e) => onChange(Number(e.target.value))} min={min} max={max} step={step} className="w-full mt-2 accent-primary" />}
  </div>
);

// Compound Interest
const CompoundInterestCalc = () => {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(200);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);
  const r = rate / 100 / 12, n = years * 12;
  const futureValue = initial * Math.pow(1 + r, n) + monthly * ((Math.pow(1 + r, n) - 1) / r);
  const totalContributed = initial + monthly * n;
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Starting Amount ($)" value={initial} onChange={setInitial} min={0} max={1000000} step={100} showSlider />
        <InputField label="Monthly Contribution ($)" value={monthly} onChange={setMonthly} min={0} max={10000} step={25} showSlider />
        <InputField label="Annual Return (%)" value={rate} onChange={setRate} min={1} max={20} step={0.5} showSlider />
        <InputField label="Years" value={years} onChange={setYears} min={1} max={50} step={1} showSlider />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <ResultCard label="Future Value" value={futureValue} accent />
        <ResultCard label="Total Contributed" value={totalContributed} />
        <ResultCard label="Interest Earned" value={futureValue - totalContributed} />
      </div>
      <div className="rounded-xl bg-secondary/50 p-4">
        <div className="flex items-end gap-1 h-24">
          {Array.from({ length: Math.min(years, 30) }, (_, i) => {
            const yr = i + 1, rr = rate / 100 / 12, nn = yr * 12;
            const fv = initial * Math.pow(1 + rr, nn) + monthly * ((Math.pow(1 + rr, nn) - 1) / rr);
            return <div key={yr} className="flex-1 bg-primary/60 rounded-t-sm hover:bg-primary transition-colors" style={{ height: `${(fv / futureValue) * 100}%` }}
              title={`Year ${yr}: $${fv.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />;
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">Growth over {years} years</p>
      </div>
    </div>
  );
};

// DCA Calculator
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
        <InputField label="Monthly Investment ($)" value={monthlyAmount} onChange={setMonthlyAmount} min={25} max={10000} step={25} />
        <InputField label="Duration (months)" value={months} onChange={setMonths} min={6} max={360} step={6} />
        <InputField label="Avg Annual Return (%)" value={avgReturn} onChange={setAvgReturn} min={1} max={20} step={0.5} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <ResultCard label="DCA Final Value" value={dcaValue} accent />
        <ResultCard label="Total Invested" value={monthlyAmount * months} />
        <ResultCard label="Lump Sum Value" value={lumpValue} />
      </div>
      <p className="text-sm text-muted-foreground">Dollar-cost averaging reduces volatility impact by investing consistently over time, regardless of price swings.</p>
    </div>
  );
};

// Retirement Planner
const RetirementPlanner = () => {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [savings, setSavings] = useState(20000);
  const [monthlyContrib, setMonthlyContrib] = useState(500);
  const [returnRate, setReturnRate] = useState(7);
  const [targetAmount, setTargetAmount] = useState(1000000);
  const years = Math.max(retireAge - age, 1), r = returnRate / 100 / 12, n = years * 12;
  const projected = savings * Math.pow(1 + r, n) + monthlyContrib * ((Math.pow(1 + r, n) - 1) / r);
  const onTrack = projected >= targetAmount;
  const pct = Math.min((projected / targetAmount) * 100, 100);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <InputField label="Current Age" value={age} onChange={setAge} min={18} max={80} step={1} />
        <InputField label="Retirement Age" value={retireAge} onChange={setRetireAge} min={30} max={90} step={1} />
        <InputField label="Current Savings ($)" value={savings} onChange={setSavings} min={0} max={5000000} step={1000} />
        <InputField label="Monthly Contribution ($)" value={monthlyContrib} onChange={setMonthlyContrib} min={0} max={10000} step={50} />
        <InputField label="Expected Return (%)" value={returnRate} onChange={setReturnRate} min={1} max={15} step={0.5} />
        <InputField label="Retirement Goal ($)" value={targetAmount} onChange={setTargetAmount} min={100000} max={10000000} step={50000} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <ResultCard label="Projected at Retirement" value={projected} accent />
        <div className={`rounded-xl p-5 border ${onTrack ? "border-success bg-success/5" : "border-accent bg-accent/5"}`}>
          <p className="text-sm text-muted-foreground mb-1">Progress to Goal</p>
          <p className={`text-2xl font-bold ${onTrack ? "text-success" : "text-accent"}`}>{pct.toFixed(0)}%</p>
          <div className="w-full h-2 rounded-full bg-secondary mt-2">
            <div className={`h-full rounded-full transition-all ${onTrack ? "bg-success" : "bg-accent"}`} style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{onTrack ? "🎉 You're on track!" : "Consider increasing contributions"}</p>
        </div>
      </div>
    </div>
  );
};

// Portfolio Allocation Simulator
const PortfolioSimulator = () => {
  const [stocks, setStocks] = useState(60);
  const [bonds, setBonds] = useState(30);
  const [reits, setReits] = useState(10);
  const [investment, setInvestment] = useState(50000);
  const [years, setYears] = useState(20);
  const returns = { stocks: 10, bonds: 5, reits: 8 };
  const weightedReturn = (stocks * returns.stocks + bonds * returns.bonds + reits * returns.reits) / 100;
  const projected = investment * Math.pow(1 + weightedReturn / 100, years);
  const total = stocks + bonds + reits;
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Stocks ({stocks}%)</label>
          <input type="range" value={stocks} onChange={(e) => { const v = Number(e.target.value); setStocks(v); setBonds(Math.max(0, 100 - v - reits)); }} min={0} max={100} className="w-full accent-primary" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Bonds ({bonds}%)</label>
          <input type="range" value={bonds} onChange={(e) => { const v = Number(e.target.value); setBonds(v); setReits(Math.max(0, 100 - stocks - v)); }} min={0} max={100 - stocks} className="w-full accent-primary" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">REITs ({reits}%)</label>
          <input type="range" value={reits} onChange={(e) => { const v = Number(e.target.value); setReits(v); setBonds(Math.max(0, 100 - stocks - v)); }} min={0} max={100 - stocks} className="w-full accent-primary" />
        </div>
      </div>
      {total !== 100 && <p className="text-xs text-destructive">Allocation totals {total}% — adjust to reach 100%.</p>}
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Initial Investment ($)" value={investment} onChange={setInvestment} min={1000} max={1000000} step={1000} />
        <InputField label="Time Horizon (years)" value={years} onChange={setYears} min={1} max={40} step={1} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <ResultCard label="Projected Value" value={projected} accent />
        <ResultCard label="Total Growth" value={projected - investment} />
        <div className="rounded-xl p-5 border border-border bg-card">
          <p className="text-sm text-muted-foreground mb-1">Weighted Return</p>
          <p className="text-2xl font-bold text-foreground">{weightedReturn.toFixed(1)}%</p>
        </div>
      </div>
      {/* Visual allocation bar */}
      <div className="rounded-xl overflow-hidden h-8 flex">
        {stocks > 0 && <div className="bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground" style={{ width: `${stocks}%` }}>{stocks}%</div>}
        {bonds > 0 && <div className="bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground" style={{ width: `${bonds}%` }}>{bonds}%</div>}
        {reits > 0 && <div className="bg-secondary flex items-center justify-center text-xs font-medium text-secondary-foreground" style={{ width: `${reits}%` }}>{reits}%</div>}
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary inline-block" /> Stocks (10%/yr)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-accent inline-block" /> Bonds (5%/yr)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-secondary inline-block" /> REITs (8%/yr)</span>
      </div>
    </div>
  );
};

// Tax Efficiency Estimator
const TaxEstimator = () => {
  const [investment, setInvestment] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(25);
  const [taxBracket, setTaxBracket] = useState(22);
  const grossValue = investment * Math.pow(1 + annualReturn / 100, years);
  const rothValue = grossValue; // No taxes on withdrawal
  const traditionalTax = (grossValue - investment) * (taxBracket / 100);
  const traditionalNet = grossValue - traditionalTax;
  const taxableAnnualTax = annualReturn / 100 * (1 - taxBracket / 100 * 0.15 / (annualReturn / 100)); // simplified
  const taxableValue = investment * Math.pow(1 + annualReturn / 100 * (1 - 0.15 * taxBracket / 100), years);
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Investment Amount ($)" value={investment} onChange={setInvestment} min={1000} max={500000} step={1000} />
        <InputField label="Annual Return (%)" value={annualReturn} onChange={setAnnualReturn} min={1} max={15} step={0.5} />
        <InputField label="Time Horizon (years)" value={years} onChange={setYears} min={1} max={40} step={1} />
        <InputField label="Tax Bracket (%)" value={taxBracket} onChange={setTaxBracket} min={10} max={37} step={1} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl p-5 border border-success bg-success/5">
          <p className="text-sm text-muted-foreground mb-1">Roth IRA (Tax-Free)</p>
          <p className="text-2xl font-bold text-success">${rothValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="rounded-xl p-5 border border-primary bg-primary/5">
          <p className="text-sm text-muted-foreground mb-1">Traditional IRA</p>
          <p className="text-2xl font-bold text-primary">${traditionalNet.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="rounded-xl p-5 border border-border bg-card">
          <p className="text-sm text-muted-foreground mb-1">Taxable Brokerage</p>
          <p className="text-2xl font-bold text-foreground">${taxableValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Tax-advantaged accounts can save you <strong className="text-foreground">${(rothValue - taxableValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> over {years} years compared to a taxable account.</p>
    </div>
  );
};

// Risk Profile Calculator
const RiskProfileCalc = () => {
  const [age, setAge] = useState(30);
  const [horizon, setHorizon] = useState(25);
  const [comfort, setComfort] = useState(3);
  const [income, setIncome] = useState(3);
  const score = (4 - Math.min(age / 20, 3)) + Math.min(horizon / 10, 3) + comfort + income;
  const maxScore = 16;
  const pct = (score / maxScore) * 100;
  const stockPct = Math.round(Math.min(Math.max(pct * 0.9, 20), 95));
  const bondPct = 100 - stockPct;
  const profiles = [
    { min: 0, max: 30, label: "Conservative", color: "text-primary" },
    { min: 30, max: 50, label: "Moderate-Conservative", color: "text-primary" },
    { min: 50, max: 65, label: "Moderate", color: "text-accent" },
    { min: 65, max: 80, label: "Moderate-Aggressive", color: "text-accent" },
    { min: 80, max: 100, label: "Aggressive", color: "text-destructive" },
  ];
  const profile = profiles.find((p) => pct >= p.min && pct < p.max) || profiles[4];
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Your Age" value={age} onChange={setAge} min={18} max={80} step={1} />
        <InputField label="Investment Horizon (years)" value={horizon} onChange={setHorizon} min={1} max={40} step={1} />
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Comfort with Volatility (1-5)</label>
          <input type="range" value={comfort} onChange={(e) => setComfort(Number(e.target.value))} min={1} max={5} step={1} className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>Very Low</span><span>Very High</span></div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Income Stability (1-5)</label>
          <input type="range" value={income} onChange={(e) => setIncome(Number(e.target.value))} min={1} max={5} step={1} className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>Unstable</span><span>Very Stable</span></div>
        </div>
      </div>
      <div className="rounded-xl bg-card border border-border p-6 text-center">
        <p className="text-sm text-muted-foreground mb-1">Your Risk Profile</p>
        <p className={`text-3xl font-serif font-bold ${profile.color} mb-2`}>{profile.label}</p>
        <p className="text-muted-foreground text-sm mb-4">Suggested: {stockPct}% Stocks / {bondPct}% Bonds</p>
        <div className="rounded-xl overflow-hidden h-8 flex">
          <div className="bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground" style={{ width: `${stockPct}%` }}>{stockPct}%</div>
          <div className="bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground" style={{ width: `${bondPct}%` }}>{bondPct}%</div>
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground mt-2 justify-center">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary inline-block" /> Stocks</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-accent inline-block" /> Bonds</span>
        </div>
      </div>
    </div>
  );
};

const tools = [
  { id: "compound", title: "Compound Interest Calculator", icon: Calculator, desc: "See how your money grows over time", component: CompoundInterestCalc },
  { id: "dca", title: "Dollar-Cost Averaging", icon: TrendingUp, desc: "Compare DCA vs. lump-sum investing", component: DCACalculator },
  { id: "retirement", title: "Retirement Goal Planner", icon: Target, desc: "Check if you're on track for your goals", component: RetirementPlanner },
  { id: "portfolio", title: "Portfolio Allocation Simulator", icon: PieChart, desc: "Build a sample portfolio and see projected growth", component: PortfolioSimulator },
  { id: "tax", title: "Tax Efficiency Estimator", icon: Percent, desc: "Compare account types and after-tax returns", component: TaxEstimator },
  { id: "risk", title: "Risk Profile Calculator", icon: Shield, desc: "Assess your risk tolerance and get suggestions", component: RiskProfileCalc },
];

const ToolsPage = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const active = tools.find((t) => t.id === activeTool);

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {active ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button onClick={() => setActiveTool(null)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Tools
            </button>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"><active.icon className="w-7 h-7 text-primary" /></div>
              <div><h1 className="text-3xl font-serif font-bold text-foreground">{active.title}</h1><p className="text-muted-foreground">{active.desc}</p></div>
            </div>
            <div className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-card"><active.component /></div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"><Calculator className="w-3.5 h-3.5" /> Interactive Tools</span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">Financial Calculators</h1>
              <p className="text-muted-foreground max-w-xl mx-auto">Turn knowledge into action. Use these tools to plan, simulate, and visualize your financial future.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, i) => (
                <motion.button key={tool.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveTool(tool.id)}
                  className="text-left rounded-xl bg-card border border-border p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"><tool.icon className="w-5 h-5 text-primary" /></div>
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
