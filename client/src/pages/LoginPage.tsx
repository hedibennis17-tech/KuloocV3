/**
 * LoginPage.tsx — Kulooc V3 Page de connexion universelle
 * Utilisée pour toutes les plateformes (User, Driver, Dispatcher, Fleet, Admin)
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { KuloocLogo } from "@/components/KuloocLogo";
import { Car, Users, MapPin, TrendingUp, Shield, Eye, EyeOff, Phone } from "lucide-react";
import { toast } from "sonner";

interface LoginPageProps {
  platform: "client" | "driver" | "dispatcher" | "fleet" | "admin";
  redirectPath: string;
}

const platformConfig = {
  client: {
    label: "Espace Client",
    icon: Users,
    color: "#E31837",
    description: "Réservez vos courses et gérez votre compte",
    demoCredentials: { email: "client@kulooc.ca", password: "demo123" },
    usePhone: true,
  },
  driver: {
    label: "Espace Chauffeur",
    icon: Car,
    color: "#E31837",
    description: "Gérez vos courses et suivez vos revenus",
    demoCredentials: { email: "driver@kulooc.ca", password: "demo123" },
    usePhone: true,
  },
  dispatcher: {
    label: "Espace Dispatcher",
    icon: MapPin,
    color: "#E31837",
    description: "Supervisez les courses en temps réel",
    demoCredentials: { email: "dispatcher@kulooc.ca", password: "demo123" },
    usePhone: false,
  },
  fleet: {
    label: "Gestionnaire de Flotte",
    icon: TrendingUp,
    color: "#E31837",
    description: "Gérez votre flotte de véhicules",
    demoCredentials: { email: "fleet@kulooc.ca", password: "demo123" },
    usePhone: false,
  },
  admin: {
    label: "Administration",
    icon: Shield,
    color: "#E31837",
    description: "Accès complet à la plateforme Kulooc",
    demoCredentials: { email: "admin@kulooc.ca", password: "demo123" },
    usePhone: false,
  },
};

export default function LoginPage({ platform, redirectPath }: LoginPageProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useOTP, setUseOTP] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);

  const handleDemoLogin = () => {
    setEmail(config.demoCredentials.email);
    setPassword(config.demoCredentials.password);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Connexion réussie — ${config.label}`);
      navigate(redirectPath);
    }, 1200);
  };

  const handleSendOTP = () => {
    if (!phone) { toast.error("Entrez votre numéro de téléphone"); return; }
    setOtpSent(true);
    toast.success("Code OTP envoyé au " + phone);
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
    if (newOtp.every((v) => v !== "") && newOtp.join("") === "123456") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast.success("Connexion réussie !");
        navigate(redirectPath);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex w-1/2 bg-[#111111] border-r border-white/8 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#E31837] blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#E31837] blur-3xl" />
        </div>
        <div className="relative z-10 text-center">
          <KuloocLogo size="lg" className="justify-center mb-8" />
          <div className="w-20 h-20 rounded-2xl bg-[#E31837]/15 flex items-center justify-center mx-auto mb-6">
            <Icon size={36} className="text-[#E31837]" />
          </div>
          <h2 className="text-2xl font-bold mb-3">{config.label}</h2>
          <p className="text-white/40 text-sm max-w-xs mx-auto">{config.description}</p>
          <div className="mt-8 flex items-center gap-2 text-xs text-white/30">
            <span>🍁</span>
            <span>Kulooc Canada — Transport Premium</span>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <KuloocLogo size="md" />
          </div>

          <h1 className="text-2xl font-bold mb-1">Connexion</h1>
          <p className="text-white/40 text-sm mb-8">{config.label}</p>

          {/* Login Method Toggle (for client/driver) */}
          {config.usePhone && (
            <div className="flex bg-[#1A1A1A] rounded-lg p-1 mb-6">
              <button
                onClick={() => setUseOTP(false)}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                  !useOTP ? "bg-[#E31837] text-white" : "text-white/40 hover:text-white"
                }`}
              >
                Email / Mot de passe
              </button>
              <button
                onClick={() => setUseOTP(true)}
                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${
                  useOTP ? "bg-[#E31837] text-white" : "text-white/40 hover:text-white"
                }`}
              >
                OTP par téléphone
              </button>
            </div>
          )}

          {/* Email/Password Form */}
          {!useOTP && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">Adresse email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  required
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E31837]/50"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 pr-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E31837]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <a href="#" className="text-xs text-[#E31837] hover:underline">Mot de passe oublié ?</a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="kulooc-btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : "Se connecter"}
              </button>
            </form>
          )}

          {/* OTP Form */}
          {useOTP && (
            <div className="space-y-4">
              {!otpSent ? (
                <>
                  <div>
                    <label className="text-xs text-white/50 mb-1.5 block">Numéro de téléphone</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (514) 000-0000"
                        className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg pl-9 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E31837]/50"
                      />
                    </div>
                  </div>
                  <button onClick={handleSendOTP} className="kulooc-btn-primary w-full py-3">
                    Envoyer le code OTP
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-white/60 text-center">
                    Code envoyé au <span className="text-white font-medium">{phone}</span>
                  </p>
                  <p className="text-xs text-white/40 text-center">Entrez le code à 6 chiffres (demo: 123456)</p>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOTPChange(i, e.target.value)}
                        className="w-11 h-12 bg-[#1A1A1A] border border-white/10 rounded-lg text-center text-lg font-bold text-white focus:outline-none focus:border-[#E31837]/50"
                      />
                    ))}
                  </div>
                  <button onClick={() => { setOtpSent(false); setOtp(["","","","","",""]); }} className="w-full text-xs text-white/40 hover:text-white text-center">
                    Renvoyer le code
                  </button>
                </>
              )}
            </div>
          )}

          {/* Demo Button */}
          <button
            onClick={handleDemoLogin}
            className="w-full mt-4 text-xs text-white/40 hover:text-white border border-white/10 rounded-lg py-2.5 transition-colors"
          >
            Connexion démo — {config.label}
          </button>

          {/* Register link for client/driver */}
          {(platform === "client" || platform === "driver") && (
            <p className="text-center text-xs text-white/40 mt-6">
              Pas encore de compte ?{" "}
              <Link href={`/${platform}/register`} className="text-[#E31837] hover:underline">
                S'inscrire
              </Link>
            </p>
          )}

          {/* Back to home */}
          <div className="text-center mt-4">
            <Link href="/" className="text-xs text-white/30 hover:text-white transition-colors">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
