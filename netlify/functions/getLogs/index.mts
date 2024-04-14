import type { Handler } from "@netlify/functions"
import { MongoClient, ObjectId } from "mongodb"

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

	let result = []

	try {
		console.log(payload)

		if (payload.action === "find") {
			const cursor = collection.find()
			for await (const doc of cursor) {
				result.push(doc)
			}
		} else if (payload.action === "deleteMany") {
			result = await collection.deleteMany()
		} else if (payload.action === "deleteOne") {
			result = await collection.deleteOne({ _id: new ObjectId(payload.id) })
		} else {
			console.log("no action")
		}
	} catch (e) {
		console.log(e)

		return {
			body: JSON.stringify({
				error: "ERROR_INSERTING",
				message: "Something Went Wrong",
			}),
			statusCode: 500,
		}
	} finally {
		client.close()
		console.log(result)
	}

	return {
		body: JSON.stringify({
			error: null,
			data: result,
		}),
		statusCode: 200,
	}
}
