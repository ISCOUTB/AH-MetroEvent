from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

event_router = APIRouter()

# Modelo de datos para eventos
class Event(BaseModel):
    id: int
    title: str
    description: str
    date: str
    location: str  

# Almacenamiento temporal de eventos
events_db = []
event_id_counter = 1

@event_router.post("/create")
def create_event(event: Event):
    global event_id_counter
    event.id = event_id_counter
    events_db.append(event)
    event_id_counter += 1
    return {"message": "Evento creado exitosamente", "event": event}

@event_router.get("/", response_model=List[Event])
def get_all_events():
    if len(events_db) == 0:
        raise HTTPException(status_code=404, detail="No se encontraron eventos")
    return events_db

@event_router.get("/{event_id}", response_model=Event)
def get_event(event_id: int):
    event = next((e for e in events_db if e.id == event_id), None)
    if event is None:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return event
