import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 어떤 페이지를 revalidate 시킬건지 경로설정
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (err) {
    res.status(500).send("Revalidation Faild,,,,");
  }
}
