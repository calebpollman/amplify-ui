import { resolveRoutes } from '../utils';
import { RouteOptionsDefaults, RouteOptionsOverrides } from '../types';

function ConfirmResetPassword() {
  return null;
}
function ConfirmSignIn() {
  return null;
}
function ConfirmSignUp() {
  return null;
}
function ConfirmVerifyUser() {
  return null;
}
function ForceNewPassword() {
  return null;
}
function FormFields() {
  return null;
}
function ResetPassword() {
  return null;
}
function SetupTOTP() {
  return null;
}
function SignIn() {
  return null;
}
function SignUp() {
  return null;
}
function VerifyUser() {
  return null;
}

const defaultComponents: RouteOptionsDefaults = {
  confirmResetPassword: { Component: ConfirmResetPassword },
  confirmSignIn: { Component: ConfirmSignIn },
  confirmSignUp: { Component: ConfirmSignUp },
  confirmVerifyUser: { Component: ConfirmVerifyUser },
  forceNewPassword: { Component: ForceNewPassword },
  resetPassword: { Component: ResetPassword },
  setupTOTP: { Component: SetupTOTP },
  signIn: { Component: SignIn },
  signUp: { Component: SignUp },
  verifyUser: { Component: VerifyUser },
};

function OverrideVerifyUser() {
  return null;
}

function CustomHeader() {
  return null;
}

const overrideComponents: RouteOptionsOverrides = {
  forceNewPassword: { Header: CustomHeader },
  verifyUser: OverrideVerifyUser,
};

describe('resolveRoutes', () => {
  it('returns the expected output in the happy path', () => {
    const output = resolveRoutes(defaultComponents, null);

    expect(output).toStrictEqual(defaultComponents);
  });

  it('returns the expected override and custom components', () => {
    const output = resolveRoutes(defaultComponents, overrideComponents);

    expect(output.forceNewPassword.Header).toBe(CustomHeader);
  });
});
