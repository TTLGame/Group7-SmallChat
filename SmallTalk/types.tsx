export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type MainTabParamList = {
  Camera: undefined;
  Chat: undefined;
  Group: undefined;
  Account: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id:String;
  name:String;
  imageUri:String;
}

export type Message = {
  id:String;
  content:String;
  createdAt:number;
}

export type ChatRoom = {
  id:String
  user: [User];
  lastMess: Message;
}
