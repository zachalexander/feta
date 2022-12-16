/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProfilePicture = /* GraphQL */ `
  mutation CreateProfilePicture(
    $input: CreateProfilePictureInput!
    $condition: ModelProfilePictureConditionInput
  ) {
    createProfilePicture(input: $input, condition: $condition) {
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
export const updateProfilePicture = /* GraphQL */ `
  mutation UpdateProfilePicture(
    $input: UpdateProfilePictureInput!
    $condition: ModelProfilePictureConditionInput
  ) {
    updateProfilePicture(input: $input, condition: $condition) {
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
export const deleteProfilePicture = /* GraphQL */ `
  mutation DeleteProfilePicture(
    $input: DeleteProfilePictureInput!
    $condition: ModelProfilePictureConditionInput
  ) {
    deleteProfilePicture(input: $input, condition: $condition) {
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
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
export const createImages = /* GraphQL */ `
  mutation CreateImages(
    $input: CreateImagesInput!
    $condition: ModelImagesConditionInput
  ) {
    createImages(input: $input, condition: $condition) {
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
export const updateImages = /* GraphQL */ `
  mutation UpdateImages(
    $input: UpdateImagesInput!
    $condition: ModelImagesConditionInput
  ) {
    updateImages(input: $input, condition: $condition) {
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
export const deleteImages = /* GraphQL */ `
  mutation DeleteImages(
    $input: DeleteImagesInput!
    $condition: ModelImagesConditionInput
  ) {
    deleteImages(input: $input, condition: $condition) {
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
export const createImagePost = /* GraphQL */ `
  mutation CreateImagePost(
    $input: CreateImagePostInput!
    $condition: ModelImagePostConditionInput
  ) {
    createImagePost(input: $input, condition: $condition) {
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
export const updateImagePost = /* GraphQL */ `
  mutation UpdateImagePost(
    $input: UpdateImagePostInput!
    $condition: ModelImagePostConditionInput
  ) {
    updateImagePost(input: $input, condition: $condition) {
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
export const deleteImagePost = /* GraphQL */ `
  mutation DeleteImagePost(
    $input: DeleteImagePostInput!
    $condition: ModelImagePostConditionInput
  ) {
    deleteImagePost(input: $input, condition: $condition) {
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
export const createComments = /* GraphQL */ `
  mutation CreateComments(
    $input: CreateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    createComments(input: $input, condition: $condition) {
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
export const updateComments = /* GraphQL */ `
  mutation UpdateComments(
    $input: UpdateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    updateComments(input: $input, condition: $condition) {
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
export const deleteComments = /* GraphQL */ `
  mutation DeleteComments(
    $input: DeleteCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    deleteComments(input: $input, condition: $condition) {
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
export const createUsername = /* GraphQL */ `
  mutation CreateUsername(
    $input: CreateUsernameInput!
    $condition: ModelUsernameConditionInput
  ) {
    createUsername(input: $input, condition: $condition) {
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
export const updateUsername = /* GraphQL */ `
  mutation UpdateUsername(
    $input: UpdateUsernameInput!
    $condition: ModelUsernameConditionInput
  ) {
    updateUsername(input: $input, condition: $condition) {
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
export const deleteUsername = /* GraphQL */ `
  mutation DeleteUsername(
    $input: DeleteUsernameInput!
    $condition: ModelUsernameConditionInput
  ) {
    deleteUsername(input: $input, condition: $condition) {
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
