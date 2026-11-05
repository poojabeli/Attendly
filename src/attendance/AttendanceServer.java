
package attendance;

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class AttendanceServer {

    public static void main(String[] args) throws IOException {

        StudentManager manager = new StudentManager();

        HttpServer server = HttpServer.create(
new InetSocketAddress(
    Integer.parseInt(System.getenv().getOrDefault("PORT", "8082"))
), 0        );

        // API to add students
        server.createContext("/addStudent", exchange -> {

            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {

                String data = new String(
                    exchange.getRequestBody().readAllBytes()
                );

                String[] values = data.split(",", -1);

                try {
                    int roll = Integer.parseInt(values[0]);
                    String name = values[1];
                    int total = Integer.parseInt(values[2]);
                    int attended = Integer.parseInt(values[3]);
                    double marks = Double.parseDouble(values[4]);

                    Student student = new Student(
                        roll, name, total, attended, marks
                    );

                    manager.addStudent(student);

                    byte[] response =
                        "Student added successfully!".getBytes();

                    exchange.sendResponseHeaders(200, response.length);
                    exchange.getResponseBody().write(response);

                } catch (Exception e) {

                    byte[] response =
                        "Invalid student details".getBytes();

                    exchange.sendResponseHeaders(400, response.length);
                    exchange.getResponseBody().write(response);
                }

            } else {
                exchange.sendResponseHeaders(405, -1);
            }

            exchange.close();
        });

        // Serve website files
        server.createContext("/", exchange -> {

            String path = exchange.getRequestURI().getPath();

            if (path.equals("/")) {
                path = "/index.html";
            }

            Path file = Path.of("web", path.substring(1));

            if (!Files.exists(file) || Files.isDirectory(file)) {
                exchange.sendResponseHeaders(404, -1);
                exchange.close();
                return;
            }

            String contentType = "text/plain";

            if (path.endsWith(".html")) {
                contentType = "text/html";
            } else if (path.endsWith(".css")) {
                contentType = "text/css";
            } else if (path.endsWith(".js")) {
                contentType = "application/javascript";
            }

            byte[] response = Files.readAllBytes(file);

            exchange.getResponseHeaders().set(
                "Content-Type",
                contentType + "; charset=UTF-8"
            );

            exchange.sendResponseHeaders(200, response.length);
            exchange.getResponseBody().write(response);
            exchange.close();
        });

        server.start();

        System.out.println(
            "Attendly running at http://localhost:8082"
        );
    }
}
