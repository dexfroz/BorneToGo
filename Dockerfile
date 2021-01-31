# Image building instructions.

# Always use a specific version, instead of :latest
FROM payara/micro:5.2020.7

COPY ./target/*.war /opt/payara/deployments

CMD ["--deploymentDir", "/opt/payara/deployments", "--contextroot", "", "--nocluster"]
