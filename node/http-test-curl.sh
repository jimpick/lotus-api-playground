#! /bin/bash

curl -X POST -H 'Content-Type: application/javascript' --data-raw '{"jsonrpc": "2.0", "method": "Filecoin.Version", "params": [], "id": 1}' http://127.0.0.1:8020/rpc/v0
