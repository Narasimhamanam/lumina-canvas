import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_CONTENT, type ContentKey } from "@/lib/contentDefaults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";

const SECTIONS: { key: ContentKey; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "about", label: "About" },
  { key: "skills", label: "Skills" },
  { key: "stats", label: "Stats" },
  { key: "testimonials", label: "Testimonials" },
  { key: "clients", label: "Clients wall" },
  { key: "contact", label: "Contact / socials" },
];

const AdminContent = () => {
  const [active, setActive] = useState<ContentKey>("hero");
  const [value, setValue] = useState<any>(DEFAULT_CONTENT.hero);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_content").select("value").eq("key", active).maybeSingle();
      setValue({ ...(DEFAULT_CONTENT as any)[active], ...((data?.value as object) ?? {}) });
    })();
  }, [active]);

  const save = async () => {
    setBusy(true);
    const { error } = await supabase
      .from("site_content")
      .upsert({ key: active, value }, { onConflict: "key" });
    setBusy(false);
    if (error) return toast({ title: "Save failed", description: error.message });
    toast({ title: "Saved" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl mb-2">Site content</h1>
        <p className="text-muted-foreground">Edit text on every section. Changes go live instantly.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.2em] ${
              active === s.key ? "border-primary bg-primary/15 text-foreground" : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
        <SectionEditor sectionKey={active} value={value} onChange={setValue} />
        <Button onClick={save} disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save changes
        </Button>
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5"><Label>{label}</Label>{children}</div>
);

const SectionEditor = ({ sectionKey, value, onChange }: { sectionKey: ContentKey; value: any; onChange: (v: any) => void }) => {
  const set = (k: string, v: any) => onChange({ ...value, [k]: v });

  if (sectionKey === "hero") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Badge"><Input value={value.badge ?? ""} onChange={(e) => set("badge", e.target.value)} /></Field>
        <Field label="Title (top line)"><Input value={value.title_top ?? ""} onChange={(e) => set("title_top", e.target.value)} /></Field>
        <Field label="Title (bottom line)"><Input value={value.title_bottom ?? ""} onChange={(e) => set("title_bottom", e.target.value)} /></Field>
        <div className="sm:col-span-2"><Field label="Description"><Textarea rows={4} value={value.description ?? ""} onChange={(e) => set("description", e.target.value)} /></Field></div>
        <Field label="Stat 1 value"><Input value={value.stat1_value ?? ""} onChange={(e) => set("stat1_value", e.target.value)} /></Field>
        <Field label="Stat 1 label"><Input value={value.stat1_label ?? ""} onChange={(e) => set("stat1_label", e.target.value)} /></Field>
        <Field label="Stat 2 value"><Input value={value.stat2_value ?? ""} onChange={(e) => set("stat2_value", e.target.value)} /></Field>
        <Field label="Stat 2 label"><Input value={value.stat2_label ?? ""} onChange={(e) => set("stat2_label", e.target.value)} /></Field>
        <Field label="Stat 3 value"><Input value={value.stat3_value ?? ""} onChange={(e) => set("stat3_value", e.target.value)} /></Field>
        <Field label="Stat 3 label"><Input value={value.stat3_label ?? ""} onChange={(e) => set("stat3_label", e.target.value)} /></Field>
      </div>
    );
  }

  if (sectionKey === "about") {
    return (
      <div className="grid grid-cols-1 gap-4">
        <Field label="Headline quote"><Textarea rows={2} value={value.headline_quote ?? ""} onChange={(e) => set("headline_quote", e.target.value)} /></Field>
        <Field label="Paragraph 1"><Textarea rows={4} value={value.paragraph_1 ?? ""} onChange={(e) => set("paragraph_1", e.target.value)} /></Field>
        <Field label="Paragraph 2"><Textarea rows={3} value={value.paragraph_2 ?? ""} onChange={(e) => set("paragraph_2", e.target.value)} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Based in"><Input value={value.based_in ?? ""} onChange={(e) => set("based_in", e.target.value)} /></Field>
          <Field label="Specialty"><Input value={value.specialty ?? ""} onChange={(e) => set("specialty", e.target.value)} /></Field>
          <Field label="Toolkit"><Input value={value.toolkit ?? ""} onChange={(e) => set("toolkit", e.target.value)} /></Field>
          <Field label="Languages"><Input value={value.languages ?? ""} onChange={(e) => set("languages", e.target.value)} /></Field>
        </div>
      </div>
    );
  }

  if (sectionKey === "contact") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="WhatsApp number (with country code, no +)"><Input value={value.whatsapp ?? ""} onChange={(e) => set("whatsapp", e.target.value)} /></Field>
        <Field label="Email"><Input value={value.email ?? ""} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Instagram URL"><Input value={value.instagram ?? ""} onChange={(e) => set("instagram", e.target.value)} /></Field>
        <Field label="YouTube URL"><Input value={value.youtube ?? ""} onChange={(e) => set("youtube", e.target.value)} /></Field>
      </div>
    );
  }

  // Array-based sections (skills, stats, testimonials, clients)
  const items: any[] = value.items ?? [];
  const setItems = (next: any[]) => onChange({ ...value, items: next });
  const update = (i: number, k: string, v: any) => {
    const n = [...items]; n[i] = { ...n[i], [k]: v }; setItems(n);
  };
  const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const add = () => {
    if (sectionKey === "skills") setItems([...items, { name: "New tool", level: 80 }]);
    else if (sectionKey === "stats") setItems([...items, { value: 0, suffix: "+", label: "New stat" }]);
    else if (sectionKey === "testimonials") setItems([...items, { quote: "", name: "", role: "Client", avatar: "" }]);
    else if (sectionKey === "clients") setItems([...items, "New client"]);
  };

  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-muted-foreground">Item {i + 1}</div>
            <Button size="sm" variant="ghost" onClick={() => remove(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
          {sectionKey === "skills" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Name"><Input value={it.name ?? ""} onChange={(e) => update(i, "name", e.target.value)} /></Field>
              <Field label="Level (0–100)"><Input type="number" value={it.level ?? 0} onChange={(e) => update(i, "level", Number(e.target.value))} /></Field>
            </div>
          )}
          {sectionKey === "stats" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Value"><Input type="number" value={it.value ?? 0} onChange={(e) => update(i, "value", Number(e.target.value))} /></Field>
              <Field label="Suffix"><Input value={it.suffix ?? ""} onChange={(e) => update(i, "suffix", e.target.value)} /></Field>
              <Field label="Label"><Input value={it.label ?? ""} onChange={(e) => update(i, "label", e.target.value)} /></Field>
            </div>
          )}
          {sectionKey === "testimonials" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2"><Field label="Quote"><Textarea rows={3} value={it.quote ?? ""} onChange={(e) => update(i, "quote", e.target.value)} /></Field></div>
              <Field label="Name"><Input value={it.name ?? ""} onChange={(e) => update(i, "name", e.target.value)} /></Field>
              <Field label="Role"><Input value={it.role ?? ""} onChange={(e) => update(i, "role", e.target.value)} /></Field>
              <div className="sm:col-span-2"><Field label="Avatar URL"><Input value={it.avatar ?? ""} onChange={(e) => update(i, "avatar", e.target.value)} /></Field></div>
            </div>
          )}
          {sectionKey === "clients" && (
            <Input value={it} onChange={(e) => {
              const n = [...items]; n[i] = e.target.value; setItems(n);
            }} />
          )}
        </div>
      ))}
      <Button onClick={add} variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" />Add item</Button>
    </div>
  );
};

export default AdminContent;
