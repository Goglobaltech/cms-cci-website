import { gql } from "@apollo/client";

export const CREATE_PRODUCTS = gql`
  mutation CreateProduct($newProduct: ProductInput) {
    createProduct(newProduct: $newProduct) {
      success
      message
    }
  }
`;

export const GET_PRODUCTS_WITH_PAGINATION = gql`
  query GetProductPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getProductPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
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
      products {
        _id
        categoryId {
          _id
          categoryName
          remark
          typeCategory
          createdAt
          updatedAt
        }
        title
        discription
        imageSlideCenter
        imageSlideLeft
        imageSlideRight
        benefits {
          imageBenefits
          subTitleBenefits
          key
        }
        discriptionBenefitsList {
          benefitsList
          key
        }
        remark
      }
    }
  }
`;

export const GET_PRODUCTS_BY_TYPE_PAGINATION = gql`
  query GetProductByTypePagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
    $typeCategory: String
  ) {
    getProductByTypePagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
      typeCategory: $typeCategory
    ) {
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
      products {
        _id
        categoryId {
          _id
          categoryName
          categoryNameKH
          remark
          typeCategory
          updatedAt
          createdAt
        }
        newProduct
        mainProduct
        title
        titleKH
        discription
        discriptionKH
        imageSlideCenter
        imageSlideLeft
        imageSlideRight
        benefits {
          imageBenefits
          subTitleBenefits
          subTitleBenefitsKH
          key
        }
        discriptionBenefitsList {
          benefitsList
          benefitsListKH
          key
        }
        remark
      }
    }
  }
`;

export const UPDATE_PRODUCTS = gql`
  mutation UpdateProduct($id: ID!, $productEdit: ProductInput) {
    updateProduct(_id: $id, ProductEdit: $productEdit) {
      success
      message
    }
  }
`;

export const DELETE_PRODUCTS = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(_id: $id) {
      success
      message
    }
  }
`;
