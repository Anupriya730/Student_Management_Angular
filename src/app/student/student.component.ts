import { Component, OnInit } from '@angular/core';
import { Student, StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  standalone: false
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  newStudent: Student = { id: 0, name: '', age: 0 };
  isEditing = false;
  showForm = false;
  selectedId: number | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe(data => (this.students = data));
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => this.fetchStudents());
  }

  editStudent(student: Student): void {
    this.isEditing = true;
    this.showForm = true;
    this.selectedId = student.id;
    this.newStudent = { ...student };
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  submitStudent(): void {
    if (this.isEditing && this.selectedId !== null) {
      this.studentService.updateStudent(this.selectedId, this.newStudent).subscribe(() => {
        this.fetchStudents();
        this.resetForm();
      });
    } else {
      this.studentService.addStudent(this.newStudent).subscribe(() => {
        this.fetchStudents();
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.newStudent = { id: 0, name: '', age: 0 };
    this.isEditing = false;
    this.showForm = false;
    this.selectedId = null;
  }
}
