package endpoints

import (
	"net/http"
	"slices"

	"github.com/gin-gonic/gin"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/structs"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/utils"
)

func PostRolesEndpoint(c *gin.Context) {
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

	var newRole structs.Role

	if jsonBindErr := c.BindJSON(&newRole); jsonBindErr != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"data": nil})
		return
	}

	postRoleErr := utils.PostRole(newRole)

	switch postRoleErr {
	case 0:
		c.IndentedJSON(http.StatusOK, gin.H{"data": "Successfully submited new role!"})
		return
	default:
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
		return
	}
}

func GetRolesEndpoint(c *gin.Context) {
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

	roles, getRolesErr := utils.GetRoles()

	switch getRolesErr {
	case 0:
		fallthrough
	case 1:
		c.IndentedJSON(http.StatusOK, gin.H{"data": roles})
		return
	default:
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
		return
	}
}