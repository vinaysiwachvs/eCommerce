# eCommerce #

Authentication endpoints:

User registration: POST /api/auth/signup
User login: POST /api/auth/login

Product endpoints:

List all products: GET /api/products
Get a specific product: GET /api/products/:id
Create a new product: POST /api/products
Modify a product: PATCH /api/products/:id
Delete a product: DELETE /api/products/:id


Order endpoints:

Create an order: POST /api/orders
Get all orders: GET /api/orders
Get a specific order: GET /api/orders/:id
Update an order: PUT /api/orders/:id
Delete an order: DELETE /api/orders/:id


Cart endpoints:

Add an item to the cart: POST /api/cart
Remove an item from the cart: DELETE /api/cart/:id
Get the cart: GET /api/cart


Payment endpoints:
Process payment: POST /api/payment

Shipping Endpoint: 
get shipping information : GET /api/shipping/:id

Customer endpoints:

Get customer information: GET /api/customers/:id
Update customer information: PATCH /api/customers/:id

Wishlist endpoints:

Add a product to the wishlist: POST /api/wishlist
Remove a product from the wishlist: DELETE /api/wishlist/:id
Get the wishlist: GET /api/wishlist
Update the wishlist: PUT /api/wishlist


Search endpoints:

Search for products by name: GET /api/search?q=:query
Search for products by category: GET /api/search?category=:category