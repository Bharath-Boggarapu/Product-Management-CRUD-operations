package main

import (
	"ecommerce/controllers"
	"ecommerce/database"
	"ecommerce/middleware"
	"ecommerce/routes"
	"log"

	// "github.com/gin-contrib/cors"
	// "github.com/rs/cors"
	"github.com/gin-gonic/gin"
	cors "github.com/rs/cors/wrapper/gin"
)

func main() {
	port := "8080"
	router := gin.Default()
	router.Use(cors.AllowAll())
	app := controllers.NewApplication(database.ProductData(database.Client, "Products"), database.UserData(database.Client, "Users"))
	router.Use(gin.Logger())
	routes.UserRoutes(router)
	router.Use(middleware.Authentication())
	//Uses the middle ware on following routes
	router.POST("/addtocart", app.AddToCart())			
	//delete operation to remove item from cart
	router.DELETE("/deleteitem", app.RemoveItem()) 
	//GET request that fetches all the cart items
	router.GET("/cartitems", controllers.GetItemFromCart())	
	router.POST("/addhomeaddress", controllers.AddAddress())
	router.PUT("/edithomeaddress", controllers.EditHomeAddress())
	log.Fatal(router.Run(":" + port))
}