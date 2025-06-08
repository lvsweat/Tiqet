package utils

import (
	"fmt"

	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/structs"
	tiqetdb "github.com/lvsweat/Tiqet/tiqet-backend/pkg/ticketdb"
)

func PostTag(tag structs.Tag) uint8 {
	tagCreateRes := tiqetdb.DB.Create(&tag)

	if tagCreateRes.Error != nil {
		return 5
	}

	if tagCreateRes.RowsAffected < 1 {
		return 1
	}

	return 0
}

func GetTags(authedUser structs.User) ([]structs.Tag, uint8) {
	var tags []structs.Tag

	findErr := tiqetdb.DB.Where("roles && ?", authedUser.Roles).Find(&tags).Error

	if findErr != nil {
		if findErr.Error() == "record not found" {
			return nil, 1
		} else {
			fmt.Println("Something went wrong!")
			fmt.Println(findErr)
			return nil, 5
		}
	} else {
		return tags, 0
	}
}