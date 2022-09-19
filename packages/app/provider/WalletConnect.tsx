// https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-v2
import Client from "@walletconnect/sign-client";
import { SessionTypes } from "@walletconnect/types";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getSdkError } from "@walletconnect/utils";
import { Linking, Platform } from "react-native";

interface IContext {
  session: SessionTypes.Struct | undefined;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  accounts: string[];
  signXdr: (_xdr: string) => Promise<null | unknown>;
}

export const ClientContext = createContext<IContext>({} as IContext);

// TODO find out why it doesn't work
export function ClientContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [client, setClient] = useState<Client>();
  const [session, setSession] = useState<SessionTypes.Struct>();
  const [accounts, setAccounts] = useState<string[]>([]);

  const reset = () => {
    setSession(undefined);
    setAccounts([]);
  };

  const onSessionConnected = useCallback((_session: SessionTypes.Struct) => {
    const allNamespaceAccounts = Object.values(_session.namespaces)
      .map((namespace) => namespace.accounts)
      .flat();

    setSession(_session);
    setAccounts(allNamespaceAccounts);
  }, []);

  const connect = useCallback(async () => {
    if (typeof client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }

    try {
      const requiredNamespaces = {
        stellar: {
          methods: ["stellar_signAndSubmitXDR", "stellar_signXDR"],
          chains: ["stellar:pubnet", "stellar:testnet"],
          events: [],
        },
      };

      const { uri, approval } = await client.connect({
        pairingTopic: undefined,
        requiredNamespaces,
      });

      if (uri && Platform.OS === "web") {
        QRCodeModal.open(
          uri,
          () => {
            console.log("EVENT", "QR Code Modal closed");
          },
          {
            desktopLinks: [],
            mobileLinks: ["lobstr"],
          }
        );
      } else {
        // TODO find out proper deep link
        Linking.openURL("https://lobstr.co/uni");
      }

      const session = await approval();
      console.log("Established session:", session);
      await onSessionConnected(session);
    } catch (e) {
      console.error(e);
    } finally {
      QRCodeModal.close();
    }
  }, [client, onSessionConnected]);

  const disconnect = useCallback(async () => {
    if (typeof client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }
    if (typeof session === "undefined") {
      throw new Error("Session is not connected");
    }
    await client.disconnect({
      topic: session.topic,
      reason: getSdkError("USER_DISCONNECTED"),
    });
    reset();
  }, [client, session]);

  const _subscribeToEvents = useCallback(
    (_client: Client) => {
      if (typeof _client === "undefined") {
        throw new Error("WalletConnect is not initialized");
      }

      _client.on("session_ping", (args) => {
        console.log("EVENT", "session_ping", args);
      });

      _client.on("session_event", (args) => {
        console.log("EVENT", "session_event", args);
      });

      _client.on("session_update", ({ topic, params }) => {
        console.log("EVENT", "session_update", { topic, params });
        const { namespaces } = params;
        const _session = _client.session.get(topic);
        const updatedSession = { ..._session, namespaces };
        onSessionConnected(updatedSession);
      });

      _client.on("session_delete", () => {
        console.log("EVENT", "session_delete");
        reset();
      });
    },
    [onSessionConnected]
  );

  const createClient = useCallback(async () => {
    try {
      const metadata = {
        name: "Skyhitz",
        description: "Skyhitz",
        url: "https://skyhitz.io",
        icons: ["https://skyhitz.io/img/icon-512.png"],
      };
      const PROJECT_ID = "422a527ddc3ed4c5fff60954fcc8ed83";

      const _client = await Client.init({
        logger: "debug",
        projectId: PROJECT_ID,
        metadata: metadata,
      });

      console.log("CREATED CLIENT: ", _client);
      setClient(_client);
      await _subscribeToEvents(_client);
    } catch (err) {
      throw err;
    }
  }, [_subscribeToEvents]);

  const signXdr = useCallback(
    async (xdr: string) => {
      if (client && session) {
        const result = await client.request({
          topic: session.topic,
          chainId: "stellar:testnet",
          request: {
            // jsonrpc: "2.0",
            method: "stellar_signXDR",
            params: {
              xdr,
            },
          },
        });
        return result;
      }
      return null;
    },
    [client, session]
  );

  useEffect(() => {
    if (!client) {
      createClient();
    }
  }, [client, createClient]);

  const value = useMemo(
    () => ({
      accounts,
      session,
      connect,
      disconnect,
      signXdr,
    }),
    [accounts, session, connect, disconnect, signXdr]
  );

  return (
    <ClientContext.Provider
      value={{
        ...value,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useWalletConnectClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error(
      "useWalletConnectClient must be used within a ClientContextProvider"
    );
  }
  return context;
}
