// ** React Imports
import { useEffect, useState } from "react";
import Joi from "joi";
import { catchMessage, errorMessage } from "@/utils/showMessage";
import { setLoading, useCalculatorController } from "@/core/context";
import { login } from "@/controller/auth";

const Login = () => {
  const [, dispatch] = useCalculatorController();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateFields = () => {
    try {
      const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      });
      const { error } = schema.validate({
        username,
        password,
      });
      if (error) {
        errorMessage(error.details[0].message);
        return false;
      }
      return true;
    } catch (error) {
      setLoading(dispatch, false);
      catchMessage(error);
      return false;
    }
  };

  const loginHandler = async () => {
    try {
      let validationResult = await validateFields();
      if (!validationResult) {
        return;
      }
      setLoading(dispatch, true);
      const res = await login(username, password);
      setLoading(dispatch, false);
      if (res.success) {
        setLogin(dispatch, {
          userRole: res.data.userRole,
          id: res.data.id,
          authenticated: true,
          name: res.data.name,
          email: res.data.email,
          image: res.data.image,
          wallet: res.data.wallet,
        });
        router.push("/");
      } else {
        errorMessage(res.message, res.code);
      }
    } catch (error) {
      console.log(error);
      setLoading(dispatch, false);
      catchMessage(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <section className="content-area">
      <div className="container">
        <div item xs={12} md={12} lg={12}>
          <h1 className="login-title">Sign In</h1>
        </div>
        User Name
        <input
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button
          onClick={() => {
            loginHandler();
          }}
        >
          Sign In
        </button>
      </div>
    </section>
  );
};

export default Login;
