/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";
import { Storage } from '@aws-amplify/storage';

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateProfilePicture: OnCreateProfilePictureSubscription;
  onUpdateProfilePicture: OnUpdateProfilePictureSubscription;
  onDeleteProfilePicture: OnDeleteProfilePictureSubscription;
  onCreateProfile: OnCreateProfileSubscription;
  onUpdateProfile: OnUpdateProfileSubscription;
  onDeleteProfile: OnDeleteProfileSubscription;
  onCreateImagePost: OnCreateImagePostSubscription;
  onUpdateImagePost: OnUpdateImagePostSubscription;
  onDeleteImagePost: OnDeleteImagePostSubscription;
  onCreateComments: OnCreateCommentsSubscription;
  onUpdateComments: OnUpdateCommentsSubscription;
  onDeleteComments: OnDeleteCommentsSubscription;
  onCreateUsername: OnCreateUsernameSubscription;
  onUpdateUsername: OnUpdateUsernameSubscription;
  onDeleteUsername: OnDeleteUsernameSubscription;
};

export type CreateProfilePictureInput = {
  id?: string | null;
  imageurl?: string | null;
  profileID?: string | null;
  profilePictureProfileId?: string | null;
};

export type ModelProfilePictureConditionInput = {
  imageurl?: ModelStringInput | null;
  profileID?: ModelStringInput | null;
  and?: Array<ModelProfilePictureConditionInput | null> | null;
  or?: Array<ModelProfilePictureConditionInput | null> | null;
  not?: ModelProfilePictureConditionInput | null;
  profilePictureProfileId?: ModelIDInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ProfilePicture = {
  __typename: "ProfilePicture";
  id: string;
  imageurl?: string | null;
  Profile?: Profile | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
};

export type Profile = {
  __typename: "Profile";
  id: string;
  email?: string | null;
  relation?: string | null;
  cognitoID?: string | null;
  usernameID?: string | null;
  ImagePosts?: ImagePost | null;
  Username?: Username | null;
  first_name?: string | null;
  last_name?: string | null;
  profilepictureID?: string | null;
  profilepicture?: ProfilePicture | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
};

export type ImagePost = {
  __typename: "ImagePost";
  id: string;
  sorterValue?: string | null;
  description?: string | null;
  time_posted?: string | null;
  likes?: string | null;
  comments?: string | null;
  usernameID: string;
  username?: Username | null;
  profileID: string;
  profile?: Profile | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Username = {
  __typename: "Username";
  id: string;
  username?: string | null;
  profileID?: string | null;
  ImagePosts?: ImagePost | null;
  Profile?: Profile | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
};

export type UpdateProfilePictureInput = {
  id: string;
  imageurl?: string | null;
  profileID?: string | null;
  profilePictureProfileId?: string | null;
};

export type DeleteProfilePictureInput = {
  id: string;
};

export type CreateProfileInput = {
  id?: string | null;
  email?: string | null;
  relation?: string | null;
  cognitoID?: string | null;
  usernameID?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  profilepictureID?: string | null;
  bio?: string | null;
  birthday?: string | null;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
};

export type ModelProfileConditionInput = {
  email?: ModelStringInput | null;
  relation?: ModelStringInput | null;
  cognitoID?: ModelStringInput | null;
  usernameID?: ModelStringInput | null;
  first_name?: ModelStringInput | null;
  last_name?: ModelStringInput | null;
  profilepictureID?: ModelIDInput | null;
  bio?: ModelStringInput | null;
  birthday?: ModelStringInput | null;
  and?: Array<ModelProfileConditionInput | null> | null;
  or?: Array<ModelProfileConditionInput | null> | null;
  not?: ModelProfileConditionInput | null;
  profileUsernameId?: ModelIDInput | null;
  profileImagePostsId?: ModelIDInput | null;
};

export type UpdateProfileInput = {
  id: string;
  email?: string | null;
  relation?: string | null;
  cognitoID?: string | null;
  usernameID?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  profilepictureID?: string | null;
  bio?: string | null;
  birthday?: string | null;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
};

export type DeleteProfileInput = {
  id: string;
};

export type CreateImagePostInput = {
  id?: string | null;
  sorterValue?: string | null;
  description?: string | null;
  time_posted?: string | null;
  likes?: string | null;
  comments?: string | null;
  usernameID: string;
  profileID: string;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
};

export type ModelImagePostConditionInput = {
  sorterValue?: ModelStringInput | null;
  description?: ModelStringInput | null;
  time_posted?: ModelStringInput | null;
  likes?: ModelStringInput | null;
  comments?: ModelStringInput | null;
  usernameID?: ModelIDInput | null;
  profileID?: ModelIDInput | null;
  s3_key?: ModelStringInput | null;
  mediaSourceMobile?: ModelStringInput | null;
  mediaSourceDesktop?: ModelStringInput | null;
  downloadableVideo?: ModelStringInput | null;
  posterImage?: ModelStringInput | null;
  and?: Array<ModelImagePostConditionInput | null> | null;
  or?: Array<ModelImagePostConditionInput | null> | null;
  not?: ModelImagePostConditionInput | null;
};

export type UpdateImagePostInput = {
  id: string;
  sorterValue?: string | null;
  description?: string | null;
  time_posted?: string | null;
  likes?: string | null;
  comments?: string | null;
  usernameID?: string | null;
  profileID?: string | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
};

export type DeleteImagePostInput = {
  id: string;
};

export type CreateCommentsInput = {
  id?: string | null;
  usernameID?: string | null;
  comment?: string | null;
  time_posted?: string | null;
  imagePostsID?: string | null;
};

export type ModelCommentsConditionInput = {
  usernameID?: ModelStringInput | null;
  comment?: ModelStringInput | null;
  time_posted?: ModelStringInput | null;
  imagePostsID?: ModelStringInput | null;
  and?: Array<ModelCommentsConditionInput | null> | null;
  or?: Array<ModelCommentsConditionInput | null> | null;
  not?: ModelCommentsConditionInput | null;
};

export type Comments = {
  __typename: "Comments";
  id: string;
  usernameID?: string | null;
  comment?: string | null;
  time_posted?: string | null;
  imagePostsID?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCommentsInput = {
  id: string;
  usernameID?: string | null;
  comment?: string | null;
  time_posted?: string | null;
  imagePostsID?: string | null;
};

export type DeleteCommentsInput = {
  id: string;
};

export type CreateUsernameInput = {
  id?: string | null;
  username?: string | null;
  profileID?: string | null;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
};

export type ModelUsernameConditionInput = {
  username?: ModelStringInput | null;
  profileID?: ModelStringInput | null;
  and?: Array<ModelUsernameConditionInput | null> | null;
  or?: Array<ModelUsernameConditionInput | null> | null;
  not?: ModelUsernameConditionInput | null;
  usernameImagePostsId?: ModelIDInput | null;
  usernameProfileId?: ModelIDInput | null;
};

export type UpdateUsernameInput = {
  id: string;
  username?: string | null;
  profileID?: string | null;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
};

export type DeleteUsernameInput = {
  id: string;
};

export type ModelProfilePictureFilterInput = {
  id?: ModelIDInput | null;
  imageurl?: ModelStringInput | null;
  profileID?: ModelStringInput | null;
  and?: Array<ModelProfilePictureFilterInput | null> | null;
  or?: Array<ModelProfilePictureFilterInput | null> | null;
  not?: ModelProfilePictureFilterInput | null;
  profilePictureProfileId?: ModelIDInput | null;
};

export type ModelProfilePictureConnection = {
  __typename: "ModelProfilePictureConnection";
  items: Array<ProfilePicture | null>;
  nextToken?: string | null;
};

export type ModelProfileFilterInput = {
  id?: ModelIDInput | null;
  email?: ModelStringInput | null;
  relation?: ModelStringInput | null;
  cognitoID?: ModelStringInput | null;
  usernameID?: ModelStringInput | null;
  first_name?: ModelStringInput | null;
  last_name?: ModelStringInput | null;
  profilepictureID?: ModelIDInput | null;
  bio?: ModelStringInput | null;
  birthday?: ModelStringInput | null;
  and?: Array<ModelProfileFilterInput | null> | null;
  or?: Array<ModelProfileFilterInput | null> | null;
  not?: ModelProfileFilterInput | null;
  profileUsernameId?: ModelIDInput | null;
  profileImagePostsId?: ModelIDInput | null;
};

export type ModelProfileConnection = {
  __typename: "ModelProfileConnection";
  items: Array<Profile | null>;
  nextToken?: string | null;
};

export type ModelImagePostFilterInput = {
  id?: ModelIDInput | null;
  sorterValue?: ModelStringInput | null;
  description?: ModelStringInput | null;
  time_posted?: ModelStringInput | null;
  likes?: ModelStringInput | null;
  comments?: ModelStringInput | null;
  usernameID?: ModelIDInput | null;
  profileID?: ModelIDInput | null;
  s3_key?: ModelStringInput | null;
  mediaSourceMobile?: ModelStringInput | null;
  mediaSourceDesktop?: ModelStringInput | null;
  downloadableVideo?: ModelStringInput | null;
  posterImage?: ModelStringInput | null;
  and?: Array<ModelImagePostFilterInput | null> | null;
  or?: Array<ModelImagePostFilterInput | null> | null;
  not?: ModelImagePostFilterInput | null;
};

export type ModelImagePostConnection = {
  __typename: "ModelImagePostConnection";
  items: Array<ImagePost | null>;
  nextToken?: string | null;
};

export type ModelCommentsFilterInput = {
  id?: ModelIDInput | null;
  usernameID?: ModelStringInput | null;
  comment?: ModelStringInput | null;
  time_posted?: ModelStringInput | null;
  imagePostsID?: ModelStringInput | null;
  and?: Array<ModelCommentsFilterInput | null> | null;
  or?: Array<ModelCommentsFilterInput | null> | null;
  not?: ModelCommentsFilterInput | null;
};

export type ModelCommentsConnection = {
  __typename: "ModelCommentsConnection";
  items: Array<Comments | null>;
  nextToken?: string | null;
};

export type ModelUsernameFilterInput = {
  id?: ModelIDInput | null;
  username?: ModelStringInput | null;
  profileID?: ModelStringInput | null;
  and?: Array<ModelUsernameFilterInput | null> | null;
  or?: Array<ModelUsernameFilterInput | null> | null;
  not?: ModelUsernameFilterInput | null;
  usernameImagePostsId?: ModelIDInput | null;
  usernameProfileId?: ModelIDInput | null;
};

export type ModelUsernameConnection = {
  __typename: "ModelUsernameConnection";
  items: Array<Username | null>;
  nextToken?: string | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelSubscriptionProfilePictureFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  imageurl?: ModelSubscriptionStringInput | null;
  profileID?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionProfilePictureFilterInput | null> | null;
  or?: Array<ModelSubscriptionProfilePictureFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionProfileFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  email?: ModelSubscriptionStringInput | null;
  relation?: ModelSubscriptionStringInput | null;
  cognitoID?: ModelSubscriptionStringInput | null;
  usernameID?: ModelSubscriptionStringInput | null;
  first_name?: ModelSubscriptionStringInput | null;
  last_name?: ModelSubscriptionStringInput | null;
  profilepictureID?: ModelSubscriptionIDInput | null;
  bio?: ModelSubscriptionStringInput | null;
  birthday?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionProfileFilterInput | null> | null;
  or?: Array<ModelSubscriptionProfileFilterInput | null> | null;
};

export type ModelSubscriptionImagePostFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  sorterValue?: ModelSubscriptionStringInput | null;
  description?: ModelSubscriptionStringInput | null;
  time_posted?: ModelSubscriptionStringInput | null;
  likes?: ModelSubscriptionStringInput | null;
  comments?: ModelSubscriptionStringInput | null;
  usernameID?: ModelSubscriptionIDInput | null;
  profileID?: ModelSubscriptionIDInput | null;
  s3_key?: ModelSubscriptionStringInput | null;
  mediaSourceMobile?: ModelSubscriptionStringInput | null;
  mediaSourceDesktop?: ModelSubscriptionStringInput | null;
  downloadableVideo?: ModelSubscriptionStringInput | null;
  posterImage?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionImagePostFilterInput | null> | null;
  or?: Array<ModelSubscriptionImagePostFilterInput | null> | null;
};

export type ModelSubscriptionCommentsFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  usernameID?: ModelSubscriptionStringInput | null;
  comment?: ModelSubscriptionStringInput | null;
  time_posted?: ModelSubscriptionStringInput | null;
  imagePostsID?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionCommentsFilterInput | null> | null;
  or?: Array<ModelSubscriptionCommentsFilterInput | null> | null;
};

export type ModelSubscriptionUsernameFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  username?: ModelSubscriptionStringInput | null;
  profileID?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionUsernameFilterInput | null> | null;
  or?: Array<ModelSubscriptionUsernameFilterInput | null> | null;
};

