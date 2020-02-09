package main

import (
	"fmt"
	"reflect"

	"github.com/filecoin-project/lotus/api/apistruct"
)

type Foo struct {
	A int `tag1:"First Tag" tag2:"Second Tag"`
	B string
}

func main() {
	fmt.Println("Hello, WebAssembly!")
	f := Foo{A: 10, B: "Salutations"}
	fType := reflect.TypeOf(f)
	fmt.Println("Type", fType.Name())
	fmt.Println("Kind", fType.Kind())
	fmt.Println("NumField", fType.NumField())
	for i := 0; i < fType.NumField(); i++ {
		f := fType.Field(i)
		fmt.Printf("%v (%v)\n", f.Name, f.Type.Name())
	}
	var res apistruct.FullNodeStruct
	resType := reflect.TypeOf(res.Internal)
	fmt.Println("Type", resType.Name())
	fmt.Println("Kind", resType.Kind())
	fmt.Println("NumField", resType.NumField())
}
