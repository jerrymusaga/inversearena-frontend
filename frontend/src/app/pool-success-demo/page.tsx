'use client';

import React, { useState } from 'react';
import { PoolSuccessModal } from '@/components/arena-v2/modals';

/**
 * Demo page for PoolSuccessModal component
 * 
 * This page demonstrates the pool success modal in action and can be accessed at:
 * /pool-success-demo
 * 
 * Features demonstrated:
 * - Modal opening/closing
 * - Different arena configurations
 * - Button callbacks
 * - Animation effects
 */
export default function PoolSuccessDemo() {
    const [isOpen, setIsOpen] = useState(false);
    const [demoConfig, setDemoConfig] = useState({
        arenaId: '#882-X',
        changeSync: true,
        yieldRate: 5.2,
        stakeThreshold: 100,
        rwaYieldLock: "Active",
    });

    const handleOpenModal = (config?: typeof demoConfig) => {
        if (config) {
            setDemoConfig(config);
        }
        setIsOpen(true);
    };

    const handleEnterCommandCenter = () => {
        alert('Navigate to Command Center Dashboard');
        setIsOpen(false);
    };

    const handleShareLink = () => {
        const shareUrl = `${window.location.origin}/arena/${demoConfig.arenaId}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert(`Copied to clipboard: ${shareUrl}`);
        });
    };

    return (
        <main className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black mb-2 text-[#00FF00]">Pool Success Modal Demo</h1>
                <p className="text-gray-400 mb-12">Test and verify the pool creation success modal UI</p>

                {/* Demo Controls */}
                <div className="bg-gray-900 border-2 border-[#00FF00] p-8 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold text-[#00FF00] mb-6">Demo Configurations</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <button
                            onClick={() =>
                                handleOpenModal({
                                    arenaId: '#882-X',
                                    stakeThreshold: 100,
                                    rwaYieldLock: "Active",
                                    yieldRate: 5.2,
                                    changeSync: true,
                                })
                            }
                            className="bg-[#00FF00] hover:bg-[#00DD00] text-black font-bold py-3 px-6 rounded transition-all"
                        >
                            Standard Pool (#882-X)
                        </button>

                        <button
                            onClick={() =>
                                handleOpenModal({
                                    arenaId: '#500-A',
                                    stakeThreshold: 250,
                                    rwaYieldLock: "Active",
                                    yieldRate: 6.8,
                                    changeSync: true,
                                })
                            }
                            className="bg-[#00FF00] hover:bg-[#00DD00] text-black font-bold py-3 px-6 rounded transition-all"
                        >
                            Premium Pool (#500-A)
                        </button>

                        <button
                            onClick={() =>
                                handleOpenModal({
                                    arenaId: '#003-Z',
                                    stakeThreshold: 50,
                                    rwaYieldLock: "Active",
                                    yieldRate: 7.5,
                                    changeSync: false,
                                })
                            }
                            className="bg-[#00FF00] hover:bg-[#00DD00] text-black font-bold py-3 px-6 rounded transition-all"
                        >
                            Starter Pool (#003-Z)
                        </button>
                    </div>

                    {/* Current Configuration Display */}
                    <div className="bg-black border border-gray-700 p-4 rounded font-mono text-sm text-gray-300">
                        <p className="text-[#00FF00] mb-2">Current Configuration:</p>
                        <p>Arena ID: <span className="text-white">{demoConfig.arenaId}</span></p>
                        <p>Stake Threshold: <span className="text-white">{demoConfig.stakeThreshold} USDC</span></p>
                        <p>RWA Yield Lock: <span className="text-white">{demoConfig.rwaYieldLock}%</span></p>
                    </div>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-gray-900 border-2 border-gray-700 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-[#00FF00] mb-4">✓ Implemented Features</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>✓ Terminal-style dark UI with neon green accents</li>
                            <li>✓ ARENA_ONLINE header with deployment subtitle</li>
                            <li>✓ System Stability card with progress bar</li>
                            <li>✓ Validation logs with [OK] statuses</li>
                            <li>✓ Arena Identity Plate with technical specs</li>
                            <li>✓ Enter Command Center button (green)</li>
                            <li>✓ Share Link button (outline style)</li>
                            <li>✓ Protocol version and uptime footer</li>
                            <li>✓ Framer Motion staggered animations</li>
                            <li>✓ Decorative neon corner accents</li>
                            <li>✓ Responsive mobile layout</li>
                            <li>✓ Grid background pattern</li>
                        </ul>
                    </div>

                    <div className="bg-gray-900 border-2 border-gray-700 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-[#00FF00] mb-4">🧪 Testing Checklist</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>□ Modal opens/closes correctly</li>
                            <li>□ All animations play smoothly</li>
                            <li>□ Arena data displays accurately</li>
                            <li>□ Button callbacks trigger</li>
                            <li>□ Responsive on mobile (768px width)</li>
                            <li>□ Responsive on tablet (768-1024px width)</li>
                            <li>□ Grid background visible</li>
                            <li>□ Neon green color consistent (#00FF00)</li>
                            <li>□ Text contrast meets accessibility standards</li>
                            <li>□ ESC key closes modal</li>
                            <li>□ Click outside closes modal (disabled in this version)</li>
                            <li>□ Decorative corners visible</li>
                        </ul>
                    </div>
                </div>

                {/* Integration Example */}
                <div className="bg-gray-900 border-2 border-gray-700 p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-bold text-[#00FF00] mb-4">📋 Integration Pattern</h3>
                    <pre className="bg-black p-4 rounded text-xs overflow-auto text-gray-300">
                        {`import { PoolSuccessModal } from '@/components/arena-v2/modals';

export function PoolCreationFlow() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [poolData, setPoolData] = useState(null);

  const handlePoolCreated = (data) => {
    setPoolData(data);
    setShowSuccess(true);
  };

  return (
    <>
      <PoolSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        arenaId={poolData?.id}
        stakeThreshold={poolData?.minStake}
        rwaYieldLock={poolData?.yieldLock}
        onEnterCommandCenter={() => {
          router.push('/dashboard/lobby');
        }}
        onShareLink={() => {
          // Share functionality
        }}
      />
    </>
  );
}`}
                    </pre>
                </div>

                {/* Open Modal Button */}
                <button
                    onClick={() => handleOpenModal()}
                    className="w-full bg-[#00FF00] hover:bg-[#00DD00] text-black font-black text-lg py-4 px-8 rounded cursor-pointer transition-all shadow-lg"
                >
                    OPEN POOL SUCCESS MODAL →
                </button>
            </div>

            {/* Modal Component */}
            <PoolSuccessModal
                yieldRate={demoConfig.yieldRate}
                changeSync={demoConfig.changeSync}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                arenaId={demoConfig.arenaId}
                stakeThreshold={demoConfig.stakeThreshold}
                rwaYieldLock={demoConfig.rwaYieldLock}
                onEnterCommandCenter={handleEnterCommandCenter}
                onShareLink={handleShareLink}
            />
        </main>
    );
}
