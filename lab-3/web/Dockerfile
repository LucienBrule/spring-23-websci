FROM node:19-alpine

ARG CHART_NAME

WORKDIR /app

COPY package.json .
RUN yarn
COPY . .

CMD yarn run dev

# Set a label for the chart name
LABEL io.openshift.build.name=$CHART_NAME