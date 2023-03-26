import clientPromise from "./conn";
// const ObjectID = require("mongodb").ObjectID;

let client;
let db;
let projects;

async function init() {
  try {
    client = await clientPromise;
    db = client.db("occuper");
    projects = await db.collection("listings");
  } catch (error) {
    throw new Error("Failed to establish connection to database");
  }
}

(async () => {
  await init();
})();

// Projects getter functions
export async function getProjects() {
  try {
    const allProjects = projects.find({}).toArray();
    return { projects: allProjects };
  } catch (error) {
    return { error: "Failed to fetch projects" };
  }
}
