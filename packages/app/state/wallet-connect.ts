import WalletConnect from '@walletconnect/sign-client'
import { atom, useRecoilState } from 'recoil'
import { useEffect } from 'react'

const stellarMeta = {
  chainName: 'stellar:pubnet',
  methods: ['stellar_signAndSubmitXDR', 'stellar_signXDR'],
}

const clientAtom = atom<null | WalletConnect>({
  key: 'client',
  default: null,
})

const uriAtom = atom<null | string>({
  key: 'uri',
  default: null,
})

const stateAtom = atom<
  | 'disconnected'
  | 'paring-proposal'
  | 'paring-created'
  | 'session-proposal'
  | 'session-created'
>({
  key: 'state',
  default: 'disconnected',
})

const publicKeyAtom = atom<string>({
  key: 'publicKey',
})

const sessionAtom = atom<any>({
  key: 'session',
})

export const WalletConnectStore = () => {
  const [client, setClient] = useRecoilState(clientAtom)
  const [uri, setUri] = useRecoilState(uriAtom)
  const [state, setState] = useRecoilState(stateAtom)
  const [publicKey, setPublicKey] = useRecoilState(publicKeyAtom)
  const [session, setSession] = useRecoilState(sessionAtom)

  const init = async () => {
    if (client) return
    const result = await WalletConnect.init({
      projectId: '422a527ddc3ed4c5fff60954fcc8ed83',
      metadata: {
        name: 'Skyhitz',
        description: 'Skyhitz',
        url: 'https://skyhitz.io',
        icons: ['https://skyhitz.io/img/icon-512.png'],
      },
    })

    setClient(result)
    if (result.session) {
      handleSetSession(result.session)
    }

    subscribeToEvents()
  }

  useEffect(() => {
    init()
  })

  const clearState = () => {
    setState('disconnected')
    setPublicKey('')
    handleSetSession(null)
    setClient(null)
  }

  const handleSetSession = (session) => {
    setSession(session)
    const { state } = session
    const [stellarAccount] = state.accounts
    setPublicKey(stellarAccount.replace(`${stellarMeta.chainName}:`, ''))
    setState('session-created')
    return publicKey
  }

  const connect = async () => {
    if (!client) return
    try {
      const { uri, approval } = await client.connect({
        requiredNamespaces: {
          stellar: {
            chains: [stellarMeta.chainName],
            methods: stellarMeta.methods,
            events: ['chainChanged', 'accountsChanged'],
          },
        },
      })
      if (!uri) return
      setUri(uri)
      setState('paring-proposal')
      const session = await approval()
      handleSetSession(session)
      setState('paring-created')
      setUri(null)
    } catch (e) {
      console.log('catched error on reject:', e)
      setState('disconnected')
    }

    return publicKey
  }

  const disconnect = async () => {
    await client?.disconnect({
      topic: session.topics[0],
      reason: {
        code: 1,
        message: 'Logged out',
      },
    })
    await clearState()
  }

  const subscribeToEvents = () => {
    console.log('subscribed to events')

    client?.on('session_proposal', async (proposal) => {
      setState('session-proposal')
    })

    client?.on('session_update', async (proposal) => {
      setState('session-created')
    })

    client?.on('session_delete', (session) => {
      console.log(session)
      clearState()
    })
  }

  const signXdr = (xdr) => {
    if (!client) return
    return client.request({
      topic: session.topics[0],
      chainId: stellarMeta.chainName,
      request: {
        jsonrpc: '2.0',
        method: 'stellar_signXDR',
        params: {
          xdr,
        },
      } as any,
    })
  }

  const signAndSubmitXdr = (xdr) => {
    return client?.request({
      topic: session.topics[0],
      chainId: stellarMeta.chainName,
      request: {
        jsonrpc: '2.0',
        method: 'stellar_signAndSubmitXDR',
        params: {
          xdr,
        },
      } as any,
    })
  }
  return {
    signAndSubmitXdr,
    signXdr,
    subscribeToEvents,
    disconnect,
    connect,
    clearState,
    init,
    publicKey,
    uri,
    session,
    state,
  }
}
