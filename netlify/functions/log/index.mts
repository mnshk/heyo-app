import type { Context } from "@netlify/functions"
import { MongoClient, ObjectId, WithId } from "mongodb"

type IRequestBody = {
	action: string
	payload: {
		[key: string]: unknown
	}
}
const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again later."

export default async (req: Request, context: Context) => {
	const response = {
		body: {
			error: {
				hasError: false,
				errorCode: "",
				errorMessage: "",
			},
			payload: {},
		},
		statusCode: 200,
	}

	const DB_URI = Netlify.env.get("DB_URI")

	try {
		if (DB_URI === undefined) {
			throw new Error("DB_URI_UNDEFINED")
		}

		if (req.body === undefined || req.body === null) {
			throw new Error("NO_BODY")
		}

		const requestBody: IRequestBody = await req.json()
		const client = new MongoClient(DB_URI)
		const db = client.db("heyo")
		const collection = db.collection("logs")

		try {
			switch (requestBody.action) {
				case "insertOne": {
					response.body.payload = await collection.insertOne({
						...requestBody.payload,
						insertedAt: Date.now(),
					})
					break
				}
				case "find": {
					const result: WithId<unknown>[] = []
					const cursor = collection.find().sort({ time: 1 })
					for await (const doc of cursor) {
						result.push(doc)
					}
					response.body.payload = result
					break
				}
				case "deleteOne": {
					response.body.payload = await collection.deleteOne({
						_id: new ObjectId(requestBody.payload._id as string),
					})
					break
				}
				case "deleteMany": {
					response.body.payload = await collection.deleteMany()
					break
				}
				case "test": {
					response.body.payload = { requestBody, context }
					break
				}
				default: {
					throw new Error("UNKNOWN_ACTION")
				}
			}
		} finally {
			client.close()
		}
	} catch (e) {
		if (e instanceof Error) {
			response.body.error.errorCode = e.message
			response.body.payload = { req, context }
		}
		response.body.error.hasError = true
		response.body.error.errorMessage = DEFAULT_ERROR_MESSAGE
		response.statusCode = 400
	}
	return new Response(JSON.stringify(response.body), {
		headers: [["Content-Type", "application/json"]],
		status: response.statusCode,
	})
}
