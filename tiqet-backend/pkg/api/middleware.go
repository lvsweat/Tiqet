package api

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(c *gin.Context) {
	authToken, err := c.Cookie("token")

	if err != nil {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		c.Abort()
		return
	}


	token, parseErr := jwt.Parse(authToken, func(t *jwt.Token) (interface{}, error) {
		if t.Method.Alg() != "HS256" {
			return nil, fmt.Errorf("bad sign algorithm")
		}

		return []byte(os.Getenv("TIQET_JWT_SECRET")), nil;
	})

	if parseErr != nil || !token.Valid {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		c.Abort()
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		c.Set("authedId", claims["sub"])
		c.Next()
		return
	} else {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		c.Abort()
		return
	}
}