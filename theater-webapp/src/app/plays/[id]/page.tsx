"use client"

import React from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { cn } from "@/lib/utils"
import { Play } from "@/types/play"
import { LoaderPinwheelIcon } from "@/components/ui/loader-pinwheel"
import { Sleep } from "@/helpers/sleep"
import Link from "next/link"
import PlayProfile from "@/components/Plays/PlayProfile"
import PlayCharacterCard from "@/components/Characters/PlayCharacterCard"
import dotenv from "dotenv"
dotenv.config();
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const PlayPage: React.FC = () => {
	const params = useParams()
	const id = params?.id

	const [play, setPlay] = React.useState<Play | null>(null)
	const [loading, setLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<string | null>(null)

	React.useEffect(() => {
		if (id) {
			let config = {
				method: "get",
				url: `${apiUrl}/plays/${id}`,
			}

			axios
				.request(config)
				.then(async (response) => {
					setPlay(response.data)
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

	return (
		<div className="flex justify-center pb-16">
			<div className={cn("mx-auto flex flex-col items-center")}>
				{loading ? (
					<div className="h-56 w-full object-cover object-end flex items-center justify-center">
						<LoaderPinwheelIcon isAnimating={true} />
					</div>
				) : error ? (
					<div className="h-56 w-full object-cover object-end flex items-center justify-center">
						<div className="text-foreground">{error}</div>
					</div>
				) : (
					<div>
						<div className="gap-4">{play && <PlayProfile play={play} />}</div>
						<div className="flex justify-center">
							<div className={cn("mx-auto flex flex-col items-center")}>
								<h1 className="text-4xl font-bold mx-auto mb-8 mt-8 text-foreground">Characters</h1>
								<div
									className={cn(
										"grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4"
									)}
								>
									{play?.characters?.map((character) => (
										<Link key={character?.characterId} href={`/characters/${character?.characterId}`}>
											<PlayCharacterCard character={character} />
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default PlayPage
