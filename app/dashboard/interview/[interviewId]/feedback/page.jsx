'use client'
import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "../../../../../components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";

export default function Feedback({params}){

        const [feedbackList,setFeedbackList] = useState([]);
        const router = useRouter()
useEffect(()=>{
    getFeedback()
    
},[])
    const getFeedback = async ()=>{
        const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef , params.interviewId))
        .orderBy(UserAnswer.id)
        setFeedbackList(result);
    }
    return (
    <div className="p-10 ">
    <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>

      <h2 className="font-bold text-2xl">Here is your Interview Feedback</h2>
        <h2 className="text-blue-500 text-lg my-3">Your Overall interview rating : <strong></strong></h2>

        <h2 className="text-sm text-gray-500">Find Below Interview Question with correct answer, Your answer and 
        feedback for improvement</h2>
        {feedbackList && feedbackList.map((item,index)=>(
            <Collapsible key={index} className="mt-7">
                    <CollapsibleTrigger className="p-2 bg-secondary rounded-lg
                    my-2 text-left flex justify-between gap-7 w-full ">
                    {item.question} <ChevronsUpDown className="h-5 w-5" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                       <div className="flex flex-col gap-2">
                        <h2 className="text-red-500 p-2 rounded-lg">
                            <strong>Rating :</strong>{item.rating}
                        </h2>
                        <h2 className="p-2 rounded-lg bg-red-50 text-sm
                        text-red-900">
                        <strong>Your Answer: </strong>{item.userAns}</h2>
                        <h2 className="p-2 rounded-lg bg-green-50 text-sm
                        text-green-900">
                        <strong>Correct Answer: </strong>{item.correctAns}</h2>
                        <h2 className="p-2 rounded-lg bg-blue-50 text-sm
                        text-blue-700">
                        <strong>Feedback: </strong>{item.feedback}</h2>
                       </div>
                    </CollapsibleContent>
                    </Collapsible>
        ))}
        
        <Button onClick = {()=> router.replace('/dashboard')} >Go Home</Button>
      
        
    </div>
    )
}