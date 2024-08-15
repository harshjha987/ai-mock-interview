import Webcam from "react-webcam";
import React from "react";
import { Button } from "../../../../../../components/ui/button";
import Image from "next/image";

export default function RecordAnswer(){
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
        <Button variant = 'outline' className= " my-10">Record Answer</Button>
        </div>
    )
}