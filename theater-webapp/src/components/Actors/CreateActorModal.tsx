"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { XIcon } from "../ui/x"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface CreateActorModalProps {
	isOpen: boolean
	onClose: () => void
}

// {
//     "firstName": "string",
//     "lastName": "string",
//     "dob": "string",
//     "gender": "string",
//     "skinColor": "string",
//     "eyeColor": "string",
//     "hairColor": "string",
//     "frontImage": "string",
//     "fullBodyImage": "string"
//   }

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

	return isOpen ? null : (
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
							className="border border-gray-300 p-2 mb-4 w-full"
						/>
                        <Input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="border border-gray-300 p-2 mb-4 w-full"
                        />
					</CardContent>
				</form>
			</Card>
		</div>
	)
}

export default CreateActorModal
