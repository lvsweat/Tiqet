package endpoints

import (
	"net/http"
	"slices"

	"github.com/gin-gonic/gin"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/structs"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/utils"
)

func PostUsersEndpoint(c *gin.Context) {
	authedIdInterface, idAuthed := c.Get("authedId")
	authedRolesInterface, rolesAuthed := c.Get("authedRoles")
	if !idAuthed || !rolesAuthed {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		return
	}

	authedId, idInterfaceToStrOk := authedIdInterface.(float64) // For whatever reason, the jwt claim is interpreted as a float64 rather than an integer
	authedRoles, rInterfaceToStrOk := authedRolesInterface.([]interface{})
	if !idInterfaceToStrOk || !rInterfaceToStrOk {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
		return
	}

	if !slices.Contains(authedRoles, "Admin") {
		c.IndentedJSON(http.StatusForbidden, gin.H{"data": nil})
		return
	}

	_, getUserErr := utils.GetUserByID(uint32(authedId))

	if getUserErr != 0 {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		return
	}

	var newUser structs.NewUser
	if newUserJsonBindErr := c.BindJSON(&newUser); newUserJsonBindErr != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"data": nil})
		return
	}

	_, usernameCheck := utils.GetUserByUsername(newUser.Username)

	switch usernameCheck {
	case 0:
		c.IndentedJSON(http.StatusConflict, gin.H{"data": nil})
		return
	case 1:
		break
	default:
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
		return
	}

	newlyCreatedUser, createUserErr := utils.CreateUser(newUser)

	if createUserErr != 0 {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{"data": newlyCreatedUser})
}