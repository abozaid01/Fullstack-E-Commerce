#### Suggested Order for Implementing Database Models

✅ 1. **User**:

- Since users are typically fundamental to an application, it's a good idea to start with the user model.
- Authentication-related functionalities like login, registration, password reset, etc., make sense to implement next as they directly relate to the user model.
  - ✅ Signup
  - ✅ Login
  - ✅ Logout
  - ✅ Refresh Token
  - ✅ forget password
  - ✅ reset email
  - ✅ verify email
  - [] denormalize addresses
  - [] JWT refresh token rotaion
  - [] OAuth

✅ 2. **Category and SubCategory**:

- Categories and subcategories might be foundational for organizing other entities like products, so it's logical to implement them early.

✅ 3. **Brand**:

- Brands could be associated with products or categories, so implementing this next makes sense.

✅ 4. **Product**:

- Products are often central to an e-commerce system, and they may have relationships with categories, subcategories, and brands.

  ✅ products in Brand
  ✅ products in Category
  ✅ products in subcategory

✅ 5. **Review**:

- Reviews typically relate to products, so implementing this model next is reasonable.

  ✅ test compund index + valdiation
  ✅ Check review ownership before create/update/delete
  ✅ reviews in Product (sync ratingAvg & ratingQt)
  [] reviews in User

✅ 6. **Cart and Wishlist**:

- These models are related to users and products, so they can be implemented next.

  ✅ denormalize whilist in user collection
  ✅ cart ownership
  [] sync product Qty avalabilty
  [] Anonymous user cart

✅ 7. **Coupon**:

- Coupons may be applied on a user's shopping cart, so it makes sense to implement this model after the cart model.

✅ check expire Date in future
[] add functionality to expire by time and calucalte Date accordingly

❌ 8. **Order**:

- Orders are usually dependent on users and products, so implementing this model after the user, product, and cart/wishlist models is logical.

#### It provides a structured approach to implementing the models in a way that ensures smooth functionality and efficient development.

**Note:** This suggested order takes into consideration dependencies and logical groupings based on typical relationships between entities in an e-commerce application.
