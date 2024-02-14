import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

    const { method, url, headers, body } = req.body

    try {
     
      await prisma.request.create({
        data: {
          method,
          url,
          headers,
          body
        }
      });

      res.status(200).json(body)
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
