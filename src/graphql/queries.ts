/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfilePicture = /* GraphQL */ `
  query GetProfilePicture($id: ID!) {
    getProfilePicture(id: $id) {
      id
      imageurl
      Profile {
        id
        email
        relation
        cognitoID
        usernameID
        Images {
          nextToken
        }
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        Username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        family_name
        profilepictureID
        profilepicture {
          id
          imageurl
          profileID
          createdAt
          updatedAt
          profilePictureProfileId
        }
        createdAt
        updatedAt
        profileUsernameId
        profileImagePostsId
      }
      profileID
      createdAt
      updatedAt
      profilePictureProfileId
    }
  }
`;
export const listProfilePictures = /* GraphQL */ `
  query ListProfilePictures(
    $filter: ModelProfilePictureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfilePictures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        imageurl
        Profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        profileID
        createdAt
        updatedAt
        profilePictureProfileId
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      email
      relation
      cognitoID
      usernameID
      Images {
        items {
          id
          imageurl
          s3_key
          profileID
          usernameID
          photoPath
          createdAt
          updatedAt
          imagesImagePostsId
        }
        nextToken
      }
      ImagePosts {
        id
        description
        imagesID
        image {
          id
          imageurl
          s3_key
          profileID
          usernameID
          photoPath
          createdAt
          updatedAt
          imagesImagePostsId
        }
        time_posted
        likes
        comments
        usernameID
        username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        profileID
        profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        createdAt
        updatedAt
      }
      Username {
        id
        username
        profileID
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        Images {
          id
          imageurl
          s3_key
          profileID
          usernameID
          photoPath
          createdAt
          updatedAt
          imagesImagePostsId
        }
        Profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        createdAt
        updatedAt
        usernameImagePostsId
        usernameImagesId
        usernameProfileId
      }
      family_name
      profilepictureID
      profilepicture {
        id
        imageurl
        Profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        profileID
        createdAt
        updatedAt
        profilePictureProfileId
      }
      createdAt
      updatedAt
      profileUsernameId
      profileImagePostsId
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        relation
        cognitoID
        usernameID
        Images {
          nextToken
        }
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        Username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        family_name
        profilepictureID
        profilepicture {
          id
          imageurl
          profileID
          createdAt
          updatedAt
          profilePictureProfileId
        }
        createdAt
        updatedAt
        profileUsernameId
        profileImagePostsId
      }
      nextToken
    }
  }
`;
export const getImages = /* GraphQL */ `
  query GetImages($id: ID!) {
    getImages(id: $id) {
      id
      imageurl
      s3_key
      profileID
      usernameID
      username {
        id
        username
        profileID
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        Images {
          id
          imageurl
          s3_key
          profileID
          usernameID
          photoPath
          createdAt
          updatedAt
          imagesImagePostsId
        }
        Profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        createdAt
        updatedAt
        usernameImagePostsId
        usernameImagesId
        usernameProfileId
      }
      ImagePosts {
        id
        description
        imagesID
        image {
          id
          imageurl
          s3_key
          profileID
          usernameID
          photoPath
          createdAt
          updatedAt
          imagesImagePostsId
        }
        time_posted
        likes
        comments
        usernameID
        username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        profileID
        profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        createdAt
        updatedAt
      }
      photoPath
      createdAt
      updatedAt
      imagesImagePostsId
    }
  }
`;
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        imageurl
        s3_key
        profileID
        usernameID
        username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        photoPath
        createdAt
        updatedAt
        imagesImagePostsId
      }
      nextToken
    }
  }
