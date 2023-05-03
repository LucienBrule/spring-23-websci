FROM node:19-alpine

ARG CHART_NAME

WORKDIR /app

COPY package.json .
RUN yarn
COPY . .

CMD yarn run dev

# Set a label for the chart name
LABEL io.openshift.build.name=$CHART_NAME

# Set the image tag to include the repository name and chart name
ARG IMAGE_PREFIX
ARG REPOSITORY_NAME
ARG IMAGE_TAG
ENV IMAGE_NAME=${IMAGE_PREFIX}/${REPOSITORY_NAME}-${CHART_NAME}:${IMAGE_TAG}
RUN docker tag $(docker build -t $IMAGE_NAME . -q) $IMAGE_NAME
