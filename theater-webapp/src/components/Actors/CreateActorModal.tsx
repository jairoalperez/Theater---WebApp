"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { XIcon } from "../ui/x"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Select } from "@radix-ui/react-select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { genders, eyeColors, skinColors, hairs } from "../../data/actorAtributes"

interface CreateActorModalProps {
	isOpen: boolean
	onClose: () => void
}

const CreateActorModal: React.FC<CreateActorModalProps> = ({ isOpen, onClose }) => {
	const [firstName, setFirstName] = React.useState("")
	const [lastName, setLastName] = React.useState("")
	const [dob, setDob] = React.useState("")
	const [gender, setGender] = React.useState("")
	const [skinColor, setSkinColor] = React.useState("")
	const [eyeColor, setEyeColor] = React.useState("")
	const [hairColor, setHairColor] = React.useState("")
	const [frontImage, setFrontImage] = React.useState("")
	const [fullBodyImage, setFullBodyImage] = React.useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const payload = {
			firstName,
			lastName,
			dob,
			gender,
			skinColor,
			eyeColor,
			hairColor,
			frontImage,
			fullBodyImage,
		}

		try {
			const response = await axios.post("https://localhost:7112/api/actors/create", payload)
			console.log("Actor created:", response.data)
			//setIsSuccessModalOpen(true)
		} catch (error) {
			console.error("Error creating actor:", error)
			//setIsErrorModalOpen(true)
		}
	}

	return !isOpen ? null : (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<Card>
				<CardHeader>
					<CardTitle className="text-xl mb-4 text-foreground text-center">
						Create New Actor
					</CardTitle>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent>
						<Input
							type="text"
							placeholder="First Name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
							className="border p-2 mb-4 w-full"
						/>
						<Input
							type="text"
							placeholder="Last Name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
							className="border p-2 mb-4 w-full"
						/>
						<Select value={gender} onValueChange={setGender}>
							<SelectTrigger className="border p-2 mb-4 w-full">
								<SelectValue placeholder="Gender" />
							</SelectTrigger>
							<SelectContent>
								{genders.map((val, key) => (
									<SelectItem key={key} value={val}>{val}</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={skinColor} onValueChange={setSkinColor}>
							<SelectTrigger className="border p-2 mb-4 w-full">
								<SelectValue placeholder="Skin" />
							</SelectTrigger>
							<SelectContent>
								{skinColors.map((val, key) => (
									<SelectItem key={key} value={val}>{val}</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={eyeColor} onValueChange={setEyeColor}>
							<SelectTrigger className="border p-2 mb-4 w-full">
								<SelectValue placeholder="Eyes" />
							</SelectTrigger>
							<SelectContent>
								{eyeColors.map((val, key) => (
									<SelectItem key={key} value={val}>{val}</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={hairColor} onValueChange={setHairColor}>
							<SelectTrigger className="border p-2 mb-4 w-full">
								<SelectValue placeholder="Hair" />
							</SelectTrigger>
							<SelectContent>
								{hairs.map((val, key) => (
									<SelectItem key={key} value={val}>{val}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button
							onClick={onClose}
							variant="outline"
							className="bg-red-500 bg-opacity-50 font-bold hover:bg-red-500 hover:bg-opacity-100 hover:text-background"
						>
							Close
						</Button>
						<Button
							type="submit"
							className="bg-yellow-500 bg-opacity-50 font-bold text-foreground hover:text-background"
						>
							Create
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}

export default CreateActorModal
