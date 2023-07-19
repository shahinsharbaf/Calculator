import React, { useEffect, useState } from "react";
import { setLogin, setLoading, useCalculatorController } from "@/core/context";
import {
  catchMessage,
  errorMessage,
  successMessage,
} from "@/utils/showMessage";
import { changePassword } from "@/controller/auth";
import Joi from "joi";

function Changepassword() {
  const [, dispatch] = useCalculatorController();
  const [newpassword, setNewpassword] = useState("");
  const [repeatnewpassword, setRepeatnewpassword] = useState("");

  const validateFields = () => {
    try {
      const schema = Joi.object({
        newpassword: Joi.string().required(),
        repeatnewpassword: Joi.string().required(),
      });
      const { error } = schema.validate({
        newpassword,
        repeatnewpassword,
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

  const resetNewPasswordHandler = async () => {
    try {
      let validationResult = validateFields();
      if (!validationResult) {
        return;
      }
      if (newpassword != repeatnewpassword) {
        return;
      }
      setLoading(dispatch, true);
      const res = await changePassword({ newpassword });
      setLoading(dispatch, false);
      if (res.success) {
        successMessage("password changed");
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
            <h1 className="login-title">Reset Password</h1>
          </div>
          New password
          <input
            type="password"
            value={newpassword}
            onChange={(event) => {
              setNewpassword(event.target.value);
            }}
          />
          Repeat password
          <input
            type="password"
            value={repeatnewpassword}
            onChange={(event) => {
              setRepeatnewpassword(event.target.value);
            }}
          />
          <button
            onClick={() => {
              resetNewPasswordHandler();
            }}
          >
            Reset Password
          </button>
        </div>
      </section>
    </>
  );
}

export default Changepassword;
