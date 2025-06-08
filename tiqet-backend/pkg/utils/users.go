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

func GetUserByUsername(username string) (structs.User, uint8) {
	var user structs.User
	err := tiqetdb.DB.Where("username = ?", strings.ToLower(username)).First(&user).Error
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

func CreateUser(newUser structs.NewUser) (structs.User, uint8) {
	var userInfo structs.User = structs.User{
		Name:     newUser.Name,
		Email:    newUser.Email,
		Username: strings.ToLower(newUser.Username),
		Roles:    newUser.Roles,
	}
	userCreateRes := tiqetdb.DB.Create(&userInfo)

	if userCreateRes.Error != nil {
		return structs.User{}, 1
	}

	if userCreateRes.RowsAffected < 1 {
		return structs.User{}, 2
	}

	hashBytes, hashGenErr := bcrypt.GenerateFromPassword([]byte(newUser.Password), 13)

	if hashGenErr != nil {
		return structs.User{}, 3
	}

	var newLogin structs.Login = structs.Login{
		Username: strings.ToLower(newUser.Username),
		Hash:     string(hashBytes),
		UserID:   userInfo.ID,
	}
	loginCreateRes := tiqetdb.DB.Create(&newLogin)

	if loginCreateRes.Error != nil {
		return structs.User{}, 4
	}

	if loginCreateRes.RowsAffected < 1 {
		return structs.User{}, 5
	}

	return userInfo, 0
}