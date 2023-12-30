package models

import "gorm.io/gorm"
import "golang.org/x/crypto/bcrypt"
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
func (u *Users) CheckPassword(password string) bool {
	if u.PassWord == nil {
		return false
	}

	err := bcrypt.CompareHashAndPassword([]byte(*u.PassWord), []byte(password))
	return err == nil
}