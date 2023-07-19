import React, { useEffect, useState } from "react";
import { setLogin, setLoading, useCalculatorController } from "@/core/context";
import {
  catchMessage,
  errorMessage,
  successMessage,
} from "@/utils/showMessage";
import { resetPassword } from "@/controller/auth";
import Joi from "joi";

function Forgetpassword() {
  const [, dispatch] = useCalculatorController();
  const [email, setEmail] = useState("");

  const validateFields = () => {
    try {
      const schema = Joi.object({
        email: Joi.string().required(),
      });
      const { error } = schema.validate({
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

  const resetHandler = async () => {
    try {
      let validationResult = validateFields();
      if (!validationResult) {
        return;
      }
      setLoading(dispatch, true);
      const res = await resetPassword({ email });
      setLoading(dispatch, false);
      if (res.success) {
        successMessage("password reset have been sent to your email");
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
            <h1 className="login-title">Forget Password</h1>
          </div>
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
              resetHandler();
            }}
          >
            Reset Password
          </button>
        </div>
      </section>
    </>
  );
}

export default Forgetpassword;
