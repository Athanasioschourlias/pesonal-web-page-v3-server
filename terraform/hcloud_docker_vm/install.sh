#!/bin/bash
# Update the package list and install prerequisites
apt-get update
apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# Install Docker using the convenient script provided by Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start and enable Docker service
systemctl start docker
systemctl enable docker

# Install Ansible
apt-add-repository --yes --update ppa:ansible/ansible
apt-get update
apt-get install -y ansible
