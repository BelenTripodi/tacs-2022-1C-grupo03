import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.6.6"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
	kotlin("jvm") version "1.6.10"
	kotlin("plugin.spring") version "1.6.10"
	kotlin("plugin.jpa") version "1.6.10"
}

group = "com.example"
version = "5.2.2"
java.sourceCompatibility = JavaVersion.VERSION_11

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springdoc:springdoc-openapi-data-rest:1.6.7")
	implementation("org.springdoc:springdoc-openapi-ui:1.6.7")
	implementation("org.springdoc:springdoc-openapi-kotlin:1.6.7")
	implementation("org.springframework.session:spring-session-core:2.6.3")

	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-data-rest")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.session:spring-session-jdbc:2.6.3")

	implementation("io.jsonwebtoken:jjwt:0.9.1")
	implementation("org.springframework.boot:spring-boot-starter-validation:2.6.6")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation ("com.fasterxml.jackson.datatype:jackson-datatype-joda")
	implementation("javax.validation:validation-api:2.0.1.Final")
	implementation("org.slf4j:slf4j-api:1.7.2")

	compileOnly("joda-time:joda-time:2.10.14")
	runtimeOnly("com.h2database:h2")
	runtimeOnly("mysql:mysql-connector-java")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	implementation("com.fasterxml.jackson.core:jackson-databind:2.13.2.2")
	testImplementation("io.kotest:kotest-runner-junit5:5.2.3")
	testImplementation("io.kotest:kotest-assertions-core:5.2.3")
	testImplementation("io.kotest:kotest-property:5.2.3")
	testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.6.1")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core-jvm:1.6.1")
	testImplementation("io.mockk:mockk:1.12.3")

}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "11"
	}
}

tasks.withType<Test>().configureEach {
	useJUnitPlatform()
}
