import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug;

  if (!slug || typeof slug !== "string") {
    return res.status(404).json({ message: "Not Found" });
  }

  const data = await prisma.shortner.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    return res.status(404).json({ message: "Slug not found" });
  }

  res.setHeader("Content-Type", "application/json");

  return res.status(200).json(data);
}
