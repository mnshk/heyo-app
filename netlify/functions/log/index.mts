import type { Handler } from "@netlify/functions"
import { MongoClient } from "mongodb"

export const handler: Handler = async (event) => {
	const DB_URI = Netlify.env.get("DB_URI")

	if (DB_URI === undefined) {
		return {
			body: JSON.stringify({
				error: "NO_DB_URI",
				message: "Internal Server Error",
			}),
			statusCode: 500,
		}
	}

	if (event.body === null) {
		return {
			body: JSON.stringify({
				error: "NO_BODY",
				message: "Bad Request",
			}),
			statusCode: 400,
		}
	}

	const payload = await JSON.parse(event.body)
	const client = new MongoClient(DB_URI)
	const db = client.db("heyo")
	const collection = db.collection("logs")

	try {
		await collection.insertOne({
			payload,
			insertedAt: Date.now(),
		})
	} catch {
		return {
			body: JSON.stringify({
				error: "ERROR_INSERTING",
				message: "Something Went Wrong",
			}),
			statusCode: 500,
		}
	} finally {
		client.close()
	}

	return {
		body: JSON.stringify({
			error: null,
			message: "Success",
		}),
		statusCode: 200,
	}
}
