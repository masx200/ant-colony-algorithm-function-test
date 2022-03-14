#!/usr/bin/env ts-node

"use strict";
process.on("unhandledRejection", (err) => {
    throw err;
});
import parse from "@masx200/mini-cli-args-parser";
import assert from "assert";
import process from "process";
console.log("tsp2json");
const extensions = "tsp";
const args = process.argv.slice(2);
const opts = parse(args);

console.log(opts);
const { inputdir } = opts;
assert(typeof inputdir === "string");
