#!/bin/sh

echo ">>>BUILDING THE APPLICATION"
npm run build

echo ">>>LINTING"
npm run lint:api
npm run lint:db

echo ">>>RUN TEST CASES"
npm run test:coverage
