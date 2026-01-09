FROM eclipse-temurin:17-jre

WORKDIR /app

COPY backend.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "app.jar"]
