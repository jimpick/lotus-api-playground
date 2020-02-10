package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/filecoin-project/lotus/api/client"
	"github.com/multiformats/go-multiaddr"
	manet "github.com/multiformats/go-multiaddr-net"
)

func main() {
	env, ok := os.LookupEnv("FULLNODE_API_INFO")
	if !ok {
		panic("missing FULLNODE_API_INFO")
	}

	sp := strings.SplitN(env, ":", 2)
	if len(sp) != 2 {
		panic("invalid env value, missing token or address")
	}

	ma, err := multiaddr.NewMultiaddr(sp[1])
	if err != nil {
		panic(err)
	}

	token := []byte(sp[0])
	fmt.Println("ma", ma)
	// fmt.Println("token", token)

	_, addr, err := manet.DialArgs(ma)
	if err != nil {
		panic(err)
	}
	addr = "ws://" + addr + "/rpc/v0"
	fmt.Println("addr", addr)

	headers := http.Header{}
	headers.Add("Authorization", "Bearer "+string(token))

	api, closer, err := client.NewFullNodeRPC(addr, headers)
	if err != nil {
		panic(err)
	}
	defer closer()
	// fmt.Println("api", api)

	ctx := context.Background()
	v, err := api.Version(ctx)
	if err != nil {
		panic(err)
	}
	fmt.Println("version", v.Version)
}
