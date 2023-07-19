import Changepassword from "@/components/Changepassword";
import ForgetPassword from "@/components/Forgetpassword";
import Register from "@/components/Register";
import Login from "@/components/login";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Calculator</title>
        <meta name="description" content="Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
      <Register />
      <ForgetPassword />
      <Changepassword />
    </>
  );
}
