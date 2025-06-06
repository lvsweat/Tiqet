package endpoints

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/structs"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/utils"
)

func PostTicketsEndpoint(c *gin.Context) {
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

	postTicketsErr := utils.PostTicket(authedUser, newTicket)

	switch postTicketsErr {
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