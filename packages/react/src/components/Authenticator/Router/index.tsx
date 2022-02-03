import { useMemo } from 'react';
import { useAuthenticator } from '..';
import { ConfirmSignIn } from '../ConfirmSignIn';
import { ConfirmSignUp } from '../ConfirmSignUp';
import { ForceNewPassword } from '../ForceNewPassword';
import { ConfirmResetPassword, ResetPassword } from '../ResetPassword';
import { SetupTOTP } from '../SetupTOTP';
import { SignInSignUpTabs } from '../shared';
import { ConfirmVerifyUser, VerifyUser } from '../VerifyUser';

const getRouteComponent = (route: string) => {
  switch (route) {
    case 'authenticated':
    case 'idle':
    case 'setup':
    case 'signOut':
      return () => null;
    case 'confirmSignUp':
      return ConfirmSignUp;
    case 'confirmSignIn':
      return ConfirmSignIn;
    case 'setupTOTP':
      return SetupTOTP;
    case 'signIn':
    case 'signUp':
      return SignInSignUpTabs;
    case 'forceNewPassword':
      return ForceNewPassword;
    case 'resetPassword':
      return ResetPassword;
    case 'confirmResetPassword':
      return ConfirmResetPassword;
    case 'verifyUser':
      return VerifyUser;
    case 'confirmVerifyUser':
      return ConfirmVerifyUser;
    default:
      console.warn(
        'Unhandled Authenicator route - please open an issue: ',
        route
      );

      return () => null;
  }
};

export function Router() {
  const { route } = useAuthenticator();
  const RouteComponent = useMemo(() => getRouteComponent(route), [route]);

  return <RouteComponent />;
}
