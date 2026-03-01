import * as input from "./input.js";
import { Cargo, CargoHack, Cross } from "@clechasseur/rs-actions-core";
export declare function getProgram(actionInput: input.Input): Promise<Cross | CargoHack | Cargo>;
export declare function run(actionInput: input.Input): Promise<void>;
