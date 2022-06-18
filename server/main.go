package main

import (
	"github.com/gin-gonic/gin"
)

type File struct {
	Name string `json:"name"`
	Version string `json:"version"`
	Url string `json:"url"`
}

type IApp struct {
	Name string `json:"name"`
	Description string `json:"description"`
	Icon string `json:"icon"`
	Background string `json:"background"`
	TargetPlatform int `json:"target_platform"` // 0: android, 1: windows
	Files []File `json:"files"`
}

func main() {
	r := gin.Default()

	r.GET("/api/getfeed", APIGetFeed)
	r.GET("/api/getapp", APIGetApp)

	r.Run()
}