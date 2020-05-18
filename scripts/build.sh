#!/bin/bash
rm -rf ./build
mkdir ./build
deno bundle ./src/server.ts ./build/server.js