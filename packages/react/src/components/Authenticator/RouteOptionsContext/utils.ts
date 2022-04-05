import {
  AuthenticatorRoute,
  RouteOptions,
  RouteOptionsDefault,
  RouteOptionsDefaults,
  RouteOptionsOverride,
  RouteOptionsOverrides,
  Routes,
} from './types';

const AUTHENTICATOR_ROUTES: AuthenticatorRoute[] = [
  'confirmResetPassword',
  'confirmSignIn',
  'confirmSignUp',
  'confirmVerifyUser',
  'forceNewPassword',
  'resetPassword',
  'setupTOTP',
  'signIn',
  'signUp',
  'verifyUser',
];

/**
 * Combines default and override components for an Authenticator route.
 *
 * @param defaultComponent Authenticator route component defaults
 * @param overrideComponent Authenticator route component overrides
 * @returns object containing the route components
 */
const resolveRoute = (
  routeOptionsDefault: RouteOptionsDefault,
  routeOptionsOverride: RouteOptionsOverride
): RouteOptions => {
  // if overrideComponent is a component, just return it as the value of Component
  if (typeof routeOptionsOverride === 'function') {
    return { Component: routeOptionsOverride };
  }

  return { ...routeOptionsDefault, ...routeOptionsOverride };
};

/**
 * Combines default and override Authenticator route component objects.
 *
 * @param routeOptionsDefaults Authenticator route defaults
 * @param routeOptionsOverrides Authenticator route overrides
 * @returns object containing all resolved Authenticator route values
 */
export const resolveRoutes = (
  routeOptionsDefaults: RouteOptionsDefaults,
  routeOptionsOverrides: RouteOptionsOverrides
): Routes => {
  // if no overrides, just return defaults
  if (!routeOptionsOverrides) {
    return routeOptionsDefaults;
  }

  return AUTHENTICATOR_ROUTES.reduce((components, route) => {
    const defaultComponent = routeOptionsDefaults[route];
    const overrideComponent = routeOptionsOverrides[route];
    components[route] = resolveRoute(defaultComponent, overrideComponent);

    return components;
  }, routeOptionsDefaults);
};
