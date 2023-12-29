package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"pharmacy_backend/models"
	"pharmacy_backend/storage"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

type Item struct {
	Name      string `json:"name"`
	UnitPrice string `json:"unit_price"`
	Category  string `json:"category"`
}
type Repository struct {
	DB *gorm.DB
}

func (r *Repository) CreateItem(context *fiber.Ctx) error {
	item := Item{}

	err := context.BodyParser(&item)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "rquest failed"})
		return err
	}

	errr := r.DB.Create(&item).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create item"})
		return errr
	}
	context.Status(http.StatusOK).JSON(&fiber.Map{"message": "item created"})
	return nil
}

func (r *Repository) GetItems(context *fiber.Ctx) error {
	itemModels := &[]models.Items{}

	err := r.DB.Find(itemModels).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get items"})
		return err

	}
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "items fetched successfully",
		"data":    itemModels,
	})
	return nil
}

func (r *Repository) DeleteItem(context *fiber.Ctx) error {
	itemModel := models.Items{}
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	err := r.DB.Delete(itemModel, id)

	if err.Error != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not delete item",
		})
		return err.Error
	}
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "deleted a item",
	})
	return nil
}

func (r *Repository) GetItemByID(context *fiber.Ctx) error{

	id := context.Params("id")
	itemModel := &models.Items{}
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}
	fmt.Println("the ID is", id)

	err := r.DB.Where("id=?", id).First(itemModel).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get item"})
		return err

	}
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "item fetched successfully",
		"data":    itemModel,
	})
	return nil
}

func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/create_item", r.CreateItem)
	api.Delete("delete_item/:id", r.DeleteItem)
	api.Get("/get_items/:id", r.GetItemByID)
	api.Get("/items", r.GetItems)

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

	err = models.Migrate(db)
	if err != nil {
		log.Fatal(err)
	}

	r := Repository{
		DB: db,
	}

	app := fiber.New()
	r.SetupRoutes(app)
	app.Listen(":8080")
}
