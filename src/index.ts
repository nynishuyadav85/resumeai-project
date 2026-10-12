import express, {Request, Response} from "express"
import dotenv from 'dotenv'
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { analyzeResume } from "./aiService";

dotenv.config();


const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.get('/', (req: Request, res: Response) => {
    res.json({message: "Backend is running"})
})

app.post('/api/analyze' , async (req: Request, res: Response)=> {
    try {
    const {resumeText, jobDescription} = req.body
        if(!resumeText || !jobDescription) {
            return res.status(400).json({error: 'Resume aur Job Description dono zaroori hain'})
        }

        const aiResponseString = await analyzeResume(jobDescription, resumeText)

        console.log("🤖 AI se analysis shuru...");



        const newAnalysis = await prisma.analysis.create({
            data: {
                resumeText,
                jobDescription,
                aiResponse: aiResponseString
            }
        })

        res.status(201).json({
            message: 'Analysis successful!',
            data: {
                id: newAnalysis.id,
                analysisResult: JSON.parse(aiResponseString)
            }
        })
    } catch (error) {
        
    }

})


app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});