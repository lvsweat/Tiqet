package endpoints

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/structs"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/utils"
)

func AuthenticateUserEndpoint(c *gin.Context) {
	var loginAttempt structs.LoginAttempt

	if jsonBindErr := c.BindJSON(&loginAttempt); jsonBindErr != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"data": nil})
		return
	}

	user, err := utils.AuthenticateUser(loginAttempt)

	if err == 0 {
		authToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"sub":   user.ID,
			"roles": user.Roles,
			"exp":   time.Now().Add(2 * time.Hour).Unix(),
		})
		authTokenString, _ := authToken.SignedString([]byte(os.Getenv("TIQET_JWT_SECRET")))
		c.SetCookie("token", authTokenString, 3600*2, "/", "localhost", true, true)
		c.IndentedJSON(http.StatusOK, gin.H{"data": user})
		return
	}

	switch err {
	case 1:
		c.IndentedJSON(http.StatusNotFound, gin.H{"data": nil})
	case 2:
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
	default:
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
	}
}