export type CreateProfilePictureMutation = {
  __typename: "ProfilePicture";
  id: string;
  imageurl?: string | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
};

export type UpdateProfilePictureMutation = {
  __typename: "ProfilePicture";
  id: string;
  imageurl?: string | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
};

export type DeleteProfilePictureMutation = {
  __typename: "ProfilePicture";
  id: string;
  imageurl?: string | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
};

export type CreateProfileMutation = {
  __typename: "Profile";
  id: string;
  email?: string | null;
  relation?: string | null;
  cognitoID?: string | null;
  usernameID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  first_name?: string | null;
  last_name?: string | null;
  profilepictureID?: string | null;
  profilepicture?: {
    __typename: "ProfilePicture";
    id: string;
    imageurl?: string | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
};

export type UpdateProfileMutation = {
  __typename: "Profile";
  id: string;
  email?: string | null;
  relation?: string | null;
  cognitoID?: string | null;
  usernameID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  first_name?: string | null;
  last_name?: string | null;
  profilepictureID?: string | null;
  profilepicture?: {
    __typename: "ProfilePicture";
    id: string;
    imageurl?: string | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
};

export type DeleteProfileMutation = {
  __typename: "Profile";
  id: string;
  email?: string | null;
  relation?: string | null;
  cognitoID?: string | null;
  usernameID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  first_name?: string | null;
  last_name?: string | null;
  profilepictureID?: string | null;
  profilepicture?: {
    __typename: "ProfilePicture";
    id: string;
    imageurl?: string | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
};

export type CreateImagePostMutation = {
  __typename: "ImagePost";
  id: string;
  sorterValue?: string | null;
  description?: string | null;
  time_posted?: string | null;
  likes?: string | null;
  comments?: string | null;
  usernameID: string;
  username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  profileID: string;
  profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateImagePostMutation = {
  __typename: "ImagePost";
  id: string;
  sorterValue?: string | null;
  description?: string | null;
  time_posted?: string | null;
  likes?: string | null;
  comments?: string | null;
  usernameID: string;
  username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  profileID: string;
  profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteImagePostMutation = {
  __typename: "ImagePost";
  id: string;
  sorterValue?: string | null;
  description?: string | null;
  time_posted?: string | null;
  likes?: string | null;
  comments?: string | null;
  usernameID: string;
  username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  profileID: string;
  profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCommentsMutation = {
  __typename: "Comments";
  id: string;
  usernameID?: string | null;
  comment?: string | null;
  time_posted?: string | null;
  imagePostsID?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCommentsMutation = {
  __typename: "Comments";
  id: string;
  usernameID?: string | null;
  comment?: string | null;
  time_posted?: string | null;
  imagePostsID?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteCommentsMutation = {
  __typename: "Comments";
  id: string;
  usernameID?: string | null;
  comment?: string | null;
  time_posted?: string | null;
  imagePostsID?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUsernameMutation = {
  __typename: "Username";
  id: string;
  username?: string | null;
  profileID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
};

export type UpdateUsernameMutation = {
  __typename: "Username";
  id: string;
  username?: string | null;
  profileID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
};

export type DeleteUsernameMutation = {
  __typename: "Username";
  id: string;
  username?: string | null;
  profileID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
};

export type GetProfilePictureQuery = {
  __typename: "ProfilePicture";
  id: string;
  imageurl?: string | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
};

export type ListProfilePicturesQuery = {
  __typename: "ModelProfilePictureConnection";
  items: Array<{
    __typename: "ProfilePicture";
    id: string;
    imageurl?: string | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type GetProfileQuery = {
  __typename: "Profile";
  id: string;
  email?: string | null;
  relation?: string | null;
  cognitoID?: string | null;
  usernameID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  first_name?: string | null;
  last_name?: string | null;
  profilepictureID?: string | null;
  profilepicture?: {
    __typename: "ProfilePicture";
    id: string;
    imageurl?: string | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
};

export type ListProfilesQuery = {
  __typename: "ModelProfileConnection";
  items: Array<{
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type GetImagePostQuery = {
  __typename: "ImagePost";
  id: string;
  sorterValue?: string | null;
  description?: string | null;
  time_posted?: string | null;
  likes?: string | null;
  comments?: string | null;
  usernameID: string;
  username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  profileID: string;
  profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListImagePostsQuery = {
  __typename: "ModelImagePostConnection";
  items: Array<{
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetCommentsQuery = {
  __typename: "Comments";
  id: string;
  usernameID?: string | null;
  comment?: string | null;
  time_posted?: string | null;
  imagePostsID?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListCommentsQuery = {
  __typename: "ModelCommentsConnection";
  items: Array<{
    __typename: "Comments";
    id: string;
    usernameID?: string | null;
    comment?: string | null;
    time_posted?: string | null;
    imagePostsID?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type GetUsernameQuery = {
  __typename: "Username";
  id: string;
  username?: string | null;
  profileID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
};

export type ListUsernamesQuery = {
  __typename: "ModelUsernameConnection";
  items: Array<{
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type ProfilesByProfilepictureIDQuery = {
  __typename: "ModelProfileConnection";
  items: Array<{
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type ImagePostsBySorterValueAndTime_postedQuery = {
  __typename: "ModelImagePostConnection";
  items: Array<{
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type ImagePostsByUsernameIDQuery = {
  __typename: "ModelImagePostConnection";
  items: Array<{
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type ImagePostsByProfileIDQuery = {
  __typename: "ModelImagePostConnection";
  items: Array<{
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type OnCreateProfilePictureSubscription = {
  __typename: "ProfilePicture";
  id: string;
  imageurl?: string | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
};

export type OnUpdateProfilePictureSubscription = {
  __typename: "ProfilePicture";
  id: string;
  imageurl?: string | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
};

export type OnDeleteProfilePictureSubscription = {
  __typename: "ProfilePicture";
  id: string;
  imageurl?: string | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
};

export type OnCreateProfileSubscription = {
  __typename: "Profile";
  id: string;
  email?: string | null;
  relation?: string | null;
  cognitoID?: string | null;
  usernameID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  first_name?: string | null;
  last_name?: string | null;
  profilepictureID?: string | null;
  profilepicture?: {
    __typename: "ProfilePicture";
    id: string;
    imageurl?: string | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
};

export type OnUpdateProfileSubscription = {
  __typename: "Profile";
  id: string;
  email?: string | null;
  relation?: string | null;
  cognitoID?: string | null;
  usernameID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  first_name?: string | null;
  last_name?: string | null;
  profilepictureID?: string | null;
  profilepicture?: {
    __typename: "ProfilePicture";
    id: string;
    imageurl?: string | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
};

export type OnDeleteProfileSubscription = {
  __typename: "Profile";
  id: string;
  email?: string | null;
  relation?: string | null;
  cognitoID?: string | null;
  usernameID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  first_name?: string | null;
  last_name?: string | null;
  profilepictureID?: string | null;
  profilepicture?: {
    __typename: "ProfilePicture";
    id: string;
    imageurl?: string | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
};

export type OnCreateImagePostSubscription = {
  __typename: "ImagePost";
  id: string;
  sorterValue?: string | null;
  description?: string | null;
  time_posted?: string | null;
  likes?: string | null;
  comments?: string | null;
  usernameID: string;
  username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  profileID: string;
  profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateImagePostSubscription = {
  __typename: "ImagePost";
  id: string;
  sorterValue?: string | null;
  description?: string | null;
  time_posted?: string | null;
  likes?: string | null;
  comments?: string | null;
  usernameID: string;
  username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  profileID: string;
  profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteImagePostSubscription = {
  __typename: "ImagePost";
  id: string;
  sorterValue?: string | null;
  description?: string | null;
  time_posted?: string | null;
  likes?: string | null;
  comments?: string | null;
  usernameID: string;
  username?: {
    __typename: "Username";
    id: string;
    username?: string | null;
    profileID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
  } | null;
  profileID: string;
  profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateCommentsSubscription = {
  __typename: "Comments";
  id: string;
  usernameID?: string | null;
  comment?: string | null;
  time_posted?: string | null;
  imagePostsID?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateCommentsSubscription = {
  __typename: "Comments";
  id: string;
  usernameID?: string | null;
  comment?: string | null;
  time_posted?: string | null;
  imagePostsID?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteCommentsSubscription = {
  __typename: "Comments";
  id: string;
  usernameID?: string | null;
  comment?: string | null;
  time_posted?: string | null;
  imagePostsID?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateUsernameSubscription = {
  __typename: "Username";
  id: string;
  username?: string | null;
  profileID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
};

export type OnUpdateUsernameSubscription = {
  __typename: "Username";
  id: string;
  username?: string | null;
  profileID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
};

export type OnDeleteUsernameSubscription = {
  __typename: "Username";
  id: string;
  username?: string | null;
  profileID?: string | null;
  ImagePosts?: {
    __typename: "ImagePost";
    id: string;
    sorterValue?: string | null;
    description?: string | null;
    time_posted?: string | null;
    likes?: string | null;
    comments?: string | null;
    usernameID: string;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    profileID: string;
    profile?: {
      __typename: "Profile";
      id: string;
      email?: string | null;
      relation?: string | null;
      cognitoID?: string | null;
      usernameID?: string | null;
      first_name?: string | null;
      last_name?: string | null;
      profilepictureID?: string | null;
      bio?: string | null;
      birthday?: string | null;
      createdAt: string;
      updatedAt: string;
      profileUsernameId?: string | null;
      profileImagePostsId?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
  Profile?: {
    __typename: "Profile";
    id: string;
    email?: string | null;
    relation?: string | null;
    cognitoID?: string | null;
    usernameID?: string | null;
    ImagePosts?: {
      __typename: "ImagePost";
      id: string;
      sorterValue?: string | null;
      description?: string | null;
      time_posted?: string | null;
      likes?: string | null;
      comments?: string | null;
      usernameID: string;
      profileID: string;
      s3_key?: string | null;
      mediaSourceMobile?: string | null;
      mediaSourceDesktop?: string | null;
      downloadableVideo?: string | null;
      posterImage?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    Username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
    } | null;
    first_name?: string | null;
    last_name?: string | null;
    profilepictureID?: string | null;
    profilepicture?: {
      __typename: "ProfilePicture";
      id: string;
      imageurl?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      profilePictureProfileId?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
};


// ZACH CREATED
export type GetUsernameDataQuery = {
  __typename: "Username";
  id: string;
  username: string;
  profileID: string;
  _version: number;
  _lastChangedAt?: Date | null;
  _deleted?: boolean | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {

  finalArray;
  mediaPosted;

  // ZACH CREATED  

  async getImageComments(id: string): Promise<any> {
    const statement = `query listImageComments($id: String) {
      listComments(filter: {imagePostsID: {eq: $id}}) {
        items {
          id
          time_posted
          usernameID
          imagePostsID
          comment
        }
      }
    }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;

    let data = this.sortByDate(response.data.listComments.items)
    data.map(async values => {
      values.username = await (await this.GetUsername(values.usernameID))?.username
      values.profilePic = await this.checkForProfilePhoto(await(await this.GetProfilePictureProfileID(await (await this.GetUsername(values.usernameID))?.profileID)))
    })
    return data;
  }

  async checkForProfilePhoto(url) {
    if (url) {
      return await Storage.get('profile-pictures/' + url.imageurl)
    } else {
      return false;
    }
  }

  async GetUsernameProfile(username: string): Promise<any> {
    const statement = `query getUsernameData($username: String) {
      listUsernames(filter: {username: {eq: $username}}) {
        items {
          profileID
          id
          username
        }
      }
    }`;
    const gqlAPIServiceArguments: any = {
      username
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return response.data.listUsernames.items[0].profileID;
  }

  async GetPostLikes(id: string): Promise<GetImagePostQuery> {
    const statement = `query getImageLikes($id: ID!) {
      getImagePost(id: $id) {
        likes
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetImagePostQuery>response.data.getImagePost;
  }

  async getSpecificTimelineMedia(id: String): Promise<any> {

    const statement = `query GetImagePost($id: ID!) {
      getImagePost(id: $id) {
        __typename
        id
        description
        time_posted
        likes
        comments
        usernameID
        username {
          __typename
          id
          username
          profileID
          ImagePosts {
            __typename
            id
            description
            time_posted
            likes
            comments
            usernameID
            profileID
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            posterImage
            createdAt
            updatedAt
          }
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            first_name
            last_name
            bio
            profilepictureID
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
        }
        profileID
        profile {
          __typename
          id
          email
          relation
          cognitoID
          usernameID
          ImagePosts {
            __typename
            id
            description
            time_posted
            likes
            comments
            usernameID
            profileID
            s3_key
            posterImage
            createdAt
            updatedAt
          }
          Username {
            __typename
            id
            username
            profileID
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          first_name
          last_name
          bio
          profilepictureID
          profilepicture {
            __typename
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
        s3_key
        posterImage
        mediaSourceMobile
        mediaSourceDesktop
        createdAt
        updatedAt
      }
    }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;

    let array: any = response.data.getImagePost;
    let currentUser = localStorage.getItem('usernameID');

    this.finalArray = [];
    if (!array.posterImage) {
      this.finalArray.push({
        mediaSourceMobile: array.mediaSourceMobile,
        mediaSourceDesktop: array.mediaSourceDesktop,
        isVideo: false,
        time_posted: new Date(array.time_posted),
        usernameID: array.usernameID,
        description: array.description,
        id: array.id,
        likes: array.likes,
        // comment_count: await this.commentLength(posts.comments),
        like_count: await this.getLikeCount(array.likes),
        username: array.username.username,
        userLiked: await this.getLikeData(array.likes, currentUser),
        profilePicture: "https://ik.imagekit.io/bkf4g8lrl/profile-photos/" + array.profile.profilepicture.imageurl
      })
    } else {
      this.finalArray.push({
        mediaSourceMobile: await Storage.get(array.s3_key, { bucket: "fetadevvodservice-dev-output-nk0sepbg" }),
        mediaSourceDesktop: null,
        isVideo: true,
        time_posted: new Date(array.time_posted),
        usernameID: array.usernameID,
        description: array.description,
        id: array.id,
        likes: array.likes,
        posterImage: "https://ik.imagekit.io/bkf4g8lrl/poster-images/" + array.posterImage,
        // comment_count: await this.commentLength(posts.comments),
        like_count: await this.getLikeCount(array.likes),
        username: array.username.username,
        userLiked: await this.getLikeData(array.likes, currentUser),
        profilePicture: "https://ik.imagekit.io/bkf4g8lrl/profile-photos/" + array.profile.profilepicture.imageurl
      })
    }
    this.finalArray = this.finalArray[0]
    return [1, this.finalArray];
  }


  sortByDate(array) {
    return array.sort((a, b) => Date.parse(b.time_posted) - Date.parse(a.time_posted))
  }

  async getLikeData(likes, usernameID) {
    if (!JSON.parse(likes)) {
      return false;
    } else {
      if (!JSON.parse(likes)['usernames']) {
        return false;
      } else {
        let usersThatLike = [];
        usersThatLike = JSON.parse(likes)['usernames'];
        if (usersThatLike.indexOf(usernameID) > -1) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  async getLikeCount(likesArray) {
    if (JSON.parse(likesArray)) {
      if (JSON.parse(likesArray)['usernames']) {
        likesArray = JSON.parse(likesArray)['usernames']
        return likesArray.length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }


  async getUserProfileMediaData(profileID: String): Promise<any> {

    const statement = `query getUserProfileMediaData($profileID: ID!) {
      imagePostsByProfileID(profileID: $profileID) {
        items {
          time_posted
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          profileID
          description
          likes
          id
          posterImage
        }
      }
    }`;

    const gqlAPIServiceArguments: any = {
      profileID
    };

    const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
    let array: any = response.data.imagePostsByProfileID.items;

    let photosPosted = [];
    let videosPosted = [];
    await Promise.all(array.map(async posts => {
      if (await this.checkForVideo(posts.s3_key) === false) {
        photosPosted.push({
          time_posted: posts.time_posted,
          s3_key: posts.s3_key,
          mediaSourceMobile: posts.mediaSourceMobile,
          mediaSourceDesktop: posts.mediaSourceDesktop,
          profileID: posts.profileID,
          description: posts.description,
          likes: posts.likes,
          id: posts.id
        })
      } else {
        videosPosted.push({
          time_posted: posts.time_posted,
          posterImage: await Storage.get(posts.posterImage, { bucket: "fetadevvodservice-dev-output-nk0sepbg" }),
          profileID: posts.profileID,
          description: posts.description,
          likes: posts.likes,
          id: posts.id
        })
      }
    }))
    return [photosPosted, photosPosted.length, videosPosted, videosPosted.length];
  }

  async checkForVideo(filename) {
    let extension = filename.split('.').pop().toLowerCase()
    if (extension === 'mov' || extension === 'mp4' || extension === 'ogg' || extension === 'webm' || extension === 'm3u8') {
      return true
    } else {
      return false
    }
  }

  async GetUsernameFromProfileId(profileID: String): Promise<any> {
    const statement = `query getUsernameData($profileID: String) {
      listUsernames(filter: {profileID: {eq: $profileID}}) {
        items {
          profileID
          id
          username
        }
      }
    }`;
    const gqlAPIServiceArguments: any = {
      profileID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return response.data.listUsernames.items[0].username;
  }

  async GetUsernameDataFromProfileId(profileID: string): Promise<GetUsernameDataQuery> {
    const statement = `query getUsernameData($profileID: String) {
      listUsernames(filter: {profileID: {eq: $profileID}}) {
        items {
          profileID
          id
          username
        }
      }
    }`;
    const gqlAPIServiceArguments: any = {
      profileID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUsernameDataQuery>response.data.listUsernames.items[0];
  }

  async GetUserProfileFromCognitoId(cognitoID: String): Promise<any> {
    const statement = `query getUserProfileData($cognitoID: String) {
      listProfiles(filter: {cognitoID: {eq: $cognitoID}}) {
        items {
          cognitoID
          createdAt
          email
          first_name
          last_name
          bio
          id
          relation
          updatedAt
          usernameID
          profilepictureID
        }
      }
    }`;
    const gqlAPIServiceArguments: any = {
      cognitoID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <any>response.data.listProfiles.items[0];
  }

  async GetProfilePictureProfileID(profileID: string): Promise<GetProfilePictureQuery> {
    const statement = `query getProfilePictureProfileID($profileID: String) {
      listProfilePictures(filter: {profileID: {eq: $profileID}}) {
        items {
          profileID
          id
          imageurl
        }
      }
    }`;
    const gqlAPIServiceArguments: any = {
      profileID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetProfilePictureQuery>response.data.listProfilePictures.items[0];
  }

  async CreateProfilePicture(
    input: CreateProfilePictureInput,
    condition?: ModelProfilePictureConditionInput
  ): Promise<CreateProfilePictureMutation> {
    const statement = `mutation CreateProfilePicture($input: CreateProfilePictureInput!, $condition: ModelProfilePictureConditionInput) {
        createProfilePicture(input: $input, condition: $condition) {
          __typename
          id
          imageurl
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
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
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateProfilePictureMutation>response.data.createProfilePicture;
  }
  async UpdateProfilePicture(
    input: UpdateProfilePictureInput,
    condition?: ModelProfilePictureConditionInput
  ): Promise<UpdateProfilePictureMutation> {
    const statement = `mutation UpdateProfilePicture($input: UpdateProfilePictureInput!, $condition: ModelProfilePictureConditionInput) {
        updateProfilePicture(input: $input, condition: $condition) {
          __typename
          id
          imageurl
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
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
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateProfilePictureMutation>response.data.updateProfilePicture;
  }
  async DeleteProfilePicture(
    input: DeleteProfilePictureInput,
    condition?: ModelProfilePictureConditionInput
  ): Promise<DeleteProfilePictureMutation> {
    const statement = `mutation DeleteProfilePicture($input: DeleteProfilePictureInput!, $condition: ModelProfilePictureConditionInput) {
        deleteProfilePicture(input: $input, condition: $condition) {
          __typename
          id
          imageurl
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
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
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteProfilePictureMutation>response.data.deleteProfilePicture;
  }
  async CreateProfile(
    input: CreateProfileInput,
    condition?: ModelProfileConditionInput
  ): Promise<CreateProfileMutation> {
    const statement = `mutation CreateProfile($input: CreateProfileInput!, $condition: ModelProfileConditionInput) {
        createProfile(input: $input, condition: $condition) {
          __typename
          id
          email
          relation
          cognitoID
          usernameID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          first_name
          last_name
          profilepictureID
          profilepicture {
            __typename
            id
            imageurl
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
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
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateProfileMutation>response.data.createProfile;
  }
  async UpdateProfile(
    input: UpdateProfileInput,
    condition?: ModelProfileConditionInput
  ): Promise<UpdateProfileMutation> {
    const statement = `mutation UpdateProfile($input: UpdateProfileInput!, $condition: ModelProfileConditionInput) {
        updateProfile(input: $input, condition: $condition) {
          __typename
          id
          email
          relation
          cognitoID
          usernameID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          first_name
          last_name
          profilepictureID
          profilepicture {
            __typename
            id
            imageurl
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
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
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateProfileMutation>response.data.updateProfile;
  }
  async DeleteProfile(
    input: DeleteProfileInput,
    condition?: ModelProfileConditionInput
  ): Promise<DeleteProfileMutation> {
    const statement = `mutation DeleteProfile($input: DeleteProfileInput!, $condition: ModelProfileConditionInput) {
        deleteProfile(input: $input, condition: $condition) {
          __typename
          id
          email
          relation
          cognitoID
          usernameID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          first_name
          last_name
          profilepictureID
          profilepicture {
            __typename
            id
            imageurl
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
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
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteProfileMutation>response.data.deleteProfile;
  }
  async CreateImagePost(
    input: CreateImagePostInput,
    condition?: ModelImagePostConditionInput
  ): Promise<CreateImagePostMutation> {
    const statement = `mutation CreateImagePost($input: CreateImagePostInput!, $condition: ModelImagePostConditionInput) {
        createImagePost(input: $input, condition: $condition) {
          __typename
          id
          sorterValue
          description
          time_posted
          likes
          comments
          usernameID
          username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          profileID
          profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateImagePostMutation>response.data.createImagePost;
  }
  async UpdateImagePost(
    input: UpdateImagePostInput,
    condition?: ModelImagePostConditionInput
  ): Promise<UpdateImagePostMutation> {
    const statement = `mutation UpdateImagePost($input: UpdateImagePostInput!, $condition: ModelImagePostConditionInput) {
        updateImagePost(input: $input, condition: $condition) {
          __typename
          id
          sorterValue
          description
          time_posted
          likes
          comments
          usernameID
          username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          profileID
          profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateImagePostMutation>response.data.updateImagePost;
  }
  async DeleteImagePost(
    input: DeleteImagePostInput,
    condition?: ModelImagePostConditionInput
  ): Promise<DeleteImagePostMutation> {
    const statement = `mutation DeleteImagePost($input: DeleteImagePostInput!, $condition: ModelImagePostConditionInput) {
        deleteImagePost(input: $input, condition: $condition) {
          __typename
          id
          sorterValue
          description
          time_posted
          likes
          comments
          usernameID
          username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          profileID
          profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteImagePostMutation>response.data.deleteImagePost;
  }
  async CreateComments(
    input: CreateCommentsInput,
    condition?: ModelCommentsConditionInput
  ): Promise<CreateCommentsMutation> {
    const statement = `mutation CreateComments($input: CreateCommentsInput!, $condition: ModelCommentsConditionInput) {
        createComments(input: $input, condition: $condition) {
          __typename
          id
          usernameID
          comment
          time_posted
          imagePostsID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCommentsMutation>response.data.createComments;
  }
  async UpdateComments(
    input: UpdateCommentsInput,
    condition?: ModelCommentsConditionInput
  ): Promise<UpdateCommentsMutation> {
    const statement = `mutation UpdateComments($input: UpdateCommentsInput!, $condition: ModelCommentsConditionInput) {
        updateComments(input: $input, condition: $condition) {
          __typename
          id
          usernameID
          comment
          time_posted
          imagePostsID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCommentsMutation>response.data.updateComments;
  }
  async DeleteComments(
    input: DeleteCommentsInput,
    condition?: ModelCommentsConditionInput
  ): Promise<DeleteCommentsMutation> {
    const statement = `mutation DeleteComments($input: DeleteCommentsInput!, $condition: ModelCommentsConditionInput) {
        deleteComments(input: $input, condition: $condition) {
          __typename
          id
          usernameID
          comment
          time_posted
          imagePostsID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCommentsMutation>response.data.deleteComments;
  }
  async CreateUsername(
    input: CreateUsernameInput,
    condition?: ModelUsernameConditionInput
  ): Promise<CreateUsernameMutation> {
    const statement = `mutation CreateUsername($input: CreateUsernameInput!, $condition: ModelUsernameConditionInput) {
        createUsername(input: $input, condition: $condition) {
          __typename
          id
          username
          profileID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUsernameMutation>response.data.createUsername;
  }
  async UpdateUsername(
    input: UpdateUsernameInput,
    condition?: ModelUsernameConditionInput
  ): Promise<UpdateUsernameMutation> {
    const statement = `mutation UpdateUsername($input: UpdateUsernameInput!, $condition: ModelUsernameConditionInput) {
        updateUsername(input: $input, condition: $condition) {
          __typename
          id
          username
          profileID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUsernameMutation>response.data.updateUsername;
  }
  async DeleteUsername(
    input: DeleteUsernameInput,
    condition?: ModelUsernameConditionInput
  ): Promise<DeleteUsernameMutation> {
    const statement = `mutation DeleteUsername($input: DeleteUsernameInput!, $condition: ModelUsernameConditionInput) {
        deleteUsername(input: $input, condition: $condition) {
          __typename
          id
          username
          profileID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUsernameMutation>response.data.deleteUsername;
  }
  async GetProfilePicture(id: string): Promise<GetProfilePictureQuery> {
    const statement = `query GetProfilePicture($id: ID!) {
        getProfilePicture(id: $id) {
          __typename
          id
          imageurl
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
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
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetProfilePictureQuery>response.data.getProfilePicture;
  }
  async ListProfilePictures(
    filter?: ModelProfilePictureFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListProfilePicturesQuery> {
    const statement = `query ListProfilePictures($filter: ModelProfilePictureFilterInput, $limit: Int, $nextToken: String) {
        listProfilePictures(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            imageurl
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
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
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListProfilePicturesQuery>response.data.listProfilePictures;
  }
  async GetProfile(id: string): Promise<GetProfileQuery> {
    const statement = `query GetProfile($id: ID!) {
        getProfile(id: $id) {
          __typename
          id
          email
          relation
          cognitoID
          usernameID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          first_name
          last_name
          profilepictureID
          profilepicture {
            __typename
            id
            imageurl
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
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
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetProfileQuery>response.data.getProfile;
  }
  async ListProfiles(
    filter?: ModelProfileFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListProfilesQuery> {
    const statement = `query ListProfiles($filter: ModelProfileFilterInput, $limit: Int, $nextToken: String) {
        listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListProfilesQuery>response.data.listProfiles;
  }
  async GetImagePost(id: string): Promise<GetImagePostQuery> {
    const statement = `query GetImagePost($id: ID!) {
        getImagePost(id: $id) {
          __typename
          id
          sorterValue
          description
          time_posted
          likes
          comments
          usernameID
          username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          profileID
          profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetImagePostQuery>response.data.getImagePost;
  }
  async ListImagePosts(
    filter?: ModelImagePostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListImagePostsQuery> {
    const statement = `query ListImagePosts($filter: ModelImagePostFilterInput, $limit: Int, $nextToken: String) {
        listImagePosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListImagePostsQuery>response.data.listImagePosts;
  }
  async GetComments(id: string): Promise<GetCommentsQuery> {
    const statement = `query GetComments($id: ID!) {
        getComments(id: $id) {
          __typename
          id
          usernameID
          comment
          time_posted
          imagePostsID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCommentsQuery>response.data.getComments;
  }
  async ListComments(
    filter?: ModelCommentsFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCommentsQuery> {
    const statement = `query ListComments($filter: ModelCommentsFilterInput, $limit: Int, $nextToken: String) {
        listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
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
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCommentsQuery>response.data.listComments;
  }
  async GetUsername(id: string): Promise<GetUsernameQuery> {
    const statement = `query GetUsername($id: ID!) {
        getUsername(id: $id) {
          __typename
          id
          username
          profileID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUsernameQuery>response.data.getUsername;
  }
  async ListUsernames(
    filter?: ModelUsernameFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUsernamesQuery> {
    const statement = `query ListUsernames($filter: ModelUsernameFilterInput, $limit: Int, $nextToken: String) {
        listUsernames(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUsernamesQuery>response.data.listUsernames;
  }
  async ProfilesByProfilepictureID(
    profilepictureID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelProfileFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ProfilesByProfilepictureIDQuery> {
    const statement = `query ProfilesByProfilepictureID($profilepictureID: ID!, $sortDirection: ModelSortDirection, $filter: ModelProfileFilterInput, $limit: Int, $nextToken: String) {
        profilesByProfilepictureID(profilepictureID: $profilepictureID, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      profilepictureID
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ProfilesByProfilepictureIDQuery>(
      response.data.profilesByProfilepictureID
    );
  }
  async ImagePostsBySorterValueAndTime_posted(
    sorterValue: string,
    time_posted?: ModelStringKeyConditionInput,
    sortDirection?: ModelSortDirection,
    filter?: ModelImagePostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ImagePostsBySorterValueAndTime_postedQuery> {
    const statement = `query ImagePostsBySorterValueAndTime_posted($sorterValue: String!, $time_posted: ModelStringKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelImagePostFilterInput, $limit: Int, $nextToken: String) {
        imagePostsBySorterValueAndTime_posted(sorterValue: $sorterValue, time_posted: $time_posted, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      sorterValue
    };
    if (time_posted) {
      gqlAPIServiceArguments.time_posted = time_posted;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ImagePostsBySorterValueAndTime_postedQuery>(
      response.data.imagePostsBySorterValueAndTime_posted
    );
  }
  async ImagePostsByUsernameID(
    usernameID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelImagePostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ImagePostsByUsernameIDQuery> {
    const statement = `query ImagePostsByUsernameID($usernameID: ID!, $sortDirection: ModelSortDirection, $filter: ModelImagePostFilterInput, $limit: Int, $nextToken: String) {
        imagePostsByUsernameID(usernameID: $usernameID, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      usernameID
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ImagePostsByUsernameIDQuery>response.data.imagePostsByUsernameID;
  }
  async ImagePostsByProfileID(
    profileID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelImagePostFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ImagePostsByProfileIDQuery> {
    const statement = `query ImagePostsByProfileID($profileID: ID!, $sortDirection: ModelSortDirection, $filter: ModelImagePostFilterInput, $limit: Int, $nextToken: String) {
        imagePostsByProfileID(profileID: $profileID, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      profileID
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ImagePostsByProfileIDQuery>response.data.imagePostsByProfileID;
  }
  OnCreateProfilePictureListener(
    filter?: ModelSubscriptionProfilePictureFilterInput
  ): Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreateProfilePicture">
    >
  > {
    const statement = `subscription OnCreateProfilePicture($filter: ModelSubscriptionProfilePictureFilterInput) {
        onCreateProfilePicture(filter: $filter) {
          __typename
          id
          imageurl
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
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
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onCreateProfilePicture">
      >
    >;
  }

  OnUpdateProfilePictureListener(
    filter?: ModelSubscriptionProfilePictureFilterInput
  ): Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdateProfilePicture">
    >
  > {
    const statement = `subscription OnUpdateProfilePicture($filter: ModelSubscriptionProfilePictureFilterInput) {
        onUpdateProfilePicture(filter: $filter) {
          __typename
          id
          imageurl
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
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
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onUpdateProfilePicture">
      >
    >;
  }

  OnDeleteProfilePictureListener(
    filter?: ModelSubscriptionProfilePictureFilterInput
  ): Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeleteProfilePicture">
    >
  > {
    const statement = `subscription OnDeleteProfilePicture($filter: ModelSubscriptionProfilePictureFilterInput) {
        onDeleteProfilePicture(filter: $filter) {
          __typename
          id
          imageurl
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
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
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onDeleteProfilePicture">
      >
    >;
  }

  OnCreateProfileListener(
    filter?: ModelSubscriptionProfileFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateProfile">>
  > {
    const statement = `subscription OnCreateProfile($filter: ModelSubscriptionProfileFilterInput) {
        onCreateProfile(filter: $filter) {
          __typename
          id
          email
          relation
          cognitoID
          usernameID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          first_name
          last_name
          profilepictureID
          profilepicture {
            __typename
            id
            imageurl
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
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
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateProfile">>
    >;
  }

  OnUpdateProfileListener(
    filter?: ModelSubscriptionProfileFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateProfile">>
  > {
    const statement = `subscription OnUpdateProfile($filter: ModelSubscriptionProfileFilterInput) {
        onUpdateProfile(filter: $filter) {
          __typename
          id
          email
          relation
          cognitoID
          usernameID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          first_name
          last_name
          profilepictureID
          profilepicture {
            __typename
            id
            imageurl
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
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
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateProfile">>
    >;
  }

  OnDeleteProfileListener(
    filter?: ModelSubscriptionProfileFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteProfile">>
  > {
    const statement = `subscription OnDeleteProfile($filter: ModelSubscriptionProfileFilterInput) {
        onDeleteProfile(filter: $filter) {
          __typename
          id
          email
          relation
          cognitoID
          usernameID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          first_name
          last_name
          profilepictureID
          profilepicture {
            __typename
            id
            imageurl
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
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
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteProfile">>
    >;
  }

  OnCreateImagePostListener(
    filter?: ModelSubscriptionImagePostFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateImagePost">>
  > {
    const statement = `subscription OnCreateImagePost($filter: ModelSubscriptionImagePostFilterInput) {
        onCreateImagePost(filter: $filter) {
          __typename
          id
          sorterValue
          description
          time_posted
          likes
          comments
          usernameID
          username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          profileID
          profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateImagePost">>
    >;
  }

  OnUpdateImagePostListener(
    filter?: ModelSubscriptionImagePostFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateImagePost">>
  > {
    const statement = `subscription OnUpdateImagePost($filter: ModelSubscriptionImagePostFilterInput) {
        onUpdateImagePost(filter: $filter) {
          __typename
          id
          sorterValue
          description
          time_posted
          likes
          comments
          usernameID
          username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          profileID
          profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateImagePost">>
    >;
  }

  OnDeleteImagePostListener(
    filter?: ModelSubscriptionImagePostFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteImagePost">>
  > {
    const statement = `subscription OnDeleteImagePost($filter: ModelSubscriptionImagePostFilterInput) {
        onDeleteImagePost(filter: $filter) {
          __typename
          id
          sorterValue
          description
          time_posted
          likes
          comments
          usernameID
          username {
            __typename
            id
            username
            profileID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
          }
          profileID
          profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteImagePost">>
    >;
  }

  OnCreateCommentsListener(
    filter?: ModelSubscriptionCommentsFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateComments">>
  > {
    const statement = `subscription OnCreateComments($filter: ModelSubscriptionCommentsFilterInput) {
        onCreateComments(filter: $filter) {
          __typename
          id
          usernameID
          comment
          time_posted
          imagePostsID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateComments">>
    >;
  }

  OnUpdateCommentsListener(
    filter?: ModelSubscriptionCommentsFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateComments">>
  > {
    const statement = `subscription OnUpdateComments($filter: ModelSubscriptionCommentsFilterInput) {
        onUpdateComments(filter: $filter) {
          __typename
          id
          usernameID
          comment
          time_posted
          imagePostsID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateComments">>
    >;
  }

  OnDeleteCommentsListener(
    filter?: ModelSubscriptionCommentsFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteComments">>
  > {
    const statement = `subscription OnDeleteComments($filter: ModelSubscriptionCommentsFilterInput) {
        onDeleteComments(filter: $filter) {
          __typename
          id
          usernameID
          comment
          time_posted
          imagePostsID
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteComments">>
    >;
  }

  OnCreateUsernameListener(
    filter?: ModelSubscriptionUsernameFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUsername">>
  > {
    const statement = `subscription OnCreateUsername($filter: ModelSubscriptionUsernameFilterInput) {
        onCreateUsername(filter: $filter) {
          __typename
          id
          username
          profileID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUsername">>
    >;
  }

  OnUpdateUsernameListener(
    filter?: ModelSubscriptionUsernameFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUsername">>
  > {
    const statement = `subscription OnUpdateUsername($filter: ModelSubscriptionUsernameFilterInput) {
        onUpdateUsername(filter: $filter) {
          __typename
          id
          username
          profileID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUsername">>
    >;
  }

  OnDeleteUsernameListener(
    filter?: ModelSubscriptionUsernameFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUsername">>
  > {
    const statement = `subscription OnDeleteUsername($filter: ModelSubscriptionUsernameFilterInput) {
        onDeleteUsername(filter: $filter) {
          __typename
          id
          username
          profileID
          ImagePosts {
            __typename
            id
            sorterValue
            description
            time_posted
            likes
            comments
            usernameID
            username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            profileID
            profile {
              __typename
              id
              email
              relation
              cognitoID
              usernameID
              first_name
              last_name
              profilepictureID
              bio
              birthday
              createdAt
              updatedAt
              profileUsernameId
              profileImagePostsId
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
          }
          Profile {
            __typename
            id
            email
            relation
            cognitoID
            usernameID
            ImagePosts {
              __typename
              id
              sorterValue
              description
              time_posted
              likes
              comments
              usernameID
              profileID
              s3_key
              mediaSourceMobile
              mediaSourceDesktop
              downloadableVideo
              posterImage
              createdAt
              updatedAt
            }
            Username {
              __typename
              id
              username
              profileID
              createdAt
              updatedAt
              usernameImagePostsId
              usernameProfileId
            }
            first_name
            last_name
            profilepictureID
            profilepicture {
              __typename
              id
              imageurl
              profileID
              createdAt
              updatedAt
              profilePictureProfileId
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUsername">>
    >;
  }
}
