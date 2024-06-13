#! /usr/bin/env bash

docker run -it --rm -p 1880:1880 \
    -v ./tools/settings.js:/data/settings.js \
    -v ./tools/package.json:/data/package.json \
    -v .:/data/node_modules/node-red-contrib-megalodon:ro \
    --name node-red-contrib-megalodon nodered/node-red
