package api

import (
	"github.com/gin-gonic/gin"
)

var engine *gin.Engine


func EstablishEndpoints() {
	engine.POST("/auth", AuthenticateUserEndpoint)
	engine.GET("/user/:id", GetUserByIDEndpoint)
	engine.Use(AuthMiddleware)
	{
		engine.GET("/tickets", GetTicketsEndpoint)
		engine.POST("/tickets", PostTicketEndpoint)
	}
}

func StartServing() {
	engine = gin.Default()
	EstablishEndpoints()
	engine.Run()
}