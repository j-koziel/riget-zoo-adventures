from datetime import datetime, timedelta
import os
from fastapi import APIRouter, HTTPException, status

from db.models.hotel_room import HotelRoom
from db.models.user import UserInDb
from db.models.zoo_ticket import ZooTicket
from db.models.booking import Booking, HotelBooking
from utils.auth import get_user
from utils.db import read_db, write_db
from utils.user import update_user_bookings

router = APIRouter(prefix="/api/v1/booking", tags=["booking"])

@router.get("/zoo-tickets/availability", tags=["zoo tickets"], response_model=ZooTicket)
async def get_ticket_availability_for_date(date: str):
    zoo_ticket_db = read_db(f"{os.getcwd()}/db/tickets.json", ZooTicket)

    # Validate the date to ensure it is correct
    try:
        validated_date = datetime.strptime(date, "%Y-%m-%d")

        if ((datetime.now() - validated_date) > timedelta(seconds=0)):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You can only pick dates which are after today")

    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This date is invalid, please use the format YYYY-MM-DD")
    
    if date not in zoo_ticket_db:
        return ZooTicket(date=date, num_tickets=100, is_available=True)
    else:
        return zoo_ticket_db[date]
    
@router.post("/zoo-tickets/book", tags=["zoo tickets"], response_model=Booking)
async def book_zoo_ticket(booking_payload: Booking):
    ticket_bookings_db = read_db(f"{os.getcwd()}/db/ticket-bookings.json", Booking)
    zoo_ticket_db = read_db(f"{os.getcwd()}/db/tickets.json", ZooTicket)

    if booking_payload.num_people > 50:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You can not book for that many people.")

    if booking_payload.date not in zoo_ticket_db:
        zoo_ticket_db[booking_payload.date] = ZooTicket(date=booking_payload.date, num_tickets=100 - booking_payload.num_people)
        write_db(f"{os.getcwd()}/db/tickets.json", zoo_ticket_db)
        
        ticket_bookings_db.append(booking_payload)
        write_db(f"{os.getcwd()}/db/ticket-bookings.json", ticket_bookings_db)

        if (not booking_payload.guest):
            return update_user_bookings(booking_payload)
        
        return booking_payload
        
    
    if booking_payload.date in zoo_ticket_db:
        if zoo_ticket_db[booking_payload.date].is_available:
            if (zoo_ticket_db[booking_payload.date].num_tickets - booking_payload.num_people) < 0:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="There are not enough tickets :(")
            
            zoo_ticket_db[booking_payload.date].num_tickets = zoo_ticket_db[booking_payload.date].num_tickets - booking_payload.num_people
            write_db(f"{os.getcwd()}/db/tickets.json", zoo_ticket_db)

            ticket_bookings_db.append(booking_payload)
            write_db(f"{os.getcwd()}/db/ticket-bookings.json", ticket_bookings_db)

            if (not booking_payload.guest):
                return update_user_bookings(booking_payload)
            
            return booking_payload

@router.get("/hotel/available-rooms", response_model=list[HotelRoom])
async def get_rooms() -> HotelRoom:
    """Gets all the hotel rooms from the hotel rooms database (does not check whether certain dates are available)

    Args:
        None
    
    Returns:
        list[HotelRoom]: A list of HotelRoom objects
    
    """
    return read_db(f"{os.getcwd()}/db/hotel-rooms.json", HotelRoom)

@router.post("/hotel/book")
async def book_room(booking_payload: HotelBooking):
    """Returns the booking payload if the id of the hotel room is found in the hotel-rooms json database 
    (Does not check for dates so this is not a fully fledged hotel booking endpoint)

    Args:
        booking_payload (HotelBooking): The new booking to be made

    Returns:
        HotelBooking: The booking which was just made confirming that the booking was successful

    """
    hotel_rooms_db = read_db(f"{os.getcwd()}/db/hotel-rooms.json", HotelRoom)

    for room in hotel_rooms_db:
        if room.id == booking_payload.hotel_room_id:
            hotel_rooms_db.append(booking_payload)
            write_db(f"{os.getcwd()}/db/hotel-bookings.json", hotel_rooms_db)
            return booking_payload

    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="That room is not available. Please try a different one")    