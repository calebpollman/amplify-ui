import { createContext, useContext, useMemo } from 'react';

import {
  AuthenticatorRoute,
  RouteOptionsContextType,
  RouteOptionsProviderProps,
} from './types';
import { resolveRoutes } from './utils';

const RouteOptionsContext = createContext<RouteOptionsContextType>(null);

const useRoutes = () => {
  const routesContext = useContext(RouteOptionsContext);
  if (!routesContext) {
    throw new Error(
      '`useRoutes` must be used inside a `RouteOptionsProvider`.'
    );
  }

  return routesContext;
};

export function useRoute(route: AuthenticatorRoute) {
  return useRoutes()[route];
}

export const RouteOptionsProvider = ({
  children,
  Footer = null,
  Header = null,
  routeOptionsDefaults,
  routeOptionsOverrides,
}: RouteOptionsProviderProps) => {
  const routes = useMemo(
    () => resolveRoutes(routeOptionsDefaults, routeOptionsOverrides),
    [routeOptionsDefaults, routeOptionsOverrides]
  );

  return (
    <RouteOptionsContext.Provider value={{ routes, Footer, Header }}>
      {children}
    </RouteOptionsContext.Provider>
  );
};
