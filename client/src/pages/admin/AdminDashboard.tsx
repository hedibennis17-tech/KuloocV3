/**
 * AdminDashboard.tsx — Kulooc V3 Plateforme Admin
 * Dashboard complet : stats temps réel, courses, chauffeurs, clients, zones, paiements
 */
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  BarChart2, Car, Users, MapPin, CreditCard, Settings,
  TrendingUp, AlertCircle, CheckCircle, Clock, Shield,
  Package, Globe, Zap, Bell, FileText, Database
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", icon: <BarChart2 size={18} />, path: "/admin" },
  { label: "Courses", icon: <Car size={18} />, path: "/admin/rides", badge: 24 },
  { label: "Chauffeurs", icon: <Users size={18} />, path: "/admin/drivers" },
  { label: "Clients", icon: <Users size={18} />, path: "/admin/clients" },
  { label: "Zones", icon: <MapPin size={18} />, path: "/admin/zones" },
  { label: "Paiements", icon: <CreditCard size={18} />, path: "/admin/payments" },
  { label: "Services", icon: <Package size={18} />, path: "/admin/services" },
  { label: "Plugins", icon: <Zap size={18} />, path: "/admin/plugins" },
  { label: "Rapports", icon: <FileText size={18} />, path: "/admin/reports" },
  { label: "Paramètres", icon: <Settings size={18} />, path: "/admin/settings" },
];

const revenueData = [
  { day: "Lun", revenue: 2400, rides: 48 },
  { day: "Mar", revenue: 3200, rides: 64 },
  { day: "Mer", revenue: 2800, rides: 56 },
  { day: "Jeu", revenue: 4100, rides: 82 },
  { day: "Ven", revenue: 5200, rides: 104 },
  { day: "Sam", revenue: 6800, rides: 136 },
  { day: "Dim", revenue: 4500, rides: 90 },
];

const recentRides = [
  { id: "R1024", passenger: "Hedi B.", driver: "Mohammed A.", status: "completed", amount: 24.50, time: "Il y a 2 min" },
  { id: "R1023", passenger: "Sarah M.", driver: "Carlos R.", status: "enroute", amount: 18.00, time: "Il y a 5 min" },
  { id: "R1022", passenger: "Jean P.", driver: "Ahmed K.", status: "pickup", amount: 15.75, time: "Il y a 8 min" },
  { id: "R1021", passenger: "Marie L.", driver: "Pierre T.", status: "completed", amount: 32.00, time: "Il y a 12 min" },
  { id: "R1020", passenger: "Alex D.", driver: "Karim B.", status: "cancelled", amount: 0, time: "Il y a 15 min" },
];

const statusColors = {
  completed: "text-green-400 bg-green-400/10 border-green-400/30",
  enroute: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  pickup: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  cancelled: "text-red-400 bg-red-400/10 border-red-400/30",
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
};

const statusLabels = {
  completed: "Terminée",
  enroute: "En route",
  pickup: "Récupération",
  cancelled: "Annulée",
  pending: "En attente",
};

export default function AdminDashboard() {
  const [period, setPeriod] = useState<"day" | "week" | "month">("week");

  const kpis = [
    { label: "Revenus (semaine)", value: "$29,000", change: "+12.5%", icon: TrendingUp, color: "text-green-400", positive: true },
    { label: "Courses totales", value: "580", change: "+8.2%", icon: Car, color: "text-[#E31837]", positive: true },
    { label: "Chauffeurs actifs", value: "47", change: "+3", icon: Users, color: "text-blue-400", positive: true },
    { label: "Clients inscrits", value: "2,847", change: "+124", icon: Users, color: "text-purple-400", positive: true },
    { label: "Taux annulation", value: "4.2%", change: "-0.8%", icon: AlertCircle, color: "text-yellow-400", positive: true },
    { label: "Note moyenne", value: "4.82", change: "+0.03", icon: CheckCircle, color: "text-yellow-400", positive: true },
  ];

  return (
    <DashboardLayout
      navItems={navItems}
      platformName="Administration Kulooc"
      userInfo={{ name: "Super Admin", role: "Administrateur" }}
    >
      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tableau de bord</h1>
            <p className="text-white/40 text-sm mt-0.5">Vue d'ensemble en temps réel — Kulooc Canada</p>
          </div>
          <div className="flex items-center gap-2">
            {["day", "week", "month"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p as any)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  period === p
                    ? "bg-[#E31837] text-white"
                    : "bg-white/8 text-white/50 hover:bg-white/12"
                }`}
              >
                {p === "day" ? "Jour" : p === "week" ? "Semaine" : "Mois"}
              </button>
            ))}
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="kulooc-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <Icon size={18} className={kpi.color} />
                  <span className={`text-[10px] font-semibold ${kpi.positive ? "text-green-400" : "text-red-400"}`}>
                    {kpi.change}
                  </span>
                </div>
                <div className="text-xl font-bold">{kpi.value}</div>
                <div className="text-[11px] text-white/40 mt-1">{kpi.label}</div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="kulooc-card p-5">
            <h3 className="font-bold text-sm mb-4">Revenus par jour (7 jours)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenueData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenus"]}
                />
                <Bar dataKey="revenue" fill="#E31837" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Rides Chart */}
          <div className="kulooc-card p-5">
            <h3 className="font-bold text-sm mb-4">Courses par jour (7 jours)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }}
                  formatter={(v: number) => [v, "Courses"]}
                />
                <Line type="monotone" dataKey="rides" stroke="#E31837" strokeWidth={2.5} dot={{ fill: "#E31837", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Rides */}
        <div className="kulooc-card overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/8">
            <h3 className="font-bold text-sm">Courses récentes</h3>
            <button
              onClick={() => toast.info("Voir toutes les courses")}
              className="text-xs text-[#E31837] hover:underline"
            >
              Voir tout
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {["ID", "Passager", "Chauffeur", "Statut", "Montant", "Heure"].map((h) => (
                    <th key={h} className="text-left text-xs text-white/40 font-medium px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentRides.map((ride) => (
                  <tr key={ride.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-white/50">{ride.id}</td>
                    <td className="px-5 py-3 font-medium">{ride.passenger}</td>
                    <td className="px-5 py-3 text-white/60">{ride.driver}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[ride.status as keyof typeof statusColors]}`}>
                        {statusLabels[ride.status as keyof typeof statusLabels]}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-semibold text-green-400">
                      {ride.amount > 0 ? `$${ride.amount.toFixed(2)}` : "—"}
                    </td>
                    <td className="px-5 py-3 text-white/40 text-xs">{ride.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Gérer les zones", icon: MapPin, action: () => toast.info("Zones") },
            { label: "Paramètres paiement", icon: CreditCard, action: () => toast.info("Paiements") },
            { label: "Notifications push", icon: Bell, action: () => toast.info("Notifications") },
            { label: "Base de données", icon: Database, action: () => toast.info("Base de données") },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.label}
                onClick={a.action}
                className="kulooc-card p-4 flex items-center gap-3 hover:border-[#E31837]/40 transition-all duration-200 text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E31837]/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#E31837]" />
                </div>
                <span className="text-sm font-medium">{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
