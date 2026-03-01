/**
 * DashboardLayout — Kulooc V3
 * Layout partagé pour toutes les plateformes (User, Driver, Dispatcher, Fleet, Admin)
 * Sidebar fixe noire + topbar + contenu principal
 */
import { useState, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { KuloocLogo } from "./KuloocLogo";
import { Menu, X, Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
  badge?: number;
}

interface DashboardLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  platformName: string;
  platformColor?: string;
  userInfo?: { name: string; role: string; avatar?: string };
  onlineStatus?: "online" | "offline" | "busy";
}

export function DashboardLayout({
  children,
  navItems,
  platformName,
  platformColor = "#E31837",
  userInfo = { name: "Utilisateur", role: "Client" },
  onlineStatus,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    busy: "bg-yellow-500",
  };

  return (
    <div className="flex h-screen bg-[#0D0D0D] overflow-hidden">
      {/* ===== SIDEBAR ===== */}
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-64 bg-[#111111] border-r border-white/8
        flex flex-col
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/8">
          <KuloocLogo size="sm" />
          <button
            className="lg:hidden text-white/50 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Platform Label */}
        <div className="px-5 py-3 border-b border-white/8">
          <span className="text-[10px] uppercase tracking-widest font-semibold"
            style={{ color: platformColor }}>
            {platformName}
          </span>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = location === item.path || location.startsWith(item.path + "/");
              return (
                <li key={item.path}>
                  <Link href={item.path}>
                    <div className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-all duration-150 cursor-pointer
                      ${isActive
                        ? "bg-[#E31837]/15 text-white border-l-2 border-[#E31837] pl-[10px]"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                      }
                    `}>
                      <span className={isActive ? "text-[#E31837]" : ""}>{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="bg-[#E31837] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge > 99 ? "99+" : item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#E31837]/20 flex items-center justify-center">
                <User size={16} className="text-[#E31837]" />
              </div>
              {onlineStatus && (
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#111111] ${statusColors[onlineStatus]}`} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{userInfo.name}</div>
              <div className="text-xs text-white/40 truncate">{userInfo.role}</div>
            </div>
            <Link href="/">
              <button className="text-white/30 hover:text-white/70 transition-colors p-1" title="Déconnexion">
                <LogOut size={15} />
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-[#111111] border-b border-white/8 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-white/50 hover:text-white p-1.5"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-sm font-semibold text-white/80 hidden sm:block">
              {platformName}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {onlineStatus && (
              <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border
                ${onlineStatus === "online" ? "text-green-400 border-green-400/30 bg-green-400/10" :
                  onlineStatus === "busy" ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" :
                  "text-gray-400 border-gray-400/30 bg-gray-400/10"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusColors[onlineStatus]} ${onlineStatus === "online" ? "animate-pulse" : ""}`} />
                {onlineStatus === "online" ? "En ligne" : onlineStatus === "busy" ? "Occupé" : "Hors ligne"}
              </div>
            )}
            <button className="relative text-white/50 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E31837]" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 rounded-lg px-2 py-1.5 transition-colors">
              <div className="w-7 h-7 rounded-full bg-[#E31837]/20 flex items-center justify-center">
                <User size={14} className="text-[#E31837]" />
              </div>
              <span className="text-sm font-medium hidden sm:block">{userInfo.name}</span>
              <ChevronDown size={14} className="text-white/40" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#0D0D0D]">
          {children}
        </main>
      </div>
    </div>
  );
}
