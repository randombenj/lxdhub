#!/bin/bash
CIRCLE_TAG="$(git tag -l --points-at HEAD)"
VERSION="${CIRCLE_TAG:1}"

echo "========="
echo "RELEASE ${VERSION}"

# Remove "v"-prefix from lerna

# Login to dockerhub
docker login -u $DOCKER_HUB_USER -p $DOCKER_HUB_PASSWORD

# Build docker
## api
docker build -t $DOCKER_HUB_REPOSITORY-api:latest -f Dockerfile.api .
docker tag $DOCKER_HUB_REPOSITORY-api:latest $DOCKER_HUB_REPOSITORY-api:$VERSION

## dbsync
docker build -t $DOCKER_HUB_REPOSITORY-dbsync:latest -f Dockerfile.dbsync .
docker tag $DOCKER_HUB_REPOSITORY-dbsync:latest $DOCKER_HUB_REPOSITORY-dbsync:$VERSION

# Deploy to dockerhub
## api
docker push $DOCKER_HUB_REPOSITORY-api:latest
docker push $DOCKER_HUB_REPOSITORY-api:$VERSION

## dbsync
docker push $DOCKER_HUB_REPOSITORY-dbsync:latest
docker push $DOCKER_HUB_REPOSITORY-dbsync:$VERSION

