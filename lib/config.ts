import { Request, Response } from "express-serve-static-core";
import { logError } from "./utils";
import { DataSources } from "./data-sources";

export type CustomContext = {
  customDependencyPlaceHolder: true;
};

export type Context = { dataSources: DataSources } & CustomContext;

export async function addToContext(props: {
  req: Request;
  res: Response;
}): Promise<CustomContext> {
  try {
    return { customDependencyPlaceHolder: true };
  } catch (e) {
    /**
     * Context errors are currently not handled by `didEncounterErrors`.
     * We resolve this by manually logging any errors.
     * https://github.com/apollographql/apollo-server/issues/6140
     */
    let errorCode = "VALIDATION_ERROR";

    const isMissingAuthToken = (e as Error).message.includes(
      "Authorization header token is required."
    );
    if (isMissingAuthToken) errorCode = "TOKEN_MISSING_ERROR";

    /**
     * We want to monitor SPAs in case they have any bug that removes
     * the authentication token. On the other hand we do not care about bots
     * like `bingbot(at)microsoft.com`.
     */
    if (props.req.headers.from?.includes("bot")) errorCode = `BOT_${errorCode}`;

    logError({
      ERRORS: [e],
      ERROR_CODE: errorCode,
      REQUEST: {
        query: props.req.query,
        headers: props.req.headers,
        body: props.req.body,
      },
    });
    throw e;
  }
}
