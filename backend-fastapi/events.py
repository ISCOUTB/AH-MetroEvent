from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from models import Event as EventModel
from database import get_db

event_router = APIRouter()

class Event(BaseModel):
    title: str
    description: str
    date: str
    location: str
    category: str
    organizer_email: str
    attendees: int = 0  

    class Config:
        orm_mode = True

@event_router.post("/create")
def create_event(event: Event, db: Session = Depends(get_db)):
    new_event = EventModel(**event.dict())
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return {"message": "Evento creado exitosamente", "event": new_event}


@event_router.get("/", response_model=List[Event])
def get_all_events(db: Session = Depends(get_db)):
    events = db.query(EventModel).order_by(EventModel.attendees.desc()).all()
    if not events:
        raise HTTPException(status_code=404, detail="No se encontraron eventos")
    return events

@event_router.get("/{event_id}", response_model=Event)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(EventModel).filter(EventModel.id == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return event
