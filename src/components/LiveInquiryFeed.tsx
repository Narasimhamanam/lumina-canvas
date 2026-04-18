import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface QuoteRow {
  id: string;
  project_type: string;
  estimated_price_inr: number;
  display_name: string | null;
  created_at: string;
}

const TYPE_LABELS: Record<string, string> = {
  birthday: "Birthday Edit",
  shorts: "Reels / Shorts",
  promo: "Promo / Event",
  wedding: "Wedding Highlight",
  commercial: "Brand Commercial",
};

const FALLBACK: QuoteRow[] = [
  { id: "f1", project_type: "shorts", estimated_price_inr: 850, display_name: "Aarav", created_at: new Date(Date.now() - 4 * 60_000).toISOString() },
  { id: "f2", project_type: "birthday", estimated_price_inr: 1200, display_name: "Priya", created_at: new Date(Date.now() - 18 * 60_000).toISOString() },
  { id: "f3", project_type: "promo", estimated_price_inr: 4500, display_name: "Rohan", created_at: new Date(Date.now() - 47 * 60_000).toISOString() },
];

const timeAgo = (iso: string) => {
  const m = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
};

const LiveInquiryFeed = () => {
  const [rows, setRows] = useState<QuoteRow[]>(FALLBACK);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { data } = await supabase
        .from("quote_requests")
        .select("id, project_type, estimated_price_inr, display_name, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      if (mounted && data && data.length) setRows(data as QuoteRow[]);
    };
    load();

    const channel = supabase
      .channel("quote_feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "quote_requests" },
        (payload) => {
          setRows((prev) => [payload.new as QuoteRow, ...prev].slice(0, 5));
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="relative py-20">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">Live</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Recent inquiries</span>
          <span className="ml-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <Activity className="h-3 w-3" /> Realtime
          </span>
        </div>

        <ul className="divide-y divide-white/5 overflow-hidden rounded-2xl glass">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center gap-4 p-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 font-display text-xs text-foreground">
                {(r.display_name?.[0] ?? "•").toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm text-foreground">
                  <span className="text-foreground">{r.display_name || "Someone"}</span>
                  <span className="text-muted-foreground"> requested </span>
                  <span className="text-foreground">{TYPE_LABELS[r.project_type] || r.project_type}</span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {timeAgo(r.created_at)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-sm text-gradient-primary">
                  ₹{r.estimated_price_inr.toLocaleString("en-IN")}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">est.</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LiveInquiryFeed;
