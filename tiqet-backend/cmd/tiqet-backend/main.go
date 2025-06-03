package main

import (
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/api"
	tiqetdb "github.com/lvsweat/Tiqet/tiqet-backend/pkg/ticketdb"
)


func main() {
	tiqetdb.ConnectDatabase()
	api.StartServing()
}