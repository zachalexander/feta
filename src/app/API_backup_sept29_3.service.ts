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
  onCreateSportsGame: OnCreateSportsGameSubscription;
  onUpdateSportsGame: OnUpdateSportsGameSubscription;
  onDeleteSportsGame: OnDeleteSportsGameSubscription;
  onCreateLiveGameChatRoom: OnCreateLiveGameChatRoomSubscription;
  onUpdateLiveGameChatRoom: OnUpdateLiveGameChatRoomSubscription;
  onDeleteLiveGameChatRoom: OnDeleteLiveGameChatRoomSubscription;
  onCreateHubPosts: OnCreateHubPostsSubscription;
  onUpdateHubPosts: OnUpdateHubPostsSubscription;
  onDeleteHubPosts: OnDeleteHubPostsSubscription;
  onCreateChats: OnCreateChatsSubscription;
  onUpdateChats: OnUpdateChatsSubscription;
  onDeleteChats: OnDeleteChatsSubscription;
  onCreateChatLikes: OnCreateChatLikesSubscription;
  onUpdateChatLikes: OnUpdateChatLikesSubscription;
  onDeleteChatLikes: OnDeleteChatLikesSubscription;
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
  owner?: string | null;
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
  owner?: string | null;
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
  owner?: string | null;
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
  owner?: string | null;
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
  owner?: string | null;
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

export type CreateSportsGameInput = {
  id?: string | null;
  sport?: string | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
  gameStatus?: string | null;
  homeTeamWins?: string | null;
  homeTeamLosses?: string | null;
  awayTeamWins?: string | null;
  awayTeamLosses?: string | null;
  basicGameInfo?: string | null;
  startTime?: string | null;
  lastUpdate?: string | null;
  gameStarted?: string | null;
  gameEnded?: string | null;
  liveGameChatRoomID?: string | null;
};

export type ModelSportsGameConditionInput = {
  sport?: ModelStringInput | null;
  homeTeam?: ModelStringInput | null;
  awayTeam?: ModelStringInput | null;
  gameStatus?: ModelStringInput | null;
  homeTeamWins?: ModelStringInput | null;
  homeTeamLosses?: ModelStringInput | null;
  awayTeamWins?: ModelStringInput | null;
  awayTeamLosses?: ModelStringInput | null;
  basicGameInfo?: ModelStringInput | null;
  startTime?: ModelStringInput | null;
  lastUpdate?: ModelStringInput | null;
  gameStarted?: ModelStringInput | null;
  gameEnded?: ModelStringInput | null;
  liveGameChatRoomID?: ModelIDInput | null;
  and?: Array<ModelSportsGameConditionInput | null> | null;
  or?: Array<ModelSportsGameConditionInput | null> | null;
  not?: ModelSportsGameConditionInput | null;
};

