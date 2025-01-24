"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { cn } from "@/lib/utils"
import ActorCard from "@/components/Actors/ActorCard"
import { ActorShort } from "@/types/actorShort"
import Link from "next/link"
import { LoaderPinwheelIcon } from "@/components/ui/loader-pinwheel"

const actorSample: ActorShort = {
	actorId: 1,
	firstName: "John",
	lastName: "Doe",
	dob: "1990-01-01",
	gender: "Male",
	frontImage:
		"https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80",
	age: 33,
	characters: 10,
	principals: 5,
}

const ActorsList: React.FC = () => {
	const [actors, setActors] = React.useState<ActorShort[]>([])

	const [loading, setLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<string | null>(null)

    const [isModalOpen, setIsModalOpen] = React.useState(false)

    React.useEffect(() => {
        let config = {
            method: "get",
            url: "https://localhost:7112/api/actors/all"
        }

        axios
            .request(config)
            .then((response) => {
                setActors(response.data)
                setLoading(false)
            })
            .catch((error) => {
                setError(`Error fetching data: ${error}`)
                setLoading(false)
            })
    }, [isModalOpen])

    if (loading) {
        return (
        <div className="flex justify-center">
            <div className={cn("mx-auto flex flex-col items-center p-4")}>
                <h1 className="text-4xl font-bold mx-auto mb-8 mt-8 text-foreground">
                    Actors
                </h1>
                <div className="h-56 w-full object-cover object-end flex items-center justify-center"> <LoaderPinwheelIcon isAnimating={true} /> </div>
            </div>
        </div>)
    }

    if (error) {
        return <div className="text-foreground">{error}</div>
    }

	return (
		<div className="flex justify-center">
            <div className={cn("mx-auto flex flex-col items-center p-4")}>
                <h1 className="text-4xl font-bold mx-auto mb-8 mt-8 text-foreground">
                    Actors
                </h1>
                <div className={cn(
                        "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4"
                    )}>
                        {actors.map((actor) => (
                            <Link key={actor.actorId} href={`/actors/${actor.actorId}`}>
                                <ActorCard actor={actor} />
                            </Link>
                        ))}
                </div>
            </div>
		</div>
	)
}

export default ActorsList
