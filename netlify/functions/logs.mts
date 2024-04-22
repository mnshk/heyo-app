import {} from "@netlify/functions"
import { Document, MongoClient, ObjectId } from "mongodb"

type ILogRequestBody = {
	action: "create" | "read" | "delete"
	payload: {
		deleteKey?: string
		deleteValue?: string
	}
}

export default async function (req: Request) {
	let responseBody: BodyInit | null = null
	const responseOptions: ResponseInit = {
		headers: [["Content-Type", "application/json"]],
	}

	if (req.body !== null) {
		const DB_URI = Netlify.env.get("DB_URI")
		if (DB_URI !== undefined) {
			const client = new MongoClient(DB_URI)
			const db = client.db("heyo")
			const collection = db.collection("logs")

			try {
				const { action, payload }: ILogRequestBody = await req.json()
				switch (action) {
					case "create": {
						const result = await collection.insertOne(payload)
						responseOptions.status = result.acknowledged ? 201 : 500
						break
					}
					case "read": {
						const result: Document[] = []
						const cursor = collection.find<Document>({}).sort({ createdAt: 1 })
						for await (const doc of cursor) {
							result.push(doc)
						}
						responseBody = JSON.stringify(result)
						responseOptions.status = 200
						break
					}
					case "delete": {
						const { deleteKey, deleteValue } = payload
						if (deleteKey !== undefined && deleteValue !== undefined) {
							let filter = {
								[deleteKey]: deleteKey === "_id" ? new ObjectId(deleteValue) : deleteValue,
							}
							if (deleteValue === "*") filter = {}
							const result = await collection.deleteMany(filter)
							responseOptions.status = result.acknowledged ? 200 : 500
						} else {
							responseOptions.status = 400
						}
						break
					}
					default: {
						responseOptions.status = 400
					}
				}
			} catch (e) {
				responseOptions.status = 500
				if (e instanceof Error && e.name === "SyntaxError") {
					responseOptions.status = 400
				}
			} finally {
				client.close()
			}
		} else {
			responseOptions.status = 500
		}
	} else {
		responseOptions.status = 400
	}
	return new Response(responseBody, responseOptions)
}
