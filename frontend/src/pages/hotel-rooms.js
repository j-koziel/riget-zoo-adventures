import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import React from "react";
import { Bed, Wifi, WifiOff } from "lucide-react";
import { MoonIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { backendRoutes } from "../lib/config";
import { useAuth } from "../contexts/auth-provider";

export function HotelRooms() {
  const [roomData, setRoomData] = React.useState();
  const [isGuest, setIsGuest] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [guestEmail, setGuestEmail] = React.useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const { me } = useAuth();

  React.useEffect(() => {
    const getAndSetRoomsAvailability = async () => {
      try {
        const roomsRes = await axios.get(
          backendRoutes.booking.hotelRooms.getRooms
        );

        console.log(roomsRes.data);

        setRoomData(roomsRes.data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getAndSetRoomsAvailability();
  }, []);

  const FreeWifiIndicator = ({ text }) => (
    <span className="text-span-sm md:text-span-md lg:text-span-lg">{text}</span>
  );

  const renderRoomCard = (room, i) => (
    <Card key={i} className="w-full mb-2" id="room-card">
      <CardHeader>
        <CardTitle>{room.type}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2 md:flex-row items-center justify-between">
        <img
          src={room.img_src}
          alt={room.img_alt}
          height={200}
          width={200}
          className="rounded-md"
        />
        <div className="flex flex-row md:flex-col items-center gap-x-2">
          <Bed height={48} width={48} />
          <span className="text-span-sm md:text-span-md lg:text-span-lg">
            {room.num_beds} beds
          </span>
        </div>
        {room.free_wifi ? (
          <div className="flex flex-row md:flex-col items-center gap-x-2">
            <Wifi height={48} width={48} />
            <FreeWifiIndicator text="Free Wifi" />
          </div>
        ) : (
          <div className="flex flex-row md:flex-col items-center gap-x-2">
            <WifiOff height={48} width={48} />
            <FreeWifiIndicator text="No Free Wifi" />
          </div>
        )}
        <div className="font-bold text-2xl flex items-center justify-center gap-x-2">
          £{room.price_per_night} / <MoonIcon height={24} width={24} />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center md:flex md:justify-start">
        <Dialog>
          <DialogTrigger>
            <Button>Choose</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter your details</DialogTitle>
              <DialogDescription>
                For the purpose of this demonstration, bank information is not
                being accepted
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Label htmlFor="guest-checkbox">Checkout as guest</Label>
              <Checkbox
                id="guest-checkbox"
                checked={isGuest}
                onCheckedChange={(checked) => setIsGuest(checked)}
              />
            </div>
            {isGuest ? (
              <form
                onSubmit={async (e) => {
                  try {
                    e.preventDefault();
                    setIsLoading(true);
                    const res = await axios.post(
                      backendRoutes.booking.hotelRooms.book,
                      {
                        user_id: "",
                        type: "zoo",
                        guest: true,
                        date: "2024-05-25",
                        num_people: searchParams.get("numPeople"),
                        email: guestEmail,
                        duration: `${
                          JSON.parse(searchParams.get("dateRange")).from
                        }-${JSON.parse(searchParams.get("dateRange")).to}`,
                        hotel_room_id: room.id,
                      }
                    );

                    setIsLoading(false);
                    toast.success(
                      "Room successfully booked. A confirmation email has been sent to you. You may now close the dialog window"
                    );
                  } catch (err) {
                    if (!err.response) {
                      toast.error("An unexpected error has occurred");
                      setIsLoading(false);
                      return;
                    }
                    toast.error(err.response.data.detail);
                    setIsLoading(false);
                  }
                }}
              >
                <div className="mb-2">
                  <Label htmlFor="guest-checkout-email">Your Email</Label>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    id="guest-checkout-email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                  />
                </div>
                <Button type="submit">Buy room</Button>
              </form>
            ) : (
              <Button
                onClick={async (e) => {
                  try {
                    setIsLoading(true);
                    const user = await me();

                    const res = await axios.post(
                      backendRoutes.booking.zooTickets.book,
                      {
                        user_id: "",
                        type: "zoo",
                        guest: false,
                        date: "2024-05-25",
                        num_people: searchParams.get("num_people"),
                        email: user.email,
                      }
                    );

                    setIsLoading(false);
                    toast.success(
                      "Room successfully booked. A confirmation email has been sent to you. You may now close the dialog window"
                    );
                  } catch (err) {
                    toast.error(err.response.data.detail);
                    setIsLoading(false);
                  }
                }}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin" /> Booking
                  </span>
                ) : (
                  <span>Buy room</span>
                )}
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-24">
      <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg font-bold self-start">
        Rooms
      </h1>
      <p role="doc-subtitle" className="text-foreground/70 self-start mb-4">
        Check out all our available rooms
      </p>
      {roomData && roomData.map(renderRoomCard)}
    </div>
  );
}
