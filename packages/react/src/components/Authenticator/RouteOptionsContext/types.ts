import { ReactNode } from 'react';

export type AuthenticatorRoute =
  | 'confirmResetPassword'
  | 'confirmSignIn'
  | 'confirmSignUp'
  | 'confirmVerifyUser'
  | 'forceNewPassword'
  | 'resetPassword'
  | 'setupTOTP'
  | 'signIn'
  | 'signUp'
  | 'verifyUser';

type OverrideComponent = <P>(props?: P) => JSX.Element;

interface RouteComponents {
  Component: OverrideComponent;
  FormFields?: OverrideComponent;
  Header?: OverrideComponent;
  Footer?: OverrideComponent;
}

// TODO: move other configuration options here, e.g. formFields
/**
 * Default options for an Authenticator Route.
 */
export type RouteOptionsDefault = Pick<RouteComponents, 'Component'>;

/**
 * Default options for all Authenticator Routes.
 */
export type RouteOptionsDefaults = {
  [K in AuthenticatorRoute]: RouteOptionsDefault;
};

/**
 * Override options for an Authenticator Route. Accepts either an override component or an options object.
 */
export type RouteOptionsOverride =
  | Omit<RouteComponents, 'Component'>
  | OverrideComponent;

/**
 * Default options for all Authenticator Routes.
 */
export type RouteOptionsOverrides = {
  [K in AuthenticatorRoute]?: RouteOptionsOverride;
};

export interface RouteOptionsProviderProps
  extends Omit<RouteComponents, 'Component'> {
  children: ReactNode;
  routeOptionsDefaults: RouteOptionsDefaults;
  routeOptionsOverrides: RouteOptionsOverrides;
}

// TODO: expand to include route specific items
export type RouteOptions = RouteComponents;
export type Routes = {
  [K in AuthenticatorRoute]: RouteComponents;
};

export interface RouteOptionsContextType
  extends Omit<RouteComponents, 'Component'> {
  routes: Routes;
}
