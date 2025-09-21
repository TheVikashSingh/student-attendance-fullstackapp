

FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests



FROM eclipse-temurin:21-jdk AS runtime

WORKDIR /app

COPY --from=builder /app/target/student-attendance-app-0.0.1-SNAPSHOT.jar student-attendance-app.jar

ENTRYPOINT ["java","-jar","/app/student-attendance-app.jar"]

