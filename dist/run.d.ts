import * as input from "./input.js";
import { Cargo, CargoLike } from "@clechasseur/rs-actions-core";
export declare function getProgram(actionInput: input.Input): Promise<CargoLike | Cargo>;
export declare function run(actionInput: input.Input): Promise<void>;
