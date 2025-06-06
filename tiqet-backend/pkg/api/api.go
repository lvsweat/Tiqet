package api

import (
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/api/endpoints"
)

var engine *gin.Engine


func EstablishEndpoints() {
	engine.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("CORS_ALLOW_ORIGIN")}, // Origin for CORS to allow. Configured in .env.backend
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           2 * time.Hour,
	}))

	engine.POST("/auth", endpoints.AuthenticateUserEndpoint)
	engine.GET("/user/:id", endpoints.GetUserByIDEndpoint)
	engine.Use(AuthMiddleware)
	{
		engine.GET("/user", endpoints.GetUserEndpoint)
		engine.POST("/users", endpoints.PostUsersEndpoint)
		engine.GET("/tickets", endpoints.GetTicketsEndpoint)
		engine.POST("/tickets", endpoints.PostTicketsEndpoint)
	}
}

func StartServing() {
	engine = gin.Default()
	EstablishEndpoints()
	engine.Run()
}