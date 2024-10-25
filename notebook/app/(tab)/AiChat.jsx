
import React, { useState } from "react";
import { View, } from "react-native";
import AiChatComponent from "../../components/AiChatComponent.jsx";

const AiChat = () => {


  return (

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , backgroundColor:"white"}}>
        <AiChatComponent />
      </View>

  );
};

export default AiChat;
