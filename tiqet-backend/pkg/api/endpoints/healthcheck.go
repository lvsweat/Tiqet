package endpoints

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetHealthCheck(c *gin.Context) {
	c.Status(http.StatusOK)
}