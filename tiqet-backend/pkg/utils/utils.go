package utils

import (
	"fmt"
	"strings"

	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/structs"
	tiqetdb "github.com/lvsweat/Tiqet/tiqet-backend/pkg/ticketdb"
	"golang.org/x/crypto/bcrypt"
)


func GetUserByID(id uint32) (structs.User, uint8) {
	var user structs.User
	err := tiqetdb.DB.Where("id = ?", id).First(&user).Error
	if err != nil {
		if err.Error() == "record not found" {
			return structs.User{}, 1
		}
		fmt.Println("Something went wrong!")
		fmt.Println(err)
		return structs.User{}, 2
	} else {
		return user, 0
	}
}

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

func PostTicket(authedUser structs.User, ticket structs.Ticket) (uint8) {
	ticketCreateRes := tiqetdb.DB.Create(&ticket)

	if ticketCreateRes.Error != nil {
		return 5
	}

	if ticketCreateRes.RowsAffected < 1 {
		return 1
	}

	return 0
}