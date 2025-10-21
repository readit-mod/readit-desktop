import { registerLoggingHandlers } from "@/main/handlers/logging";
import { registerNetworkHandlers } from "@/main/handlers/network";
import { registerStoreHandlers } from "@/main/handlers/storage";

export function registerHandlers() {
    registerLoggingHandlers();
    registerNetworkHandlers();
    registerStoreHandlers();
}
