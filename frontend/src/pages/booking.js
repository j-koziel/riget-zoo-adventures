import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { addDays } from "date-fns";

import { DatePicker } from "../components/ui/date-picker";
import { Button } from "../components/ui/button";
import { DatePickerWithRange } from "../components/ui/date-range-picker";
import { toast } from "sonner";
import { Input } from "../components/ui/input";

/**
 * A page which renders either a zoo ticket or hotel booking system
 * @returns {React.JSX.Element}
 */
export function Booking() {
  const [date, setDate] = React.useState(new Date(Date.now()));
  const [dateRange, setDateRange] = React.useState({
    from: new Date(Date.now()),
    to: addDays(new Date(Date.now()), 20),
  });
  const [numPeople, setNumPeople] = React.useState(0);

  const navigate = useNavigate();
  const { type } = useParams();

  React.useEffect(() => {
    console.log(date);
  }, [date]);

  const renderZooBooking = () => {
    if (type === "zoo") {
      return (
        <div className="w-full flex flex-col items-center gap-y-2">
          <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg font-bold mb-2">
            Pick a date for your visit
          </h1>
          <DatePicker date={date} setDate={setDate} />
          <Button
            onClick={() => {
              if (!date) {
                toast.error("Please choose a date");
                return;
              }
              navigate(
                `/booking/zoo/tickets?date=${date.getFullYear()}-${
                  date.getMonth() < 9
                    ? `0${date.getMonth() + 1}`
                    : date.getMonth() + 1
                }-${date.getDate()}`
              );
            }}
          >
            Check Availability
          </Button>
        </div>
      );
    }

    return null;
  };

  const renderHotelBooking = () => {
    if (type === "hotel") {
      return (
        <div className="w-full flex flex-col items-center gap-y-2">
          <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg font-bold mb-2">
            Pick some dates for your stay
          </h1>
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          <div className="flex flex-col items-center justify-center">
            <h2>Pick how many people you would like to stay with</h2>
            <Input
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
            />
          </div>

          <Button
            onClick={() => {
              if (!dateRange) {
                toast.error("Please enter a date range");
                return;
              }

              if (!numPeople) {
                toast.error("Please enter the number of people");
                return;
              }
              navigate(
                `/booking/hotel/rooms?dateRange=${JSON.stringify(
                  dateRange
                )}&numPeople=${numPeople}`
              );
            }}
          >
            Check Availability
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {renderZooBooking()}
      {renderHotelBooking()}
    </div>
  );
}
