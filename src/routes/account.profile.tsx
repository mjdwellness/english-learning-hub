import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/account/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">Profile</h1>
      <p className="mt-2 text-sm text-muted-foreground">Your name, email and learning level.</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          toast.success("Profile saved");
        }}
        className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-card"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="profile-first">First name</Label>
            <Input id="profile-first" defaultValue="Alex" className="mt-1.5 h-11" />
          </div>
          <div>
            <Label htmlFor="profile-last">Last name</Label>
            <Input id="profile-last" defaultValue="Learner" className="mt-1.5 h-11" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              type="email"
              defaultValue="learner@example.com"
              className="mt-1.5 h-11"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="profile-level">Current English level</Label>
            <select
              id="profile-level"
              className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm font-semibold text-navy"
              defaultValue="Intermediate"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
        <Button type="submit" variant="navy" size="lg" className="mt-6">
          Save changes
        </Button>
      </form>
    </div>
  );
}
