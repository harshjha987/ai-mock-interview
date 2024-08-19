'use client'
import React, { act, useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "../../../../../utils/schema";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswer from "./_components/RecordAnswer";
import { Button } from "../../../../../components/ui/button";
import Link from "next/link";

export default function startInterview({params}){
    const [interviewData,setInterviewData] = useState("");
    const [interviewquestions,setInterviewQuestions] = useState("");
    const[activeQuestionIndex,setActiveQuestionIndex] = useState(0);

    useEffect(()=>{
        getInterviewDetails();

    },[])

    const getInterviewDetails =async ()=>{
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId));
       const jsonMockResp = (JSON.parse(result[0].jsonMockResp));
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
                     <RecordAnswer interviewquestions = {interviewquestions}
                        activeQuestionIndex = {activeQuestionIndex}
                        interviewData = {interviewData} />
            </div>
            <div className="flex justify-end gap-6">
                {activeQuestionIndex > 0 &&<Button
                onClick = {()=> setActiveQuestionIndex(activeQuestionIndex-1)}
                >Previous Question</Button>}
                {activeQuestionIndex != interviewquestions?.length-1 && <Button
                onClick = {()=>setActiveQuestionIndex(activeQuestionIndex + 1)}>
                
                Next Question</Button>}
                <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
                {activeQuestionIndex == interviewquestions?.length-1 &&<Button>End Interview</Button>}
                </Link>
                
            </div>
        </div>
    )
}