package main 

import()

import (
	"log"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

type Item struct{
	Name String  `json:"name"`
	UnitPrice String  `json:"unit_price"`
	Category String  `json:"godotenv"`
}
type Repository struct {
	DB *gorm.DB
}

func (r *Repository) CreateItem(context *fiber.Ctx) error{
	
}

func(r *Repository) SetupRoutes(app *fiber.App){
	api :=app.Group("/api")
	api.Post("/create_item", r.CreateBook)
	api.Delete("delete_item/:id",r.DeleteItem)
	api.Get("/get_items/:id",r.HetItemByID)
	api.Get("/items",r.GetItems)
	
}

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal(err)
	}

	db, err := storage.NewConnection(config)

	if err !=nil {
		log.Fatal("could not load the database")
	}

	r := Repository{
		DB:db,
	}

	app := fiber.New()
	r.SetupRoutes(app)
	app.Listen(":8080")
}

