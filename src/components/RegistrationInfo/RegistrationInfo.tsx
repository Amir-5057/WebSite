import { Link, useNavigate } from "react-router-dom";
import { Paragraph, Span } from "../../components/";
import { SignInButton } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import axios from "axios";
import OAuthPopup from "react-oauth-popup";

interface IRegistrationInfo {
  linkText: string;
  hasAccountText: string;
  authWithText: string;
  navigatePath: string;
}

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const RegistrationInfo = ({
  linkText,
  hasAccountText,
  authWithText,
  navigatePath,
}: IRegistrationInfo) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('yandex_token') || null);
  const navigate = useNavigate();

  const fetchToken = async (code: string) => {
    try {
      const response = await axios.post(
        "https://oauth.yandex.ru/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const accessToken = response.data.access_token;
      setToken(accessToken);
      localStorage.setItem('yandex_token', accessToken); 
    } catch (error) {
      console.error("Ошибка при получении токена:", error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/main");
    }
  }, [token, navigate]);


  const handleLogout = () => {
    localStorage.removeItem('yandex_token'); 
    setToken(null); 
    navigate("/"); 
  };

  return (
    <div className="registration">
      <Span>
        {hasAccountText} <Link to={navigatePath}>{linkText}</Link>
      </Span>
      <Paragraph>{authWithText}</Paragraph>
      <div className="icons-wrapper">
        <SignInButton>
          <Link className="reg__link google-link" to="#">
            <img src="./img/icons/google.svg" alt="Google" />
          </Link>
        </SignInButton>
        <OAuthPopup
          url={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}
          onCode={fetchToken}
          onClose={() => console.log("Окно авторизации закрыто")}
        >
          <button
            className="reg__link yandex-link"
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="./img/icons/yandex.svg"
              alt="Yandex"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </button>
        </OAuthPopup>
        <Link className="reg__link mail-ru-link" to="#">
          <img src="./img/icons/mail-ru.svg" alt="Mail.ru" />
        </Link>
      </div>
      {token && (
        <button onClick={handleLogout} className="logout-button">
          Выйти
        </button>
      )}
    </div>
  );
};

export default RegistrationInfo;
