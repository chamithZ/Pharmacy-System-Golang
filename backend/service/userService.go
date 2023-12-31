

package service

import (
	"fmt"
	"os"
	"time"
	"net/http"
	"github.com/dgrijalva/jwt-go"
	"pharmacy_backend/models"
	"golang.org/x/crypto/bcrypt"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	
)


var jwtSecret = []byte(os.Getenv("jwtSecret"))

type User struct {
	Name      string `json:"name"`
	Email string `json:"email"`
	Password  *string `json:"password"`
	UserType string `json:"usertype"`
} 

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
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

	password := *user.PassWord

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		context.Status(http.StatusInternalServerError).JSON(
			&fiber.Map{"message": "could not hash password"})
		return err
	}

	hashedPasswordString := string(hashedPassword)
	user.PassWord = &hashedPasswordString

	err = s.DB.Create(&user).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create item"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"message": "User created"})
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


func (s *UserService) UserLogin(context *fiber.Ctx) error {
	loginRequest := LoginRequest{}

	err := context.BodyParser(&loginRequest)
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"})
		return err
	}

	userModel := &models.Users{}
	err = s.DB.Where("email = ?", loginRequest.Email).First(userModel).Error
	if err != nil {
		context.Status(http.StatusUnauthorized).JSON(
			&fiber.Map{"message": "invalid email or password"})
		return err
	}

	if !userModel.CheckPassword(loginRequest.Password) {
		context.Status(http.StatusUnauthorized).JSON(
			&fiber.Map{"message": "invalid email or password"})
		return fmt.Errorf("invalid email or password")
	}

	
	token, err := generateJWTToken(uint(userModel.UserId), *userModel.Name, *userModel.UserType)
if err != nil {
	context.Status(http.StatusInternalServerError).JSON(
		&fiber.Map{"message": "could not generate token"})
	return err
}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "login successful",
		"token":   token,
	})
	return nil
}

func generateJWTToken(userID uint, name string, userType string) (string, error) {
	
	expirationTime := time.Now().Add(24 * time.Hour)

	claims := &jwt.MapClaims{
		"id":        fmt.Sprint(userID),
		"name":      name,
		"usertype":  userType,
		"exp":       expirationTime.Unix(),
	}

	
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

