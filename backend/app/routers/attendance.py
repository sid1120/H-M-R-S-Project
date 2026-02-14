from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import date

from app.core import get_db
from app.models import Attendance, Employee
from app.schemas.attendance import AttendanceCreate, AttendanceResponse


router = APIRouter(prefix="/attendance", tags=["Attendance"])


# MARK ATTENDANCE
@router.post("/", response_model=AttendanceResponse)
def mark_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):

    # Check employee exists
    employee = db.query(Employee).filter(
        Employee.id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    new_attendance = Attendance(**attendance.model_dump())

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    return new_attendance

# DELETE ATTENDANCE
@router.delete("/{attendance_id}")
def delete_attendance(attendance_id: int, db: Session = Depends(get_db)):

    record = db.query(Attendance).filter(
        Attendance.id == attendance_id
    ).first()

    if not record:
        raise HTTPException(status_code=404, detail="Attendance not found")

    db.delete(record)
    db.commit()

    return {"message": "Attendance deleted successfully"}


# GET ALL ATTENDANCE
@router.get("/", response_model=List[AttendanceResponse])
def get_attendance(db: Session = Depends(get_db)):
    records = db.query(Attendance).all()
    return records


# GET ATTENDANCE BY EMPLOYEE
@router.get("/employee/{employee_id}", response_model=List[AttendanceResponse])
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):

    records = db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).all()

    return records
