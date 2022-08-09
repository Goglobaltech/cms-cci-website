import { gql } from "@apollo/client";

export const CREATE_USERS = gql`
  mutation CreateUser($newUser: UserInput) {
    createUser(newUser: $newUser) {
      success
      message
      token
    }
  }
`;

export const GET_USER_WITH_PAGINATION = gql`
  query GetUserPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getUserPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      users {
        firstName
        lastName
        userName
        email
        password
        phone
        address
        role {
          _id
          roleName
          note
        }
        dob
        active
        profileImage
        _id
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

export const GET_USER_LOGIN = gql`
  query GetUserLogin {
    getUserLogin {
      _id
      firstName
      lastName
      userName
      email
      password
      phone
      address
      role {
        _id
        roleName
        note
      }
      dob
      active
      profileImage
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID, $newUser: UpdateUserInput) {
    updateUser(userId: $userId, newUser: $newUser) {
      success
      message
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID) {
    deleteUser(userId: $userId) {
      success
      message
      token
    }
  }
`;
