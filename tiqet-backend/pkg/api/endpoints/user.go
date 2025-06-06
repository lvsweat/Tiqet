package endpoints

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/utils"
)

func GetUserEndpoint(c *gin.Context) {
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
	case 0:
		c.IndentedJSON(http.StatusOK, gin.H{"data": authedUser})
		return
	case 1:
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		return
	case 2:
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		return
	}
}

func GetUserByIDEndpoint(c *gin.Context) {
	strId := c.Param("id")

	id, idErr := strconv.Atoi(strId)
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