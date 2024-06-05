// pages/api/favorites.js
import { getSession } from 'next-auth/client';
import { prisma } from '../../lib/prisma';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (req.method === 'POST') {
    const { characterId } = req.body;

    const favorite = await prisma.favorite.create({
      data: {
        characterId,
        user: { connect: { id: user.id } },
      },
    });

    res.status(201).json(favorite);
  } else if (req.method === 'DELETE') {
    const { characterId } = req.body;

    const favorite = await prisma.favorite.deleteMany({
      where: {
        characterId,
        userId: user.id,
      },
    });

    res.status(200).json(favorite);
  } else {
    res.setHeader('Allow', ['POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
