package models

import "gorm.io/gorm"

type Users struct{
	UserId int    `gorm:"primary_key;auto_increment" json:"userid"`
	Name 	*string `json:"name"`
	Email *string `jsona:"email"`
	PassWord *string `json:"password"`
	UserType *string `json:"usertype"`
}

func MigrateUser(db *gorm.DB) error{
	err := db.AutoMigrate(&Users{})
	return err
}