import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

interface Props {
  children: React.ReactNode;
}

export const AppProvider = (props: Props) => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ''}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      {props.children}
    </Auth0Provider>
  );
};
