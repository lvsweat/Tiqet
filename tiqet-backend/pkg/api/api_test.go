package api

import (
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/api/endpoints"
	"github.com/stretchr/testify/assert"
)

var testEngine *gin.Engine

func TestServerStart(t *testing.T) {
	testEngine = gin.Default()

	testEngine.GET("/healthcheck", endpoints.GetHealthCheck)
	
	req, _ := http.NewRequest("GET", "/healthcheck", nil)
	w := httptest.NewRecorder()
	testEngine.ServeHTTP(w, req)

	_, err := io.ReadAll(w.Body)

	if err != nil {
		t.Errorf(`http.Get("http://localhost:8080/healthcheck") failed with error: %v`, err)
	}
	assert.Equal(t, http.StatusOK, w.Code)
}