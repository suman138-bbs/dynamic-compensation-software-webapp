import { collection, doc, getDocsFromServer, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { FirebaseConfigService } from '../../common/services/firebase-config-service';
import { ClientDto, ClientForm } from './models';

const functions = getFunctions();

const COLLECTION_NAME_CLIENTS = 'clients';
export class ClientService {
  static async createClient(data: ClientForm) {
    const createClientAccount = httpsCallable(functions, 'create_client_account');
    return createClientAccount(data);
  }

  //: Promise<ClientDto[]>
  static async getClient() {
    const dbQuery = query(collection(FirebaseConfigService.db, COLLECTION_NAME_CLIENTS), where('deleted', '==', false));
    const querySnapShot = await getDocsFromServer(dbQuery);
    return querySnapShot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id as string,
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        companyName: data.companyName as string,
        contactDetails: data.contactNumber as string,
        email: data.email as string,
        avatar: data.avatar,
      };
    });
  }

  static async updateClient(clientData: ClientForm & Omit<ClientDto, 'avatar'>) {
    const clientRef = doc(FirebaseConfigService.db, COLLECTION_NAME_CLIENTS, clientData.id);
    return setDoc(
      clientRef,
      {
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        companyName: clientData.companyName,
        companyAddress: clientData.companyAddress,
        contactNumber: clientData.contactDetails,
        email: clientData.email,
        updatedAt: serverTimestamp(),
      },
      {
        merge: true,
      },
    );
  }

  static async deleteClient(clientId: string) {
    const clientRef = doc(FirebaseConfigService.db, COLLECTION_NAME_CLIENTS, clientId);
    return setDoc(clientRef, { updatedAt: serverTimestamp(), deleted: true }, { merge: true });
  }
}
export const useCreateClient = () => {
  return useMutation((payload: ClientForm) => {
    return ClientService.createClient(payload);
  });
};

const CLIENT_SERVICES_QUERY_KEY = {
  GET_CLIENT: 'getClient',
};

export const useGetClient = () => {
  return useQuery(CLIENT_SERVICES_QUERY_KEY.GET_CLIENT, ClientService.getClient);
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: ClientForm & Omit<ClientDto, 'avatar'>) => {
      return ClientService.updateClient(payload);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CLIENT_SERVICES_QUERY_KEY.GET_CLIENT);
      },
    },
  );
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (userId: string) => {
      return ClientService.deleteClient(userId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CLIENT_SERVICES_QUERY_KEY.GET_CLIENT);
      },
    },
  );
};
