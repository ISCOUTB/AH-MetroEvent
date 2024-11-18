from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
from typing import List
from models import Event as EventModel
from models import EventCategory as CategoryModel
from database import get_db
from fastapi import Query

event_router = APIRouter()

class Event(BaseModel):
    event_id: int
    title: str
    description: str
    location: str
    city: str
    event_category: str
    start_date: datetime  # Ahora es datetime
    end_date: datetime    # Ahora es datetime
    organizer_id: int
    attendees: int = 0  

    class Config:
        orm_mode = True

@event_router.get("/categories", response_model=List[str])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(CategoryModel.name).all()
    if not categories:
        raise HTTPException(status_code=404, detail="No se encontraron categorías")
    return [event_category.name for event_category in categories]

@event_router.post("/create")
def create_event(event: Event, db: Session = Depends(get_db)):
    # Validar que la fecha de inicio sea anterior a la fecha de fin
    if event.start_date >= event.end_date:
        raise HTTPException(status_code=400, detail="La fecha de inicio debe ser anterior a la fecha de fin")

    new_event = EventModel(
        
        title=event.title,
        description=event.description,
        start_date=event.start_date,
        end_date=event.end_date,
        location=event.location,
        city=event.city,
        event_category=event.event_category,
        organizer_id=event.organizer_id,
        attendees=event.attendees
    )
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
    event = db.query(EventModel).filter(EventModel.event_id == event_id).first()
    if event is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return event


# Filtrar eventos por categoría
@event_router.get("/category/{category}", response_model=List[Event])
def get_events_by_category(category: str, db: Session = Depends(get_db)):
    events = db.query(EventModel).filter(EventModel.event_category == category).all()
    if not events:
        raise HTTPException(status_code=404, detail=f"No se encontraron eventos para la categoría '{category}'")
    return events

# Búsqueda de eventos por título y ciudad
@event_router.get("/a/search", response_model=List[Event])
def search_events(
    title: str = Query(None, description="Título del evento"),
    city: str = Query(None, description="Ciudad del evento"),
    db: Session = Depends(get_db)
):
    query = db.query(EventModel)

    # Filtrar por título si se proporciona
    if title:
        query = query.filter(EventModel.title.ilike(f"%{title}%"))

    # Filtrar por ciudad si se proporciona
    if city:
        query = query.filter(EventModel.city.ilike(f"%{city}%"))

    events = query.all()
    if not events:
        raise HTTPException(status_code=404, detail="No se encontraron eventos que coincidan con la búsqueda")
    return events

