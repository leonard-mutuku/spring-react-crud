# Spring-react-crud

This is a spring boot, react Js integration. frontend is served by react js and back end is spring boot java backed by spring jpa. The application demonstrates crud operations; add, edit, delete & listing of all users. filtering by firstname, lastname and email and sorting is also demonstared.

## Available scripts

In the project directory, you can run:

### `mvn clean install`

This command clean builds the project. It is response for installing node & npm and copying the frontend into the target folder. This is done by frontend-maven-plugin as per steps in the pom.xml build plugin.

### `mvn spring-boot:run`

This command runs the build application and the application can now be accessed from http://127.0.0.1:8080/

### `java -jar target/crud-0.0.1.jar`

This command is used to run the generated fat jar and its the same jar that can be copied & deployed in production environments.
