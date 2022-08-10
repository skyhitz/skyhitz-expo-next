import React from 'react'
import WalletConnectIcon from 'app/ui/icons/walletconnect-icon'
// import QRCodeModal from '@walletconnect/qrcode-modal'
import { signManageDataOp } from 'app/stellar'
// import { WalletConnectStore } from 'app/state/wallet-connect'
import { Button } from 'app/design-system/button'
import { View } from 'react-native'
import { tw } from 'app/design-system/tailwind'

const WalletConnectBtn = ({ signInWithXDR }: { signInWithXDR?: (_) => {} }) => {
  console.log('init btn')
  const state = 'session-proposal'
  // const { uri, signXdr, publicKey, connect, state } = WalletConnectStore()

  // useEffect(() => {
  //   if (!uri) return QRCodeModal.close()
  //   QRCodeModal.open(uri, () => {}, {
  //     desktopLinks: [],
  //     mobileLinks: ['lobstr'],
  //   })
  // }, [uri])

  const handleSignInWithXdr = async (publicKey: string) => {
    const xdr = await signManageDataOp(publicKey)
    // const { signedXDR } = await (signXdr(xdr) as Promise<{ signedXDR: string }>)
    // signInWithXDR && signInWithXDR(signedXDR)
  }

  const handleConnect = () => {}

  // useEffect(() => {
  //   if (publicKey && signInWithXDR) handleSignInWithXdr(publicKey)
  // }, [publicKey])

  return (
    <Button
      onPress={handleConnect}
      text={
        state === 'session-proposal'
          ? 'Waiting for approval'
          : state === 'session-created'
          ? 'Connected'
          : 'WalletConnect'
      }
      rightIcon={
        <View style={tw`px-2`}>
          <WalletConnectIcon color="white" />
        </View>
      }
    />
  )
}

export default WalletConnectBtn
