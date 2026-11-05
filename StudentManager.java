

package attendance;


import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class StudentManager {

    private ArrayList<Student> students = new ArrayList<>();

    public void addStudent(Student student) {

        students.add(student);

        System.out.println("Student added successfully!");
    }

    public void displayStudents() {

        if (students.isEmpty()) {
            System.out.println("No students available.");
            return;
        }

        for (Student s : students) {

            System.out.println("--------------------");
            System.out.println("Roll Number: " + s.getRollNumber());
            System.out.println("Name: " + s.getName());
            System.out.println("Attendance: " + s.calculateAttendance() + "%");
            System.out.println("Marks: " + s.getMarks());
            System.out.println("Grade: " + s.calculateGrade());
            System.out.println("Shortage: " + s.hasShortage());
        }
    }

    public void rankStudents() {

        Collections.sort(students,
            Comparator.comparingDouble(Student::getMarks).reversed());

        int rank = 1;

        System.out.println("===== STUDENT RANKING =====");

        for (Student s : students) {

            System.out.println(rank + ". " + s.getName()
                + " - " + s.getMarks());

            rank++;
            
            }
        
        }
     
   ArrayList<Student> getStudents() {
     return students;
   }
 }
