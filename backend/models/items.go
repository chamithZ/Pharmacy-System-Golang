package models
import "gorm.io/gorm"


type Items struct{
	ID 		int	`gorm: "primary key;autoIncremnet" json:"id"`
	Name 	*string `json:"name"`
	UnitPrice *string `jsona:"unit_price"`
	Category *string `json:"category"`
	UserId string `json:"userid"`
}

func MigrateItems(db *gorm.DB) error{
	err := db.AutoMigrate(&Items{})
	return err
}