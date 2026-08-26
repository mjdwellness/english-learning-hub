import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const options = [
  { id: "order-emails", label: "Order and download emails", defaultChecked: true },
  { id: "new-books", label: "New book announcements", defaultChecked: true },
  { id: "yorlingo", label: "Yorlingo tips and challenges", defaultChecked: false },
];

export const Route = createFileRoute("/account/settings")({
  component: SettingsPage;
});

function SettingsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">Settings</h1>
      <p className="mt-2 text-sm text-muted-foreground">Email preferences and account actions.</p>

      <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-card">
        <h2 className="font-display text-lg font-extrabold text-navy">Notifications</h2>
        <ul className="mt-4 divide-y divide-border">
          {options.map((option) => (
            <li key={option.id} className="flex items-center justify-between gap-4 py-4">
              <Label htmlFor={option.id} className="text-sm font-semibold text-foreground">
                {option.label}
              </Label>
              <Switch id={option.id} defaultChecked={option.defaultChecked} />
            </li>
          ))}
        </ul>
        <Button variant="navy" size="lg" className="mt-6" onClick={() => toast.success("Preferences saved")}>
          Save preferences
        </Button>
      </div>

      <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-card">
        <h2 className="font-display text-lg font-extrabold text-navy">Account</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Deleting your account removes access to your purchased downloads.
        </p>
        <Button variant="outline" size="lg" className="mt-4 text-destructive">
          Delete account
        </Button>
      </div>
    </div>
  );
}
