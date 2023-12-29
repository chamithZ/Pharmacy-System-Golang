// internal/app/service/item_service.go

package service

import (
	"fmt"

	"net/http"

	"pharmacy_backend/models"

	"github.com/gofiber/fiber/v2"

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
type ItemService struct {
	DB *gorm.DB
}

func NewItemService(db *gorm.DB) *ItemService {
	return &ItemService{DB: db}
}

func (s *ItemService) CreateItem(context *fiber.Ctx) error {
	item := models.Items{}

	err := context.BodyParser(&item)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"})
		return err
	}

	err = s.DB.Create(&item).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create item"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"message": "item created"})
	return nil
}

func (s *ItemService) GetItems(context *fiber.Ctx) error {
	itemModels := &[]models.Items{}

	err := s.DB.Find(itemModels).Error
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

func (s *ItemService) DeleteItem(context *fiber.Ctx) error {
	itemModel := models.Items{}
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	err := s.DB.Delete(itemModel, id)

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

func (s *ItemService) GetItemByID(context *fiber.Ctx) error {

	id := context.Params("id")
	itemModel := &models.Items{}
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}
	fmt.Println("the ID is", id)

	err := s.DB.Where("id=?", id).First(itemModel).Error
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
