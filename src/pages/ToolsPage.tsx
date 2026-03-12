import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Target, ArrowLeft, PieChart, Percent, Shield, DollarSign } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from "recharts";

const CHART_COLORS = {
  primary: "hsl(158, 45%, 28%)",
  accent: "hsl(38, 85%, 55%)",
  secondary: "hsl(40, 40%, 70%)",
  success: "hsl(142, 60%, 40%)",
  destructive: "hsl(0, 72%, 51%)",
  muted: "hsl(160, 10%, 45%)",
};

const formatDollar = (v: number) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

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

  const chartData = useMemo(() => {
    return Array.from({ length: years }, (_, i) => {
      const yr = i + 1, rr = rate / 100 / 12, nn = yr * 12;
      const fv = initial * Math.pow(1 + rr, nn) + monthly * ((Math.pow(1 + rr, nn) - 1) / rr);
      const contrib = initial + monthly * nn;
      return { year: yr, totalValue: Math.round(fv), contributed: Math.round(contrib), interest: Math.round(fv - contrib) };
    });
  }, [initial, monthly, rate, years]);

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
      <div className="rounded-xl bg-card border border-border p-4 sm:p-6">
        <h4 className="text-sm font-medium text-foreground mb-4">Growth Over Time</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: "Years", position: "insideBottom", offset: -5 }} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => formatDollar(v)} />
            <Legend />
            <Line type="monotone" dataKey="totalValue" name="Total Value" stroke={CHART_COLORS.primary} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="contributed" name="Contributed" stroke={CHART_COLORS.accent} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="interest" name="Interest Earned" stroke={CHART_COLORS.success} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
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

  const chartData = useMemo(() => {
    const yearsCount = Math.ceil(months / 12);
    return Array.from({ length: yearsCount }, (_, i) => {
      const yr = i + 1;
      const m = Math.min(yr * 12, months);
      const rr = avgReturn / 100 / 12;
      const dca = monthlyAmount * ((Math.pow(1 + rr, m) - 1) / rr);
      const ls = lumpSum * Math.pow(1 + avgReturn / 100, yr);
      return { year: yr, dca: Math.round(dca), lumpSum: Math.round(ls) };
    });
  }, [monthlyAmount, months, avgReturn, lumpSum]);

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
      <div className="rounded-xl bg-card border border-border p-4 sm:p-6">
        <h4 className="text-sm font-medium text-foreground mb-4">DCA vs Lump Sum</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: "Years", position: "insideBottom", offset: -5 }} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => formatDollar(v)} />
            <Legend />
            <Bar dataKey="dca" name="DCA Value" fill={CHART_COLORS.primary} />
            <Bar dataKey="lumpSum" name="Lump Sum Value" fill={CHART_COLORS.accent} />
          </BarChart>
        </ResponsiveContainer>
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

  const chartData = useMemo(() => {
    return Array.from({ length: years }, (_, i) => {
      const yr = i + 1, rr = returnRate / 100 / 12, nn = yr * 12;
      const val = savings * Math.pow(1 + rr, nn) + monthlyContrib * ((Math.pow(1 + rr, nn) - 1) / rr);
      return { year: age + yr, value: Math.round(val) };
    });
  }, [age, savings, monthlyContrib, returnRate, years]);

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
          <div className="flex items-center gap-3">
            <p className={`text-2xl font-bold ${onTrack ? "text-success" : "text-accent"}`}>{pct.toFixed(0)}%</p>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${onTrack ? "bg-success/10 text-success" : "bg-accent/10 text-accent"}`}>
              {onTrack ? "✅ On Track" : "⚠️ Needs Adjustment"}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-secondary mt-2">
            <div className={`h-full rounded-full transition-all ${onTrack ? "bg-success" : "bg-accent"}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-card border border-border p-4 sm:p-6">
        <h4 className="text-sm font-medium text-foreground mb-4">Projected Portfolio Growth</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: "Age", position: "insideBottom", offset: -5 }} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => formatDollar(v)} />
            <Line type="monotone" dataKey="value" name="Portfolio Value" stroke={CHART_COLORS.primary} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Portfolio Allocation Simulator
