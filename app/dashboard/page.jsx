import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";

export default function Dashboard(){
    return (
        <div className="p-10">
           <h2 className="font-bold text-lg">Dashboard</h2>
           <h2 className="text-gray-500 text-sm">Create and Start Your AI-Mock-Interview</h2>

           <div className="grid grid-cols-1 md:grid-cols-3 my-5">
            <AddNewInterview />
           </div>
        </div>
    )
}