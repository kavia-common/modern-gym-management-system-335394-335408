"use client";

import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ForgotPasswordPage from "./ForgotPasswordPage";

type AuthView = "login" | "register" | "forgot";

/**
 * AuthGate - Manages authentication view switching (login/register/forgot).
 *
 * Contract:
 * - Renders the appropriate auth form based on internal state.
 * - No external routing needed; manages its own view state.
 */
// PUBLIC_INTERFACE
export default function AuthGate() {
  const [view, setView] = useState<AuthView>("login");

  switch (view) {
    case "register":
      return <RegisterPage onSwitchToLogin={() => setView("login")} />;
    case "forgot":
      return <ForgotPasswordPage onSwitchToLogin={() => setView("login")} />;
    default:
      return (
        <LoginPage
          onSwitchToRegister={() => setView("register")}
          onSwitchToForgot={() => setView("forgot")}
        />
      );
  }
}
