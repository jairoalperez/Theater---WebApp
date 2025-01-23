"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { cn } from "@/lib/utils"
import ActorCard from "@/components/Actors/ActorCard"
import { ActorShort } from "@/types/actorShort"

const actorSample: ActorShort = {
    actorId: 1,
    firstName: "John",
    lastName: "Doe",
    dob: "1990-01-01",
    gender: "Male",
    frontImage: "https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80",
    age: 33,
    characters: 10,
    principals: 5
}

const ActorsList: React.FC = () => {
    return (
        <div>
            <ActorCard actor={actorSample} />
        </div>
    )
}

export default ActorsList