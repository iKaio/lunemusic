package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func APIGetFeed(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Cache-Control", "max-age=3600")

	c.JSON(http.StatusOK, []IApp{
		{
			Name: "Minecraft",
			Description: "Minecraft é um jogo eletrônico sandbox de sobrevivência criado pelo desenvolvedor sueco Markus \"Notch\" Persson e posteriormente desenvolvido e publicado...",
			Icon: "https://en.uoldown.com/icon/android/minecraft-apk/minecraft-apk-android.webp",
			Background: "https://images6.alphacoders.com/108/thumb-1920-1082090.jpg",
			DownloadURL: "https://icedrive.net/s/2b65D5CDha7a1PZ1a6uFWbZCDwkP",
			TargetPlatform: 0,
		},
	})
}