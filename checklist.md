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

❌ 6. **Cart and Wishlist**:

- These models are related to users and products, so they can be implemented next.

❌ 7. **Order**:

- Orders are usually dependent on users and products, so implementing this model after the user, product, and cart/wishlist models is logical.

❌ 8. **Coupon**:

- Coupons may be associated with orders, so it makes sense to implement this model after the order model.

#### It provides a structured approach to implementing the models in a way that ensures smooth functionality and efficient development.

**Note:** This suggested order takes into consideration dependencies and logical groupings based on typical relationships between entities in an e-commerce application.
