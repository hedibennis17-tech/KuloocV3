import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "fr" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  fr: {
    // Nav
    "nav.ride": "Course",
    "nav.eat": "Kulooc Eat",
    "nav.cart": "Kulooc Cart",
    "nav.courier": "Kulooc Courier",
    "nav.driver": "Devenir Chauffeur",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",
    // Hero
    "hero.title": "Votre transport,\nlivré à la vitesse\ndu Canada.",
    "hero.subtitle": "Réservez une course, commandez votre repas ou faites livrer vos courses — tout en un seul endroit.",
    "hero.cta.ride": "Réserver une course",
    "hero.cta.driver": "Devenir chauffeur",
    "hero.badge": "Disponible 24h/24 · 7j/7",
    // Services
    "services.title": "Tout ce dont vous avez besoin",
    "services.subtitle": "Une seule application, quatre services essentiels pour votre quotidien au Canada.",
    // Kulooc Ride
    "ride.title": "Kulooc Ride",
    "ride.desc": "Des courses rapides, sûres et abordables partout au Canada. Chauffeurs vérifiés, suivi en temps réel, paiement sécurisé.",
    "ride.cta": "Réserver maintenant",
    // Kulooc Eat
    "eat.title": "Kulooc Eat",
    "eat.desc": "Les meilleurs restaurants de votre ville livrés à votre porte en moins de 30 minutes.",
    "eat.cta": "Commander à manger",
    "eat.badge": "Bientôt disponible",
    // Kulooc Cart
    "cart.title": "Kulooc Cart",
    "cart.desc": "Vos courses d'épicerie livrées directement chez vous. Produits frais, grandes surfaces et épiceries locales.",
    "cart.cta": "Commander l'épicerie",
    "cart.badge": "Bientôt disponible",
    // Kulooc Courier
    "courier.title": "Kulooc Courier",
    "courier.desc": "Envoyez et recevez des colis partout en ville. Livraison express, suivi GPS en direct.",
    "courier.cta": "Envoyer un colis",
    "courier.badge": "Bientôt disponible",
    // Driver Section
    "driver.title": "Conduisez avec Kulooc",
    "driver.subtitle": "Rejoignez notre réseau de chauffeurs professionnels et gagnez à votre rythme.",
    "driver.stat1": "Chauffeurs actifs",
    "driver.stat2": "Courses par jour",
    "driver.stat3": "Villes desservies",
    "driver.cta": "Commencer à conduire",
    "driver.benefit1.title": "Horaires flexibles",
    "driver.benefit1.desc": "Travaillez quand vous voulez, autant que vous voulez.",
    "driver.benefit2.title": "Paiements rapides",
    "driver.benefit2.desc": "Recevez vos gains chaque semaine directement sur votre compte.",
    "driver.benefit3.title": "Support 24/7",
    "driver.benefit3.desc": "Notre équipe est disponible à tout moment pour vous aider.",
    // Stats
    "stats.title": "Kulooc en chiffres",
    "stats.users": "Utilisateurs",
    "stats.drivers": "Chauffeurs",
    "stats.rides": "Courses complétées",
    "stats.cities": "Villes",
    // Platforms
    "platforms.title": "Accédez à votre espace",
    "platforms.user": "Espace Client",
    "platforms.user.desc": "Réservez vos courses, suivez vos livraisons, gérez votre compte.",
    "platforms.driver": "Espace Chauffeur",
    "platforms.driver.desc": "Gérez vos courses, suivez vos revenus, naviguez avec GPS.",
    "platforms.dispatcher": "Espace Dispatcher",
    "platforms.dispatcher.desc": "Supervisez les courses en temps réel, assignez les chauffeurs.",
    "platforms.fleet": "Espace Flotte",
    "platforms.fleet.desc": "Gérez votre flotte de véhicules et vos chauffeurs.",
    "platforms.admin": "Administration",
    "platforms.admin.desc": "Tableau de bord complet pour gérer toute la plateforme.",
    "platforms.access": "Accéder",
    // Footer
    "footer.tagline": "Le transport canadien, réinventé.",
    "footer.company": "Entreprise",
    "footer.about": "À propos",
    "footer.careers": "Carrières",
    "footer.press": "Presse",
    "footer.legal": "Légal",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions",
    "footer.safety": "Sécurité",
    "footer.support": "Support",
    "footer.help": "Centre d'aide",
    "footer.contact": "Nous contacter",
    "footer.copyright": "© 2026 Kulooc Inc. Tous droits réservés.",
  },
  en: {
    "nav.ride": "Ride",
    "nav.eat": "Kulooc Eat",
    "nav.cart": "Kulooc Cart",
    "nav.courier": "Kulooc Courier",
    "nav.driver": "Become a Driver",
    "nav.login": "Log In",
    "nav.signup": "Sign Up",
    "hero.title": "Your transport,\ndelivered at\nCanadian speed.",
    "hero.subtitle": "Book a ride, order food, or get your groceries delivered — all in one place.",
    "hero.cta.ride": "Book a Ride",
    "hero.cta.driver": "Become a Driver",
    "hero.badge": "Available 24/7",
    "services.title": "Everything you need",
    "services.subtitle": "One app, four essential services for your daily life in Canada.",
    "ride.title": "Kulooc Ride",
    "ride.desc": "Fast, safe and affordable rides across Canada. Verified drivers, real-time tracking, secure payments.",
    "ride.cta": "Book Now",
    "eat.title": "Kulooc Eat",
    "eat.desc": "The best restaurants in your city delivered to your door in under 30 minutes.",
    "eat.cta": "Order Food",
    "eat.badge": "Coming Soon",
    "cart.title": "Kulooc Cart",
    "cart.desc": "Your groceries delivered directly to you. Fresh products, supermarkets and local stores.",
    "cart.cta": "Order Groceries",
    "cart.badge": "Coming Soon",
    "courier.title": "Kulooc Courier",
    "courier.desc": "Send and receive packages anywhere in the city. Express delivery, live GPS tracking.",
    "courier.cta": "Send a Package",
    "courier.badge": "Coming Soon",
    "driver.title": "Drive with Kulooc",
    "driver.subtitle": "Join our network of professional drivers and earn on your own schedule.",
    "driver.stat1": "Active Drivers",
    "driver.stat2": "Daily Rides",
    "driver.stat3": "Cities Served",
    "driver.cta": "Start Driving",
    "driver.benefit1.title": "Flexible Hours",
    "driver.benefit1.desc": "Work when you want, as much as you want.",
    "driver.benefit2.title": "Fast Payments",
    "driver.benefit2.desc": "Receive your earnings every week directly to your account.",
    "driver.benefit3.title": "24/7 Support",
    "driver.benefit3.desc": "Our team is available at any time to help you.",
    "stats.title": "Kulooc by the numbers",
    "stats.users": "Users",
    "stats.drivers": "Drivers",
    "stats.rides": "Completed Rides",
    "stats.cities": "Cities",
    "platforms.title": "Access your space",
    "platforms.user": "Client Portal",
    "platforms.user.desc": "Book rides, track deliveries, manage your account.",
    "platforms.driver": "Driver Portal",
    "platforms.driver.desc": "Manage rides, track earnings, navigate with GPS.",
    "platforms.dispatcher": "Dispatcher Portal",
    "platforms.dispatcher.desc": "Monitor rides in real-time, assign drivers.",
    "platforms.fleet": "Fleet Portal",
    "platforms.fleet.desc": "Manage your vehicle fleet and drivers.",
    "platforms.admin": "Administration",
    "platforms.admin.desc": "Full dashboard to manage the entire platform.",
    "platforms.access": "Access",
    "footer.tagline": "Canadian transport, reinvented.",
    "footer.company": "Company",
    "footer.about": "About",
    "footer.careers": "Careers",
    "footer.press": "Press",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.safety": "Safety",
    "footer.support": "Support",
    "footer.help": "Help Center",
    "footer.contact": "Contact Us",
    "footer.copyright": "© 2026 Kulooc Inc. All rights reserved.",
  }
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  const t = (key: string) => translations[lang][key] ?? key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
