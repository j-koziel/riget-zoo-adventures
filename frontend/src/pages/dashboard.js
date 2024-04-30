import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";

import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Input } from "../components/ui/input";
import { useAuth } from "../contexts/auth-provider";
import { cn } from "../lib/utils";
import { backendRoutes } from "../lib/config";

/**
 * The user dashboard
 * @returns {React.JSX.Element}
 */
export function Dashboard() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [user, setUser] = React.useState();

  const navigate = useNavigate();
  const { accessToken, me } = useAuth();

  React.useEffect(() => {
    const getAndSetUserData = async () => {
      try {
        const user = await me();
        setUser(user);
      } catch (err) {
        if (!err.response) {
          toast.error("An unexpected error has occurred");
          return;
        }

        toast.error(err.response.data.detail);
      }
    };

    getAndSetUserData();
  }, []);

  return user ? (
    <div className="mt-24 min-h-screen p-10">
      <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg font-bold mb-4">
        Welcome back, {user.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="font-bold">Your details</CardTitle>
            <CardDescription>
              Here are all the details we have on you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-bold">Name</h3>
            <p>{user.name}</p>
            <h3 className="font-bold">Email</h3>
            <p>{user.email}</p>
            <h3 className="font-bold">Password</h3>
            {showPassword ? <p>testpass123</p> : <p>••••••••</p>}{" "}
            <Button
              onClick={() => {
                showPassword ? setShowPassword(false) : setShowPassword(true);
                toast.warning(
                  "This is not actually the password you signed up with. Since passwords are being encrypted, I am currently not able to display your actual password"
                );
              }}
            >
              Show
            </Button>
            <h3 className="font-bold">Date Of Birth</h3>
            <p>{user.dob}</p>
          </CardContent>
          <CardFooter>
            <div className="flex gap-x-2">
              <Dialog>
                <DialogTrigger>
                  <Button>Update Details</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update your details</DialogTitle>
                    <DialogDescription>
                      Here you can update any outdated details
                    </DialogDescription>
                  </DialogHeader>
                  <form className="flex flex-col gap-y-2">
                    <Input type="text" placeholder={user.name} />
                    <Input type="email" placeholder={user.email} />
                    <Input type="password" placeholder="••••••••" />
                    <Button type="submit">Update</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground transition-all hover:bg-destructive/90">
                    Yes, delete my account
                  </AlertDialogAction>
                  <AlertDialogCancel>
                    No, I don't want to delete my account
                  </AlertDialogCancel>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </Card>
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Upcoming bookings</CardTitle>
            <CardDescription>
              Here are any upcoming bookings that you may have
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-2 h-[400px] overflow-y-scroll">
            {user.upcoming_bookings.map((booking, i) => {
              if (booking.type === "hotel") {
                return (
                  <Card key={i} className="flex items-center">
                    <CardHeader>
                      <img
                        src={booking.image_src}
                        alt={booking.image_alt}
                        height={200}
                        width={200}
                        className="rounded-md"
                      />
                    </CardHeader>
                    <CardContent>
                      <h2 className="text-xl md:text-3xl lg:text-5xl font-bold">
                        {booking.room_name}
                      </h2>
                      <p className="text-lg md:text-xl lg:text-2xl">
                        {booking.duration}
                      </p>
                      <p className="text-lg md:text-xl lg:text-2xl">
                        {booking.date}
                      </p>
                    </CardContent>
                  </Card>
                );
              }

              if (booking.type === "zoo") {
                return (
                  <Card key={i} className="flex items-center">
                    <CardHeader>
                      <img
                        src={booking.image_src}
                        alt={booking.image_alt}
                        height={200}
                        width={200}
                        className="rounded-md"
                      />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-4">
                      <div>
                        <h2 className="text-xl md:text-3xl lg:text-5xl font-bold">
                          Safari Tour
                        </h2>
                        <p className="text-lg md:text-xl lg:text-2xl">
                          {booking.num_people}{" "}
                          {booking.num_people > 1 ? "people" : "person"}
                        </p>
                        <p className="text-lg md:text-xl lg:text-2xl">
                          {booking.date}
                        </p>
                      </div>

                      <Button
                        onClick={() => {
                          // If the user's booking is not today then show a pop up which reminds them
                          const isToday = true;
                          if (!isToday) {
                            toast.warning(
                              "Your experience is not starting today... please start right when your tour starts"
                            );
                            return;
                          }

                          navigate("/interactive-experience");
                        }}
                        size="sm"
                      >
                        Start
                      </Button>
                    </CardContent>
                  </Card>
                );
              }

              return "what";
            })}
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Visitor Stats</CardTitle>
            <CardDescription>Here are your statistics</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-evenly">
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl lg:text-9xl font-bold">
                {user.upcoming_bookings.length}
              </span>
              <span className="text-xl md:text-2xl lg:text-3xl">Zoo vists</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl lg:text-9xl font-bold">
                {user.hotel_stays}
              </span>
              <span className="text-xl">Hotel stays</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl lg:text-9xl font-bold">
                {user.num_articles_read}
              </span>
              <span className="text-xl">
                {user.num_articles_read !== 1 ? "Articles" : "Article"} read
              </span>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center justify-center relative">
          <Card
            className={cn(
              `${user.type === "member" ? "" : "blur-lg"}`,
              "w-full h-full"
            )}
          >
            <CardHeader>
              <CardTitle>Your membership</CardTitle>
              <CardDescription>
                You can manage your membership here:
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div>
                <h2>Expires</h2>
                <p>in 2 months</p>
                <h2>Next payment due</h2>
                <p>20/03/2024</p>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    try {
                      const res = await axios.put(
                        backendRoutes.user.updateMemberStatus(false),
                        {},
                        { headers: { Authorization: `Bearer ${accessToken}` } }
                      );

                      toast.success(res.data.msg);
                      setTimeout(() => {
                        navigate(0);
                      }, 1000);
                    } catch (err) {
                      toast.error(err);
                    }
                  }}
                >
                  Cancel my membership
                </Button>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-x-1">
                  <span>{user.type === "member" ? user.points : 100}</span>
                  <span>points</span>
                </div>
                <div className="flex flex-col md:flex-row gap-x-2">
                  <Button>Complete a quiz</Button>
                  <Button>Book an experience</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Button
            className={cn(
              `${user.type === "member" ? "hidden" : ""}`,
              "bg-[#d4af37] hover:bg-[#d4af37]/90 absolute"
            )}
            onClick={() => navigate("/membership")}
          >
            Unlock this section with a membership
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <ReloadIcon className="animate-spin" height={24} width={24} />
    </div>
  );
}
