import { FC, useEffect } from 'react';
import {
  AuthenticatorMachineOptions,
  CognitoUserAmplify,
} from '@aws-amplify/ui';
import { Provider, useAuthenticator } from './hooks/useAuthenticator';
import { ResetPassword } from './ResetPassword';
import { Router } from './Router';
import { SetupTOTP } from './SetupTOTP';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { View } from '../..';
import {
  CustomComponentsContext,
  ComponentsProviderProps,
  useCustomComponents,
} from './hooks/useCustomComponents';
import { defaultComponents } from './hooks/useCustomComponents/defaultComponents';

export interface ComponentsProp {}

interface AuthenticatorWrapperProps {
  className: string;
  variation: 'default' | 'modal';
}

export type AuthenticatorProps = AuthenticatorMachineOptions &
  ComponentsProviderProps & {
    className?: string;
    variation?: 'default' | 'modal';
    children?: ({
      signOut,
      user,
    }: {
      signOut: ReturnType<typeof useAuthenticator>['signOut'];
      user: CognitoUserAmplify;
    }) => JSX.Element;
  };

const hasTabs = (route: string) => route === 'signIn' || route === 'signUp';

const AuthenticatorWrapper: FC<AuthenticatorWrapperProps> = ({
  children,
  className,
  variation,
}) => {
  const { route } = useAuthenticator();

  const {
    components: { Header, Footer },
  } = useCustomComponents();

  return (
    <View
      className={className}
      data-amplify-authenticator=""
      data-variation={variation}
    >
      <View data-amplify-container="">
        <Header />
        <View
          data-amplify-router=""
          data-amplify-router-content={hasTabs(route) ? undefined : ''}
        >
          {children}
        </View>
        <Footer />
      </View>
    </View>
  );
};

export function Authenticator({
  children,
  className,
  components: customComponents,
  initialState,
  loginMechanisms,
  services,
  signUpAttributes,
  socialProviders,
  variation,
}: AuthenticatorProps) {
  const components = { ...defaultComponents, ...customComponents };
  const machineProps = {
    initialState,
    loginMechanisms,
    services,
    signUpAttributes,
    socialProviders,
  };

  // Helper component that sends init event to the parent provider
  function InitMachine({ children: machineChildren, ...data }) {
    const { _send, signOut, route, user } = useAuthenticator();

    useEffect(() => {
      if (route === 'idle') {
        _send({ type: 'INIT', data });
      }
    }, []);

    // `Authenticator` might not have `children` for non SPA use cases.
    if (['authenticated', 'signOut'].includes(route)) {
      return typeof children === 'function'
        ? children({ signOut, user })
        : null;
    }

    return <>{machineChildren}</>;
  }

  return (
    <Provider>
      <CustomComponentsContext.Provider value={{ components }}>
        <InitMachine {...machineProps}>
          <AuthenticatorWrapper className={className} variation={variation}>
            <Router />
          </AuthenticatorWrapper>
        </InitMachine>
      </CustomComponentsContext.Provider>
    </Provider>
  );
}

Authenticator.Provider = Provider;
Authenticator.ResetPassword = ResetPassword;
Authenticator.SetupTOTP = SetupTOTP;
Authenticator.SignIn = SignIn;
Authenticator.SignUp = SignUp;
