package utils

import (
	"fmt"

	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/structs"
	tiqetdb "github.com/lvsweat/Tiqet/tiqet-backend/pkg/ticketdb"
)

func PostRole(role structs.Role) uint8 {
	roleCreateRes := tiqetdb.DB.Create(&role)

	if roleCreateRes.Error != nil {
		return 5
	}

	if roleCreateRes.RowsAffected < 1 {
		return 1
	}

	return 0
}

func GetRoles() ([]structs.Role, uint8) {
	var roles []structs.Role

	findErr := tiqetdb.DB.Find(&roles).Error

	if findErr != nil {
		if findErr.Error() == "record not found" {
			return nil, 1
		} else {
			fmt.Println("Something went wrong!")
			fmt.Println(findErr)
			return nil, 5
		}
	} else {
		return roles, 0
	}
}