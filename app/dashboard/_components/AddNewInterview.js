'use client'

import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea";
import { chatSession } from "../../../utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { uuid } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
  

export default function AddNewInterview(){
    const [openDialog,setOpenDialog] = useState(false);
    const[jobPosition,setJobPosition] = useState();
    const[jobDescription,setJobDescription] = useState();
    const[jobExperience,setJobExperience] = useState();
    const[loading,setLoading] = useState(false)
    const[jsonResponse , setJsonResponse] = useState([]);
    const {user} = useUser();
    const onSubmit = async(event)=>{
        setLoading(true);
        event.preventDefault();
        console.log(jobPosition,jobDescription,jobExperience)
        const InputPrompt = "Job Position :"+jobPosition+" , Job Description : "+jobDescription+", Years of Experience : "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" ,Depending on Job Position , Job Description and Years of Experience give us 5 interview question along with answers in Json format,Give us question and answer field on json"
            const result = await chatSession.sendMessage(InputPrompt);
            const MockJsonResp = (result.response.text()).replace('```json',"").replace('```',"")
            console.log(JSON.parse(MockJsonResp));
            setJsonResponse(MockJsonResp);
            if(MockJsonResp){

            
            const response  = await db.insert(MockInterview).values({
                mockId : uuidv4(),
                jsonMockResp : MockJsonResp,
                jobPosition: jobPosition,
                jobDescription : jobDescription,
                jobExperience : jobExperience,
                createdBy :user?.primaryEmailAddress?.emailAddress,
                createdAt : moment().format('DD-MM-yyyy')
            }).returning({mockId : MockInterview.mockId})
            console.log("Id : ", response)
            if(response){
                setOpenDialog(false)
            }
        }else{
            console.log("Error");
        }
            setLoading(false)
    }
    return(
        <div>
            <div  className="border p-10 rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer
             transition-all" onClick={()=>setOpenDialog(true)}>
                <h2 className=" text-center text-lg  ">+Add New</h2>
            </div>
            <Dialog open = {openDialog}>
          
            <DialogContent className = " max-w-2xl">
                <DialogHeader>
                <DialogTitle className = "text-2xl font-bold">Tell us more about Job your are interviewing.</DialogTitle>
                <DialogDescription>
                <form onSubmit={onSubmit}>

                    <div>
                       
                        <h2>Add Details about job position,you skills and year of experience. </h2>
                        <div className="mt-7 my-3">
                            <label>Job Role/Job Position</label>
                        <Input placeholder = "Ex. Full Stack developer" required
                        onChange = {(event)=>setJobPosition(event.target.value)}
                        />
                        </div>
                        <div className="mt-7 my-3">
                            <label>Job Description/Tech Stack (In Short)</label>
                        <Textarea placeholder = "Ex. React, Angular NodeJS, MySQl etc"  required 
                            onChange = {(event)=>setJobDescription(event.target.value)}
                        />
                        </div>
                        <div className=" my-3">
                            <label>Years of Experience</label>
                        <Input placeholder = "Ex. 5 years" type = 'number' max = "50"  required
                        onChange = {(event)=> setJobExperience(event.target.value)}
                        ></Input>
                        </div>
                    </div>
                    <div className="flex gap-5 justify-end">
                        <Button type = "button" variant = "ghost" onClick= {()=> setOpenDialog(false)}>Cancel</Button>
                        <Button type = "submit" disabled = {loading} >
                        {loading? <><LoaderCircle className="animate-spin"/>'Generating from Ai' </>: "Start Interview"}
                        </Button>
                    </div>
                    </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>

        </div>
    )
}