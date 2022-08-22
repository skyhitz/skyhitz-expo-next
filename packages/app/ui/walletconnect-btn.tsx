import React from "react";
import WalletConnectIcon from "app/ui/icons/walletconnect-icon";
// import QRCodeModal from '@walletconnect/qrcode-modal'
import { signManageDataOp } from "app/stellar";
// import { WalletConnectStore } from 'app/state/wallet-connect'
import { Pressable, Text } from "app/design-system";

const WalletConnectBtn = ({
  signInWithXDR,
}: {
  signInWithXDR?: (_: any) => {};
}) => {
  const state = "idle";
  // const { uri, signXdr, publicKey, connect, state } = WalletConnectStore()

  // useEffect(() => {
  //   if (!uri) return QRCodeModal.close()
  //   QRCodeModal.open(uri, () => {}, {
  //     desktopLinks: [],
  //     mobileLinks: ['lobstr'],
  //   })
  // }, [uri])

  const handleSignInWithXdr = async (publicKey: string) => {
    const xdr = await signManageDataOp(publicKey);
    // const { signedXDR } = await (signXdr(xdr) as Promise<{ signedXDR: string }>)
    // signInWithXDR && signInWithXDR(signedXDR)
  };

  const handleConnect = () => {};

  // useEffect(() => {
  //   if (publicKey && signInWithXDR) handleSignInWithXdr(publicKey)
  // }, [publicKey])

  return (
    <Pressable onPress={handleConnect} className="btn w-full">
      <Text className="font-bold mr-4">
        {/*{state === 'session-proposal'*/}
        {/*  ? 'Waiting for approval'*/}
        {/*  : state === 'session-created'*/}
        {/*  ? 'Connected'*/}
        {/*  : 'WalletConnect'}*/}
        WalletConnect
      </Text>
      <WalletConnectIcon color="white" />
    </Pressable>
  );
};

export default WalletConnectBtn;
