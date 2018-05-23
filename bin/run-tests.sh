#!/bin/sh

echo ">>>CLEAR DATABASE"
rm -rf db/test-db.sql

echo ">>>BUILDING THE APPLICATION"
npm run build

echo ">>>LINTING"
npm run lint:api
npm run lint:db

echo ">>>RUN TEST CASES"
npm run test:coverage
