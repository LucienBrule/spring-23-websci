#!/usr/bin/env bash
# demo.sh - script that calls an api and calls another api based on the response

curl -s https://hacker-news.firebaseio.com/v0/topstories.json \
  | jq -r '.[0:10]' \
  | tr -d '[],' \
  | xargs -I {} curl -s https://hacker-news.firebaseio.com/v0/item/{}.json \
  |jq -r '.title, .url, .score'
