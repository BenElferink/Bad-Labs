import type { NextApiRequest, NextApiResponse } from 'next';
import populateToken from '@/functions/populateToken';
import type { ApiPopulatedToken } from '@/@types';

export const config = {
  maxDuration: 300,
  api: {
    responseLimit: false,
  },
};

export interface TokenResponse extends ApiPopulatedToken {}

const handler = async (req: NextApiRequest, res: NextApiResponse<TokenResponse>) => {
  const { method, query } = req;

  const tokenId = query.token_id?.toString();
  const populateMintTx = !!query.populate_mint_tx && query.populate_mint_tx == 'true';

  if (!tokenId) {
    return res.status(400).end();
  }

  try {
    switch (method) {
      case 'GET': {
        const payload = await populateToken(tokenId, { populateMintTx });

        return res.status(200).json(payload);
      }

      default: {
        res.setHeader('Allow', 'GET');
        return res.status(405).end();
      }
    }
  } catch (error: any) {
    console.error(error);

    if (['The requested component has not been found.', 'Invalid or malformed asset format.'].includes(error?.message)) {
      return res.status(404).end(`Token not found: ${tokenId}`);
    }

    return res.status(500).end();
  }
};

export default handler;
