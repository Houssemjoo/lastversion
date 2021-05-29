import React from "react";
import { Avatar } from "react-native-paper";
import UserImg from "../../images/user.png";

export default function UserImage({ sourceUrl }) {
  if (sourceUrl && sourceUrl.length > 0) {
    return (
      <Avatar.Image
        source={{
          uri: sourceUrl,
        }}
        style={{ backgroundColor: "#00000000", alignSelf: "center" }}
        size={120}
      />
    );
  }

  return (
    <Avatar.Image
      source={UserImg}
      size={120}
      style={{ backgroundColor: "#00000000", alignSelf: "center" }}
    />
  );
}
