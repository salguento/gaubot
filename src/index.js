import { mastodon } from "./mastodon.js";
import { getItem } from "./getItem.js";
import { updateItem } from "./updateItem.js";

const item = await getItem();
try {
  const status = mastodon(item);
  if (status) updateItem(item.id);
} catch (err) {
  console.log(err);
}