export type SportsGame = {
  __typename: "SportsGame";
  id: string;
  sport?: string | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
  gameStatus?: string | null;
  homeTeamWins?: string | null;
  homeTeamLosses?: string | null;
  awayTeamWins?: string | null;
  awayTeamLosses?: string | null;
  basicGameInfo?: string | null;
  startTime?: string | null;
  lastUpdate?: string | null;
  gameStarted?: string | null;
  gameEnded?: string | null;
  liveGameChatRoomID?: string | null;
  livegamechatroom?: LiveGameChatRoom | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type LiveGameChatRoom = {
  __typename: "LiveGameChatRoom";
  id: string;
  sport?: string | null;
  sportsGameID?: string | null;
  sportsgame?: SportsGame | null;
  chatsID?: string | null;
  chats?: ModelChatsConnection | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ModelChatsConnection = {
  __typename: "ModelChatsConnection";
  items: Array<Chats | null>;
  nextToken?: string | null;
};

export type Chats = {
  __typename: "Chats";
  id: string;
  sortKey?: string | null;
  usernameID?: string | null;
  username?: Username | null;
  profileID?: string | null;
  profile?: Profile | null;
  chat?: string | null;
  timePosted?: string | null;
  likes?: ModelChatLikesConnection | null;
  liveGameChatRoomID: string;
  livegamechatroom?: LiveGameChatRoom | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ModelChatLikesConnection = {
  __typename: "ModelChatLikesConnection";
  items: Array<ChatLikes | null>;
  nextToken?: string | null;
};

export type ChatLikes = {
  __typename: "ChatLikes";
  id: string;
  usernameID?: string | null;
  username?: Username | null;
  profileID?: string | null;
  profile?: Profile | null;
  createdAt: string;
  updatedAt: string;
  chatsLikesId?: string | null;
  owner?: string | null;
};

export type UpdateSportsGameInput = {
  id: string;
  sport?: string | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
  gameStatus?: string | null;
  homeTeamWins?: string | null;
  homeTeamLosses?: string | null;
  awayTeamWins?: string | null;
  awayTeamLosses?: string | null;
  basicGameInfo?: string | null;
  startTime?: string | null;
  lastUpdate?: string | null;
  gameStarted?: string | null;
  gameEnded?: string | null;
  liveGameChatRoomID?: string | null;
};

export type DeleteSportsGameInput = {
  id: string;
};

export type CreateLiveGameChatRoomInput = {
  id?: string | null;
  sport?: string | null;
  sportsGameID?: string | null;
  chatsID?: string | null;
};

export type ModelLiveGameChatRoomConditionInput = {
  sport?: ModelStringInput | null;
  sportsGameID?: ModelIDInput | null;
  chatsID?: ModelIDInput | null;
  and?: Array<ModelLiveGameChatRoomConditionInput | null> | null;
  or?: Array<ModelLiveGameChatRoomConditionInput | null> | null;
  not?: ModelLiveGameChatRoomConditionInput | null;
};

export type UpdateLiveGameChatRoomInput = {
  id: string;
  sport?: string | null;
  sportsGameID?: string | null;
  chatsID?: string | null;
};

export type DeleteLiveGameChatRoomInput = {
  id: string;
};

export type CreateHubPostsInput = {
  id?: string | null;
  sortKey?: string | null;
  postType?: string | null;
  timePosted?: string | null;
  sportsGameID?: string | null;
};

export type ModelHubPostsConditionInput = {
  sortKey?: ModelStringInput | null;
  postType?: ModelStringInput | null;
  timePosted?: ModelStringInput | null;
  sportsGameID?: ModelIDInput | null;
  and?: Array<ModelHubPostsConditionInput | null> | null;
  or?: Array<ModelHubPostsConditionInput | null> | null;
  not?: ModelHubPostsConditionInput | null;
};

export type HubPosts = {
  __typename: "HubPosts";
  id: string;
  sortKey?: string | null;
  postType?: string | null;
  timePosted?: string | null;
  sportsGameID?: string | null;
  sportsgame?: SportsGame | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateHubPostsInput = {
  id: string;
  sortKey?: string | null;
  postType?: string | null;
  timePosted?: string | null;
  sportsGameID?: string | null;
};

export type DeleteHubPostsInput = {
  id: string;
};

export type CreateChatsInput = {
  id?: string | null;
  sortKey?: string | null;
  usernameID?: string | null;
  profileID?: string | null;
  chat?: string | null;
  timePosted?: string | null;
  liveGameChatRoomID: string;
};

export type ModelChatsConditionInput = {
  sortKey?: ModelStringInput | null;
  usernameID?: ModelIDInput | null;
  profileID?: ModelIDInput | null;
  chat?: ModelStringInput | null;
  timePosted?: ModelStringInput | null;
  liveGameChatRoomID?: ModelIDInput | null;
  and?: Array<ModelChatsConditionInput | null> | null;
  or?: Array<ModelChatsConditionInput | null> | null;
  not?: ModelChatsConditionInput | null;
};

export type UpdateChatsInput = {
  id: string;
  sortKey?: string | null;
  usernameID?: string | null;
  profileID?: string | null;
  chat?: string | null;
  timePosted?: string | null;
  liveGameChatRoomID?: string | null;
};

export type DeleteChatsInput = {
  id: string;
};

export type CreateChatLikesInput = {
  id?: string | null;
  usernameID?: string | null;
  profileID?: string | null;
  chatsLikesId?: string | null;
};

export type ModelChatLikesConditionInput = {
  usernameID?: ModelIDInput | null;
  profileID?: ModelIDInput | null;
  and?: Array<ModelChatLikesConditionInput | null> | null;
  or?: Array<ModelChatLikesConditionInput | null> | null;
  not?: ModelChatLikesConditionInput | null;
  chatsLikesId?: ModelIDInput | null;
};

export type UpdateChatLikesInput = {
  id: string;
  usernameID?: string | null;
  profileID?: string | null;
  chatsLikesId?: string | null;
};

export type DeleteChatLikesInput = {
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

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

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

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
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

export type ModelSportsGameFilterInput = {
  id?: ModelIDInput | null;
  sport?: ModelStringInput | null;
  homeTeam?: ModelStringInput | null;
  awayTeam?: ModelStringInput | null;
  gameStatus?: ModelStringInput | null;
  homeTeamWins?: ModelStringInput | null;
  homeTeamLosses?: ModelStringInput | null;
  awayTeamWins?: ModelStringInput | null;
  awayTeamLosses?: ModelStringInput | null;
  basicGameInfo?: ModelStringInput | null;
  startTime?: ModelStringInput | null;
  lastUpdate?: ModelStringInput | null;
  gameStarted?: ModelStringInput | null;
  gameEnded?: ModelStringInput | null;
  liveGameChatRoomID?: ModelIDInput | null;
  and?: Array<ModelSportsGameFilterInput | null> | null;
  or?: Array<ModelSportsGameFilterInput | null> | null;
  not?: ModelSportsGameFilterInput | null;
};

export type ModelSportsGameConnection = {
  __typename: "ModelSportsGameConnection";
  items: Array<SportsGame | null>;
  nextToken?: string | null;
};

export type ModelLiveGameChatRoomFilterInput = {
  id?: ModelIDInput | null;
  sport?: ModelStringInput | null;
  sportsGameID?: ModelIDInput | null;
  chatsID?: ModelIDInput | null;
  and?: Array<ModelLiveGameChatRoomFilterInput | null> | null;
  or?: Array<ModelLiveGameChatRoomFilterInput | null> | null;
  not?: ModelLiveGameChatRoomFilterInput | null;
};

export type ModelLiveGameChatRoomConnection = {
  __typename: "ModelLiveGameChatRoomConnection";
  items: Array<LiveGameChatRoom | null>;
  nextToken?: string | null;
};

export type ModelHubPostsFilterInput = {
  id?: ModelIDInput | null;
  sortKey?: ModelStringInput | null;
  postType?: ModelStringInput | null;
  timePosted?: ModelStringInput | null;
  sportsGameID?: ModelIDInput | null;
  and?: Array<ModelHubPostsFilterInput | null> | null;
  or?: Array<ModelHubPostsFilterInput | null> | null;
  not?: ModelHubPostsFilterInput | null;
};

export type ModelHubPostsConnection = {
  __typename: "ModelHubPostsConnection";
  items: Array<HubPosts | null>;
  nextToken?: string | null;
};

export type ModelChatsFilterInput = {
  id?: ModelIDInput | null;
  sortKey?: ModelStringInput | null;
  usernameID?: ModelIDInput | null;
  profileID?: ModelIDInput | null;
  chat?: ModelStringInput | null;
  timePosted?: ModelStringInput | null;
  liveGameChatRoomID?: ModelIDInput | null;
  and?: Array<ModelChatsFilterInput | null> | null;
  or?: Array<ModelChatsFilterInput | null> | null;
  not?: ModelChatsFilterInput | null;
};

export type ModelChatLikesFilterInput = {
  id?: ModelIDInput | null;
  usernameID?: ModelIDInput | null;
  profileID?: ModelIDInput | null;
  and?: Array<ModelChatLikesFilterInput | null> | null;
  or?: Array<ModelChatLikesFilterInput | null> | null;
  not?: ModelChatLikesFilterInput | null;
  chatsLikesId?: ModelIDInput | null;
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

export type ModelSubscriptionSportsGameFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  sport?: ModelSubscriptionStringInput | null;
  homeTeam?: ModelSubscriptionStringInput | null;
  awayTeam?: ModelSubscriptionStringInput | null;
  gameStatus?: ModelSubscriptionStringInput | null;
  homeTeamWins?: ModelSubscriptionStringInput | null;
  homeTeamLosses?: ModelSubscriptionStringInput | null;
  awayTeamWins?: ModelSubscriptionStringInput | null;
  awayTeamLosses?: ModelSubscriptionStringInput | null;
  basicGameInfo?: ModelSubscriptionStringInput | null;
  startTime?: ModelSubscriptionStringInput | null;
  lastUpdate?: ModelSubscriptionStringInput | null;
  gameStarted?: ModelSubscriptionStringInput | null;
  gameEnded?: ModelSubscriptionStringInput | null;
  liveGameChatRoomID?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionSportsGameFilterInput | null> | null;
  or?: Array<ModelSubscriptionSportsGameFilterInput | null> | null;
};

export type ModelSubscriptionLiveGameChatRoomFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  sport?: ModelSubscriptionStringInput | null;
  sportsGameID?: ModelSubscriptionIDInput | null;
  chatsID?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionLiveGameChatRoomFilterInput | null> | null;
  or?: Array<ModelSubscriptionLiveGameChatRoomFilterInput | null> | null;
};

export type ModelSubscriptionHubPostsFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  sortKey?: ModelSubscriptionStringInput | null;
  postType?: ModelSubscriptionStringInput | null;
  timePosted?: ModelSubscriptionStringInput | null;
  sportsGameID?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionHubPostsFilterInput | null> | null;
  or?: Array<ModelSubscriptionHubPostsFilterInput | null> | null;
};

export type ModelSubscriptionChatsFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  sortKey?: ModelSubscriptionStringInput | null;
  usernameID?: ModelSubscriptionIDInput | null;
  profileID?: ModelSubscriptionIDInput | null;
  chat?: ModelSubscriptionStringInput | null;
  timePosted?: ModelSubscriptionStringInput | null;
  liveGameChatRoomID?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionChatsFilterInput | null> | null;
  or?: Array<ModelSubscriptionChatsFilterInput | null> | null;
};

export type ModelSubscriptionChatLikesFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  usernameID?: ModelSubscriptionIDInput | null;
  profileID?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionChatLikesFilterInput | null> | null;
  or?: Array<ModelSubscriptionChatLikesFilterInput | null> | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
    owner?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
    owner?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
    owner?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
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
  owner?: string | null;
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
  owner?: string | null;
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
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
  owner?: string | null;
};

export type CreateSportsGameMutation = {
  __typename: "SportsGame";
  id: string;
  sport?: string | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
  gameStatus?: string | null;
  homeTeamWins?: string | null;
  homeTeamLosses?: string | null;
  awayTeamWins?: string | null;
  awayTeamLosses?: string | null;
  basicGameInfo?: string | null;
  startTime?: string | null;
  lastUpdate?: string | null;
  gameStarted?: string | null;
  gameEnded?: string | null;
  liveGameChatRoomID?: string | null;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateSportsGameMutation = {
  __typename: "SportsGame";
  id: string;
  sport?: string | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
  gameStatus?: string | null;
  homeTeamWins?: string | null;
  homeTeamLosses?: string | null;
  awayTeamWins?: string | null;
  awayTeamLosses?: string | null;
  basicGameInfo?: string | null;
  startTime?: string | null;
  lastUpdate?: string | null;
  gameStarted?: string | null;
  gameEnded?: string | null;
  liveGameChatRoomID?: string | null;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteSportsGameMutation = {
  __typename: "SportsGame";
  id: string;
  sport?: string | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
  gameStatus?: string | null;
  homeTeamWins?: string | null;
  homeTeamLosses?: string | null;
  awayTeamWins?: string | null;
  awayTeamLosses?: string | null;
  basicGameInfo?: string | null;
  startTime?: string | null;
  lastUpdate?: string | null;
  gameStarted?: string | null;
  gameEnded?: string | null;
  liveGameChatRoomID?: string | null;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type CreateLiveGameChatRoomMutation = {
  __typename: "LiveGameChatRoom";
  id: string;
  sport?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  chatsID?: string | null;
  chats?: {
    __typename: "ModelChatsConnection";
    items: Array<{
      __typename: "Chats";
      id: string;
      sortKey?: string | null;
      usernameID?: string | null;
      profileID?: string | null;
      chat?: string | null;
      timePosted?: string | null;
      liveGameChatRoomID: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateLiveGameChatRoomMutation = {
  __typename: "LiveGameChatRoom";
  id: string;
  sport?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  chatsID?: string | null;
  chats?: {
    __typename: "ModelChatsConnection";
    items: Array<{
      __typename: "Chats";
      id: string;
      sortKey?: string | null;
      usernameID?: string | null;
      profileID?: string | null;
      chat?: string | null;
      timePosted?: string | null;
      liveGameChatRoomID: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteLiveGameChatRoomMutation = {
  __typename: "LiveGameChatRoom";
  id: string;
  sport?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  chatsID?: string | null;
  chats?: {
    __typename: "ModelChatsConnection";
    items: Array<{
      __typename: "Chats";
      id: string;
      sortKey?: string | null;
      usernameID?: string | null;
      profileID?: string | null;
      chat?: string | null;
      timePosted?: string | null;
      liveGameChatRoomID: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type CreateHubPostsMutation = {
  __typename: "HubPosts";
  id: string;
  sortKey?: string | null;
  postType?: string | null;
  timePosted?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateHubPostsMutation = {
  __typename: "HubPosts";
  id: string;
  sortKey?: string | null;
  postType?: string | null;
  timePosted?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteHubPostsMutation = {
  __typename: "HubPosts";
  id: string;
  sortKey?: string | null;
  postType?: string | null;
  timePosted?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type CreateChatsMutation = {
  __typename: "Chats";
  id: string;
  sortKey?: string | null;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  chat?: string | null;
  timePosted?: string | null;
  likes?: {
    __typename: "ModelChatLikesConnection";
    items: Array<{
      __typename: "ChatLikes";
      id: string;
      usernameID?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      chatsLikesId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  liveGameChatRoomID: string;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateChatsMutation = {
  __typename: "Chats";
  id: string;
  sortKey?: string | null;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  chat?: string | null;
  timePosted?: string | null;
  likes?: {
    __typename: "ModelChatLikesConnection";
    items: Array<{
      __typename: "ChatLikes";
      id: string;
      usernameID?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      chatsLikesId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  liveGameChatRoomID: string;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type DeleteChatsMutation = {
  __typename: "Chats";
  id: string;
  sortKey?: string | null;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  chat?: string | null;
  timePosted?: string | null;
  likes?: {
    __typename: "ModelChatLikesConnection";
    items: Array<{
      __typename: "ChatLikes";
      id: string;
      usernameID?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      chatsLikesId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  liveGameChatRoomID: string;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type CreateChatLikesMutation = {
  __typename: "ChatLikes";
  id: string;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatsLikesId?: string | null;
  owner?: string | null;
};

export type UpdateChatLikesMutation = {
  __typename: "ChatLikes";
  id: string;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatsLikesId?: string | null;
  owner?: string | null;
};

export type DeleteChatLikesMutation = {
  __typename: "ChatLikes";
  id: string;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatsLikesId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
    owner?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
  owner?: string | null;
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
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type GetSportsGameQuery = {
  __typename: "SportsGame";
  id: string;
  sport?: string | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
  gameStatus?: string | null;
  homeTeamWins?: string | null;
  homeTeamLosses?: string | null;
  awayTeamWins?: string | null;
  awayTeamLosses?: string | null;
  basicGameInfo?: string | null;
  startTime?: string | null;
  lastUpdate?: string | null;
  gameStarted?: string | null;
  gameEnded?: string | null;
  liveGameChatRoomID?: string | null;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListSportsGamesQuery = {
  __typename: "ModelSportsGameConnection";
  items: Array<{
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type SportsGamesBySportAndStartTimeQuery = {
  __typename: "ModelSportsGameConnection";
  items: Array<{
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type SportsGamesByLiveGameChatRoomIDQuery = {
  __typename: "ModelSportsGameConnection";
  items: Array<{
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type GetLiveGameChatRoomQuery = {
  __typename: "LiveGameChatRoom";
  id: string;
  sport?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  chatsID?: string | null;
  chats?: {
    __typename: "ModelChatsConnection";
    items: Array<{
      __typename: "Chats";
      id: string;
      sortKey?: string | null;
      usernameID?: string | null;
      profileID?: string | null;
      chat?: string | null;
      timePosted?: string | null;
      liveGameChatRoomID: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListLiveGameChatRoomsQuery = {
  __typename: "ModelLiveGameChatRoomConnection";
  items: Array<{
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type GetHubPostsQuery = {
  __typename: "HubPosts";
  id: string;
  sortKey?: string | null;
  postType?: string | null;
  timePosted?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListHubPostsQuery = {
  __typename: "ModelHubPostsConnection";
  items: Array<{
    __typename: "HubPosts";
    id: string;
    sortKey?: string | null;
    postType?: string | null;
    timePosted?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type HubPostsBySortKeyAndTimePostedQuery = {
  __typename: "ModelHubPostsConnection";
  items: Array<{
    __typename: "HubPosts";
    id: string;
    sortKey?: string | null;
    postType?: string | null;
    timePosted?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type GetChatsQuery = {
  __typename: "Chats";
  id: string;
  sortKey?: string | null;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  chat?: string | null;
  timePosted?: string | null;
  likes?: {
    __typename: "ModelChatLikesConnection";
    items: Array<{
      __typename: "ChatLikes";
      id: string;
      usernameID?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      chatsLikesId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  liveGameChatRoomID: string;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type ListChatsQuery = {
  __typename: "ModelChatsConnection";
  items: Array<{
    __typename: "Chats";
    id: string;
    sortKey?: string | null;
    usernameID?: string | null;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
      owner?: string | null;
    } | null;
    profileID?: string | null;
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
      owner?: string | null;
    } | null;
    chat?: string | null;
    timePosted?: string | null;
    likes?: {
      __typename: "ModelChatLikesConnection";
      nextToken?: string | null;
    } | null;
    liveGameChatRoomID: string;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type ChatsBySortKeyAndTimePostedQuery = {
  __typename: "ModelChatsConnection";
  items: Array<{
    __typename: "Chats";
    id: string;
    sortKey?: string | null;
    usernameID?: string | null;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
      owner?: string | null;
    } | null;
    profileID?: string | null;
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
      owner?: string | null;
    } | null;
    chat?: string | null;
    timePosted?: string | null;
    likes?: {
      __typename: "ModelChatLikesConnection";
      nextToken?: string | null;
    } | null;
    liveGameChatRoomID: string;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type ChatsByLiveGameChatRoomIDQuery = {
  __typename: "ModelChatsConnection";
  items: Array<{
    __typename: "Chats";
    id: string;
    sortKey?: string | null;
    usernameID?: string | null;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
      owner?: string | null;
    } | null;
    profileID?: string | null;
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
      owner?: string | null;
    } | null;
    chat?: string | null;
    timePosted?: string | null;
    likes?: {
      __typename: "ModelChatLikesConnection";
      nextToken?: string | null;
    } | null;
    liveGameChatRoomID: string;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null>;
  nextToken?: string | null;
};

export type GetChatLikesQuery = {
  __typename: "ChatLikes";
  id: string;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatsLikesId?: string | null;
  owner?: string | null;
};

export type ListChatLikesQuery = {
  __typename: "ModelChatLikesConnection";
  items: Array<{
    __typename: "ChatLikes";
    id: string;
    usernameID?: string | null;
    username?: {
      __typename: "Username";
      id: string;
      username?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      usernameImagePostsId?: string | null;
      usernameProfileId?: string | null;
      owner?: string | null;
    } | null;
    profileID?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    chatsLikesId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
  createdAt: string;
  updatedAt: string;
  profilePictureProfileId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
    owner?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
    owner?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
    } | null;
    profileID?: string | null;
    createdAt: string;
    updatedAt: string;
    profilePictureProfileId?: string | null;
    owner?: string | null;
  } | null;
  bio?: string | null;
  birthday?: string | null;
  createdAt: string;
  updatedAt: string;
  profileUsernameId?: string | null;
  profileImagePostsId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  s3_key?: string | null;
  mediaSourceMobile?: string | null;
  mediaSourceDesktop?: string | null;
  downloadableVideo?: string | null;
  posterImage?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
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
  owner?: string | null;
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
  owner?: string | null;
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
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
  owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    s3_key?: string | null;
    mediaSourceMobile?: string | null;
    mediaSourceDesktop?: string | null;
    downloadableVideo?: string | null;
    posterImage?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  usernameImagePostsId?: string | null;
  usernameProfileId?: string | null;
  owner?: string | null;
};

export type OnCreateSportsGameSubscription = {
  __typename: "SportsGame";
  id: string;
  sport?: string | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
  gameStatus?: string | null;
  homeTeamWins?: string | null;
  homeTeamLosses?: string | null;
  awayTeamWins?: string | null;
  awayTeamLosses?: string | null;
  basicGameInfo?: string | null;
  startTime?: string | null;
  lastUpdate?: string | null;
  gameStarted?: string | null;
  gameEnded?: string | null;
  liveGameChatRoomID?: string | null;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateSportsGameSubscription = {
  __typename: "SportsGame";
  id: string;
  sport?: string | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
  gameStatus?: string | null;
  homeTeamWins?: string | null;
  homeTeamLosses?: string | null;
  awayTeamWins?: string | null;
  awayTeamLosses?: string | null;
  basicGameInfo?: string | null;
  startTime?: string | null;
  lastUpdate?: string | null;
  gameStarted?: string | null;
  gameEnded?: string | null;
  liveGameChatRoomID?: string | null;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteSportsGameSubscription = {
  __typename: "SportsGame";
  id: string;
  sport?: string | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
  gameStatus?: string | null;
  homeTeamWins?: string | null;
  homeTeamLosses?: string | null;
  awayTeamWins?: string | null;
  awayTeamLosses?: string | null;
  basicGameInfo?: string | null;
  startTime?: string | null;
  lastUpdate?: string | null;
  gameStarted?: string | null;
  gameEnded?: string | null;
  liveGameChatRoomID?: string | null;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnCreateLiveGameChatRoomSubscription = {
  __typename: "LiveGameChatRoom";
  id: string;
  sport?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  chatsID?: string | null;
  chats?: {
    __typename: "ModelChatsConnection";
    items: Array<{
      __typename: "Chats";
      id: string;
      sortKey?: string | null;
      usernameID?: string | null;
      profileID?: string | null;
      chat?: string | null;
      timePosted?: string | null;
      liveGameChatRoomID: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateLiveGameChatRoomSubscription = {
  __typename: "LiveGameChatRoom";
  id: string;
  sport?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  chatsID?: string | null;
  chats?: {
    __typename: "ModelChatsConnection";
    items: Array<{
      __typename: "Chats";
      id: string;
      sortKey?: string | null;
      usernameID?: string | null;
      profileID?: string | null;
      chat?: string | null;
      timePosted?: string | null;
      liveGameChatRoomID: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteLiveGameChatRoomSubscription = {
  __typename: "LiveGameChatRoom";
  id: string;
  sport?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  chatsID?: string | null;
  chats?: {
    __typename: "ModelChatsConnection";
    items: Array<{
      __typename: "Chats";
      id: string;
      sortKey?: string | null;
      usernameID?: string | null;
      profileID?: string | null;
      chat?: string | null;
      timePosted?: string | null;
      liveGameChatRoomID: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnCreateHubPostsSubscription = {
  __typename: "HubPosts";
  id: string;
  sortKey?: string | null;
  postType?: string | null;
  timePosted?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateHubPostsSubscription = {
  __typename: "HubPosts";
  id: string;
  sortKey?: string | null;
  postType?: string | null;
  timePosted?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteHubPostsSubscription = {
  __typename: "HubPosts";
  id: string;
  sortKey?: string | null;
  postType?: string | null;
  timePosted?: string | null;
  sportsGameID?: string | null;
  sportsgame?: {
    __typename: "SportsGame";
    id: string;
    sport?: string | null;
    homeTeam?: string | null;
    awayTeam?: string | null;
    gameStatus?: string | null;
    homeTeamWins?: string | null;
    homeTeamLosses?: string | null;
    awayTeamWins?: string | null;
    awayTeamLosses?: string | null;
    basicGameInfo?: string | null;
    startTime?: string | null;
    lastUpdate?: string | null;
    gameStarted?: string | null;
    gameEnded?: string | null;
    liveGameChatRoomID?: string | null;
    livegamechatroom?: {
      __typename: "LiveGameChatRoom";
      id: string;
      sport?: string | null;
      sportsGameID?: string | null;
      chatsID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnCreateChatsSubscription = {
  __typename: "Chats";
  id: string;
  sortKey?: string | null;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  chat?: string | null;
  timePosted?: string | null;
  likes?: {
    __typename: "ModelChatLikesConnection";
    items: Array<{
      __typename: "ChatLikes";
      id: string;
      usernameID?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      chatsLikesId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  liveGameChatRoomID: string;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnUpdateChatsSubscription = {
  __typename: "Chats";
  id: string;
  sortKey?: string | null;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  chat?: string | null;
  timePosted?: string | null;
  likes?: {
    __typename: "ModelChatLikesConnection";
    items: Array<{
      __typename: "ChatLikes";
      id: string;
      usernameID?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      chatsLikesId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  liveGameChatRoomID: string;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnDeleteChatsSubscription = {
  __typename: "Chats";
  id: string;
  sortKey?: string | null;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  chat?: string | null;
  timePosted?: string | null;
  likes?: {
    __typename: "ModelChatLikesConnection";
    items: Array<{
      __typename: "ChatLikes";
      id: string;
      usernameID?: string | null;
      profileID?: string | null;
      createdAt: string;
      updatedAt: string;
      chatsLikesId?: string | null;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
  liveGameChatRoomID: string;
  livegamechatroom?: {
    __typename: "LiveGameChatRoom";
    id: string;
    sport?: string | null;
    sportsGameID?: string | null;
    sportsgame?: {
      __typename: "SportsGame";
      id: string;
      sport?: string | null;
      homeTeam?: string | null;
      awayTeam?: string | null;
      gameStatus?: string | null;
      homeTeamWins?: string | null;
      homeTeamLosses?: string | null;
      awayTeamWins?: string | null;
      awayTeamLosses?: string | null;
      basicGameInfo?: string | null;
      startTime?: string | null;
      lastUpdate?: string | null;
      gameStarted?: string | null;
      gameEnded?: string | null;
      liveGameChatRoomID?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null;
    chatsID?: string | null;
    chats?: {
      __typename: "ModelChatsConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type OnCreateChatLikesSubscription = {
  __typename: "ChatLikes";
  id: string;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatsLikesId?: string | null;
  owner?: string | null;
};

export type OnUpdateChatLikesSubscription = {
  __typename: "ChatLikes";
  id: string;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatsLikesId?: string | null;
  owner?: string | null;
};

export type OnDeleteChatLikesSubscription = {
  __typename: "ChatLikes";
  id: string;
  usernameID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    usernameImagePostsId?: string | null;
    usernameProfileId?: string | null;
    owner?: string | null;
  } | null;
  profileID?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
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
      owner?: string | null;
    } | null;
    bio?: string | null;
    birthday?: string | null;
    createdAt: string;
    updatedAt: string;
    profileUsernameId?: string | null;
    profileImagePostsId?: string | null;
    owner?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  chatsLikesId?: string | null;
  owner?: string | null;
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
      values.profilePic = await this.checkForProfilePhoto(await (await this.GetProfilePictureProfileID(await (await this.GetUsername(values.usernameID))?.profileID)))
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
            mediaSource
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
        mediaSource
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
        mediaSource: array.mediaSource,
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
        profilePicture: array.profile.profilepicture.imageurl
      })
    } else {
      this.finalArray.push({
        mediaSource: await Storage.get(array.s3_key, { bucket: "fetadevvodservice-dev-output-nk0sepbg" }),
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
        profilePicture: array.profile.profilepicture.imageurl
      })
    }
    this.finalArray = this.finalArray[0]
    return [1, this.finalArray];
  }


  sortByDate(array) {
    console.log(array)
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
          mediaSource
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
          mediaSource: posts.mediaSource,
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          profileID
          createdAt
          updatedAt
          profilePictureProfileId
          owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          profileID
          createdAt
          updatedAt
          profilePictureProfileId
          owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          profileID
          createdAt
          updatedAt
          profilePictureProfileId
          owner
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
            }
            profileID
            createdAt
            updatedAt
            profilePictureProfileId
            owner
          }
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
          owner
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
            }
            profileID
            createdAt
            updatedAt
            profilePictureProfileId
            owner
          }
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
          owner
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
            }
            profileID
            createdAt
            updatedAt
            profilePictureProfileId
            owner
          }
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
          owner
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
          owner
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
          owner
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
          owner
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
          owner
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
          owner
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
          owner
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
          owner
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
          owner
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
          owner
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
  async CreateSportsGame(
    input: CreateSportsGameInput,
    condition?: ModelSportsGameConditionInput
  ): Promise<CreateSportsGameMutation> {
    const statement = `mutation CreateSportsGame($input: CreateSportsGameInput!, $condition: ModelSportsGameConditionInput) {
        createSportsGame(input: $input, condition: $condition) {
          __typename
          id
          sport
          homeTeam
          awayTeam
          gameStatus
          homeTeamWins
          homeTeamLosses
          awayTeamWins
          awayTeamLosses
          basicGameInfo
          startTime
          lastUpdate
          gameStarted
          gameEnded
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
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
    return <CreateSportsGameMutation>response.data.createSportsGame;
  }
  async UpdateSportsGame(
    input: UpdateSportsGameInput,
    condition?: ModelSportsGameConditionInput
  ): Promise<UpdateSportsGameMutation> {
    const statement = `mutation UpdateSportsGame($input: UpdateSportsGameInput!, $condition: ModelSportsGameConditionInput) {
        updateSportsGame(input: $input, condition: $condition) {
          __typename
          id
          sport
          homeTeam
          awayTeam
          gameStatus
          homeTeamWins
          homeTeamLosses
          awayTeamWins
          awayTeamLosses
          basicGameInfo
          startTime
          lastUpdate
          gameStarted
          gameEnded
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
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
    return <UpdateSportsGameMutation>response.data.updateSportsGame;
  }
  async DeleteSportsGame(
    input: DeleteSportsGameInput,
    condition?: ModelSportsGameConditionInput
  ): Promise<DeleteSportsGameMutation> {
    const statement = `mutation DeleteSportsGame($input: DeleteSportsGameInput!, $condition: ModelSportsGameConditionInput) {
        deleteSportsGame(input: $input, condition: $condition) {
          __typename
          id
          sport
          homeTeam
          awayTeam
          gameStatus
          homeTeamWins
          homeTeamLosses
          awayTeamWins
          awayTeamLosses
          basicGameInfo
          startTime
          lastUpdate
          gameStarted
          gameEnded
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
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
    return <DeleteSportsGameMutation>response.data.deleteSportsGame;
  }
  async CreateLiveGameChatRoom(
    input: CreateLiveGameChatRoomInput,
    condition?: ModelLiveGameChatRoomConditionInput
  ): Promise<CreateLiveGameChatRoomMutation> {
    const statement = `mutation CreateLiveGameChatRoom($input: CreateLiveGameChatRoomInput!, $condition: ModelLiveGameChatRoomConditionInput) {
        createLiveGameChatRoom(input: $input, condition: $condition) {
          __typename
          id
          sport
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          chatsID
          chats {
            __typename
            items {
              __typename
              id
              sortKey
              usernameID
              profileID
              chat
              timePosted
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
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
    return <CreateLiveGameChatRoomMutation>response.data.createLiveGameChatRoom;
  }
  async UpdateLiveGameChatRoom(
    input: UpdateLiveGameChatRoomInput,
    condition?: ModelLiveGameChatRoomConditionInput
  ): Promise<UpdateLiveGameChatRoomMutation> {
    const statement = `mutation UpdateLiveGameChatRoom($input: UpdateLiveGameChatRoomInput!, $condition: ModelLiveGameChatRoomConditionInput) {
        updateLiveGameChatRoom(input: $input, condition: $condition) {
          __typename
          id
          sport
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          chatsID
          chats {
            __typename
            items {
              __typename
              id
              sortKey
              usernameID
              profileID
              chat
              timePosted
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
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
    return <UpdateLiveGameChatRoomMutation>response.data.updateLiveGameChatRoom;
  }
  async DeleteLiveGameChatRoom(
    input: DeleteLiveGameChatRoomInput,
    condition?: ModelLiveGameChatRoomConditionInput
  ): Promise<DeleteLiveGameChatRoomMutation> {
    const statement = `mutation DeleteLiveGameChatRoom($input: DeleteLiveGameChatRoomInput!, $condition: ModelLiveGameChatRoomConditionInput) {
        deleteLiveGameChatRoom(input: $input, condition: $condition) {
          __typename
          id
          sport
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          chatsID
          chats {
            __typename
            items {
              __typename
              id
              sortKey
              usernameID
              profileID
              chat
              timePosted
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
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
    return <DeleteLiveGameChatRoomMutation>response.data.deleteLiveGameChatRoom;
  }
  async CreateHubPosts(
    input: CreateHubPostsInput,
    condition?: ModelHubPostsConditionInput
  ): Promise<CreateHubPostsMutation> {
    const statement = `mutation CreateHubPosts($input: CreateHubPostsInput!, $condition: ModelHubPostsConditionInput) {
        createHubPosts(input: $input, condition: $condition) {
          __typename
          id
          sortKey
          postType
          timePosted
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
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
    return <CreateHubPostsMutation>response.data.createHubPosts;
  }
  async UpdateHubPosts(
    input: UpdateHubPostsInput,
    condition?: ModelHubPostsConditionInput
  ): Promise<UpdateHubPostsMutation> {
    const statement = `mutation UpdateHubPosts($input: UpdateHubPostsInput!, $condition: ModelHubPostsConditionInput) {
        updateHubPosts(input: $input, condition: $condition) {
          __typename
          id
          sortKey
          postType
          timePosted
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
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
    return <UpdateHubPostsMutation>response.data.updateHubPosts;
  }
  async DeleteHubPosts(
    input: DeleteHubPostsInput,
    condition?: ModelHubPostsConditionInput
  ): Promise<DeleteHubPostsMutation> {
    const statement = `mutation DeleteHubPosts($input: DeleteHubPostsInput!, $condition: ModelHubPostsConditionInput) {
        deleteHubPosts(input: $input, condition: $condition) {
          __typename
          id
          sortKey
          postType
          timePosted
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
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
    return <DeleteHubPostsMutation>response.data.deleteHubPosts;
  }
  async CreateChats(
    input: CreateChatsInput,
    condition?: ModelChatsConditionInput
  ): Promise<CreateChatsMutation> {
    const statement = `mutation CreateChats($input: CreateChatsInput!, $condition: ModelChatsConditionInput) {
        createChats(input: $input, condition: $condition) {
          __typename
          id
          sortKey
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          chat
          timePosted
          likes {
            __typename
            items {
              __typename
              id
              usernameID
              profileID
              createdAt
              updatedAt
              chatsLikesId
              owner
            }
            nextToken
          }
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
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
    return <CreateChatsMutation>response.data.createChats;
  }
  async UpdateChats(
    input: UpdateChatsInput,
    condition?: ModelChatsConditionInput
  ): Promise<UpdateChatsMutation> {
    const statement = `mutation UpdateChats($input: UpdateChatsInput!, $condition: ModelChatsConditionInput) {
        updateChats(input: $input, condition: $condition) {
          __typename
          id
          sortKey
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          chat
          timePosted
          likes {
            __typename
            items {
              __typename
              id
              usernameID
              profileID
              createdAt
              updatedAt
              chatsLikesId
              owner
            }
            nextToken
          }
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
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
    return <UpdateChatsMutation>response.data.updateChats;
  }
  async DeleteChats(
    input: DeleteChatsInput,
    condition?: ModelChatsConditionInput
  ): Promise<DeleteChatsMutation> {
    const statement = `mutation DeleteChats($input: DeleteChatsInput!, $condition: ModelChatsConditionInput) {
        deleteChats(input: $input, condition: $condition) {
          __typename
          id
          sortKey
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          chat
          timePosted
          likes {
            __typename
            items {
              __typename
              id
              usernameID
              profileID
              createdAt
              updatedAt
              chatsLikesId
              owner
            }
            nextToken
          }
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
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
    return <DeleteChatsMutation>response.data.deleteChats;
  }
  async CreateChatLikes(
    input: CreateChatLikesInput,
    condition?: ModelChatLikesConditionInput
  ): Promise<CreateChatLikesMutation> {
    const statement = `mutation CreateChatLikes($input: CreateChatLikesInput!, $condition: ModelChatLikesConditionInput) {
        createChatLikes(input: $input, condition: $condition) {
          __typename
          id
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          chatsLikesId
          owner
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
    return <CreateChatLikesMutation>response.data.createChatLikes;
  }
  async UpdateChatLikes(
    input: UpdateChatLikesInput,
    condition?: ModelChatLikesConditionInput
  ): Promise<UpdateChatLikesMutation> {
    const statement = `mutation UpdateChatLikes($input: UpdateChatLikesInput!, $condition: ModelChatLikesConditionInput) {
        updateChatLikes(input: $input, condition: $condition) {
          __typename
          id
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          chatsLikesId
          owner
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
    return <UpdateChatLikesMutation>response.data.updateChatLikes;
  }
  async DeleteChatLikes(
    input: DeleteChatLikesInput,
    condition?: ModelChatLikesConditionInput
  ): Promise<DeleteChatLikesMutation> {
    const statement = `mutation DeleteChatLikes($input: DeleteChatLikesInput!, $condition: ModelChatLikesConditionInput) {
        deleteChatLikes(input: $input, condition: $condition) {
          __typename
          id
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          chatsLikesId
          owner
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
    return <DeleteChatLikesMutation>response.data.deleteChatLikes;
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          profileID
          createdAt
          updatedAt
          profilePictureProfileId
          owner
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
              owner
            }
            profileID
            createdAt
            updatedAt
            profilePictureProfileId
            owner
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
            }
            profileID
            createdAt
            updatedAt
            profilePictureProfileId
            owner
          }
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
          owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
          owner
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
          owner
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
            owner
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
          owner
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
  async GetSportsGame(id: string): Promise<GetSportsGameQuery> {
    const statement = `query GetSportsGame($id: ID!) {
        getSportsGame(id: $id) {
          __typename
          id
          sport
          homeTeam
          awayTeam
          gameStatus
          homeTeamWins
          homeTeamLosses
          awayTeamWins
          awayTeamLosses
          basicGameInfo
          startTime
          lastUpdate
          gameStarted
          gameEnded
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetSportsGameQuery>response.data.getSportsGame;
  }
  async ListSportsGames(
    filter?: ModelSportsGameFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListSportsGamesQuery> {
    const statement = `query ListSportsGames($filter: ModelSportsGameFilterInput, $limit: Int, $nextToken: String) {
        listSportsGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
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
    return <ListSportsGamesQuery>response.data.listSportsGames;
  }
  async SportsGamesBySportAndStartTime(
    sport: string,
    startTime?: ModelStringKeyConditionInput,
    sortDirection?: ModelSortDirection,
    filter?: ModelSportsGameFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<SportsGamesBySportAndStartTimeQuery> {
    const statement = `query SportsGamesBySportAndStartTime($sport: String!, $startTime: ModelStringKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelSportsGameFilterInput, $limit: Int, $nextToken: String) {
        sportsGamesBySportAndStartTime(sport: $sport, startTime: $startTime, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      sport
    };
    if (startTime) {
      gqlAPIServiceArguments.startTime = startTime;
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
    return <SportsGamesBySportAndStartTimeQuery>(
      response.data.sportsGamesBySportAndStartTime
    );
  }
  async SportsGamesByLiveGameChatRoomID(
    liveGameChatRoomID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelSportsGameFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<SportsGamesByLiveGameChatRoomIDQuery> {
    const statement = `query SportsGamesByLiveGameChatRoomID($liveGameChatRoomID: ID!, $sortDirection: ModelSortDirection, $filter: ModelSportsGameFilterInput, $limit: Int, $nextToken: String) {
        sportsGamesByLiveGameChatRoomID(liveGameChatRoomID: $liveGameChatRoomID, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      liveGameChatRoomID
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
    return <SportsGamesByLiveGameChatRoomIDQuery>(
      response.data.sportsGamesByLiveGameChatRoomID
    );
  }
  async GetLiveGameChatRoom(id: string): Promise<GetLiveGameChatRoomQuery> {
    const statement = `query GetLiveGameChatRoom($id: ID!) {
        getLiveGameChatRoom(id: $id) {
          __typename
          id
          sport
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          chatsID
          chats {
            __typename
            items {
              __typename
              id
              sortKey
              usernameID
              profileID
              chat
              timePosted
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetLiveGameChatRoomQuery>response.data.getLiveGameChatRoom;
  }
  async ListLiveGameChatRooms(
    filter?: ModelLiveGameChatRoomFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListLiveGameChatRoomsQuery> {
    const statement = `query ListLiveGameChatRooms($filter: ModelLiveGameChatRoomFilterInput, $limit: Int, $nextToken: String) {
        listLiveGameChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
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
    return <ListLiveGameChatRoomsQuery>response.data.listLiveGameChatRooms;
  }
  async GetHubPosts(id: string): Promise<GetHubPostsQuery> {
    const statement = `query GetHubPosts($id: ID!) {
        getHubPosts(id: $id) {
          __typename
          id
          sortKey
          postType
          timePosted
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetHubPostsQuery>response.data.getHubPosts;
  }
  async ListHubPosts(
    filter?: ModelHubPostsFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListHubPostsQuery> {
    const statement = `query ListHubPosts($filter: ModelHubPostsFilterInput, $limit: Int, $nextToken: String) {
        listHubPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sortKey
            postType
            timePosted
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
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
    return <ListHubPostsQuery>response.data.listHubPosts;
  }
  async HubPostsBySortKeyAndTimePosted(
    sortKey: string,
    timePosted?: ModelStringKeyConditionInput,
    sortDirection?: ModelSortDirection,
    filter?: ModelHubPostsFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<HubPostsBySortKeyAndTimePostedQuery> {
    const statement = `query HubPostsBySortKeyAndTimePosted($sortKey: String!, $timePosted: ModelStringKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelHubPostsFilterInput, $limit: Int, $nextToken: String) {
        hubPostsBySortKeyAndTimePosted(sortKey: $sortKey, timePosted: $timePosted, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sortKey
            postType
            timePosted
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      sortKey
    };
    if (timePosted) {
      gqlAPIServiceArguments.timePosted = timePosted;
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
    return <HubPostsBySortKeyAndTimePostedQuery>(
      response.data.hubPostsBySortKeyAndTimePosted
    );
  }
  async GetChats(id: string): Promise<GetChatsQuery> {
    const statement = `query GetChats($id: ID!) {
        getChats(id: $id) {
          __typename
          id
          sortKey
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          chat
          timePosted
          likes {
            __typename
            items {
              __typename
              id
              usernameID
              profileID
              createdAt
              updatedAt
              chatsLikesId
              owner
            }
            nextToken
          }
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetChatsQuery>response.data.getChats;
  }
  async ListChats(
    filter?: ModelChatsFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListChatsQuery> {
    const statement = `query ListChats($filter: ModelChatsFilterInput, $limit: Int, $nextToken: String) {
        listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sortKey
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
              owner
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
              owner
            }
            chat
            timePosted
            likes {
              __typename
              nextToken
            }
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
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
    return <ListChatsQuery>response.data.listChats;
  }
  async ChatsBySortKeyAndTimePosted(
    sortKey: string,
    timePosted?: ModelStringKeyConditionInput,
    sortDirection?: ModelSortDirection,
    filter?: ModelChatsFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ChatsBySortKeyAndTimePostedQuery> {
    const statement = `query ChatsBySortKeyAndTimePosted($sortKey: String!, $timePosted: ModelStringKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelChatsFilterInput, $limit: Int, $nextToken: String) {
        chatsBySortKeyAndTimePosted(sortKey: $sortKey, timePosted: $timePosted, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sortKey
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
              owner
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
              owner
            }
            chat
            timePosted
            likes {
              __typename
              nextToken
            }
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      sortKey
    };
    if (timePosted) {
      gqlAPIServiceArguments.timePosted = timePosted;
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
    return <ChatsBySortKeyAndTimePostedQuery>(
      response.data.chatsBySortKeyAndTimePosted
    );
  }
  async ChatsByLiveGameChatRoomID(
    liveGameChatRoomID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelChatsFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ChatsByLiveGameChatRoomIDQuery> {
    const statement = `query ChatsByLiveGameChatRoomID($liveGameChatRoomID: ID!, $sortDirection: ModelSortDirection, $filter: ModelChatsFilterInput, $limit: Int, $nextToken: String) {
        chatsByLiveGameChatRoomID(liveGameChatRoomID: $liveGameChatRoomID, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            sortKey
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
              owner
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
              owner
            }
            chat
            timePosted
            likes {
              __typename
              nextToken
            }
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      liveGameChatRoomID
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
    return <ChatsByLiveGameChatRoomIDQuery>(
      response.data.chatsByLiveGameChatRoomID
    );
  }
  async GetChatLikes(id: string): Promise<GetChatLikesQuery> {
    const statement = `query GetChatLikes($id: ID!) {
        getChatLikes(id: $id) {
          __typename
          id
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          chatsLikesId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetChatLikesQuery>response.data.getChatLikes;
  }
  async ListChatLikes(
    filter?: ModelChatLikesFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListChatLikesQuery> {
    const statement = `query ListChatLikes($filter: ModelChatLikesFilterInput, $limit: Int, $nextToken: String) {
        listChatLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            chatsLikesId
            owner
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
    return <ListChatLikesQuery>response.data.listChatLikes;
  }
  OnCreateProfilePictureListener(
    filter?: ModelSubscriptionProfilePictureFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreateProfilePicture">
    >
  > {
    const statement = `subscription OnCreateProfilePicture($filter: ModelSubscriptionProfilePictureFilterInput, $owner: String) {
        onCreateProfilePicture(filter: $filter, owner: $owner) {
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          profileID
          createdAt
          updatedAt
          profilePictureProfileId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
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
    filter?: ModelSubscriptionProfilePictureFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdateProfilePicture">
    >
  > {
    const statement = `subscription OnUpdateProfilePicture($filter: ModelSubscriptionProfilePictureFilterInput, $owner: String) {
        onUpdateProfilePicture(filter: $filter, owner: $owner) {
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          profileID
          createdAt
          updatedAt
          profilePictureProfileId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
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
    filter?: ModelSubscriptionProfilePictureFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeleteProfilePicture">
    >
  > {
    const statement = `subscription OnDeleteProfilePicture($filter: ModelSubscriptionProfilePictureFilterInput, $owner: String) {
        onDeleteProfilePicture(filter: $filter, owner: $owner) {
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          profileID
          createdAt
          updatedAt
          profilePictureProfileId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
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
    filter?: ModelSubscriptionProfileFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateProfile">>
  > {
    const statement = `subscription OnCreateProfile($filter: ModelSubscriptionProfileFilterInput, $owner: String) {
        onCreateProfile(filter: $filter, owner: $owner) {
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
            }
            profileID
            createdAt
            updatedAt
            profilePictureProfileId
            owner
          }
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateProfile">>
    >;
  }

  OnUpdateProfileListener(
    filter?: ModelSubscriptionProfileFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateProfile">>
  > {
    const statement = `subscription OnUpdateProfile($filter: ModelSubscriptionProfileFilterInput, $owner: String) {
        onUpdateProfile(filter: $filter, owner: $owner) {
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
            }
            profileID
            createdAt
            updatedAt
            profilePictureProfileId
            owner
          }
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateProfile">>
    >;
  }

  OnDeleteProfileListener(
    filter?: ModelSubscriptionProfileFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteProfile">>
  > {
    const statement = `subscription OnDeleteProfile($filter: ModelSubscriptionProfileFilterInput, $owner: String) {
        onDeleteProfile(filter: $filter, owner: $owner) {
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
            }
            profileID
            createdAt
            updatedAt
            profilePictureProfileId
            owner
          }
          bio
          birthday
          createdAt
          updatedAt
          profileUsernameId
          profileImagePostsId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteProfile">>
    >;
  }

  OnCreateImagePostListener(
    filter?: ModelSubscriptionImagePostFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateImagePost">>
  > {
    const statement = `subscription OnCreateImagePost($filter: ModelSubscriptionImagePostFilterInput, $owner: String) {
        onCreateImagePost(filter: $filter, owner: $owner) {
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateImagePost">>
    >;
  }

  OnUpdateImagePostListener(
    filter?: ModelSubscriptionImagePostFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateImagePost">>
  > {
    const statement = `subscription OnUpdateImagePost($filter: ModelSubscriptionImagePostFilterInput, $owner: String) {
        onUpdateImagePost(filter: $filter, owner: $owner) {
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateImagePost">>
    >;
  }

  OnDeleteImagePostListener(
    filter?: ModelSubscriptionImagePostFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteImagePost">>
  > {
    const statement = `subscription OnDeleteImagePost($filter: ModelSubscriptionImagePostFilterInput, $owner: String) {
        onDeleteImagePost(filter: $filter, owner: $owner) {
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          s3_key
          mediaSourceMobile
          mediaSourceDesktop
          downloadableVideo
          posterImage
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteImagePost">>
    >;
  }

  OnCreateCommentsListener(
    filter?: ModelSubscriptionCommentsFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateComments">>
  > {
    const statement = `subscription OnCreateComments($filter: ModelSubscriptionCommentsFilterInput, $owner: String) {
        onCreateComments(filter: $filter, owner: $owner) {
          __typename
          id
          usernameID
          comment
          time_posted
          imagePostsID
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateComments">>
    >;
  }

  OnUpdateCommentsListener(
    filter?: ModelSubscriptionCommentsFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateComments">>
  > {
    const statement = `subscription OnUpdateComments($filter: ModelSubscriptionCommentsFilterInput, $owner: String) {
        onUpdateComments(filter: $filter, owner: $owner) {
          __typename
          id
          usernameID
          comment
          time_posted
          imagePostsID
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateComments">>
    >;
  }

  OnDeleteCommentsListener(
    filter?: ModelSubscriptionCommentsFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteComments">>
  > {
    const statement = `subscription OnDeleteComments($filter: ModelSubscriptionCommentsFilterInput, $owner: String) {
        onDeleteComments(filter: $filter, owner: $owner) {
          __typename
          id
          usernameID
          comment
          time_posted
          imagePostsID
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteComments">>
    >;
  }

  OnCreateUsernameListener(
    filter?: ModelSubscriptionUsernameFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUsername">>
  > {
    const statement = `subscription OnCreateUsername($filter: ModelSubscriptionUsernameFilterInput, $owner: String) {
        onCreateUsername(filter: $filter, owner: $owner) {
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUsername">>
    >;
  }

  OnUpdateUsernameListener(
    filter?: ModelSubscriptionUsernameFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUsername">>
  > {
    const statement = `subscription OnUpdateUsername($filter: ModelSubscriptionUsernameFilterInput, $owner: String) {
        onUpdateUsername(filter: $filter, owner: $owner) {
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUsername">>
    >;
  }

  OnDeleteUsernameListener(
    filter?: ModelSubscriptionUsernameFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUsername">>
  > {
    const statement = `subscription OnDeleteUsername($filter: ModelSubscriptionUsernameFilterInput, $owner: String) {
        onDeleteUsername(filter: $filter, owner: $owner) {
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
              owner
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
              owner
            }
            s3_key
            mediaSourceMobile
            mediaSourceDesktop
            downloadableVideo
            posterImage
            createdAt
            updatedAt
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          usernameImagePostsId
          usernameProfileId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUsername">>
    >;
  }

  OnCreateSportsGameListener(
    filter?: ModelSubscriptionSportsGameFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateSportsGame">>
  > {
    const statement = `subscription OnCreateSportsGame($filter: ModelSubscriptionSportsGameFilterInput, $owner: String) {
        onCreateSportsGame(filter: $filter, owner: $owner) {
          __typename
          id
          sport
          homeTeam
          awayTeam
          gameStatus
          homeTeamWins
          homeTeamLosses
          awayTeamWins
          awayTeamLosses
          basicGameInfo
          startTime
          lastUpdate
          gameStarted
          gameEnded
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateSportsGame">>
    >;
  }

  OnUpdateSportsGameListener(
    filter?: ModelSubscriptionSportsGameFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateSportsGame">>
  > {
    const statement = `subscription OnUpdateSportsGame($filter: ModelSubscriptionSportsGameFilterInput, $owner: String) {
        onUpdateSportsGame(filter: $filter, owner: $owner) {
          __typename
          id
          sport
          homeTeam
          awayTeam
          gameStatus
          homeTeamWins
          homeTeamLosses
          awayTeamWins
          awayTeamLosses
          basicGameInfo
          startTime
          lastUpdate
          gameStarted
          gameEnded
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateSportsGame">>
    >;
  }

  OnDeleteSportsGameListener(
    filter?: ModelSubscriptionSportsGameFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteSportsGame">>
  > {
    const statement = `subscription OnDeleteSportsGame($filter: ModelSubscriptionSportsGameFilterInput, $owner: String) {
        onDeleteSportsGame(filter: $filter, owner: $owner) {
          __typename
          id
          sport
          homeTeam
          awayTeam
          gameStatus
          homeTeamWins
          homeTeamLosses
          awayTeamWins
          awayTeamLosses
          basicGameInfo
          startTime
          lastUpdate
          gameStarted
          gameEnded
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteSportsGame">>
    >;
  }

  OnCreateLiveGameChatRoomListener(
    filter?: ModelSubscriptionLiveGameChatRoomFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreateLiveGameChatRoom">
    >
  > {
    const statement = `subscription OnCreateLiveGameChatRoom($filter: ModelSubscriptionLiveGameChatRoomFilterInput, $owner: String) {
        onCreateLiveGameChatRoom(filter: $filter, owner: $owner) {
          __typename
          id
          sport
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          chatsID
          chats {
            __typename
            items {
              __typename
              id
              sortKey
              usernameID
              profileID
              chat
              timePosted
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onCreateLiveGameChatRoom">
      >
    >;
  }

  OnUpdateLiveGameChatRoomListener(
    filter?: ModelSubscriptionLiveGameChatRoomFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdateLiveGameChatRoom">
    >
  > {
    const statement = `subscription OnUpdateLiveGameChatRoom($filter: ModelSubscriptionLiveGameChatRoomFilterInput, $owner: String) {
        onUpdateLiveGameChatRoom(filter: $filter, owner: $owner) {
          __typename
          id
          sport
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          chatsID
          chats {
            __typename
            items {
              __typename
              id
              sortKey
              usernameID
              profileID
              chat
              timePosted
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onUpdateLiveGameChatRoom">
      >
    >;
  }

  OnDeleteLiveGameChatRoomListener(
    filter?: ModelSubscriptionLiveGameChatRoomFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeleteLiveGameChatRoom">
    >
  > {
    const statement = `subscription OnDeleteLiveGameChatRoom($filter: ModelSubscriptionLiveGameChatRoomFilterInput, $owner: String) {
        onDeleteLiveGameChatRoom(filter: $filter, owner: $owner) {
          __typename
          id
          sport
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          chatsID
          chats {
            __typename
            items {
              __typename
              id
              sortKey
              usernameID
              profileID
              chat
              timePosted
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<
        Pick<__SubscriptionContainer, "onDeleteLiveGameChatRoom">
      >
    >;
  }

  OnCreateHubPostsListener(
    filter?: ModelSubscriptionHubPostsFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateHubPosts">>
  > {
    const statement = `subscription OnCreateHubPosts($filter: ModelSubscriptionHubPostsFilterInput, $owner: String) {
        onCreateHubPosts(filter: $filter, owner: $owner) {
          __typename
          id
          sortKey
          postType
          timePosted
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateHubPosts">>
    >;
  }

  OnUpdateHubPostsListener(
    filter?: ModelSubscriptionHubPostsFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateHubPosts">>
  > {
    const statement = `subscription OnUpdateHubPosts($filter: ModelSubscriptionHubPostsFilterInput, $owner: String) {
        onUpdateHubPosts(filter: $filter, owner: $owner) {
          __typename
          id
          sortKey
          postType
          timePosted
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateHubPosts">>
    >;
  }

  OnDeleteHubPostsListener(
    filter?: ModelSubscriptionHubPostsFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteHubPosts">>
  > {
    const statement = `subscription OnDeleteHubPosts($filter: ModelSubscriptionHubPostsFilterInput, $owner: String) {
        onDeleteHubPosts(filter: $filter, owner: $owner) {
          __typename
          id
          sortKey
          postType
          timePosted
          sportsGameID
          sportsgame {
            __typename
            id
            sport
            homeTeam
            awayTeam
            gameStatus
            homeTeamWins
            homeTeamLosses
            awayTeamWins
            awayTeamLosses
            basicGameInfo
            startTime
            lastUpdate
            gameStarted
            gameEnded
            liveGameChatRoomID
            livegamechatroom {
              __typename
              id
              sport
              sportsGameID
              chatsID
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteHubPosts">>
    >;
  }

  OnCreateChatsListener(
    filter?: ModelSubscriptionChatsFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateChats">>
  > {
    const statement = `subscription OnCreateChats($filter: ModelSubscriptionChatsFilterInput, $owner: String) {
        onCreateChats(filter: $filter, owner: $owner) {
          __typename
          id
          sortKey
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          chat
          timePosted
          likes {
            __typename
            items {
              __typename
              id
              usernameID
              profileID
              createdAt
              updatedAt
              chatsLikesId
              owner
            }
            nextToken
          }
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateChats">>
    >;
  }

  OnUpdateChatsListener(
    filter?: ModelSubscriptionChatsFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateChats">>
  > {
    const statement = `subscription OnUpdateChats($filter: ModelSubscriptionChatsFilterInput, $owner: String) {
        onUpdateChats(filter: $filter, owner: $owner) {
          __typename
          id
          sortKey
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          chat
          timePosted
          likes {
            __typename
            items {
              __typename
              id
              usernameID
              profileID
              createdAt
              updatedAt
              chatsLikesId
              owner
            }
            nextToken
          }
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateChats">>
    >;
  }

  OnDeleteChatsListener(
    filter?: ModelSubscriptionChatsFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteChats">>
  > {
    const statement = `subscription OnDeleteChats($filter: ModelSubscriptionChatsFilterInput, $owner: String) {
        onDeleteChats(filter: $filter, owner: $owner) {
          __typename
          id
          sortKey
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          chat
          timePosted
          likes {
            __typename
            items {
              __typename
              id
              usernameID
              profileID
              createdAt
              updatedAt
              chatsLikesId
              owner
            }
            nextToken
          }
          liveGameChatRoomID
          livegamechatroom {
            __typename
            id
            sport
            sportsGameID
            sportsgame {
              __typename
              id
              sport
              homeTeam
              awayTeam
              gameStatus
              homeTeamWins
              homeTeamLosses
              awayTeamWins
              awayTeamLosses
              basicGameInfo
              startTime
              lastUpdate
              gameStarted
              gameEnded
              liveGameChatRoomID
              createdAt
              updatedAt
              owner
            }
            chatsID
            chats {
              __typename
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteChats">>
    >;
  }

  OnCreateChatLikesListener(
    filter?: ModelSubscriptionChatLikesFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateChatLikes">>
  > {
    const statement = `subscription OnCreateChatLikes($filter: ModelSubscriptionChatLikesFilterInput, $owner: String) {
        onCreateChatLikes(filter: $filter, owner: $owner) {
          __typename
          id
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          chatsLikesId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateChatLikes">>
    >;
  }

  OnUpdateChatLikesListener(
    filter?: ModelSubscriptionChatLikesFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateChatLikes">>
  > {
    const statement = `subscription OnUpdateChatLikes($filter: ModelSubscriptionChatLikesFilterInput, $owner: String) {
        onUpdateChatLikes(filter: $filter, owner: $owner) {
          __typename
          id
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          chatsLikesId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateChatLikes">>
    >;
  }

  OnDeleteChatLikesListener(
    filter?: ModelSubscriptionChatLikesFilterInput,
    owner?: string
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteChatLikes">>
  > {
    const statement = `subscription OnDeleteChatLikes($filter: ModelSubscriptionChatLikesFilterInput, $owner: String) {
        onDeleteChatLikes(filter: $filter, owner: $owner) {
          __typename
          id
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
              owner
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
              owner
            }
            createdAt
            updatedAt
            usernameImagePostsId
            usernameProfileId
            owner
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
              owner
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
              owner
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
              owner
            }
            bio
            birthday
            createdAt
            updatedAt
            profileUsernameId
            profileImagePostsId
            owner
          }
          createdAt
          updatedAt
          chatsLikesId
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (owner) {
      gqlAPIServiceArguments.owner = owner;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteChatLikes">>
    >;
  }
}
