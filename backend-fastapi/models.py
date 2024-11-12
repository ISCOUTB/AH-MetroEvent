from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime, Date, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(45), unique=True, nullable=False)
    email = Column(String(45), unique=True, nullable=False)
    password_hash = Column(String(45), nullable=False)
    user_type = Column(String(45), nullable=False)
    
    # Relaciones
    events = relationship("Event", back_populates="organizer")
    comments = relationship("Comment", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
    profile = relationship("UserProfile", back_populates="user", uselist=False)


class Event(Base):
    __tablename__ = 'events'
    
    event_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(45), nullable=False)
    description = Column(String(45), nullable=True)
    category = Column(String(45), nullable=False)
    location = Column(String(45), nullable=False)
    startime = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    organizer_id = Column(Integer, ForeignKey('users.user_id'), nullable=True)
    attendees = Column(Integer, default=0)
    
    # Relaciones
    organizer = relationship("User", back_populates="events")
    comments = relationship("Comment", back_populates="event")
    notifications = relationship("Notification", back_populates="event")
    categories = relationship("EventCategoryAssignment", back_populates="event")


class Comment(Base):
    __tablename__ = 'comments'
    
    comments_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=True)
    event_id = Column(Integer, ForeignKey('events.event_id'), nullable=True)
    content = Column(String(100), nullable=False)
    rating = Column(Enum('1', '2', '3', '4', '5'), nullable=False)
    created_at = Column(Date, nullable=True)
    
    # Relaciones
    user = relationship("User", back_populates="comments")
    event = relationship("Event", back_populates="comments")


class EventCategory(Base):
    __tablename__ = 'event_categories'
    
    category_id = Column(Integer, primary_key=True)
    name = Column(String(45), nullable=False)


class EventCategoryAssignment(Base):
    __tablename__ = 'event_category_assignments'
    
    event_id = Column(Integer, ForeignKey('events.event_id'), primary_key=True)
    category_id = Column(Integer, ForeignKey('event_categories.category_id'), primary_key=True)
    
    # Relaciones
    event = relationship("Event", back_populates="categories")
    category = relationship("EventCategory")


class Notification(Base):
    __tablename__ = 'notifications'
    
    notifications_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=True)
    event_id = Column(Integer, ForeignKey('events.event_id'), nullable=True)
    message = Column(String(200), nullable=False)
    sent_at = Column(Date, nullable=False)
    
    # Relaciones
    user = relationship("User", back_populates="notifications")
    event = relationship("Event", back_populates="notifications")


class UserProfile(Base):
    __tablename__ = 'user_profiles'
    
    user_id = Column(Integer, ForeignKey('users.user_id'), primary_key=True)
    full_name = Column(String(45), nullable=False)
    biografia = Column(String(100), nullable=True)
    update_at = Column(String(45), nullable=False)
    
    # Relaciones
    user = relationship("User", back_populates="profile")
