import { gql } from "@apollo/client";

export const GET_ALL_ROLE = gql`
  query GetAllRole {
    getAllRole {
      _id
      roleName
      note
    }
  }
`;
