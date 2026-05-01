import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  name: string;
  email: string;
  budget: string | null;
  message: string;
  source: string | null;
  created_at: string | null;
}

const AdminLeads = () => {
  const [rows, setRows] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setRows((data as Lead[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message });
    setRows((r) => r.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl mb-2">Leads / DMs</h1>
        <p className="text-muted-foreground">All messages from the contact form.</p>
      </div>
      <div className="rounded-xl border border-white/10 overflow-hidden">
        {loading ? (
          <div className="p-6 text-muted-foreground">Loading...</div>
        ) : rows.length === 0 ? (
          <div className="p-6 text-muted-foreground">No leads yet.</div>
        ) : (
          <ul className="divide-y divide-white/10">
            {rows.map((l) => (
              <li key={l.id} className="p-4 sm:p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-display">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.created_at ? new Date(l.created_at).toLocaleString() : ""}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${l.email}`} className="text-xs text-primary inline-flex items-center gap-1"><Mail className="h-3 w-3" />{l.email}</a>
                    <Button size="sm" variant="ghost" onClick={() => remove(l.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
                {l.budget && <div className="text-xs text-muted-foreground">Budget: <span className="text-foreground">₹{l.budget}</span></div>}
                <p className="text-sm text-foreground/90 whitespace-pre-wrap">{l.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminLeads;
