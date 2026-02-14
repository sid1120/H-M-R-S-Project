from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core import get_db
from app.models import Employee
from app.schemas.employee import EmployeeCreate, EmployeeResponse

router = APIRouter(prefix="/employees", tags=["Employees"])


# CREATE EMPLOYEE
@router.post("/", response_model=EmployeeResponse)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    
    # Check if email already exists
    existing_email = db.query(Employee).filter(
        Employee.email == employee.email
    ).first()

    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")

    # Check if employee_id already exists
    existing_emp_id = db.query(Employee).filter(
        Employee.employee_id == employee.employee_id
    ).first()

    if existing_emp_id:
        raise HTTPException(status_code=400, detail="Employee ID already exists")

    new_employee = Employee(**employee.model_dump())

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee


# GET ALL EMPLOYEES
@router.get("/", response_model=List[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    employees = db.query(Employee).all()
    return employees


# DELETE EMPLOYEE
@router.delete("/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db)):

    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()

    return {"message": "Employee deleted successfully"}
