import { test, describe } from 'node:test';
import assert from 'node:assert';
import { nativeToScVal, xdr } from '@stellar/stellar-sdk';
import { parseArenaEvent, RawContractEvent } from './sorobanEventParser.js';

describe('SorobanEventParser', () => {
    test('correctly parses a PlayerJoined event', () => {
        const mockPlayer = 'GBRPNBYBD7Y4E6BOSFCHX3DJSV7N37XYTFGPCI27SRK6A4NQX7N7C4ZZ';
        const mockContractId = 'CAV6XGB...';

        // Create mock topics
        const topics = [
            nativeToScVal('player_joined', { type: 'symbol' }).toXDR('base64')
        ];

        // Create mock value map
        const valueMap = {
            player: mockPlayer,
        };
        const valueXdr = nativeToScVal(valueMap).toXDR('base64');

        const rawEvent: RawContractEvent = {
            type: 'contract',
            id: 'event-id-1',
            contractId: mockContractId,
            topic: topics,
            value: { xdr: valueXdr },
            ledgerCloseAt: '2026-02-23T18:00:00Z'
        };

        const parsed = parseArenaEvent(rawEvent);

        assert.notStrictEqual(parsed, null);
        if (parsed) {
            assert.strictEqual(parsed.type, 'PlayerJoined');
            assert.strictEqual(parsed.arenaId, mockContractId);
            assert.strictEqual((parsed as any).playerWallet, mockPlayer);
            assert.strictEqual(typeof parsed.timestamp, 'number');
        }
    });

    test('returns null for unknown events and warns', () => {
        const topics = [
            nativeToScVal('unknown_event', { type: 'symbol' }).toXDR('base64')
        ];

        const rawEvent: RawContractEvent = {
            type: 'contract',
            id: 'event-id-2',
            contractId: 'CAV...',
            topic: topics,
            value: { xdr: nativeToScVal(null).toXDR('base64') }
        };

        const parsed = parseArenaEvent(rawEvent);
        assert.strictEqual(parsed, null);
    });

    test('returns null for invalid XDR', () => {
        const rawEvent: RawContractEvent = {
            type: 'contract',
            id: 'event-id-3',
            contractId: 'CAV...',
            topic: ['invalid-base64'],
            value: { xdr: 'invalid-base64' }
        };

        const parsed = parseArenaEvent(rawEvent);
        assert.strictEqual(parsed, null);
    });
});
