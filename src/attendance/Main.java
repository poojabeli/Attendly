
package attendance;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        StudentManager manager = new StudentManager();

        int choice;

        do {

            System.out.println("\n================================");
            System.out.println(" ATTENDANCE & PERFORMANCE ANALYZER");
            System.out.println("================================");
            System.out.println("1. Add Student");
            System.out.println("2. Display All Students");
            System.out.println("3. Rank Students");
            System.out.println("4. Exit");

            System.out.print("Enter your choice: ");
            choice = sc.nextInt();

            switch (choice) {

                case 1:

                    System.out.print("Enter Roll Number: ");
                    int roll = sc.nextInt();
                    sc.nextLine();

                    System.out.print("Enter Student Name: ");
                    String name = sc.nextLine();

                    System.out.print("Enter Total Classes: ");
                    int total = sc.nextInt();

                    System.out.print("Enter Attended Classes: ");
                    int attended = sc.nextInt();

                    System.out.print("Enter Marks: ");
                    double marks = sc.nextDouble();

                    if (total <= 0 || attended < 0
                            || attended > total
                            || marks < 0 || marks > 100) {

                        System.out.println("Invalid student details!");
                        break;
                    }

                    Student s = new Student(
                            roll, name, total, attended, marks);

                    manager.addStudent(s);
                    break;

                case 2:

                    manager.displayStudents();
                    break;

                case 3:

                    manager.rankStudents();
                    break;

                case 4:

                    System.out.println(
                            "Thank you for using the analyzer!");
                    break;

                default:

                    System.out.println("Invalid choice! Try again.");
            }

        } while (choice != 4);

        sc.close();
    }
}
