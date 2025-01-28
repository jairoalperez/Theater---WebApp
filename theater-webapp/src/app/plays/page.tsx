"use client"

import React from "react"
import axios from "axios"
import { cn } from "@/lib/utils"
import PlayCard from "@/components/Plays/PlayCard"
import { PlayShort } from "@/types/playShort"
import Link from "next/link"
import { LoaderPinwheelIcon } from "@/components/ui/loader-pinwheel"
import { Sleep } from "@/helpers/sleep"

const PlaysList: React.FC = () => {
	const [plays, setPlays] = React.useState<PlayShort[]>([])
	const [loading, setLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<string | null>(null)

	React.useEffect(() => {
		let config = {
			method: "get",
			url: "https://localhost:7112/api/plays/all",
		}

		axios
			.request(config)
			.then(async (response) => {
				setPlays(response.data)
				await Sleep(500)
				setLoading(false)
			})
			.catch(async (response) => {
				setError(`Error fetching data: ${error}`)
				await Sleep(500)
				setLoading(false)
			})
	}, [])

	return (
		<div className="flex justify-center">
			<div className={cn("mx-auto flex flex-col items-center p-4")}>
				<h1 className="text-4xl font-bold mx-auto mb-8 mt-8 text-foreground">Plays</h1>
				{loading ? (
					<div className="h-56 w-full object-cover object-end flex items-center justify-center">
						<LoaderPinwheelIcon isAnimating={true} />
					</div>
				) : error ? (
					<div className="h-56 w-full object-cover object-end flex items-center justify-center">
						<div className="text-foreground">{error}</div>
					</div>
				) : (
					<div
						className={cn(
							"grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4"
						)}
					>
						{plays.map((play) => (
							<Link key={play.playId} href={`/plays/${play.playId}`}>
								<PlayCard play={play} />
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default PlaysList
