# Test Cases for Display Product Feature

## 1. Test Case: Display All Products on /display-product Page

- **Test Objective**: Verify that all products are displayed on the `/display-product` page when the page is loaded.
- **Test Steps**:
  1. Navigate to the `/display-product` page.
  2. Verify that the list of products is fetched from the API and displayed on the page.
- **Expected Result**: All products should be visible in a list format with the following information:
  - Product name
  - Product ID
  - Description
  - Original price
  - Sale price
  - Product type

## 2. Test Case: Search Products by Name

- **Test Objective**: Verify that the search functionality works for searching products by name.
- **Test Steps**:
  1. On the `/display-product` page, type a product name in the search box.
  2. Press Enter or click on the search icon.
  3. Verify that the products with the searched name are displayed.
- **Expected Result**: The products that match the searched name should be displayed in the list, and the rest should be hidden.

## 3. Test Case: Search Products by Product ID

- **Test Objective**: Verify that the search functionality works for searching products by product ID.
- **Test Steps**:
  1. On the `/display-product` page, type a product ID in the search box.
  2. Press Enter or click on the search icon.
  3. Verify that the products with the searched product ID are displayed.
- **Expected Result**: The products that match the searched product ID should be displayed in the list.

## 4. Test Case: Search Products by Product Type

- **Test Objective**: Verify that the search functionality works for searching products by product type.
- **Test Steps**:
  1. On the `/display-product` page, type a product type in the search box.
  2. Press Enter or click on the search icon.
  3. Verify that the products with the searched product type are displayed.
- **Expected Result**: The products that match the searched product type should be displayed in the list.

## 5. Test Case: Search Products by Description

- **Test Objective**: Verify that the search functionality works for searching products by description.
- **Test Steps**:
  1. On the `/display-product` page, type a keyword from the product description in the search box.
  2. Press Enter or click on the search icon.
  3. Verify that the products with the searched description keyword are displayed.
- **Expected Result**: The products whose descriptions match the searched keyword should be displayed.

## 6. Test Case: Search Products by Price Range

- **Test Objective**: Verify that the search functionality works for filtering products by price range.
- **Test Steps**:
  1. On the `/display-product` page, enter a minimum and maximum price in the price filter (if available).
  2. Apply the filter.
  3. Verify that only products within the specified price range are displayed.
- **Expected Result**: Only products that fall within the specified price range should be visible.

## 7. Test Case: Filter Products by Product ID

- **Test Objective**: Verify that products can be filtered based on product ID.
- **Test Steps**:
  1. On the `/display-product` page, apply the filter for sorting products by product ID.
  2. Verify that the products are sorted correctly by product ID.
- **Expected Result**: The products should be sorted in ascending or descending order based on product ID.

## 8. Test Case: Verify Pagination for Products

- **Test Objective**: Verify that pagination is working correctly for the list of products.
- **Test Steps**:
  1. On the `/display-product` page, navigate to the next page using the pagination controls.
  2. Verify that only the correct set of products (based on the page number) are displayed.
  3. Repeat the process for navigating to other pages.
- **Expected Result**: Products should be displayed in sets of 10 (or the defined number per page), and the pagination should update accordingly.

## 9. Test Case: No Products Found for Search or Filter

- **Test Objective**: Verify that the appropriate message is displayed when no products match the search or filter criteria.
- **Test Steps**:
  1. On the `/display-product` page, apply a search or filter that will return no results (e.g., an invalid product ID or a non-existing product name).
  2. Verify that the message "No products found" or a similar message is displayed.
- **Expected Result**: The message "No products found" should be displayed when no products match the criteria.

## 10. Test Case: Verify Loading State While Fetching Products

- **Test Objective**: Verify that a loading state is shown while the products are being fetched from the API.
- **Test Steps**:
  1. Navigate to the `/display-product` page.
  2. Ensure that the page displays a loading spinner or a similar loading indicator while the products are being fetched from the API.
- **Expected Result**: A loading indicator should be visible while the products are being fetched.
