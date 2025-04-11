import { Client, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66431c92001ff7db57c7")

export const databases = new Databases(client);