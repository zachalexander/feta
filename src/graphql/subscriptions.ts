/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProfilePicture = /* GraphQL */ `
  subscription OnCreateProfilePicture(
    $filter: ModelSubscriptionProfilePictureFilterInput
  ) {
    onCreateProfilePicture(filter: $filter) {
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
export const onUpdateProfilePicture = /* GraphQL */ `
  subscription OnUpdateProfilePicture(
    $filter: ModelSubscriptionProfilePictureFilterInput
  ) {
    onUpdateProfilePicture(filter: $filter) {
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
export const onDeleteProfilePicture = /* GraphQL */ `
  subscription OnDeleteProfilePicture(
    $filter: ModelSubscriptionProfilePictureFilterInput
  ) {
    onDeleteProfilePicture(filter: $filter) {
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
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onCreateProfile(filter: $filter) {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($filter: ModelSubscriptionProfileFilterInput) {
    onUpdateProfile(filter: $filter) {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($filter: ModelSubscriptionProfileFilterInput) {
    onDeleteProfile(filter: $filter) {
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
export const onCreateImages = /* GraphQL */ `
  subscription OnCreateImages($filter: ModelSubscriptionImagesFilterInput) {
    onCreateImages(filter: $filter) {
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
export const onUpdateImages = /* GraphQL */ `
  subscription OnUpdateImages($filter: ModelSubscriptionImagesFilterInput) {
    onUpdateImages(filter: $filter) {
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
export const onDeleteImages = /* GraphQL */ `
  subscription OnDeleteImages($filter: ModelSubscriptionImagesFilterInput) {
    onDeleteImages(filter: $filter) {
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
export const onCreateImagePost = /* GraphQL */ `
  subscription OnCreateImagePost(
    $filter: ModelSubscriptionImagePostFilterInput
  ) {
    onCreateImagePost(filter: $filter) {
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
export const onUpdateImagePost = /* GraphQL */ `
  subscription OnUpdateImagePost(
    $filter: ModelSubscriptionImagePostFilterInput
  ) {
    onUpdateImagePost(filter: $filter) {
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
export const onDeleteImagePost = /* GraphQL */ `
  subscription OnDeleteImagePost(
    $filter: ModelSubscriptionImagePostFilterInput
  ) {
    onDeleteImagePost(filter: $filter) {
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
export const onCreateComments = /* GraphQL */ `
  subscription OnCreateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onCreateComments(filter: $filter) {
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
export const onUpdateComments = /* GraphQL */ `
  subscription OnUpdateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onUpdateComments(filter: $filter) {
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
export const onDeleteComments = /* GraphQL */ `
  subscription OnDeleteComments($filter: ModelSubscriptionCommentsFilterInput) {
    onDeleteComments(filter: $filter) {
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
export const onCreateUsername = /* GraphQL */ `
  subscription OnCreateUsername($filter: ModelSubscriptionUsernameFilterInput) {
    onCreateUsername(filter: $filter) {
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
export const onUpdateUsername = /* GraphQL */ `
  subscription OnUpdateUsername($filter: ModelSubscriptionUsernameFilterInput) {
    onUpdateUsername(filter: $filter) {
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
export const onDeleteUsername = /* GraphQL */ `
  subscription OnDeleteUsername($filter: ModelSubscriptionUsernameFilterInput) {
    onDeleteUsername(filter: $filter) {
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
