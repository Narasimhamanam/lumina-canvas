import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface QR {
  id: string;
  project_type: string;
  duration_minutes: number;
  turnaround_days: number;
  effects_level: string;
  estimated_price_inr: number;
  display_name: string | null;
  created_at: string | null;
}

const AdminQuotes = () => {
  const [rows, setRows] = useState<QR[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
    setRows((data as QR[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this quote request?")) return;
    const { error } = await supabase.from("quote_requests").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message });
    setRows((r) => r.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl mb-2">Quote Requests</h1>
        <p className="text-muted-foreground">All instant quotes from the website.</p>
      </div>
      <div className="rounded-xl border border-white/10 overflow-x-auto">
        {loading ? (
          <div className="p-6 text-muted-foreground">Loading...</div>
        ) : rows.length === 0 ? (
          <div className="p-6 text-muted-foreground">No quote requests yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left p-3">When</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Duration</th>
                <th className="text-left p-3">FX</th>
                <th className="text-left p-3">Days</th>
                <th className="text-right p-3">Estimate</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">{r.created_at ? new Date(r.created_at).toLocaleString() : ""}</td>
                  <td className="p-3">{r.display_name ?? "—"}</td>
                  <td className="p-3">{r.project_type}</td>
                  <td className="p-3">{r.duration_minutes} min</td>
                  <td className="p-3">{r.effects_level}</td>
                  <td className="p-3">{r.turnaround_days}</td>
                  <td className="p-3 text-right font-display text-gradient-primary">₹{r.estimated_price_inr.toLocaleString("en-IN")}</td>
                  <td className="p-3 text-right"><Button size="sm" variant="ghost" onClick={() => remove(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminQuotes;
