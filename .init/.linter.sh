#!/bin/bash
cd /home/kavia/workspace/code-generation/autumn-brew-point-of-sale-system-147273-147282/pos_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

