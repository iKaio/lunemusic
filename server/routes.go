package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

var (
	Apps = []IApp{
		{
			Name: "Minecraft",
			Description: "Minecraft é um jogo eletrônico sandbox de sobrevivência criado pelo desenvolvedor sueco Markus \"Notch\" Persson e posteriormente desenvolvido e publicado...",
			Icon: "https://en.uoldown.com/icon/android/minecraft-apk/minecraft-apk-android.webp",
			Background: "https://images6.alphacoders.com/108/thumb-1920-1082090.jpg",
			TargetPlatform: 0,
			Files: []File{
				{Name: "Minecraft: The Wild Update", Version: "1.19.0", Url: "https://icedrive.net/s/2b65D5CDha7a1PZ1a6uFWbZCDwkP"},
				{Name: "Minecraft: The Nether Update", Version: "1.16.0", Url: "https://icedrive.net/s/2b65D5CDha7a1PZ1a6uFWbZCDwkP"},
			},
		},
	}
)

func APIGetFeed(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Cache-Control", "max-age=3600")

	c.JSON(http.StatusOK, Apps)
}

func APIGetApp(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Cache-Control", "max-age=3600")

	index, _ := strconv.Atoi(c.Query("id"))

	c.JSON(http.StatusOK, Apps[index - 1])
}