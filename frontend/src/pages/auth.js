import { RegisterForm } from "../forms/register-form";
import { SignInForm } from "../forms/signin-form";

/**
 * A page letting the user either register an account or sign in.
 * @returns {React.JSX.Element}
 */
export function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center p-10">
      <div
        id="forms-container"
        className="min-w-screen flex flex-col mt-10 md:flex-row"
      >
        <div className="bg-primary text-primary-foreground rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <SignInForm />
        </div>
        <div className="bg-card text-card-foreground rounded-b-lg md:rounded-r-lg md:rounded-bl-none border-l-2 border-r-2 border-b-2 md:border-t-2">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
