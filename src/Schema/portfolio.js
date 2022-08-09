import { gql } from "@apollo/client";

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio($newInput: PortfolioInput) {
    createPortfolio(newInput: $newInput) {
      success
      message
    }
  }
`;

export const GET_PORTFOLIO_WITH_PAGINATION = gql`
  query GetPortforlioPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getPortforlioPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      portfolios {
        _id
        image
        title
        titleKH
        discription
        discriptionKH
        article
        articleKH
        articleForCMS {
          _id
          Fieldtype
          check
          key
          text
          img
        }
        articleForCMSKH {
          _id
          Fieldtype
          check
          key
          text
          img
        }
        remack
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

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($portfolioId: ID, $newInput: PortfolioInput) {
    updatePortfolio(portfolioId: $portfolioId, newInput: $newInput) {
      success
      message
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($portfolioId: ID) {
    deletePortfolio(portfolioId: $portfolioId) {
      success
      message
    }
  }
`;
