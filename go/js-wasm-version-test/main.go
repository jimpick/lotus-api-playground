package main

import (
	"context"
	"fmt"
	"net/http"
	"syscall/js"

	"github.com/filecoin-project/lotus/api-wasm/client"
)

func run(this js.Value, inputs []js.Value) interface{} {
	go func() {
		token := js.Global().Get("localStorage").Call("getItem", "token").String()
		fmt.Println("Token:", token)
		headers := http.Header{}
		headers.Add("Authorization", "Bearer "+token)

		// addr := "ws://localhost:8000/api/rpc/v0"
		addr := "not used"
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
	}()
	return nil
}

func main() {
	fmt.Println("Hello, WebAssembly!")

	js.Global().Get("ws").Call("start", js.FuncOf(run))

	select {}
}
