import { Request, Response } from 'express';
import { RoundService } from '../services/roundService';
import { RoundInputSchema, RoundState } from '../types/round';
import type { RoundInput } from '../types/round';

export class RoundController {
  constructor(private roundService: RoundService) {}

  resolveRound = async (req: Request, res: Response): Promise<void> => {
    const input = RoundInputSchema.parse(req.body) as RoundInput;

    try {
      const resolution = await this.roundService.resolveRound(input);
      res.json({
        success: true,
        data: resolution,
      });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to resolve round',
      });
    }
  };

  closeRound = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'Round ID is required' });
      return;
    }

    try {
      const round = await this.roundService.closeRound(id);
      res.json({ success: true, data: { roundId: id, state: RoundState.CLOSED, round } });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to close round';
      const status = message.includes('not found') ? 404 : message.includes('not OPEN') ? 409 : 500;
      res.status(status).json({ error: message });
    }
  };
}
