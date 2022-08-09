import { gql } from "@apollo/client";

export const CREATE_BLOGPOST = gql`
  mutation CreateBlog($newInput: BlogInput) {
    createBlog(newInput: $newInput) {
      success
      message
    }
  }
`;

export const GET_BLOG_WITH_PAGINATION = gql`
  query GetAllBlogPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getAllBlogPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      Blogs {
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
        remark
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

export const UPDATE_BLOGPOST = gql`
  mutation UpdateBlog($blogId: ID, $newInput: BlogInput) {
    updateBlog(blogId: $blogId, newInput: $newInput) {
      success
      message
    }
  }
`;

export const DELETE_BLOGPOST = gql`
  mutation DeleteBlog($blogId: ID) {
    deleteBlog(blogId: $blogId) {
      success
      message
    }
  }
`;
