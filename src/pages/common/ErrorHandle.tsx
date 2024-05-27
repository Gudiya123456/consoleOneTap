import { setCrmToken } from "../../store/themeConfigSlice";
import { useNavigate } from "react-router-dom";

export const ErrorHandle = () => {
const navigate = useNavigate();
setCrmToken("");
navigate('/login')
  };