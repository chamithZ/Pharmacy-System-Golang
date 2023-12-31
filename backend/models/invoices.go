package models

import "gorm.io/gorm"

type Invoices struct{
	InvoiceId int    `gorm:"primary_key;auto_increment" json:"invoiceid"`
	Name 	*string `json:"name"`
	Email *string `jsona:"email"`
	Address *string `json:"address"`
	BillType *string `json:"billtype"`
	UserId string `json:"userid"`
}

func MigrateInvoices(db *gorm.DB) error{
	err := db.AutoMigrate(&Invoices{})
	return err
}