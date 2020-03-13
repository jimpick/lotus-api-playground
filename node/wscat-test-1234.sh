#! /bin/bash

echo 'Try this:'
echo '{"jsonrpc": "2.0", "method": "Filecoin.Version", "params": [], "id": 1}'

npx wscat -H 'Content-Type: application/javascript' --connect ws://127.0.0.1:1234/rpc/v0

