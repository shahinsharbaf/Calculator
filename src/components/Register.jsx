import React, { useEffect, useState } from "react";
import { setLogin, setLoading, useCalculatorController } from "@/core/context";
import { catchMessage, errorMessage } from "@/utils/showMessage";
import { register } from "@/controller/auth";
import Joi from "joi";

function Register() {
  const [, dispatch] = useCalculatorController();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const validateFields = () => {
    try {
      const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
      });
      const { error } = schema.validate({
        username,
        password,
        email,
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

  const registerHandler = async () => {
    try {
      let validationResult = validateFields();
      if (!validationResult) {
        return;
      }
      setLoading(dispatch, true);
      const res = await register({ username, password, email });
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
    <>
      <section className="content-area">
        <div className="container">
          <div xs={3} md={4} lg={4}>
            <h1 className="login-title">Register</h1>
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
          Email
          <input
            type="text"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <button
            onClick={() => {
              registerHandler();
            }}
          >
            Register
          </button>
        </div>
      </section>
    </>
  );
}

export default Register;
