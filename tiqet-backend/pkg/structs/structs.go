package structs

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type LoginAttempt struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Login struct {
	gorm.Model
	ID uint32 `gorm:"type:integer;not null;unique;primary_key"`
	Username string `gorm:"type:text;not null" json:"username"`
	Hash string `gorm:"type:text;not null" json:"hash"`
	UserID uint32 `gorm:"type:integer;not null"`
}

type User struct {
	gorm.Model
	ID uint32 `gorm:"type:integer;not null;unique;primary_key" json:"ID"`
	Name string `gorm:"type:text;not null" json:"name"`
	Email string `gorm:"type:text;not null" json:"email"`
	Username string `gorm:"type:text;not null" json:"username"`
	Roles pq.StringArray `gorm:"type:text[];not null" json:"roles"`
}

type Ticket struct {
	gorm.Model
	ID uint32 `gorm:"type:integer;not null;unique;primary_key" json:"id"`
	Title string `gorm:"type:text;not null" json:"title"`
	Description string `gorm:"type:text;not null" json:"description"`
	Tags pq.StringArray `gorm:"type:text[];not null" json:"tags"`
	Priority uint8 `gorm:"type:integer;not null" json:"priority"`
	CreatorID uint32 `gorm:"type:integer;not null" json:"creatorId"`
	Resolved bool `gorm:"type:bool;not null" json:"resolved"`
}