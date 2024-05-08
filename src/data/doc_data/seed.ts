// import fs from "fs"
// import path from "path"
// import { faker } from "@faker-js/faker"

// import { types, vehicles } from "./data"

// const docs = Array.from({ length: 100 }, () => ({
//   id: `TASK-${faker.number.int({ min: 1, max: 9999 })}`,
//   title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
//   type: faker.helpers.arrayElement(types).value,
//   vehicle: faker.helpers.arrayElement(vehicles).value,
// }))

// try {
//     fs.writeFileSync(
//       path.join(__dirname, "docs.json"),
//       JSON.stringify(docs, null, 2)
//     );
//     console.log("✅ docs.json file has been successfully generated.");
//   } catch (error) {
//     console.error('Error writing file:', error);
//   }

// console.log("docs data generated.")