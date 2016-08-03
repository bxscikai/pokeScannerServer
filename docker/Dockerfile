#Docker file for Couply Node Sever

FROM ubuntu:latest

# Update sources
RUN sed -i -e 's/archive.ubuntu.com\|security.ubuntu.com/old-releases.ubuntu.com/g' /etc/apt/sources.list

# Make sure apt is update to date
RUN apt-get update

# Install node and git
RUN apt-get install -y nodejs npm git git-core

# Add startup script 
ADD start.sh /tmp/
RUN chmod +x /tmp/start.sh
CMD ./tmp/start.sh


