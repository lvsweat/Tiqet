package utils

import (
	"strings"

	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/structs"
	tiqetdb "github.com/lvsweat/Tiqet/tiqet-backend/pkg/ticketdb"
	"golang.org/x/crypto/bcrypt"
)

func AuthenticateUser(loginAttempt structs.LoginAttempt) (structs.User, uint8) {
	var login structs.Login

	err := tiqetdb.DB.Where("username = ?", strings.ToLower(loginAttempt.Username)).First(&login).Error
	if err != nil {
		if err.Error() == "record not found" {
			return structs.User{}, 1
		}
	} else {
		authErr := bcrypt.CompareHashAndPassword([]byte(login.Hash), []byte(loginAttempt.Password))
		if authErr != nil {
			return structs.User{}, 1
		}

		user, usrErr := GetUserByID(login.UserID)

		if usrErr == 0 {
			return user, 0
		}

		return structs.User{}, usrErr
	}
	return structs.User{}, 3
}