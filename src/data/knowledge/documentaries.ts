export interface Documentary {
  title: string;
  year: number;
  director: string;
  whereToWatch: string;
  desc: string;
  lessons: string[];
}

export const documentaries: Documentary[] = [
  { title: "The Big Short", year: 2015, director: "Adam McKay", whereToWatch: "Amazon Prime, Paramount+",
    desc: "The true story of investors who saw the 2008 housing market collapse coming before anyone else. Brilliantly explains complex financial instruments like CDOs and credit default swaps using celebrity cameos and clever analogies.",
    lessons: ["Understanding what you're investing in is non-negotiable — most people who lost money in 2008 had no idea what mortgage-backed securities actually were.", "Groupthink and blind trust in institutions can be devastatingly expensive.", "Contrarian thinking requires courage — being early and being wrong feel identical until the truth is revealed."]
  },
  { title: "Inside Job", year: 2010, director: "Charles Ferguson", whereToWatch: "Amazon Prime, Apple TV",
    desc: "Academy Award-winning documentary examining the 2008 financial crisis, the systemic corruption that caused it, and the regulatory failures that allowed it to happen. Features interviews with financiers, politicians, and academics.",
    lessons: ["Financial systems have structural vulnerabilities that can affect everyone — diversification and skepticism are essential protections.", "Incentive structures drive behavior — understand how the people managing your money are compensated.", "Regulation matters — markets left entirely unchecked tend toward excess and instability."]
  },
  { title: "Becoming Warren Buffett", year: 2017, director: "Peter Kunhardt", whereToWatch: "HBO Max",
    desc: "An intimate HBO documentary offering a personal look at Warren Buffett's life, daily habits, and investment philosophy. Shows how simple living, voracious reading, and compound thinking create extraordinary wealth over decades.",
    lessons: ["Consistency and patience beat brilliance — Buffett's daily routine (reading 500+ pages) has barely changed in decades.", "Living below your means is a choice that creates freedom, not deprivation.", "The power of compound growth requires starting early and never interrupting the process."]
  },
  { title: "Too Big to Fail", year: 2011, director: "Curtis Hanson", whereToWatch: "HBO Max",
    desc: "HBO drama based on Andrew Ross Sorkin's book about the 2008 financial crisis, dramatizing the behind-the-scenes panic as the U.S. government scrambled to prevent total economic collapse. Features stellar performances showing the human side of systemic risk.",
    lessons: ["Systemic risk can affect every investor — diversification across asset classes and geographies provides protection.", "Liquidity matters — when everyone tries to sell at once, asset prices can collapse far below intrinsic value.", "Understanding how banking and credit markets work gives you an edge in recognizing macro risks."]
  },
  { title: "Margin Call", year: 2011, director: "J.C. Chandor", whereToWatch: "Amazon Prime, Peacock",
    desc: "A fictional thriller set during the first 24 hours of the 2008 financial crisis at a major investment bank. When a junior analyst discovers the firm's mortgage-backed securities are about to collapse, executives face brutal ethical and financial decisions.",
    lessons: ["In financial crises, the first to recognize and act on the problem survive. Denial is expensive.", "There are three ways to make money in finance: be first, be smarter, or cheat. The best long-term strategy is being informed.", "Risk management isn't just about models — it's about having the courage to act on bad news."]
  },
  { title: "Capitalism: A Love Story", year: 2009, director: "Michael Moore", whereToWatch: "Amazon Prime, Apple TV",
    desc: "Michael Moore's provocative examination of the 2008 financial crisis and its impact on ordinary Americans. While biased toward a particular viewpoint, it raises important questions about financial inequality and the social impact of Wall Street decisions.",
    lessons: ["Understanding the broader economic system helps you make better personal financial decisions.", "Financial literacy is a form of self-defense — those who understand money are less likely to be exploited.", "The gap between Wall Street and Main Street creates both risks and opportunities for informed individual investors."]
  },
  { title: "The China Hustle", year: 2017, director: "Jed Rothstein", whereToWatch: "Amazon Prime, Hulu",
    desc: "Exposes how Chinese companies used reverse mergers to list on U.S. stock exchanges with minimal regulatory scrutiny, defrauding American investors of billions. A cautionary tale about due diligence and the limits of financial regulation.",
    lessons: ["Due diligence is your responsibility — never invest in something you can't verify and understand.", "If returns seem too good to be true, they probably are. Extraordinary claims require extraordinary evidence.", "Regulatory arbitrage (exploiting gaps between different countries' rules) is a real risk for international investors."]
  },
  { title: "Enron: The Smartest Guys in the Room", year: 2005, director: "Alex Gibney", whereToWatch: "Amazon Prime, Apple TV",
    desc: "Documents the rise and catastrophic fall of Enron, once America's seventh-largest company. Shows how corporate fraud, accounting manipulation, and a culture of arrogance destroyed the company and billions in investor and employee wealth.",
    lessons: ["Financial statements can be manipulated — learn to read cash flow statements, not just earnings reports.", "Corporate culture matters in investing. Arrogance and opacity are red flags.", "Diversification protects you — Enron employees who had 100% of their retirement in company stock lost everything."]
  },
  { title: "Money for Nothing: Inside the Federal Reserve", year: 2013, director: "Jim Bruce", whereToWatch: "Amazon Prime, Tubi",
    desc: "Takes viewers inside the Federal Reserve to understand how monetary policy affects every aspect of the economy and financial markets. Explains interest rates, money supply, and the Fed's role in bubbles and crashes.",
    lessons: ["Understanding how the Federal Reserve works gives you an edge in anticipating market movements.", "Interest rate policy affects every asset class — stocks, bonds, real estate, and currencies all respond to Fed decisions.", "Central banks are powerful but not omnipotent — monetary policy has limits and unintended consequences."]
  },
  { title: "Freakonomics", year: 2010, director: "Various", whereToWatch: "Amazon Prime, Tubi",
    desc: "Based on the bestselling book, this documentary explores the hidden side of everything through the lens of economics. Uses data and incentive analysis to challenge conventional wisdom about crime, parenting, cheating, and decision-making.",
    lessons: ["Incentives drive all human behavior, including financial decisions. Understanding incentives helps you predict outcomes.", "Conventional wisdom is often wrong — challenge assumptions with data, especially in investing.", "Correlation does not equal causation — just because two things move together doesn't mean one causes the other."]
  },
  { title: "I.O.U.S.A.", year: 2008, director: "Patrick Creadon", whereToWatch: "Amazon Prime, Tubi",
    desc: "Examines the United States' national debt crisis and its potential consequences for taxpayers and investors. Features former Comptroller General David Walker's cross-country campaign to warn Americans about unsustainable government spending.",
    lessons: ["National debt and fiscal policy have long-term implications for inflation, interest rates, and investment returns.", "Understanding macro-economic trends helps you position your portfolio for long-term success.", "Government bonds, while considered 'safe,' carry inflation risk — your purchasing power can erode even as you receive interest."]
  },
  { title: "The Ascent of Money", year: 2008, director: "Adrian Pennink", whereToWatch: "PBS, Amazon Prime",
    desc: "Based on Niall Ferguson's book, this BBC documentary series traces the history of money and finance from ancient Mesopotamia to modern Wall Street. Shows how financial innovation has shaped human civilization — for better and worse.",
    lessons: ["Understanding financial history gives you perspective that most investors lack — crises and recoveries follow patterns.", "Financial innovation (from banking to insurance to stocks) has driven human progress, but each innovation brings new risks.", "The countries and civilizations that developed the best financial systems tended to prosper. Financial literacy is a competitive advantage."]
  },
];
