# syntax=docker/dockerfile:experimental

FROM gradle:7.4.1-jdk11 AS build

USER gradle
COPY --chown=gradle:gradle .. /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM openjdk:11-jre-slim
EXPOSE 8080

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs /app/

ENTRYPOINT ["java","-jar","/app/demo-5.2.2.jar"]