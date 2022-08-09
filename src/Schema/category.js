import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateProductCategory($newProductCategory: ProductCategoryInput) {
    createProductCategory(newProductCategory: $newProductCategory) {
      success
      message
    }
  }
`;

export const GET_CATEGORY_WITH_PAGINATION = gql`
  query GetProductCategoryPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getProductCategoryPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      ProductCategory {
        _id
        categoryName
        categoryNameKH
        remark
        typeCategory
        updatedAt
        createdAt
      }
      paginator {
        slNo
        prev
        next
        perPage
        totalPosts
        totalPages
        currentPage
        hasPrevPage
        hasNextPage
        totalDocs
      }
    }
  }
`;

export const GET_PRODUCT_CATEGORY = gql`
  query GetProductCategory($type: String) {
    getProductCategory(type: $type) {
      _id
      categoryName
      categoryNameKH
      remark
      typeCategory
      updatedAt
      createdAt
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateProductCategory(
    $id: ID!
    $productCategoryEdit: ProductCategoryInput
  ) {
    updateProductCategory(_id: $id, ProductCategoryEdit: $productCategoryEdit) {
      success
      message
    }
  }
`;

export const DETETE_CATEGORY = gql`
  mutation DeleteProductCategory($id: ID!) {
    deleteProductCategory(_id: $id) {
      success
      message
    }
  }
`;
