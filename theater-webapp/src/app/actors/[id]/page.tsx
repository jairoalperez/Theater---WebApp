"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { cn } from "@/lib/utils"
import { Actor } from "@/types/actor"
import { LoaderPinwheelIcon } from "@/components/ui/loader-pinwheel"
import { Sleep } from "@/helpers/sleep"
import ActorProfile from "@/components/Actors/ActorProfile"

const actorSample: Actor = {
	actorId: 1,
	firstName: "Valeria",
	lastName: "Urdaneta",
	dob: "1990-01-01",
	age: 33,
	gender: "Male",
	skinColor: "Light Brown",
	eyeColor: "Light Brown",
	hairColor: "Light Blonde",
	frontImage:
		"https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80",
	fullBodyImage:
		"https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80",
}

const ActorPage: React.FC = () => {
	const params = useParams()
	const id = params?.id

	const [actor, setActor] = React.useState<Actor | null>(null)
	const [loading, setLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<string | null>(null)

	React.useEffect(() => {
		if (id) {
			let config = {
				method: "get",
				url: `https://localhost:7112/api/actors/${id}`,
			}

			axios
				.request(config)
				.then(async (response) => {
					setActor(response.data)
					await Sleep(500)
					setLoading(false)
				})
				.catch(async (error) => {
					setError(`${error.status} Error fetching data: ${error.response.data}`)
					await Sleep(500)
					setLoading(false)
				})
		} else {
			setError(`No id`)
			setLoading(false)
		}
	}, [id])

	return loading ? (
		<div className="flex justify-center">
			<div className={cn("mx-auto flex flex-col items-center p-4")}>
				<div className="h-56 w-full object-cover object-end flex items-center justify-center">
					<LoaderPinwheelIcon isAnimating={true} />
				</div>
			</div>
		</div>
	) : error ? (
		<div className="flex justify-center">
			<div className={cn("mx-auto flex flex-col items-center p-4")}>
				<div className="h-56 w-full object-cover object-end flex items-center justify-center">
					<div className="text-foreground">{error}</div>
				</div>
			</div>
		</div>
	) : (
		<div className="flex justify-center">
			<div className={cn("mx-auto flex flex-col items-center p-4")}>
					<div className="gap-4 p-4">
						{actor && <ActorProfile actor={actor} />}
					</div>
			</div>
		</div>
	)
}

export default ActorPage
