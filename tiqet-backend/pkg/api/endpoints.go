package api

import (
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/structs"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/utils"
)

func GetUserByIDEndpoint(c *gin.Context) {
	strId := c.Param("id")

	id, idErr  := strconv.Atoi(strId)
	if idErr != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
		return
	}

	user, err := utils.GetUserByID(uint32(id))

	if err == 0 {
		c.IndentedJSON(http.StatusOK, gin.H{"data": user})
		return
	}

	switch err {
	case 1:
		c.IndentedJSON(http.StatusNotFound, gin.H{"data": nil})
	case 2:
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
	}
}

func PostTicketEndpoint(c *gin.Context) {
	authedIdInterface, authed := c.Get("authedId")

	if !authed {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		return
	}

	authedId, interfaceToStrOk := authedIdInterface.(float64) // For whatever reason, the jwt claim is interpreted as a float64 rather than an integer
	if !interfaceToStrOk {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
		return
	}

	authedUser, getUserErr := utils.GetUserByID(uint32(authedId))

	switch getUserErr {
	case 1:
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		return
	case 2:
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		return
	}

	var newTicket structs.Ticket

	if jsonBindErr := c.BindJSON(&newTicket); jsonBindErr != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"data": nil})
		return
	}

	getTicketsErr := utils.PostTicket(authedUser, newTicket)

	switch getTicketsErr {
	case 0:
		c.IndentedJSON(http.StatusOK, gin.H{"data": "Successfully submited new ticket!"})
		return
	default:
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
		return
	}
}

func GetTicketsEndpoint(c *gin.Context) {
	authedIdInterface, authed := c.Get("authedId")

	if !authed {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		return
	}

	authedId, interfaceToStrOk := authedIdInterface.(float64) // For whatever reason, the jwt claim is interpreted as a float64 rather than an integer
	if !interfaceToStrOk {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
		return
	}

	authedUser, getUserErr := utils.GetUserByID(uint32(authedId))

	switch getUserErr {
	case 1:
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		return
	case 2:
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		return
	}

	tickets, getTicketsErr := utils.GetTickets(authedUser)

	switch getTicketsErr {
	case 0:
		fallthrough
	case 1:
		c.IndentedJSON(http.StatusOK, gin.H{"data": tickets})
		return
	default:
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
		return
	}
}

func AuthenticateUserEndpoint(c *gin.Context) {
	var loginAttempt structs.LoginAttempt

	if jsonBindErr := c.BindJSON(&loginAttempt); jsonBindErr != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"data": nil})
		return
	}

	user, err := utils.AuthenticateUser(loginAttempt)

	if err == 0 {
		authToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"sub": user.ID,
			"roles": user.Roles,
			"exp": time.Now().Add(2 * time.Hour).Unix(),
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