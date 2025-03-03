import { useContext } from 'react';
import { AppContext } from 'App';
import { AuthContext } from 'components/auth/provider';
import { API } from 'utils/api';
import { useConstCallback } from './useConstCallback';

export const useAPI = () => {
  const oidcClient = useContext(AuthContext);
  const { apiUrl } = useContext(AppContext);

  const postParadata = useConstCallback(body =>
    API.postParadata(apiUrl)(oidcClient.accessToken)(body)
  );

  const getFirstContacts = useConstCallback(() =>
    API.getContacts(apiUrl)(oidcClient.accessToken)
  );

  const getContact = useConstCallback(id =>
    API.getContact(apiUrl)(id)(oidcClient.accessToken)
  );

  const getMySurveys = useConstCallback(id =>
    API.getMySurveys(apiUrl)(id)(oidcClient.accessToken)
  );

  const getContactAddress = useConstCallback(id =>
    API.getContactAddress(apiUrl)(id)(oidcClient.accessToken)
  );

  const putAddress = useConstCallback((url, newAddress) =>
    API.putAddress(url)(newAddress)(oidcClient.accessToken)
  );

  return {
    postParadata,
    getFirstContacts,
    getMySurveys,
    getContact,
    getContactAddress,
    putAddress,
  };
};
