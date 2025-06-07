package tiqetdb

import (
	"errors"
	"fmt"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/lvsweat/Tiqet/tiqet-backend/pkg/structs"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {

	err := godotenv.Load() //by default, it is .env so we don't have to write
	if err != nil {
		fmt.Println("Error is occurred  on .env file please check")
	}
	//we read our .env file
	host := os.Getenv("POSTGRES_HOST")
	port := os.Getenv("POSTGRES_PORT")
	user := os.Getenv("POSTGRES_USER")
	pass := os.Getenv("POSTGRES_PASSWORD")
	dbname := os.Getenv("POSTGRES_DB")
	defAdminUsername := os.Getenv("TIQET_ADMIN_USERNAME")
	defAdminPassword := os.Getenv("TIQET_ADMIN_PASSWORD")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, pass, dbname, port)
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	} else {
		fmt.Println("Successfully connected to the database")
		seedUserID := uint32(0)
		if userErr := DB.AutoMigrate(&structs.User{}); userErr == nil && DB.Migrator().HasTable(&structs.User{}) {
			if usersFirstErr := DB.First(&structs.User{}).Error; errors.Is(usersFirstErr, gorm.ErrRecordNotFound) {
				var seedUser structs.User = structs.User{
					Name: "Admin",
					Email: "N/A",
					Username: strings.ToLower(defAdminUsername),
					Roles: []string{"Admin"},
				}
				seedUserRes := DB.Create(&seedUser)
				if seedUserRes.Error != nil {
					panic(seedUserRes.Error)
				}
			
				if seedUserRes.RowsAffected < 1 {
					panic("NO ROWS AFFECTED WHEN ATTEMPTING TO INSERT SEED USER!")
				}
				seedUserID = seedUser.ID
			}
		}
		if loginErr := DB.AutoMigrate(&structs.Login{}); loginErr == nil && DB.Migrator().HasTable(&structs.Login{}) {
			if loginsFirstErr := DB.First(&structs.Login{}).Error; errors.Is(loginsFirstErr, gorm.ErrRecordNotFound) {
				hashBytes, hashGenErr := bcrypt.GenerateFromPassword([]byte(defAdminPassword), 13)

				if hashGenErr != nil {
					panic("FAILED TO HASH DEFAULT ADMIN PASSWORD!")
				}

				var seedLogin structs.Login = structs.Login{
					Username: strings.ToLower(defAdminUsername),
					Hash: string(hashBytes),
					UserID: seedUserID,
				}
				seedLoginRes := DB.Create(&seedLogin)
				if seedLoginRes.Error != nil {
					panic(seedLoginRes.Error)
				}
			
				if seedLoginRes.RowsAffected < 1 {
					panic("NO ROWS AFFECTED WHEN ATTEMPTING TO INSERT SEED LOGIN!")
				}
			}
		}
		DB.AutoMigrate(&structs.Ticket{})
		DB.AutoMigrate(&structs.Tag{})
		if rolesErr := DB.AutoMigrate(&structs.Role{}); rolesErr == nil && DB.Migrator().HasTable(&structs.Role{}) {
			if rolesFirstErr := DB.First(&structs.Role{}).Error; errors.Is(rolesFirstErr, gorm.ErrRecordNotFound) {
				var seedRole structs.Role = structs.Role{
					Name: "Admin",
				}
				seedRoleRes := DB.Create(&seedRole)
				if seedRoleRes.Error != nil {
					panic(seedRoleRes.Error)
				}
			
				if seedRoleRes.RowsAffected < 1 {
					panic("NO ROWS AFFECTED WHEN ATTEMPTING TO INSERT SEED ROLE!")
				}
			}
		}
	}
}
