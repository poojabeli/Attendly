FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY src/attendance ./src/attendance
COPY web ./web

RUN javac --add-modules jdk.httpserver -d out src/attendance/*.java

CMD ["java", "--add-modules", "jdk.httpserver", "-cp", "out", "attendance.AttendanceServer"]
