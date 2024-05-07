import React from "react";

import { DatePicker } from "../components/ui/date-picker";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../contexts/auth-provider";
import { toast } from "sonner";
import { Checkbox } from "../components/ui/checkbox";

/**
 *  This is the form which users will use to create new accounts
 *
 * @returns {React.JSX.Element}
 */
export function RegisterForm() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [date, setDate] = React.useState();
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const { register } = useAuth();

  const handleRegisterSubmit = async (e) => {
    try {
      e.preventDefault();

      if (password !== passwordConfirm) {
        toast.error("Your passwords should match");
        return;
      }

      if (!termsAccepted) {
        toast.error("Please accept the terms and conditions");
        return;
      }

      await register({
        email,
        name,
        password,
        password_confirm: passwordConfirm,
        dob: date,
      });
    } catch (err) {
      toast.error("You have not been registered successfully");
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-y-4 p-16"
      onSubmit={handleRegisterSubmit}
    >
      <h1
        id="form-title"
        className="text-h1-sm md:text-h1-md lg:text-h1-lg font-bold"
      >
        Register
      </h1>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="example@gmail.com"
          className="placeholder:text-card-foreground placeholder:opacity-70"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="John Doe"
          className="placeholder:text-card-foreground placeholder:opacity-70"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="••••••••"
          minLength={8}
          required
          className="placeholder:text-card-foreground placeholder:opacity-70"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password-confirm">Password Confirm</Label>
        <Input
          type="password"
          id="password-confirm"
          placeholder="••••••••"
          minLength={8}
          required
          className="placeholder:text-card-foreground placeholder:opacity-70"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
      <div className="">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          type="date"
          id="dob"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-x-1">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(e) => setTermsAccepted(e)}
        />
        <label htmlFor="terms">
          Accept{" "}
          <a href="/tncs" className="transition-colors hover:text-primary">
            Terms and Conditions
          </a>
        </label>
      </div>

      <Button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Register
      </Button>
    </form>
  );
}
