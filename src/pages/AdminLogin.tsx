import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { adminLogin, isAdmin } from "@/lib/adminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [busy, setBusy] = useState(false);

  if (isAdmin()) return <Navigate to="/admin" replace />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (!adminLogin(u, p)) {
      toast({ title: "Invalid credentials", description: "Check username and password" });
      setBusy(false);
      return;
    }
    // Sign in to Supabase anonymously so RLS write policies (authenticated) work.
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      toast({ title: "Backend sign-in failed", description: error.message });
      setBusy(false);
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-deep p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl glass-strong p-8 space-y-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
            <Lock className="h-5 w-5 text-white" />
          </span>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Admin</div>
            <h1 className="font-display text-xl">Sign in</h1>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="u">Username</Label>
          <Input id="u" value={u} onChange={(e) => setU(e.target.value)} autoComplete="username" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="p">Password</Label>
          <Input id="p" type="password" value={p} onChange={(e) => setP(e.target.value)} autoComplete="current-password" required />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Signing in..." : "Sign in"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          For site owner only.
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
