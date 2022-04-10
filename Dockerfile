# syntax=docker/dockerfile:experimental

FROM gradle:7.4.1-jdk11 AS build
EXPOSE 8080

COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM openjdk:11-jre-slim

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs /app/

ENTRYPOINT ["java","-jar","/app/demo-0.0.1-SNAPSHOT.jar"]