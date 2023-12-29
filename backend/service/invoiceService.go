// internal/app/service/item_service.go

package service

import (
	"fmt"

	"net/http"

	"pharmacy_backend/models"

	"github.com/gofiber/fiber/v2"

	"gorm.io/gorm"
)

type Invoice struct {
	Name 	string `json:"name"`
	Email string `jsona:"email"`
	Address string `json:"address"`
	BillType string `json:"billtype"`
} 

type InvoiceService struct {
	DB *gorm.DB
}

func NewInvoiceService(db *gorm.DB) *InvoiceService {
	return &InvoiceService{DB: db}
}

func (s *InvoiceService) CreateInvoice(context *fiber.Ctx) error {
	invoice := models.Invoices{}

	err := context.BodyParser(&invoice)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"})
		return err
	}

	err = s.DB.Create(&invoice).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create item"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{"message": "invoice created"})
	return nil
}

func (s *InvoiceService) GetInvoices(context *fiber.Ctx) error {
	invoiceModels := &[]models.Invoices{}

	err := s.DB.Find(invoiceModels).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get invoices"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "invoices fetched successfully",
		"data":    invoiceModels,
	})
	return nil
}

func (s *InvoiceService) DeleteInvoice(context *fiber.Ctx) error {
	invoiceModels := models.Invoices{}
	id := context.Params("invoiceid")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	err := s.DB.Delete(invoiceModels, id)

	if err.Error != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not delete invoice",
		})
		return err.Error
	}
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "deleted a invoice",
	})
	return nil
}

func (s *InvoiceService) GetInvoiceByID(context *fiber.Ctx) error {

	id := context.Params("invoiceid")
	invoiceModel := &models.Invoices{}
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}
	fmt.Println("the InvoiceID is", id)

	err := s.DB.Where("invoice_id=?", id).First(invoiceModel).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get invoice"})
		return err

	}
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "invoice fetched successfully",
		"data":    invoiceModel,
	})
	return nil
}
