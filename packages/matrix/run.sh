#!/bin/bash

docker run --rm \
  -v $(pwd)/src:/src \
  -v $(pwd)/dist:/dist \
  llvm \
  clang --target=wasm32 -O3 -fno-builtin -flto -nostdlib -Wl,--no-entry -Wl,--export-all /src/matrix.c
