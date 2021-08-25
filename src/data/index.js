import {
  STORE_KEY as PRODUCTS_STORE_KEY,
  STORE_CONFIG as productsConfig
} from "./products";
import { registerStore } from "@wordpress/data";

registerStore(PRODUCTS_STORE_KEY, productsConfig);

export { PRODUCTS_STORE_KEY };
