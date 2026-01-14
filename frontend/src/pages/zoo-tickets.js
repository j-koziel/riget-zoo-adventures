import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import React from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { backendRoutes } from "../lib/config";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/auth-provider";
import { Loader2 } from "lucide-react";

export function ZooTickets() {
  const [availableTickets, setAvailableTickets] = React.useState();
  const [numAdultTickets, setNumAdultTickets] = React.useState(0);
  const [numKidsTickets, setNumKidsTickets] = React.useState(0);
  const [numStudentTickets, setNumStudentTickets] = React.useState(0);
  const [isGuest, setIsGuest] = React.useState(false);
  const [guestEmail, setGuestEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBooked, setIsBooked] = React.useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { me } = useAuth();

  React.useEffect(() => {
    const getAndSetTicketsAvailability = async () => {
      try {
        const date = searchParams.get("date");

        const areTicketsAvailableRes = await axios.get(
          backendRoutes.booking.zooTickets.ticketAvailability(date)
        );

        if (!areTicketsAvailableRes.data.is_available) {
          toast.error(
            "There are no tickets available on this date unfortunately"
          );
          navigate("/booking/zoo");
        }

        setAvailableTickets(areTicketsAvailableRes.data.num_tickets);
      } catch (err) {
        if (err instanceof axios.AxiosError && err.response) {
          toast.error(err.response.data.detail);
          return;
        }
        toast.error("An unexpected error has occurred");
      }
    };

    getAndSetTicketsAvailability();
  }, [isBooked]);

  const ticketTypes = [
    {
      type: "Adult",
      price: "£10.00",
      imgSrc: "/adult-ticket-image.jpg",
      imgAlt: "A woman in black leather jacket watching over some giraffes",
    },
    {
      type: "Kids",
      description: "Children under 16 have a 50% discount",
      price: "£5.00",
      imgSrc: "/kids-ticket-image.jpg",
      imgAlt:
        "A little boy in a brown jacket and jeans standing next to a fence and feeding some young deer",
    },
    {
      type: "Students",
      description: "Use this for school trips and educational visits",
      price: "£5.00",
      imgSrc: "/student-ticket-image.jpg",
      imgAlt: "A boy with ginger hair and a mint shirt looking at a map",
    },
  ];

  const renderTicketCards = (ticket, i) => (
    <Card
      className={cn(
        `${
          i === 2 && (numAdultTickets > 0 || numKidsTickets > 0)
            ? "opacity-50"
            : (i === 0 || i === 1) && numStudentTickets > 0
            ? "opacity-50"
            : null
        }`,
        "w-full mb-2"
      )}
      key={i}
      id="zoo-ticket-card"
    >
      <CardHeader>
        <CardTitle>{ticket.type}</CardTitle>
        {ticket.description ? (
          <CardDescription>{ticket.description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="flex">
          <img
            src={ticket.imgSrc}
            alt={ticket.imgAlt}
            height={200}
            width={200}
            className="rounded-md"
          />
          <p className="text-3xl ml-3">{ticket.price}</p>
        </div>

        <div className="flex items-center gap-x-1 p-2">
          <Button
            size="sm"
            onClick={() =>
              ticket.type === "Adult"
                ? setNumAdultTickets(
                    numAdultTickets === 0 ? 0 : numAdultTickets - 1
                  )
                : ticket.type === "Kids"
                ? setNumKidsTickets(
                    numKidsTickets === 0 ? 0 : numKidsTickets - 1
                  )
                : setNumStudentTickets(
                    numStudentTickets === 0 ? 0 : numStudentTickets - 1
                  )
            }
            disabled={
              i === 2 && (numAdultTickets > 0 || numKidsTickets > 0)
                ? true
                : (i === 0 || i === 1) && numStudentTickets > 0
                ? true
                : false
            }
          >
            <MinusIcon />
          </Button>
          <span className="">
            {ticket.type === "Adult"
              ? numAdultTickets
              : ticket.type === "Kids"
              ? numKidsTickets
              : numStudentTickets}
          </span>

          <Button
            size="sm"
            onClick={() =>
              ticket.type === "Adult"
                ? setNumAdultTickets(numAdultTickets + 1)
                : ticket.type === "Kids"
                ? setNumKidsTickets(numKidsTickets + 1)
                : setNumStudentTickets(numStudentTickets + 1)
            }
            disabled={
              i === 2 && (numAdultTickets > 0 || numKidsTickets > 0)
                ? true
                : (i === 0 || i === 1) && numStudentTickets > 0
                ? true
                : false
            }
          >
            <PlusIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const handleTicketBooking = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setIsBooked(false);
      const user = isGuest ? null : await me();

      const dataToSend = {
        user_id: isGuest ? "" : user.id,
        type: "zoo",
        guest: isGuest,
        date: searchParams.get("date"),
        num_people: numStudentTickets
          ? numStudentTickets
          : numAdultTickets + numKidsTickets,
        email: guestEmail,
        total_cost: numStudentTickets
          ? (5 * numStudentTickets).toString()
          : (10 * numAdultTickets + 5 * numKidsTickets).toString(),
      };

      const res = await axios.post(
        backendRoutes.booking.zooTickets.book,
        dataToSend
      );

      setIsLoading(false);
      toast.success(
        "Ticket successfully booked. A confirmation email has been sent to you. You may now close the dialog window"
      );
      if (!isGuest && user.type === "member") {
        toast.success(`You have gained ${dataToSend.total_cost} points`);
      }

      setNumAdultTickets(0);
      setNumKidsTickets(0);
      setNumStudentTickets(0);
      setIsBooked(true);
    } catch (err) {
      toast.error(err.response.data.detail);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-start justify-center p-24">
      <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg font-bold">
        Prices
      </h1>
      {availableTickets && (
        <p role="doc-subtitle">
          There are {availableTickets} available tickets
        </p>
      )}
      {availableTickets && ticketTypes.map(renderTicketCards)}
      <Dialog>
        <DialogTrigger>
          <Button>Checkout</Button>
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
            <form onSubmit={handleTicketBooking}>
              <div className="mb-2">
                <Label htmlFor="guest-checkout-email">Your Email</Label>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  id="guest-checkout-email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin" /> Booking
                  </span>
                ) : (
                  <span>Buy tickets</span>
                )}
              </Button>
            </form>
          ) : (
            <Button onClick={handleTicketBooking}>
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin" /> Booking
                </span>
              ) : (
                <span>Buy tickets</span>
              )}
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
