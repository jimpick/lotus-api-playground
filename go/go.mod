module github.com/jimpick/lotus-api-playground/go

go 1.13

require (
	github.com/filecoin-project/lotus v0.2.10
	github.com/multiformats/go-multiaddr v0.2.1
	github.com/multiformats/go-multiaddr-net v0.1.3
)

replace github.com/coreos/go-systemd => github.com/coreos/go-systemd/v22 v22.0.0

replace github.com/filecoin-project/lotus => ../../lotus

replace github.com/filecoin-project/filecoin-ffi => ../../lotus/extern/filecoin-ffi
