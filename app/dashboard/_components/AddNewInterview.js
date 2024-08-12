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
  

export default function AddNewInterview(){
    const [openDialog,setOpenDialog] = useState(false);
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
                <form>

                    <div>
                       
                        <h2>Add Details about job position,you skills and year of experience. </h2>
                        <div className="mt-7 my-3">
                            <label>Job Role/Job Position</label>
                        <Input placeholder = "Ex. Full Stack developer" required></Input>
                        </div>
                        <div className="mt-7 my-3">
                            <label>Job Description/Tech Stack (In Short)</label>
                        <Textarea placeholder = "Ex. React, Angular NodeJS, MySQl etc"  required />
                        </div>
                        <div className=" my-3">
                            <label>Years of Experience</label>
                        <Input placeholder = "Ex. 5 years" type = 'number' max = "50"  required></Input>
                        </div>
                    </div>
                    <div className="flex gap-5 justify-end">
                        <Button type = "button" variant = "ghost" onClick= {()=> setOpenDialog(false)}>Cancel</Button>
                        <Button type = "submit" >Start Interview</Button>
                    </div>
                    </form>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>

        </div>
    )
}