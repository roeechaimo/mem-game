import React from "react";

export const GameTimeContext = React.createContext({
  gameTime: null,
  postGameTime: () => {}
});
