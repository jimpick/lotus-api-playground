#! /bin/bash

curl -X POST -H 'Content-Type: application/javascript' --data-raw '{"jsonrpc": "2.0", "method": "Filecoin.Version", "params": [], "id": 1}' https://lotus.jimpick.com/spacerace_api/0/node/rpc/v0
