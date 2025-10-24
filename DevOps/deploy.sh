#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="express-app"
DOCKER_USERNAME="your-docker-username" # Change this to your Docker Hub username
TAG=$(date +%Y%m%d%H%M%S)

echo -e "${YELLOW}Starting deployment process...${NC}"

# Build Docker image
echo -e "${YELLOW}Building Docker image: ${IMAGE_NAME}:${TAG}${NC}"
docker build -t ${IMAGE_NAME}:${TAG} .
if [ $? -ne 0 ]; then
    echo -e "${RED}Docker build failed!${NC}"
    exit 1
fi
echo -e "${GREEN}Docker image built successfully!${NC}"

# Tag the image for Docker Hub
echo -e "${YELLOW}Tagging image for Docker Hub...${NC}"
docker tag ${IMAGE_NAME}:${TAG} ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}
docker tag ${IMAGE_NAME}:${TAG} ${DOCKER_USERNAME}/${IMAGE_NAME}:latest

# Push to Docker Hub
echo -e "${YELLOW}Pushing image to Docker Hub...${NC}"
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:latest
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push image to Docker Hub!${NC}"
    echo -e "${YELLOW}Make sure you're logged in to Docker Hub with: docker login${NC}"
    exit 1
fi
echo -e "${GREEN}Image pushed to Docker Hub successfully!${NC}"

# Update Kubernetes deployment image
echo -e "${YELLOW}Updating Kubernetes deployment...${NC}"
# Update the image in the deployment.yaml file
sed -i "s|image: .*|image: ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}|" ./k8s/deployment.yaml

# Apply Kubernetes configurations
echo -e "${YELLOW}Applying Kubernetes configurations...${NC}"
kubectl apply -f ./k8s/deployment.yaml
kubectl apply -f ./k8s/service.yaml
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to apply Kubernetes configurations!${NC}"
    echo -e "${YELLOW}Make sure your Kubernetes cluster is running and configured correctly.${NC}"
    exit 1
fi
echo -e "${GREEN}Kubernetes configurations applied successfully!${NC}"

# Wait for deployment to complete
echo -e "${YELLOW}Waiting for deployment to complete...${NC}"
kubectl rollout status deployment/express-app
if [ $? -ne 0 ]; then
    echo -e "${RED}Deployment failed to roll out!${NC}"
    exit 1
fi

# Get service URL
echo -e "${YELLOW}Getting service URL...${NC}"
echo -e "${GREEN}You can access your application at:${NC}"
minikube service express-app-service --url

echo -e "${GREEN}Deployment completed successfully!${NC}"