`;
export const getImagePost = /* GraphQL */ `
  query GetImagePost($id: ID!) {
    getImagePost(id: $id) {
      id
      description
      imagesID
      image {
        id
        imageurl
        s3_key
        profileID
        usernameID
        username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        photoPath
        createdAt
        updatedAt
        imagesImagePostsId
      }
      time_posted
      likes
      comments
      usernameID
      username {
        id
        username
        profileID
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        Images {
          id
          imageurl
          s3_key
          profileID
          usernameID
          photoPath
          createdAt
          updatedAt
          imagesImagePostsId
        }
        Profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        createdAt
        updatedAt
        usernameImagePostsId
        usernameImagesId
        usernameProfileId
      }
      profileID
      profile {
        id
        email
        relation
        cognitoID
        usernameID
        Images {
          nextToken
        }
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        Username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        family_name
        profilepictureID
        profilepicture {
          id
          imageurl
          profileID
          createdAt
          updatedAt
          profilePictureProfileId
        }
        createdAt
        updatedAt
        profileUsernameId
        profileImagePostsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const listImagePosts = /* GraphQL */ `
  query ListImagePosts(
    $filter: ModelImagePostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImagePosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        imagesID
        image {
          id
          imageurl
          s3_key
          profileID
          usernameID
          photoPath
          createdAt
          updatedAt
          imagesImagePostsId
        }
        time_posted
        likes
        comments
        usernameID
        username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        profileID
        profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComments = /* GraphQL */ `
  query GetComments($id: ID!) {
    getComments(id: $id) {
      id
      usernameID
      comment
      time_posted
      imagePostsID
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        usernameID
        comment
        time_posted
        imagePostsID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUsername = /* GraphQL */ `
  query GetUsername($id: ID!) {
    getUsername(id: $id) {
      id
      username
      profileID
      ImagePosts {
        id
        description
        imagesID
        image {
          id
          imageurl
          s3_key
          profileID
          usernameID
          photoPath
          createdAt
          updatedAt
          imagesImagePostsId
        }
        time_posted
        likes
        comments
        usernameID
        username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        profileID
        profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        createdAt
        updatedAt
      }
      Images {
        id
        imageurl
        s3_key
        profileID
        usernameID
        username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        photoPath
        createdAt
        updatedAt
        imagesImagePostsId
      }
      Profile {
        id
        email
        relation
        cognitoID
        usernameID
        Images {
          nextToken
        }
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        Username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        family_name
        profilepictureID
        profilepicture {
          id
          imageurl
          profileID
          createdAt
          updatedAt
          profilePictureProfileId
        }
        createdAt
        updatedAt
        profileUsernameId
        profileImagePostsId
      }
      createdAt
      updatedAt
      usernameImagePostsId
      usernameImagesId
      usernameProfileId
    }
  }
`;
export const listUsernames = /* GraphQL */ `
  query ListUsernames(
    $filter: ModelUsernameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsernames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        profileID
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        Images {
          id
          imageurl
          s3_key
          profileID
          usernameID
          photoPath
          createdAt
          updatedAt
          imagesImagePostsId
        }
        Profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        createdAt
        updatedAt
        usernameImagePostsId
        usernameImagesId
        usernameProfileId
      }
      nextToken
    }
  }
`;
export const profilesByProfilepictureID = /* GraphQL */ `
  query ProfilesByProfilepictureID(
    $profilepictureID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    profilesByProfilepictureID(
      profilepictureID: $profilepictureID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        relation
        cognitoID
        usernameID
        Images {
          nextToken
        }
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        Username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        family_name
        profilepictureID
        profilepicture {
          id
          imageurl
          profileID
          createdAt
          updatedAt
          profilePictureProfileId
        }
        createdAt
        updatedAt
        profileUsernameId
        profileImagePostsId
      }
      nextToken
    }
  }
`;
export const imagesByProfileID = /* GraphQL */ `
  query ImagesByProfileID(
    $profileID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelImagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imagesByProfileID(
      profileID: $profileID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        imageurl
        s3_key
        profileID
        usernameID
        username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        photoPath
        createdAt
        updatedAt
        imagesImagePostsId
      }
      nextToken
    }
  }
`;
export const imagesByUsernameID = /* GraphQL */ `
  query ImagesByUsernameID(
    $usernameID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelImagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imagesByUsernameID(
      usernameID: $usernameID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        imageurl
        s3_key
        profileID
        usernameID
        username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        ImagePosts {
          id
          description
          imagesID
          time_posted
          likes
          comments
          usernameID
          profileID
          createdAt
          updatedAt
        }
        photoPath
        createdAt
        updatedAt
        imagesImagePostsId
      }
      nextToken
    }
  }
`;
export const imagePostsByImagesID = /* GraphQL */ `
  query ImagePostsByImagesID(
    $imagesID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelImagePostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imagePostsByImagesID(
      imagesID: $imagesID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        description
        imagesID
        image {
          id
          imageurl
          s3_key
          profileID
          usernameID
          photoPath
          createdAt
          updatedAt
          imagesImagePostsId
        }
        time_posted
        likes
        comments
        usernameID
        username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        profileID
        profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const imagePostsByUsernameID = /* GraphQL */ `
  query ImagePostsByUsernameID(
    $usernameID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelImagePostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imagePostsByUsernameID(
      usernameID: $usernameID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        description
        imagesID
        image {
          id
          imageurl
          s3_key
          profileID
          usernameID
          photoPath
          createdAt
          updatedAt
          imagesImagePostsId
        }
        time_posted
        likes
        comments
        usernameID
        username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        profileID
        profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const imagePostsByProfileID = /* GraphQL */ `
  query ImagePostsByProfileID(
    $profileID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelImagePostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imagePostsByProfileID(
      profileID: $profileID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        description
        imagesID
        image {
          id
          imageurl
          s3_key
          profileID
          usernameID
          photoPath
          createdAt
          updatedAt
          imagesImagePostsId
        }
        time_posted
        likes
        comments
        usernameID
        username {
          id
          username
          profileID
          createdAt
          updatedAt
          usernameImagePostsId
          usernameImagesId
          usernameProfileId
        }
        profileID
        profile {
          id
          email
          relation
          cognitoID
          usernameID
          family_name
          profilepictureID
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
