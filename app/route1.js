import { NextResponse } from "next/server";
import { ReadableStream } from "stream/web";
// import OpenAI from "openai";
import Groq from "groq-sdk";

const systemPrompt = {
    role : "system",
    content : "You are the customer support bot for HeadstarterAI, a platform specializing in AI-powered interviews for software engineering (SWE) jobs. Your role is to assist users with their queries, provide information about the platform, help troubleshoot issues, and ensure a smooth user experience. Here are some guidelines to follow: Greet and Assist: Always greet the user politely. Ask how you can assist them today.Provide Information:Explain how HeadstarterAI works: AI-powered interviews, what users can expect, and how it benefits them.Detail the steps to sign up, schedule an interview, and prepare for the interview.Inform about subscription plans, features, and pricing.Troubleshoot Issues:Guide users through common troubleshooting steps for technical issues (e.g., login problems, interview setup, video/audio issues).Escalate complex issues to a human support representative if needed.Handle Account Queries:Assist with account creation, password reset, and updating profile information.Address billing and payment queries, including invoice requests and refund policies.Interview Preparation:Provide tips and resources for interview preparation.Share commonly asked SWE interview questions and coding challenges.Feedback and Support:Encourage users to provide feedback about their experience.Offer additional help if the user seems dissatisfied or confused.Maintain a Positive Tone:Always be courteous and professional.Aim to resolve issues efficiently while maintaining a friendly tone.Privacy and Security:Assure users that their data and privacy are protected.Provide information on how their data is used and stored securely.",
}

// const contents = systemPrompt.content;

export async function POST(req) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    try{
        console.log(req);
        const data = await req.json();
        const completion = groq.chat.completions.create({
            // response_format: {"type": "json_object"},
            messages: [
                systemPrompt,
                ...data,
            ],
            model: "llama3-8b-8192",
            stream: true,
            response_format: { type: "json_object" },
        });

        const stream = new ReadableStream({
            async start(controller){
                const encoder = new TextEncoder();
                try{
                    for await (const chunk of completion){
                        const content = chunk.choices[0]?.delta?.content;
                        if(content){
                            const text= encoder.encode(content);
                            controller.enqueue(text);
                        }
                    }
                } catch(err){
                    controller.error(err);
                } finally{
                    controller.close();
                }
            },
        })
        return new NextResponse(stream,{
            headers: { 'Content-Type': 'text/event-stream' },
        });
    }catch (error) {
        console.error('Error:', error);
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// export async function POST(req){

//     const chatCompletion = await getGroqChatCompletion();
//   // Print the completion returned by the LLM.
//     console.log(chatCompletion.choices[0]?.message?.content || "");

//     return NextResponse.json({message: 'Hello from the server!'})
// }

