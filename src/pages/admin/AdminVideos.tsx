import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkVideos, type WorkVideo } from "@/hooks/useWorkVideos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Upload, Loader2, Pencil, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = ["Birthdays", "Kids", "Promotions", "Shorts"];

const empty = {
  title: "",
  client: "",
  category: "Birthdays",
  year: String(new Date().getFullYear()),
  poster_url: "",
  video_url: "",
  sort_order: 0,
  is_active: true,
};

const AdminVideos = () => {
  const { videos, loading, refresh } = useWorkVideos({ includeInactive: true });
  const [form, setForm] = useState<typeof empty>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const reset = () => {
    setForm(empty);
    setEditingId(null);
  };

  const startEdit = (v: WorkVideo) => {
    setEditingId(v.id);
    setForm({
      title: v.title,
      client: v.client ?? "",
      category: v.category,
      year: v.year ?? "",
      poster_url: v.poster_url ?? "",
      video_url: v.video_url,
      sort_order: v.sort_order,
      is_active: v.is_active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const upload = async (file: File, kind: "poster" | "video") => {
    setBusy(true);
    const ext = file.name.split(".").pop();
    const path = `${kind}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("site-media").upload(path, file, { upsert: false });
    setBusy(false);
    if (error) {
      toast({ title: "Upload failed", description: error.message });
      return null;
    }
    const { data } = supabase.storage.from("site-media").getPublicUrl(path);
    return data.publicUrl;
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>, kind: "poster" | "video") => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = await upload(f, kind);
    if (url) setForm((p) => ({ ...p, [kind === "poster" ? "poster_url" : "video_url"]: url }));
    e.target.value = "";
  };

  const save = async () => {
    if (!form.title || !form.video_url) {
      toast({ title: "Title and video URL required" });
      return;
    }
    setBusy(true);
    const payload = { ...form, year: form.year || null, client: form.client || null, poster_url: form.poster_url || null };
    const { error } = editingId
      ? await supabase.from("work_videos").update(payload).eq("id", editingId)
      : await supabase.from("work_videos").insert(payload);
    setBusy(false);
    if (error) {
      toast({ title: "Save failed", description: error.message });
      return;
    }
    toast({ title: editingId ? "Updated" : "Added" });
    reset();
    refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    const { error } = await supabase.from("work_videos").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message });
    toast({ title: "Deleted" });
    refresh();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl mb-2">Work Videos</h1>
        <p className="text-muted-foreground">Add, edit and remove videos shown in the Work section.</p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg">{editingId ? "Edit video" : "Add new video"}</h2>
          {editingId && <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4 mr-1" />Cancel</Button>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><Label>Client</Label><Input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} /></div>
          <div>
            <Label>Category</Label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><Label>Year</Label><Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} /></div>
          <div className="sm:col-span-2">
            <Label>Video URL (YouTube, Vimeo, MP4) or upload</Label>
            <div className="flex gap-2">
              <Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://..." />
              <label className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 cursor-pointer text-sm hover:bg-accent">
                <Upload className="h-4 w-4" /> Upload
                <input type="file" accept="video/*" className="hidden" onChange={(e) => onFile(e, "video")} />
              </label>
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label>Poster image URL or upload</Label>
            <div className="flex gap-2">
              <Input value={form.poster_url} onChange={(e) => setForm({ ...form, poster_url: e.target.value })} placeholder="https://..." />
              <label className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 cursor-pointer text-sm hover:bg-accent">
                <Upload className="h-4 w-4" /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e, "poster")} />
              </label>
            </div>
          </div>
          <div><Label>Sort order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
          <div className="flex items-end gap-2">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active
            </label>
          </div>
        </div>
        <Button onClick={save} disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
          {editingId ? "Update video" : "Add video"}
        </Button>
      </div>

      {/* List */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 font-display">All videos ({videos.length})</div>
        {loading ? (
          <div className="p-6 text-muted-foreground">Loading...</div>
        ) : videos.length === 0 ? (
          <div className="p-6 text-muted-foreground">No videos yet — add your first one above.</div>
        ) : (
          <ul className="divide-y divide-white/10">
            {videos.map((v) => (
              <li key={v.id} className="flex items-center gap-4 p-4">
                {v.poster_url ? (
                  <img src={v.poster_url} alt="" className="h-14 w-20 object-cover rounded" />
                ) : (
                  <div className="h-14 w-20 rounded bg-white/5 grid place-items-center text-[10px] text-muted-foreground">no poster</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="truncate text-sm">{v.title} {!v.is_active && <span className="text-xs text-muted-foreground">(hidden)</span>}</div>
                  <div className="text-xs text-muted-foreground truncate">{v.category} · {v.client ?? "—"} · {v.year ?? ""}</div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => startEdit(v)}><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" onClick={() => remove(v.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminVideos;
