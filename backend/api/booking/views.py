from datetime import datetime, timedelta
from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends, Request, status
from sqlalchemy.orm import Session

# from db.models.hotel_room import HotelRoom
from api.auth.utils import decode_access_token
from api.booking.services import create_zoo_ticket, get_all_zoo_tickets
from api.auth.services import oauth2_scheme

from api.booking.dtos import ZooTicket, ZooTicketCreate
from dependencies.db import get_db

booking_router = APIRouter(prefix="/api/v1/booking", tags=["booking"])

# @booking_router.get("/zoo-tickets/availability", tags=["zoo tickets"], response_model=ZooTicket)
# async def get_ticket_availability_for_date(date: str):
#     # Validate the date to ensure it is correct
#     try:
#         validated_date = datetime.strptime(date, "%Y-%m-%d")

#         if ((datetime.now() - validated_date) > timedelta(seconds=0)):
#             raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You can only pick dates which are after today")

#     except ValueError:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This date is invalid, please use the format YYYY-MM-DD")
    
#     if date not in zoo_ticket_db:
#         return ZooTicket(date=date, num_tickets=100, is_available=True)
#     else:
#         return zoo_ticket_db[date]
    
@booking_router.post("/zoo-tickets/book")
async def book_zoo_ticket(new_ticket: ZooTicketCreate, request: Request, db: Session = Depends(get_db)):
    if request.headers.get("Authorization"):
        access_token = request.headers.get("Authorization").split(" ")[1]
        user_id = decode_access_token(access_token)["sub"]
        new_ticket.user_id = user_id
    
    # print("This is the access token")
    # print(access_token)
    # new_ticket.user_id = user_id
    create_zoo_ticket(db, new_ticket)

    return {"msg": "Ticket booked successfully"}


@booking_router.get("/zoo-tickets")
async def all_zoo_tickets(db: Session = Depends(get_db)):
    print(get_all_zoo_tickets(db))
    return get_all_zoo_tickets(db)

# @booking_router.get("/hotel/available-rooms", response_model=list[HotelRoom])
# async def get_rooms() -> HotelRoom:
#     """Gets all the hotel rooms from the hotel rooms database (does not check whether certain dates are available)

#     Args:
#         None
    
#     Returns:
#         list[HotelRoom]: A list of HotelRoom objects
    
#     """
#     return read_db(f"{os.getcwd()}/db/hotel-rooms.json", HotelRoom)

# @booking_router.post("/hotel/book")
# async def book_room(booking_payload: HotelBooking):
#     """Returns the booking payload if the id of the hotel room is found in the hotel-rooms json database 
#     (Does not check for dates so this is not a fully fledged hotel booking endpoint)

#     Args:
#         booking_payload (HotelBooking): The new booking to be made

#     Returns:
#         HotelBooking: The booking which was just made confirming that the booking was successful

#     """
#     hotel_rooms_db = read_db(f"{os.getcwd()}/db/hotel-rooms.json", HotelRoom)

#     for room in hotel_rooms_db:
#         if room.id == booking_payload.hotel_room_id:
#             hotel_rooms_db.append(booking_payload)
#             write_db(f"{os.getcwd()}/db/hotel-bookings.json", hotel_rooms_db)
#             return booking_payload

#     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="That room is not available. Please try a different one")    