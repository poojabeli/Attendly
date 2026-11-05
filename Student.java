
package attendance;
import java.util.ArrayList;

public class Student {

    private int roll;
    private String name;
    private int total;
    private int attended;
    private double marks;

    public Student(int roll, String name, int total,
                   int attended, double marks) {
        this.roll = roll;
        this.name = name;
        this.total = total;
        this.attended = attended;
        this.marks = marks;
    }

    public double calculateAttendance() {
        return (attended * 100.0) / total;
    }

    public String calculateGrade() {
        if (marks >= 90)
            return "A+";
        else if (marks >= 80)
            return "A";
        else if (marks >= 70)
            return "B";
        else if (marks >= 60)
            return "C";
        else if (marks >= 50)
            return "D";
        else
            return "F";
    }

    public boolean hasShortage() {
        return calculateAttendance() < 75;
    }

    public int getRollNumber() {
        return roll;
    }

    public String getName() {
        return name;
    }

    public double getMarks() {
        return marks;
    }
}
