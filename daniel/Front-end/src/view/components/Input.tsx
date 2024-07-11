import React from "react";

export const EmailInput = ({ email, setEmail }) => {
  return (
    <input
      placeholder="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  );
};

export const PasswordInput = ({ password, setPassword }) => {
  return (
    <input
      placeholder="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  );
};
