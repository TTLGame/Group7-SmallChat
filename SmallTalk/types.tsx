export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type MainTabParamList = {
  Camera: undefined;
  Chat: undefined;
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
  user:User;
  id:String;
  content:String;
  createdAt:string;
}

export type ChatRoom = {
  id:String
  users: User[];
  lastMess: Message;
}
