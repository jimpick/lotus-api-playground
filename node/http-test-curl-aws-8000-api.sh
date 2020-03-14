#! /bin/bash

curl -i -X POST -H 'Content-Type: application/javascript' --data-raw '{"jsonrpc": "2.0", "method": "Filecoin.Version", "params": [], "id": 1}' http://ec2-35-164-70-181.us-west-2.compute.amazonaws.com:8000/api/rpc/v0
