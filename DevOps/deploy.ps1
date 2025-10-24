# PowerShell deployment script

# Configuration
$IMAGE_NAME = "express-app"
$DOCKER_USERNAME = "your-docker-username" # Change this to your Docker Hub username
$TAG = Get-Date -Format "yyyyMMddHHmmss"
$SKIP_PUSH = $true # Set to $false when you're ready to push to Docker Hub

Write-Host "Starting deployment process..." -ForegroundColor Yellow

# Build Docker image
Write-Host "Building Docker image: ${IMAGE_NAME}:${TAG}" -ForegroundColor Yellow
docker build -t ${IMAGE_NAME}:${TAG} .
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Docker image built successfully!" -ForegroundColor Green

# Tag the image for Docker Hub
Write-Host "Tagging image for Docker Hub..." -ForegroundColor Yellow
docker tag ${IMAGE_NAME}:${TAG} ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}
docker tag ${IMAGE_NAME}:${TAG} ${DOCKER_USERNAME}/${IMAGE_NAME}:latest

# Push to Docker Hub
if (-not $SKIP_PUSH) {
    Write-Host "Pushing image to Docker Hub..." -ForegroundColor Yellow
    docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}
    docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:latest
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to push image to Docker Hub!" -ForegroundColor Red
        Write-Host "Make sure you're logged in to Docker Hub with: docker login" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "Image pushed to Docker Hub successfully!" -ForegroundColor Green
} else {
    Write-Host "Skipping Docker Hub push (SKIP_PUSH is set to true)" -ForegroundColor Yellow
}

# Update Kubernetes deployment image
if (-not $SKIP_PUSH) {
    Write-Host "Updating Kubernetes deployment..." -ForegroundColor Yellow
    # Update the image in the deployment.yaml file
    (Get-Content -Path "./k8s/deployment.yaml") -replace "image: .*", "image: ${DOCKER_USERNAME}/${IMAGE_NAME}:${TAG}" | Set-Content -Path "./k8s/deployment.yaml"

    # Apply Kubernetes configurations
    Write-Host "Applying Kubernetes configurations..." -ForegroundColor Yellow
    kubectl apply -f ./k8s/deployment.yaml
    kubectl apply -f ./k8s/service.yaml
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to apply Kubernetes configurations!" -ForegroundColor Red
        exit 1
    }

    Write-Host "Checking deployment status..." -ForegroundColor Yellow
    kubectl get deployments
    kubectl get services
} else {
    Write-Host "Skipping Kubernetes deployment (SKIP_PUSH is set to true)" -ForegroundColor Yellow
}

Write-Host "Deployment completed successfully!" -ForegroundColor Green