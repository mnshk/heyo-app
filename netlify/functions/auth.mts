import {} from "@netlify/functions"
import { MongoClient, ObjectId } from "mongodb"

type IAuthRequestBody = {
	action: "validate" | "create" | "delete" | "update" | "read"
	payload: {
		_id?: string
		sessionToken?: string
		subject?: string
		isActive?: boolean
		shouldAutoExpire?: boolean
		networkAddress?: string
		device?: string
	}
}

type ISessionToken = {
	_id?: ObjectId
	sessionToken: string
	subject: string
	isActive: boolean
	shouldAutoExpire: boolean
	createdAt: number
	lastUsedAt: number
	usage: {
		timestamp: number
		networkAddress: string
		device: string
	}[]
}

export default async function (req: Request) {
	let responseBody: BodyInit | null = null
	const responseOptions: ResponseInit = {
		headers: [["Content-Type", "application/json"]],
	}

	if (req.body === null) {
		responseOptions.status = 400
	} else {
		const DB_URI = Netlify.env.get("DB_URI")
		if (DB_URI === undefined) {
			responseOptions.status = 500
		} else {
			const client = new MongoClient(DB_URI)
			const db = client.db("heyo")
			const collection = db.collection("sessionTokens")
			try {
				const body: IAuthRequestBody = await req.json()
				switch (body.action) {
					case "create": {
						const { sessionToken, subject, shouldAutoExpire } = body.payload
						if (sessionToken !== undefined && subject !== undefined && shouldAutoExpire !== undefined) {
							const doc: ISessionToken = {
								isActive: true,
								sessionToken,
								subject,
								shouldAutoExpire,
								createdAt: Date.now(),
								lastUsedAt: 0,
								usage: [],
							}
							const result = await collection.insertOne(doc)
							responseOptions.status = result.acknowledged ? 201 : 500
						} else {
							responseOptions.status = 400
						}
						break
					}
					case "validate": {
						const { payload } = body
						if (payload.sessionToken === undefined || payload.networkAddress === undefined || payload.device === undefined) {
							responseOptions.status = 400
						} else {
							const doc = await collection.findOne<ISessionToken>({ sessionToken: payload.sessionToken })
							if (doc === null || !doc.isActive) {
								responseOptions.status = 401
							} else {
								const now = Date.now()
								const updatedDoc = {
									isActive: doc.shouldAutoExpire ? false : true,
									lastUsedAt: now,
									usage: [
										...doc.usage,
										{
											networkAddress: payload.networkAddress,
											device: payload.device,
											timestamp: now,
										},
									],
								} as ISessionToken
								const result = await collection.updateOne({ _id: new ObjectId(doc._id) }, { $set: updatedDoc })
								if (result.acknowledged) {
									responseBody = JSON.stringify({ subject: doc.subject })
								}
								responseOptions.status = result.acknowledged ? 200 : 500
							}
						}
						break
					}
					case "read": {
						const cursor = collection.find<ISessionToken>({}).sort({ lastUsedAt: 1 })
						const result: ISessionToken[] = []
						for await (const doc of cursor) {
							result.push(doc)
						}
						responseBody = JSON.stringify(result)
						responseOptions.status = 200
						break
					}
					case "delete": {
						const { _id } = body.payload
						if (_id === undefined) {
							responseOptions.status = 400
						} else {
							const result = await collection.deleteOne({ _id: new ObjectId(_id) })
							responseOptions.status = result.acknowledged ? 200 : 500
						}
						break
					}
					case "update": {
						const { _id, isActive, subject, sessionToken, shouldAutoExpire } = body.payload
						if (_id === undefined) {
							responseOptions.status = 400
						} else {
							const update = {} as ISessionToken
							if (isActive !== undefined) update.isActive = isActive
							if (subject !== undefined) update.subject = subject
							if (sessionToken !== undefined) update.sessionToken = sessionToken
							if (shouldAutoExpire !== undefined) update.shouldAutoExpire = shouldAutoExpire
							const result = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: update })
							responseOptions.status = result.acknowledged ? 200 : 500
						}
						break
					}
					default: {
						responseOptions.status = 400
					}
				}
			} catch (e) {
				responseOptions.status = 500
				console.log(e)
				if (e instanceof Error && e.name === "SyntaxError") {
					responseOptions.status = 400
				}
			} finally {
				client.close()
			}
		}
	}
	return new Response(responseBody, responseOptions)
}
