package utils

import (
	"fmt"

	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/structs"
	tiqetdb "github.com/lvsweat/Tiqet/tiqet-backend/pkg/ticketdb"
)

func GetTickets(authedUser structs.User) ([]structs.Ticket, uint8) {
	authedUserIsSupport := false
	for _, role := range authedUser.Roles {
		if role == "Admin" || role == "Manager" || role == "Support" {
			authedUserIsSupport = true
		}
	}

	var tickets []structs.Ticket
	var findErr error
	if authedUserIsSupport {
		findErr = tiqetdb.DB.Find(&tickets).Error
	} else {
		findErr = tiqetdb.DB.Where("creator_id = ?", authedUser.ID).Find(&tickets).Error
	}

	if findErr != nil {
		if findErr.Error() == "record not found" {
			return nil, 1
		} else {
			fmt.Println("Something went wrong!")
			fmt.Println(findErr)
			return nil, 5
		}
	} else {
		return tickets, 0
	}
}

func PostTicket(authedUser structs.User, ticket structs.Ticket) uint8 {
	ticketCreateRes := tiqetdb.DB.Create(&ticket)

	if ticketCreateRes.Error != nil {
		return 5
	}

	if ticketCreateRes.RowsAffected < 1 {
		return 1
	}

	return 0
}