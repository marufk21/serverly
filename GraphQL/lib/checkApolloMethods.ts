// Check available methods on ApolloServer
import { ApolloServer } from "@apollo/server";

async function checkApolloMethods() {
  console.log("ApolloServer prototype methods:");
  console.log(Object.getOwnPropertyNames(ApolloServer.prototype));

  // Check if there are any static methods
  console.log("\nApolloServer static methods:");
  console.log(Object.getOwnPropertyNames(ApolloServer));
}

checkApolloMethods();
