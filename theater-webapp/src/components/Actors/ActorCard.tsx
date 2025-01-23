"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

import React, { useEffect, useState } from "react"
import { ActorShort } from "@/types/actorShort"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { AspectRatio } from "../ui/aspect-ratio"

interface ActorCardProps {
    actor: ActorShort
}

const ActorCard: React.FC<ActorCardProps> = ({actor}) => {
	return (
		<div className="group w-[320px] bg-card hover:bg-primary text-foreground border border-border rounded-lg overflow-hidden shadow-2xl transition duration-300 ease-in-out cursor-pointer">
			<img className="h-56 w-full object-cover object-end brightness-75 group-hover:brightness-105 transition duration-300 ease-in-out" src={actor.frontImage} alt="Home in Countryside"/>
            <div className="p-6">
                <div className="flex items-baseline">
                    <span className="inline-block bg-cyan-200 text-cyan-800 py-1 px-4 text-xs rounded-full uppercase font-bold tracking-wide group-hover:bg-card group-hover:text-foreground transition duration-300 ease-in-out">{actor.gender}</span>
                    <div className="ml-2 text-foreground text-xs uppercase font-bold tracking-wide">
                        {actor.age} years
                    </div>
                </div>
                <h4 className="mt-4 font-semibold text-2xl leading-tight truncate">{actor.firstName} {actor.lastName}</h4>
                <div className="mt-5 font-semibold flex flex-row items-center justify-between">
                    <span>
                        {actor.characters} Characters
                    </span>
                    <span>{actor.principals} Principals</span>
                </div>  
            </div>
        </div>
	)
}

export default ActorCard
