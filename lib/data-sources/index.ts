import { PlaceHolder } from "./PlaceHolder";

export type DataSources = {
  placeHolder: PlaceHolder;
};

export const dataSources = (): DataSources => ({
  placeHolder: new PlaceHolder(),
});
