#! /bin/bash

curl -i -X POST -H 'Content-Type: application/javascript' --data-raw '{"jsonrpc": "2.0", "method": "Filecoin.Version", "params": [], "id": 1}' https://lotus.testground.ipfs.team/api/node/0/rpc/v0
