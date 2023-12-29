// internal/app/service/item_service.go

package service

import (
	"fmt"

	"net/http"

	"pharmacy_backend/models"

	"github.com/gofiber/fiber/v2"

	"gorm.io/gorm"
)

type User struct {
	Name      string `json:"name"`
	Email string `json:"email"`
	Password  string `json:"password"`
	UserType string `json:"usertype"`
} 

type UserService struct {
	DB *gorm.DB
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{DB: db}
}

func (s *UserService) CreateUser(context *fiber.Ctx) error {
	user := models.Users{}

	err := context.BodyParser(&user)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"})
		return err
	}

	err = s.DB.Create(&user).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create item"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"message": "item created"})
	return nil
}

func (s *UserService) GetUsers(context *fiber.Ctx) error {
	userModels := &[]models.Users{}

	err := s.DB.Find(userModels).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get items"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "items fetched successfully",
		"data":    userModels,
	})
	return nil
}

func (s *UserService) DeleteUser(context *fiber.Ctx) error {
	userModel := models.Users{}
	id := context.Params("userid")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	err := s.DB.Delete(userModel, id)

	if err.Error != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not delete user",
		})
		return err.Error
	}
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "user deleted",
	})
	return nil
}

func (s *UserService) GetUserByID(context *fiber.Ctx) error {

	id := context.Params("userid")
	userModel := &models.Users{}
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}
	fmt.Println("the ID is", id)

	err := s.DB.Where("user_id=?", id).First(userModel).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get item"})
		return err

	}
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "item fetched successfully",
		"data":    userModel,
	})
	return nil
}
