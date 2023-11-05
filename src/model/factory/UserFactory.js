import { useState } from "react";
import { toJSON, fromJSON } from "../jsonUtility";
const CreateUser = () => {
  const [name, setName] = useState("");
  const [indexNum, setIndexNum] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [token, setToken] = useState("");

  const getIndexNum = () => indexNum;
  const getName = () => name;
  const getPassword = () => password;
  const getRole = () => role;
  const getToken = () => token;
  return {
    getName,
    getIndexNum,
    getPassword,
    getRole,
    getToken,
    setName,
    setIndexNum,
    setPassword,
    setRole,
    setToken,
    toJSON: function () {
      return toJSON.call(this);
    },
    fromJSON: function () {
      return fromJSON.call(this);
    },
  };
};

export default CreateUser;
