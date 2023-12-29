// main.go
package main

import (
	"log"
	"os"
	"pharmacy_backend/models"
	"pharmacy_backend/storage"
	"pharmacy_backend/service"
	"gorm.io/gorm"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	
)

type Repository struct {
	DB *gorm.DB
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASS"),
		User:     os.Getenv("DB_USER"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
		DBName:   os.Getenv("DB_NAME"),
	}

	db, err := storage.NewConnection(config)
	if err != nil {
		log.Fatal("could not load the database")
	}

	err = models.MigrateInvoices(db)
	if err != nil {
		log.Fatal(err)
	}

	err = models.MigrateItems(db)
	if err != nil {
		log.Fatal(err)
	}
	err = models.MigrateUser(db)
	if err != nil {
		log.Fatal(err)
	}


	itemService := service.NewItemService(db)
	invoiceService :=service.NewInvoiceService(db)
	userService :=service.NewUserService(db)

	app := fiber.New()
	setupRoutes(app, itemService)
	setupInvoiceRoutes(app, invoiceService)
	setupUserRoutes(app, userService)
	app.Listen(":8080")
}

func setupRoutes(app *fiber.App, itemService *service.ItemService) {
	api := app.Group("/api/item")
	api.Post("/create_item", itemService.CreateItem)
	api.Delete("delete_item/:id", itemService.DeleteItem) 
	api.Get("/get_items/:id", itemService.GetItemByID)
	api.Get("/items", itemService.GetItems)
}

func setupInvoiceRoutes(app *fiber.App, invoiceService *service.InvoiceService){
	api := app.Group("/api/invoice")
	api.Post("/create_invoice", invoiceService.CreateInvoice)
	api.Delete("/delete_invoice/:invoiceid", invoiceService.DeleteInvoice)
	api.Get("/get_invoice/:invoiceid", invoiceService.GetInvoiceByID)
	api.Get("/invoices",invoiceService.GetInvoices)
}

func setupUserRoutes(app *fiber.App, userService *service.UserService) {
	api := app.Group("/api/user")
	api.Post("/create_user", userService.CreateUser)
	api.Delete("delete_item/:id", userService.DeleteUser) 
	api.Get("/get_items/:id", userService.GetUserByID)
	api.Get("/items", userService.GetUsers)
}


