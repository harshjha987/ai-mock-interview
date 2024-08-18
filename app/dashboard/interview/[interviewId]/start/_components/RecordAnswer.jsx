'use client'
import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from "../../../../../../components/ui/button";
import Image from "next/image";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "../../../../../../utils/GeminiAiModel";
import { db } from "../../../../../../utils/db";
import { UserAnswer } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

export default function RecordAnswer({interviewquestions, activeQuestionIndex,interviewData}){
    const[userAnswer,setUserAnswer] = useState("");
    const {user} = useUser();
    const[loading,setLoading] = useState(false)
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      useEffect(()=>{
        results.map((result)=>(
            setUserAnswer(prevAns => prevAns + result?.transcript)
        ))
      },[results])

      useEffect(()=>{
        if(!isRecording && userAnswer?.length>10){
            UpdateAnswer();

        }
        
      },[userAnswer])

      const saveUserAnswer =async ()=>{
        if(isRecording){
        
            stopSpeechToText()
            
            
        }
        else{
            startSpeechToText();
        }
      }
      const UpdateAnswer = async()=>{
        setLoading(true)
        const feedbackPrompt = "Question:"+interviewquestions[activeQuestionIndex]?.question+
            ",User Answer:" + userAnswer+",Depends on question and user answer for given interview question"+
            " please give us rating for answer and feebback as are of improvemnet if any"+
            " in just 3 to 5 lines to improve it in JSON formate with rating field and feedback field"

            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResp = (result.response.text()).replace('```json',"").replace('```',"")
            console.log(mockJsonResp)
            const jsonFeedbackResp = JSON.parse(mockJsonResp)
            const resp = await db.insert(UserAnswer)
            .values({
                mockIdRef :interviewData?.mockId,
                question :  interviewquestions[activeQuestionIndex]?.question,
                correctAns : interviewquestions[activeQuestionIndex]?.answer,
                userAns : userAnswer,
                feedback : jsonFeedbackResp?.feedback,
                rating : jsonFeedbackResp?.rating,
                userEmail : user?.primaryEmailAddress?.emailAddress,
                createdAt : moment().format("DD-MM-yyyy")
            })
            if(resp){
                toast('User Answer Recorded Succesfully')
                setUserAnswer("");
                setResults([]);
            }
          
            setLoading(false)


      }
    return(
        <div className="flex items-center justify-center flex-col">
        <div className="flex flex-col items-center justify-center 
        rounded-lg p-5 mt-20 bg-black">
        <Image src = {'/webcam.jpeg'} width= {200} height = {200}
            classname = "absolute"
        />
            <Webcam
            mirrored = {true}
            style={{
                height :200 ,
                width : "100%",
                zIndex : 10,

            }} />

        </div>
        <Button disabled = {loading} variant = 'outline' className= " my-10"
        onClick = {saveUserAnswer}>
        {isRecording ? <h2 className="text-red-600 flex gap-2">
        

        <Mic/> 
        Stop Recording
       </h2>: 'Record Answer'}
        </Button>
       
       
        </div>
    )
}