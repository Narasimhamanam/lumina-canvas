import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Film, MessageSquare, Calculator, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ videos: 0, leads: 0, quotes: 0, revenue: 0 });

  useEffect(() => {
    (async () => {
      const [v, l, q] = await Promise.all([
        supabase.from("work_videos").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("quote_requests").select("estimated_price_inr"),
      ]);
      const revenue = (q.data ?? []).reduce((s, r: any) => s + (r.estimated_price_inr || 0), 0);
      setCounts({
        videos: v.count ?? 0,
        leads: l.count ?? 0,
        quotes: q.data?.length ?? 0,
        revenue,
      });
    })();
  }, []);

  const cards = [
    { label: "Videos", value: counts.videos, icon: Film },
    { label: "Leads / DMs", value: counts.leads, icon: MessageSquare },
    { label: "Quote Requests", value: counts.quotes, icon: Calculator },
    { label: "Quoted ₹", value: `₹${counts.revenue.toLocaleString("en-IN")}`, icon: TrendingUp },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Quick overview of your site activity.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{c.label}</span>
              <c.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="font-display text-2xl text-gradient-primary">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
