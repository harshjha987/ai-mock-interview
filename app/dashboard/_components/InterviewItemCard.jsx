'use client'
import React from "react";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";


export default function InterviewItemCard({interview}){
    const router = useRouter();
    const onStart = ()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }

    const getFeedback = ()=>{
       router.push('/dashboard/interview/'+interview?.mockId+'/feedback') 
    }

    return (
        <div className="border shadow-sm rounded-lg p-3">
        <h2 className="font-bold text-blue-600">{interview?.jobPosition}</h2>
        <h2 className="text-sm tet-gray-700">{interview?.jobExperience} {interview.jobExperience>1 ? "Years of Experience" : "Year of Experince"}</h2>
        <h2 className="text-xs text-gray-400">Created  At : {interview.createdAt}</h2>
        <div className="flex justify-between mt-2 gap-5" >
         
        <Button size = 'sm' variant = 'outline' className = "w-full"
        onClick = {getFeedback} >
        Feedback</Button>
           <Button size = 'sm' className = 'w-full'
           onClick = {onStart} >Start</Button>
           
           
        </div>
        </div>
    )
}