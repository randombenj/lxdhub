#!/bin/bash
echo "=== RUNNING PUBLISH SCRIPT ==="
echo "=== COPY MARKDOWN FILES ==="

echo lib/api/ lib/db/ lib/dbsync/ lib/common/ | xargs -n 1 cp CONTRIBUTING.md
echo lib/api/ lib/db/ lib/dbsync/ lib/common/ | xargs -n 1 cp LICENSE
echo lib/api/ lib/db/ lib/dbsync/ lib/common/ | xargs -n 1 cp COPYRIGHT

echo "=== BUILDING APP ==="

npm run build:lib

echo "=== EXECUTE LERNA ==="
lerna publish
