"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Monitor, Smartphone, Globe, Shield, ShieldCheck, Trash2,
  LogOut, Loader2, RefreshCw, Clock, MapPin, AlertTriangle,
  CheckCircle2, X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SessionItem {
  id: string;
  deviceInfo: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  createdAt: string;
  isCurrent: boolean;
}

function getDeviceIcon(deviceInfo: string) {
  const lower = deviceInfo.toLowerCase();
  if (lower.includes("iphone") || lower.includes("android") || lower.includes("ipad")) {
    return Smartphone;
  }
  return Monitor;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ── Confirmation Modal ──
function ConfirmModal({
  open,
  title,
  description,
  confirmText,
  onConfirm,
  onCancel,
  loading,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scale-in">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-full text-muted-foreground hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black text-foreground">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground font-medium mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Session Card ──
function SessionCard({
  session,
  onRevoke,
  revoking,
}: {
  session: SessionItem;
  onRevoke: (id: string) => void;
  revoking: string | null;
}) {
  const DeviceIcon = getDeviceIcon(session.deviceInfo);
  const isRevoking = revoking === session.id;

  return (
    <div
      className={`relative group flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
        session.isCurrent
          ? "bg-primary/5 border-primary/20 dark:bg-primary/10"
          : "bg-card border-border hover:border-primary/15"
      }`}
    >
      {/* Device Icon */}
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
          session.isCurrent
            ? "bg-primary/15 text-primary"
            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
        }`}
      >
        <DeviceIcon className="w-5 h-5" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm font-bold text-foreground">{session.deviceInfo}</h4>
          {session.isCurrent && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wide animate-scale-in">
              <ShieldCheck className="w-3 h-3" /> This Device
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
            <Globe className="w-3 h-3" /> {session.ipAddress || "Unknown IP"}
          </span>
          {session.location && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
              <MapPin className="w-3 h-3" /> {session.location}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
            <Clock className="w-3 h-3" /> Active {formatTimeAgo(session.lastActive)}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground/60 mt-1 font-medium">
          Signed in {formatTimeAgo(session.createdAt)}
        </p>
      </div>

      {/* Revoke Button */}
      {!session.isCurrent && (
        <button
          onClick={() => onRevoke(session.id)}
          disabled={isRevoking}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-destructive bg-destructive/5 border border-destructive/10 hover:bg-destructive/10 hover:border-destructive/20 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRevoking ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Trash2 className="w-3.5 h-3.5" />
          )}
          Revoke
        </button>
      )}
    </div>
  );
}

// ── Main Component ──
export default function ActiveSessions() {
  const { data: authSession } = useSession();
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revoking, setRevoking] = useState<string | null>(null);
  const [logoutAllModal, setLogoutAllModal] = useState(false);
  const [logoutAllLoading, setLogoutAllLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchSessions = useCallback(async () => {
    if (!authSession?.accessToken) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/sessions`, {
        headers: { Authorization: `Bearer ${authSession.accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch sessions");
      const data = await res.json();
      setSessions(data.sessions);
    } catch (err: any) {
      setError(err.message || "Failed to load sessions");
    } finally {
      setLoading(false);
    }
  }, [authSession?.accessToken, API_URL]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleRevoke = async (sessionId: string) => {
    setRevoking(sessionId);
    try {
      const res = await fetch(`${API_URL}/api/auth/sessions/${sessionId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authSession?.accessToken}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to revoke session");
      }
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      showToast("Session revoked successfully", "success");
    } catch (err: any) {
      showToast(err.message || "Failed to revoke session", "error");
    } finally {
      setRevoking(null);
    }
  };

  const handleLogoutAll = async () => {
    setLogoutAllLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/logout-all`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authSession?.accessToken}` },
      });
      if (!res.ok) throw new Error("Failed to logout from other devices");
      const data = await res.json();
      // Keep only the current session
      setSessions((prev) => prev.filter((s) => s.isCurrent));
      setLogoutAllModal(false);
      showToast(data.message || "Logged out from all other devices", "success");
    } catch (err: any) {
      showToast(err.message || "Failed to logout from other devices", "error");
    } finally {
      setLogoutAllLoading(false);
    }
  };

  const otherSessionsCount = sessions.filter((s) => !s.isCurrent).length;

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm font-bold animate-slide-in-right ${
            toast.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
              : "bg-destructive/10 border-destructive/20 text-destructive"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertTriangle className="w-4 h-4" />
          )}
          {toast.message}
          <button
            onClick={() => setToast(null)}
            className="ml-2 p-0.5 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-foreground">Active Sessions</h2>
              <p className="text-xs text-muted-foreground font-medium">
                {sessions.length} active session{sessions.length !== 1 ? "s" : ""} across your devices
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSessions}
              disabled={loading}
              className="rounded-xl h-9 px-3 text-xs font-bold"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            {otherSessionsCount > 0 && (
              <Button
                size="sm"
                onClick={() => setLogoutAllModal(true)}
                className="rounded-xl h-9 px-4 text-xs font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md shadow-destructive/10"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                Logout All Others
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground font-medium">Loading sessions...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <p className="text-sm text-destructive font-bold">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchSessions}
                className="rounded-xl text-xs font-bold mt-1"
              >
                Try Again
              </Button>
            </div>
          ) : sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Shield className="w-6 h-6" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">No active sessions found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Current session first, then others */}
              {sessions
                .sort((a, b) => (a.isCurrent ? -1 : b.isCurrent ? 1 : 0))
                .map((session, index) => (
                  <div
                    key={session.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <SessionCard
                      session={session}
                      onRevoke={handleRevoke}
                      revoking={revoking}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Footer Info */}
        {sessions.length > 0 && !loading && (
          <div className="px-5 pb-5">
            <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/50 border border-border">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                If you see any unfamiliar sessions, revoke them immediately and change your password. 
                Sessions expire automatically after 30 days of inactivity.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Logout All Confirmation Modal */}
      <ConfirmModal
        open={logoutAllModal}
        title="Logout All Other Devices"
        description={`This will sign you out from ${otherSessionsCount} other device${otherSessionsCount !== 1 ? "s" : ""}. You'll remain logged in on this device. Other devices will need to sign in again.`}
        confirmText="Logout All"
        onConfirm={handleLogoutAll}
        onCancel={() => setLogoutAllModal(false)}
        loading={logoutAllLoading}
      />
    </>
  );
}
