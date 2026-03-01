/**
 * Landing.tsx — Kulooc V3 Page d'accueil
 * Design: Dark Precision | Rouge #E31837 | Noir #0D0D0D | Blanc #FFFFFF
 * Bilingue FR/EN | Blocs image placeholders nommés
 */
import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { KuloocLogo } from "@/components/KuloocLogo";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Button } from "@/components/ui/button";
import {
  Car, UtensilsCrossed, ShoppingCart, Package, Users, MapPin,
  Star, Shield, Clock, ChevronRight, Menu, X, Sun, Moon,
  TrendingUp, Zap, Globe, ArrowRight
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Landing() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      key: "ride",
      icon: Car,
      color: "#E31837",
      imgName: "KULOOC-RIDE-HERO",
      path: "/client",
      badge: null,
    },
    {
      key: "eat",
      icon: UtensilsCrossed,
      color: "#E31837",
      imgName: "KULOOC-EAT-HERO",
      path: "#",
      badge: t("eat.badge"),
    },
    {
      key: "cart",
      icon: ShoppingCart,
      color: "#E31837",
      imgName: "KULOOC-CART-HERO",
      path: "#",
      badge: t("cart.badge"),
    },
    {
      key: "courier",
      icon: Package,
      color: "#E31837",
      imgName: "KULOOC-COURIER-HERO",
      path: "#",
      badge: t("courier.badge"),
    },
  ];

  const platforms = [
    { key: "user", icon: Users, path: "/client", color: "#E31837" },
    { key: "driver", icon: Car, path: "/driver", color: "#E31837" },
    { key: "dispatcher", icon: MapPin, path: "/dispatcher", color: "#E31837" },
    { key: "fleet", icon: TrendingUp, path: "/fleet", color: "#E31837" },
    { key: "admin", icon: Shield, path: "/admin", color: "#E31837" },
  ];

  const stats = [
    { label: t("stats.users"), value: "50K+", icon: Users },
    { label: t("stats.drivers"), value: "2,500+", icon: Car },
    { label: t("stats.rides"), value: "500K+", icon: Zap },
    { label: t("stats.cities"), value: "12", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-white/8">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <KuloocLogo size="md" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/client" className="text-sm text-white/70 hover:text-white transition-colors">
              {t("nav.ride")}
            </Link>
            <span className="text-sm text-white/40 cursor-not-allowed">{t("nav.eat")}</span>
            <span className="text-sm text-white/40 cursor-not-allowed">{t("nav.cart")}</span>
            <span className="text-sm text-white/40 cursor-not-allowed">{t("nav.courier")}</span>
            <Link href="/driver" className="text-sm text-white/70 hover:text-white transition-colors">
              {t("nav.driver")}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="text-xs font-semibold text-white/60 hover:text-white border border-white/15 rounded px-2.5 py-1.5 transition-colors"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-white/60 hover:text-white p-1.5 rounded transition-colors"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link href="/client/login">
              <button className="text-sm text-white/70 hover:text-white px-4 py-2 transition-colors">
                {t("nav.login")}
              </button>
            </Link>
            <Link href="/client/register">
              <button className="kulooc-btn-primary text-sm py-2 px-4">
                {t("nav.signup")}
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white/70 hover:text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#111111] border-t border-white/8 px-4 py-4 flex flex-col gap-3">
            <Link href="/client" className="text-sm text-white/80 py-2">{t("nav.ride")}</Link>
            <span className="text-sm text-white/40 py-2">{t("nav.eat")} — {t("eat.badge")}</span>
            <span className="text-sm text-white/40 py-2">{t("nav.cart")} — {t("cart.badge")}</span>
            <span className="text-sm text-white/40 py-2">{t("nav.courier")} — {t("courier.badge")}</span>
            <Link href="/driver" className="text-sm text-white/80 py-2">{t("nav.driver")}</Link>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setLang(lang === "fr" ? "en" : "fr")}
                className="text-xs font-semibold text-white/60 border border-white/15 rounded px-3 py-1.5"
              >
                {lang === "fr" ? "EN" : "FR"}
              </button>
              <Link href="/client/login">
                <button className="text-sm text-white/70 px-4 py-1.5 border border-white/15 rounded">
                  {t("nav.login")}
                </button>
              </Link>
              <Link href="/client/register">
                <button className="kulooc-btn-primary text-sm py-1.5 px-4">
                  {t("nav.signup")}
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder
            name="HERO-BACKGROUND"
            className="w-full h-full rounded-none border-0"
            aspectRatio=""
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent" />
        </div>

        <div className="container relative z-10 py-20 lg:py-32">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E31837]/15 border border-[#E31837]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#E31837] animate-pulse" />
              <span className="text-xs font-medium text-[#E31837]">{t("hero.badge")}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 whitespace-pre-line"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {t("hero.title")}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/60 mb-10 max-w-xl leading-relaxed">
              {t("hero.subtitle")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/client">
                <button className="kulooc-btn-primary flex items-center gap-2 text-base px-8 py-4">
                  <Car size={18} />
                  {t("hero.cta.ride")}
                </button>
              </Link>
              <Link href="/driver">
                <button className="kulooc-btn-secondary flex items-center gap-2 text-base px-8 py-4">
                  {t("hero.cta.driver")}
                  <ChevronRight size={18} />
                </button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">{t("services.title")}</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">{t("services.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div key={svc.key} className="kulooc-card overflow-hidden group hover:border-[#E31837]/40 transition-all duration-300">
                  {/* Image Placeholder */}
                  <ImagePlaceholder
                    name={svc.imgName}
                    className="w-full h-52 rounded-none border-0 border-b border-white/8"
                    aspectRatio=""
                  />
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#E31837]/15 flex items-center justify-center">
                          <Icon size={20} className="text-[#E31837]" />
                        </div>
                        <h3 className="text-xl font-bold">{t(`${svc.key}.title`)}</h3>
                      </div>
                      {svc.badge && (
                        <span className="text-xs font-medium bg-white/8 text-white/50 px-2.5 py-1 rounded-full">
                          {svc.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{t(`${svc.key}.desc`)}</p>
                    {svc.path !== "#" ? (
                      <Link href={svc.path}>
                        <button className="flex items-center gap-2 text-[#E31837] text-sm font-semibold hover:gap-3 transition-all">
                          {t(`${svc.key}.cta`)} <ArrowRight size={16} />
                        </button>
                      </Link>
                    ) : (
                      <span className="flex items-center gap-2 text-white/30 text-sm font-semibold cursor-not-allowed">
                        {t(`${svc.key}.cta`)} <ArrowRight size={16} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== DRIVER SECTION ===== */}
      <section className="py-24 bg-[#111111]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Image */}
            <div>
              <ImagePlaceholder
                name="DRIVER-SECTION-IMAGE"
                className="w-full h-96 rounded-xl"
                aspectRatio=""
              />
            </div>
            {/* Right — Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E31837]/15 border border-[#E31837]/30 rounded-full px-4 py-1.5 mb-6">
                <Car size={14} className="text-[#E31837]" />
                <span className="text-xs font-medium text-[#E31837]">Chauffeurs</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">{t("driver.title")}</h2>
              <p className="text-white/50 text-lg mb-8">{t("driver.subtitle")}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: t("driver.stat1"), value: "2,500+" },
                  { label: t("driver.stat2"), value: "15K+" },
                  { label: t("driver.stat3"), value: "12" },
                ].map((s) => (
                  <div key={s.label} className="kulooc-card p-4 text-center">
                    <div className="text-2xl font-bold text-[#E31837]">{s.value}</div>
                    <div className="text-xs text-white/40 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {[
                  { key: "benefit1", icon: Clock },
                  { key: "benefit2", icon: TrendingUp },
                  { key: "benefit3", icon: Shield },
                ].map(({ key, icon: BIcon }) => (
                  <div key={key} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E31837]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BIcon size={16} className="text-[#E31837]" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t(`driver.${key}.title`)}</div>
                      <div className="text-white/50 text-sm">{t(`driver.${key}.desc`)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/driver/register">
                <button className="kulooc-btn-primary flex items-center gap-2 text-base px-8 py-4">
                  {t("driver.cta")} <ChevronRight size={18} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-20 bg-[#E31837]">
        <div className="container">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{t("stats.title")}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="text-center">
                  <Icon size={32} className="text-white/60 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-white/70 text-sm">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PLATFORMS SECTION ===== */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("platforms.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <Link key={p.key} href={p.path}>
                  <div className="kulooc-card p-6 hover:border-[#E31837]/50 hover:bg-[#1A1A1A]/80 transition-all duration-200 group cursor-pointer h-full">
                    <div className="w-12 h-12 rounded-xl bg-[#E31837]/15 flex items-center justify-center mb-4 group-hover:bg-[#E31837]/25 transition-colors">
                      <Icon size={22} className="text-[#E31837]" />
                    </div>
                    <h3 className="font-bold text-sm mb-2">{t(`platforms.${p.key}`)}</h3>
                    <p className="text-white/40 text-xs leading-relaxed mb-4">{t(`platforms.${p.key}.desc`)}</p>
                    <div className="flex items-center gap-1 text-[#E31837] text-xs font-semibold">
                      {t("platforms.access")} <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== APP DOWNLOAD SECTION ===== */}
      <section className="py-24 bg-[#111111]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                {lang === "fr" ? "Téléchargez l'application" : "Download the App"}
              </h2>
              <p className="text-white/50 text-lg mb-8">
                {lang === "fr"
                  ? "Disponible sur iOS et Android. Réservez votre course en quelques secondes."
                  : "Available on iOS and Android. Book your ride in seconds."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* App Store Placeholder */}
                <ImagePlaceholder
                  name="APP-STORE-BADGE"
                  className="w-40 h-14 rounded-xl"
                  aspectRatio=""
                />
                {/* Google Play Placeholder */}
                <ImagePlaceholder
                  name="GOOGLE-PLAY-BADGE"
                  className="w-40 h-14 rounded-xl"
                  aspectRatio=""
                />
              </div>
            </div>
            <div>
              <ImagePlaceholder
                name="APP-MOCKUP-PHONES"
                className="w-full h-80 rounded-2xl"
                aspectRatio=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0A0A0A] border-t border-white/8 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <KuloocLogo size="md" className="mb-4" />
              <p className="text-white/40 text-sm leading-relaxed">{t("footer.tagline")}</p>
              <div className="flex gap-3 mt-4">
                {/* Social placeholders */}
                {["FACEBOOK", "INSTAGRAM", "TWITTER", "LINKEDIN"].map((s) => (
                  <div key={s} className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center">
                    <span className="text-[8px] text-white/30">{s[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Links */}
            {[
              { title: t("footer.company"), links: [t("footer.about"), t("footer.careers"), t("footer.press")] },
              { title: t("footer.legal"), links: [t("footer.privacy"), t("footer.terms"), t("footer.safety")] },
              { title: t("footer.support"), links: [t("footer.help"), t("footer.contact")] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Bottom */}
          <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">{t("footer.copyright")}</p>
            <div className="flex items-center gap-2">
              <span className="text-white/30 text-xs">🍁 Made in Canada</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
