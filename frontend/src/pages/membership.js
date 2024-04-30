import { toast } from "sonner";
import axios from "axios";

import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/auth-provider";
import { backendRoutes } from "../lib/config";

export function Membership() {
  // The two arrays below hold the features each account type has
  const freeAccountFeatures = [
    "Manage your bookings",
    "Get free reminders about new experiences",
  ];

  const paidAccountFeatures = [
    "Everything in free plus...",
    "Access to our rewards program",
    "Access to quizzes",
    "Discounts on various experiences",
  ];

  // This function takes a string and the index of the string in the array and spits out a list element
  const renderAccountFeature = (feature, i) => <li key={i}>{feature}</li>;

  const { accessToken, me } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg font-bold mb-4 text-center">
        Get a RZA <span className="text-[#d4af37]">Gold</span> Membership
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="bg-card text-card-foreground p-10 flex flex-col rounded-t-md md:rounded-l-md">
          <h2 className="font-bold text-3xl mb-5">Free Account</h2>
          <ul className="flex flex-col">
            {freeAccountFeatures.map(renderAccountFeature)}
          </ul>
        </div>
        <div className="bg-primary text-primary-foreground p-10 flex flex-col rounded-b-md md:rounded-r-md">
          <h2 className="text-[#d4af37] font-bold text-3xl mb-5">
            Gold Membership
          </h2>
          <ul className="flex flex-col mb-5">
            {paidAccountFeatures.map(renderAccountFeature)}
          </ul>
          <p className="font-bold">Starting from £5/month</p>
          <Button
            className="bg-[#d4af37] hover:bg-[#d4af37]/90"
            onClick={async () => {
              try {
                const user = await me();

                if (user.type === "member") {
                  toast.error("You are already a member.");
                  return;
                }

                const res = await axios.put(
                  backendRoutes.user.updateMemberStatus(true),
                  {},
                  { headers: { Authorization: `Bearer ${accessToken}` } }
                );

                toast.success(res.data.msg);
              } catch (err) {
                toast.error(err);
              }
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
