import React from "react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { useAuth } from "../contexts/auth-provider";

export function SignInForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = useAuth();

  const handleSignInSubmit = async (e) => {
    try {
      e.preventDefault();

      await signIn({ username: email, password });
    } catch (err) {
      toast.error("Something failed... you have not been signed in");
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-y-4 p-10"
      onSubmit={handleSignInSubmit}
    >
      <h1
        id="form-title"
        className="text-h1-sm md:text-h1-md lg:text-h1-lg font-bold"
      >
        Sign In
      </h1>
      <div>
        <Label htmlFor="email-signin">Email</Label>
        <Input
          type="email"
          id="email-signin"
          placeholder="example@gmail.com"
          className="placeholder:text-primary-foreground placeholder:opacity-70"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password-signin">Password</Label>
        <Input
          type="password"
          id="password-signin"
          placeholder="••••••••"
          minLength={8}
          className="placeholder:text-primary-foreground placeholder:opacity-70"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        className="bg-card text-card-foreground hover:bg-card/90"
      >
        Sign In
      </Button>
    </form>
  );
}
