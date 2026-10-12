import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});


export async function analyzeResume(jobDescription: string, resumeText: string) {
    try{
        const prompt = `
      You are an expert technical recruiter and resume reviewer. 
      Analyze the following RESUME against the provided JOB DESCRIPTION.
      
      RESUME:
      ${resumeText}
      
      JOB DESCRIPTION:
      ${jobDescription}

      Respond ONLY in valid JSON format with the following exact structure. Do not add any markdown formatting like \`\`\`json, just pure JSON:
      {
        "matchScore": number (0 to 100),
        "missingKeywords": string[] (top 3-5 skills missing in resume but in JD),
        "suggestions": string[] (3-4 actionable tips to improve the resume for this specific JD),
        "interviewQuestions": string[] (exactly 5 likely interview questions based on this JD and resume)
      }
    `;
        const result = await model.generateContent(prompt)
        const responseText = result.response.text();
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsedData = JSON.parse(cleanJson)
        return JSON.stringify(parsedData);

    } catch (error) {
        console.error("Gemini AI Error:", error);
    throw new Error("AI analysis failed. Please try again.");
    }
}