const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.accent, CHART_COLORS.secondary];

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

  const pieData = useMemo(() => [
    { name: "Stocks", value: stocks },
    { name: "Bonds", value: bonds },
    { name: "REITs", value: reits },
  ].filter(d => d.value > 0), [stocks, bonds, reits]);

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
      <div className="rounded-xl bg-card border border-border p-4 sm:p-6">
        <h4 className="text-sm font-medium text-foreground mb-4">Portfolio Allocation</h4>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPie>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </RechartsPie>
          </ResponsiveContainer>
        </div>
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
  const [contribution, setContribution] = useState(6000);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(25);
  const [taxBracket, setTaxBracket] = useState(22);

  const chartData = useMemo(() => {
    return Array.from({ length: years }, (_, i) => {
      const yr = i + 1;
      const grossEach = contribution * ((Math.pow(1 + annualReturn / 100, yr) - 1) / (annualReturn / 100));
      const rothVal = grossEach; // tax-free growth
      const tradGross = grossEach;
      const tradNet = tradGross - (tradGross - contribution * yr) * (taxBracket / 100);
      const afterTaxReturn = annualReturn / 100 * (1 - 0.15);
      const taxableVal = contribution * ((Math.pow(1 + afterTaxReturn, yr) - 1) / afterTaxReturn);
      return { year: yr, roth: Math.round(rothVal), traditional: Math.round(tradNet), taxable: Math.round(taxableVal) };
    });
  }, [contribution, annualReturn, years, taxBracket]);

  const last = chartData[chartData.length - 1] || { roth: 0, traditional: 0, taxable: 0 };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Annual Contribution ($)" value={contribution} onChange={setContribution} min={1000} max={50000} step={500} showSlider />
        <InputField label="Annual Return (%)" value={annualReturn} onChange={setAnnualReturn} min={1} max={15} step={0.5} showSlider />
        <InputField label="Time Horizon (years)" value={years} onChange={setYears} min={1} max={40} step={1} showSlider />
        <InputField label="Tax Bracket (%)" value={taxBracket} onChange={setTaxBracket} min={10} max={37} step={1} showSlider />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl p-5 border border-success bg-success/5">
          <p className="text-sm text-muted-foreground mb-1">Roth IRA (Tax-Free)</p>
          <p className="text-2xl font-bold text-success">{formatDollar(last.roth)}</p>
        </div>
        <div className="rounded-xl p-5 border border-primary bg-primary/5">
          <p className="text-sm text-muted-foreground mb-1">Traditional 401k</p>
          <p className="text-2xl font-bold text-primary">{formatDollar(last.traditional)}</p>
        </div>
        <div className="rounded-xl p-5 border border-border bg-card">
          <p className="text-sm text-muted-foreground mb-1">Taxable Brokerage</p>
          <p className="text-2xl font-bold text-foreground">{formatDollar(last.taxable)}</p>
        </div>
      </div>
      <div className="rounded-xl bg-card border border-border p-4 sm:p-6">
        <h4 className="text-sm font-medium text-foreground mb-4">After-Tax Value by Account Type</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.filter((_, i) => (i + 1) % Math.max(1, Math.floor(years / 10)) === 0 || i === chartData.length - 1)}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: "Years", position: "insideBottom", offset: -5 }} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => formatDollar(v)} />
            <Legend />
            <Bar dataKey="roth" name="Roth IRA" fill={CHART_COLORS.success} />
            <Bar dataKey="traditional" name="Traditional 401k" fill={CHART_COLORS.primary} />
            <Bar dataKey="taxable" name="Taxable" fill={CHART_COLORS.muted} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-muted-foreground">Tax-advantaged accounts can save you <strong className="text-foreground">{formatDollar(last.roth - last.taxable)}</strong> over {years} years compared to a taxable account.</p>
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

// Dividend Income Calculator
const DividendCalc = () => {
  const [shares, setShares] = useState(100);
  const [price, setPrice] = useState(50);
  const [yieldPct, setYieldPct] = useState(3.5);
  const [dripOn, setDripOn] = useState(true);
  const [years, setYears] = useState(20);

  const chartData = useMemo(() => {
    const data = [];
    let sharesNoDrip = shares;
    let sharesDrip = shares;
    for (let yr = 1; yr <= years; yr++) {
      const priceGrowth = 1.05; // assume 5% annual price growth
      const currentPrice = price * Math.pow(priceGrowth, yr);
      // No DRIP
      const divNoDrip = sharesNoDrip * price * Math.pow(priceGrowth, yr) * (yieldPct / 100);
      const valueNoDrip = sharesNoDrip * currentPrice;
      // DRIP
      const divDrip = sharesDrip * price * Math.pow(priceGrowth, yr - 1) * (yieldPct / 100);
      sharesDrip += divDrip / (price * Math.pow(priceGrowth, yr));
      const valueDrip = sharesDrip * currentPrice;

      data.push({
        year: yr,
        withDrip: Math.round(valueDrip),
        withoutDrip: Math.round(valueNoDrip),
        annualDividend: Math.round(dripOn ? sharesDrip * currentPrice * (yieldPct / 100) : divNoDrip),
      });
    }
    return data;
  }, [shares, price, yieldPct, dripOn, years]);

  const lastYear = chartData[chartData.length - 1];
  const annualIncome = shares * price * (yieldPct / 100);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField label="Shares Owned" value={shares} onChange={setShares} min={1} max={10000} step={1} />
        <InputField label="Current Price ($)" value={price} onChange={setPrice} min={1} max={5000} step={1} />
        <InputField label="Dividend Yield (%)" value={yieldPct} onChange={setYieldPct} min={0.5} max={15} step={0.1} showSlider />
        <InputField label="Years" value={years} onChange={setYears} min={1} max={40} step={1} showSlider />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => setDripOn(!dripOn)}
          className={`relative w-12 h-6 rounded-full transition-colors ${dripOn ? "bg-primary" : "bg-secondary"}`}>
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-primary-foreground transition-transform ${dripOn ? "translate-x-6" : ""}`} />
        </button>
        <span className="text-sm font-medium text-foreground">DRIP {dripOn ? "On" : "Off"}</span>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <ResultCard label="Current Annual Dividend" value={annualIncome} accent />
        <ResultCard label={`Portfolio (${years}yr, ${dripOn ? "DRIP" : "No DRIP"})`} value={dripOn ? lastYear?.withDrip || 0 : lastYear?.withoutDrip || 0} />
        <ResultCard label={`Annual Dividend (Year ${years})`} value={lastYear?.annualDividend || 0} />
      </div>
      <div className="rounded-xl bg-card border border-border p-4 sm:p-6">
        <h4 className="text-sm font-medium text-foreground mb-4">Portfolio Value: DRIP vs No DRIP</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: "Years", position: "insideBottom", offset: -5 }} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => formatDollar(v)} />
            <Legend />
            <Line type="monotone" dataKey="withDrip" name="With DRIP" stroke={CHART_COLORS.primary} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="withoutDrip" name="Without DRIP" stroke={CHART_COLORS.accent} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
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
  { id: "dividend", title: "Dividend Income Calculator", icon: DollarSign, desc: "Project dividend income with or without DRIP", component: DividendCalc },
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
