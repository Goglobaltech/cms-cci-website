import { gql } from "@apollo/client";

export const CREATE_MEDIA = gql`
  mutation CreateMedia($input: MediaInput!) {
    createMedia(input: $input) {
      success
      message
    }
  }
`;

export const GET_MEDIA_WITH_PAGINATION = gql`
  query GetMediaWithPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
    $imageType: String
  ) {
    getMediaWithPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
      imageType: $imageType
    ) {
      Medias {
        _id
        imageUrl
        title
        imageType
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

export const UPDATE_MEDIA = gql`
  mutation UpdateMedia($mediaId: ID, $input: MediaInput) {
    updateMedia(mediaId: $mediaId, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_MEDIA = gql`
  mutation DeleteMedia($mediaId: ID) {
    deleteMedia(mediaId: $mediaId) {
      success
      message
    }
  }
`;
