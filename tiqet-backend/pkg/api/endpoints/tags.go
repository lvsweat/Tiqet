package endpoints

import (
	"net/http"
	"slices"

	"github.com/gin-gonic/gin"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/structs"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/utils"
)

func PostTagsEndpoint(c *gin.Context) {
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

	var newTag structs.Tag

	if jsonBindErr := c.BindJSON(&newTag); jsonBindErr != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"data": nil})
		return
	}

	postTagErr := utils.PostTag(newTag)

	switch postTagErr {
	case 0:
		c.IndentedJSON(http.StatusOK, gin.H{"data": "Successfully submited new tag!"})
		return
	default:
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
		return
	}
}

func GetTagsEndpoint(c *gin.Context) {
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

	if getUserErr != 0 {
		c.IndentedJSON(http.StatusUnauthorized, gin.H{"data": nil})
		return
	}

	tags, getTagsErr := utils.GetTags(authedUser)

	switch getTagsErr {
	case 0:
		fallthrough
	case 1:
		c.IndentedJSON(http.StatusOK, gin.H{"data": tags})
		return
	default:
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"data": nil})
		return
	}
}