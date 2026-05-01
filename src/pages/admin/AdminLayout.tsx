import { useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminLogout, isAdmin } from "@/lib/adminAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, Film, FileText, MessageSquare, Calculator, LogOut, Menu, X, Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/admin", end: true, label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/videos", label: "Videos", icon: Film },
  { to: "/admin/content", label: "Content", icon: FileText },
  { to: "/admin/leads", label: "Leads / DMs", icon: MessageSquare },
  { to: "/admin/quotes", label: "Quote Requests", icon: Calculator },
];

const AdminLayout = () => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  if (!isAdmin()) return <Navigate to="/admin/login" replace />;

  const logout = async () => {
    adminLogout();
    await supabase.auth.signOut();
    nav("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-surface-deep text-foreground">
      {/* Top bar (mobile) */}
      <div className="lg:hidden flex items-center justify-between border-b border-white/10 px-4 py-3">
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-2">
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-display">Admin</span>
        <NavLink to="/" className="p-2"><Home className="h-5 w-5" /></NavLink>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/10 bg-surface-deep p-5 transition-transform lg:static lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Admin</div>
              <div className="font-display">Narasimha Manam</div>
            </div>
            <button onClick={() => setOpen(false)} className="lg:hidden p-1" aria-label="Close menu">
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="space-y-1">
            {links.map(({ to, end, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-primary/15 text-foreground border border-primary/30"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="absolute bottom-5 left-5 right-5 space-y-2">
            <NavLink to="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
              <Home className="h-3.5 w-3.5" /> Back to site
            </NavLink>
            <Button onClick={logout} variant="outline" size="sm" className="w-full">
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </aside>

        {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

        {/* Main */}
        <main className="flex-1 min-w-0 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
