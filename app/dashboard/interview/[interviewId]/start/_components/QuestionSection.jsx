'use client'
import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

export default function QuestionSection({interviewquestions,activeQuestionIndex}){

    const textToSpeach = (text)=>{
        if('speechSyntheis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSyntheis.speak(speech);
        }
        else{
            alert("Sorry, Your browser does not support text to speech")
        }
    }
    return interviewquestions && (
        <div className="p-5 rounded-lg border my-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {interviewquestions&&interviewquestions.map((question,index)=>(
                <h2 className={`p-2 bg-secondary rounded-full
                text-sm md:text-sm text-center cursor-pointer
                ${activeQuestionIndex == index&& 'bg-blue-800 text-white'}`}>Question #{index+1}</h2>
            ))}
          
        </div>
        <h2 className="my-5 text-md md:text-lg">{interviewquestions[activeQuestionIndex]?.question}</h2>
        <Volume2 className="cursor-pointer" onClick={()=> textToSpeach(interviewquestions[activeQuestionIndex]?.question)} />
            <div className="border rounded-lg p-5 bg-blue-100 mt-20">
                <h2 className="flex gap-2 items-center text-blue-700">
                    <Lightbulb/>
                    <strong>Note:</strong>
                </h2>
                <h2 className="text-sm my-2 text-blue-700">{process.env.NEXT_PUBLIC_NOTE}</h2>
            </div>
        </div>
    )
}