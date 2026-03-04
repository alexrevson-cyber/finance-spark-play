import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border mt-auto">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid sm:grid-cols-3 gap-8 mb-8">
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-lg text-foreground">InvestWise</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Making financial education accessible, engaging, and empowering for everyone.
          </p>
        </div>
        <div>
          <h4 className="font-serif font-bold text-foreground mb-3">Explore</h4>
          <nav className="space-y-2">
            {[
              { to: "/learn", label: "Learn" },
              { to: "/test", label: "Test" },
              { to: "/knowledge", label: "Knowledge" },
              { to: "/tools", label: "Tools" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="font-serif font-bold text-foreground mb-3">Legal</h4>
          <nav className="space-y-2">
            <a href="#privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
            <a href="mailto:hello@investwise.app" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</a>
          </nav>
        </div>
      </div>
      <div className="border-t border-border pt-6">
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          <strong>Disclaimer:</strong> InvestWise is for educational purposes only and does not constitute licensed financial advice. 
          Always consult a qualified financial advisor before making investment decisions. Past performance does not guarantee future results.
        </p>
        <p className="text-xs text-muted-foreground text-center mt-2">
          © {new Date().getFullYear()} InvestWise. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
