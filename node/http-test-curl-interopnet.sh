#! /bin/bash

curl -X POST -H 'Content-Type: application/javascript' --data-raw '{"jsonrpc": "2.0", "method": "Filecoin.Version", "params": [], "id": 1}' http://ec2-52-13-91-110.us-west-2.compute.amazonaws.com:1234/rpc/v0
