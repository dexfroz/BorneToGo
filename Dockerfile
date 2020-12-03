FROM payara/micro

COPY ./target/bornetogo-backend-1.0-SNAPSHOT.war /opt/payara/deployments

EXPOSE 8080

CMD ["--deploymentDir", "/opt/payara/deployments", "--contextroot", "bornetogo", "--nocluster"]
