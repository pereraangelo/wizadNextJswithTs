import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if(req.method == 'POST') {
          res.status(201).json({message:"success"});
     } 
 }

 