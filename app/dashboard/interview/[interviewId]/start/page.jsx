'use client'
import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "../../../../../utils/schema";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswer from "./_components/RecordAnswer";

export default function startInterview({params}){
    const [interviewdata,setInterviewData] = useState("");
    const [interviewquestions,setInterviewQuestions] = useState("");
    const[activeQuestionIndex,setActiveQuestionIndex] = useState(0);

    useEffect(()=>{
        getInterviewDetails();

    },[])

    const getInterviewDetails =async ()=>{
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId));
       const jsonMockResp = JSON.parse(result[0].jsonMockResp);
       setInterviewQuestions(jsonMockResp);
       setInterviewData(result[0])
    }
    return(
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <QuestionSection
                     interviewquestions = {interviewquestions}
                        activeQuestionIndex = {activeQuestionIndex}
                     />
                     <RecordAnswer />
            </div>
        </div>
    )
}