package api

import (
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var engine *gin.Engine


func EstablishEndpoints() {
	engine.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL")}, // Frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           2 * time.Hour,
	}))

	engine.POST("/auth", AuthenticateUserEndpoint)
	engine.GET("/user/:id", GetUserByIDEndpoint)
	engine.Use(AuthMiddleware)
	{
		engine.GET("/user", GetUserEndpoint)
		engine.GET("/tickets", GetTicketsEndpoint)
		engine.POST("/tickets", PostTicketEndpoint)
	}
}

func StartServing() {
	engine = gin.Default()
	EstablishEndpoints()
	engine.Run()
}