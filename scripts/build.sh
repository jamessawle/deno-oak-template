#!/bin/bash
rm -rf ./build
mkdir ./build
deno bundle --unstable --importmap importMap.json ./src/server.ts ./build/server.js