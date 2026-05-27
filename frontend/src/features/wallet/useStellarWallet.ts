import { StellarWalletsKit, Networks } from "@creit-tech/stellar-wallets-kit";
import { FreighterModule } from "@creit-tech/stellar-wallets-kit/modules/freighter";
import { xBullModule } from "@creit-tech/stellar-wallets-kit/modules/xbull";
import { AlbedoModule } from "@creit-tech/stellar-wallets-kit/modules/albedo";
import { useEffect, useState, useCallback } from "react";
import { WalletStatus } from "./types";

// Define an interface for the wallet hook's return type
export interface WalletHook {
  publicKey: string | null;
  isConnected: boolean;
  status: WalletStatus;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

// Stellar public keys start with G and are exactly 56 alphanumeric (base32) characters.
const STELLAR_PUBLIC_KEY_REGEX = /^G[A-Z2-7]{55}$/;

export function isValidStellarPublicKey(address: string): boolean {
  return STELLAR_PUBLIC_KEY_REGEX.test(address);
}

/**
 * Custom React hook for integrating Stellar Wallets Kit.
 * @param network The Stellar network to connect to (e.g., Networks.TESTNET, Networks.PUBLIC).
 * @returns An object containing the public key, connection status, and connection/disconnection functions.
 */
export const useStellarWallet = (network: Networks): WalletHook => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [status, setStatus] = useState<WalletStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    StellarWalletsKit.init({
      network: network,
      modules: [
        new xBullModule(),
        new FreighterModule(),
        new AlbedoModule()
      ],
    });
  }, [network]);

  const connectWallet = useCallback(async () => {
    try {
      setStatus('connecting');
      setError(null);
      const { address } = await StellarWalletsKit.authModal();

      if (!isValidStellarPublicKey(address)) {
        setIsConnected(false);
        setPublicKey(null);
        setStatus('error');
        setError('Wallet returned an invalid public key. Please try reconnecting.');
        return;
      }

      setPublicKey(address);
      setIsConnected(true);
      setStatus('connected');
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setIsConnected(false);
      setPublicKey(null);
      setStatus('error');
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    StellarWalletsKit.disconnect();
    setPublicKey(null);
    setIsConnected(false);
    setStatus('disconnected');
    setError(null);
  }, []);

  return { publicKey, isConnected, status, error, connectWallet, disconnectWallet };
};

