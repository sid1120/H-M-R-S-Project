from sqlalchemy import Column, Integer, String, Date, ForeignKey
from app.core.database import Base

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String(50))
    date = Column(Date)
    status = Column(String(20))
