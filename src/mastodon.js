import { createRestAPIClient } from "masto";
import "dotenv/config";
export async function mastodon(item) {
  const masto = createRestAPIClient({
    url: process.env.MASTODON_URL,
    accessToken: process.env.MASTODON_TOKEN,
  });

  const remoteFile = await fetch(item.preferred_file_url);
  const attachment = await masto.v2.media.create({
    file: await remoteFile.blob(),
    description: item.alt_text,
  });

  let emoji;

  switch (item.country) {
    case "Argentina":
      emoji = "🇦🇷 ";
      break;
    case "Bolívia":
      emoji = "🇧🇴 ";
      break;
    case "Brasil":
      emoji = "🇧🇷 ";
      break;
    case "Chile":
      emoji = "🇨🇱 ";
      break;
    case "Colômbia":
      emoji = "🇨🇴 ";
      break;
    case "Costa Rica":
      emoji = "🇨🇷 ";
      break;
    case "Cuba":
      emoji = "🇨🇺 ";
      break;
    case "República Dominicana":
      emoji = "🇩🇴 ";
      break;
    case "Equador":
      emoji = "🇪🇨 ";
      break;
    case "El Salvador":
      emoji = "🇸🇻 ";
      break;
    case "Guatemala":
      emoji = "🇬🇹 ";
      break;
    case "Haiti":
      emoji = "🇭🇹 ";
      break;
    case "Honduras":
      emoji = "🇭🇳 ";
      break;
    case "México":
      emoji = "🇲🇽 ";
      break;
    case "Nicarágua":
      emoji = "🇳🇮 ";
      break;
    case "Panamá":
      emoji = "🇵🇦 ";
      break;
    case "Paraguai":
      emoji = "🇵🇾 ";
      break;
    case "Peru":
      emoji = "🇵🇪 ";
      break;
    case "Porto Rico":
      emoji = "🇵🇷 ";
      break;
    case "Uruguai":
      emoji = "🇺🇾 ";
      break;
    case "Venezuela":
      emoji = "🇻🇪 ";
      break;
  }

  const status = await masto.v1.statuses.create({
    status:
      "Título: " +
      item.title +
      "\n" +
      "Pessoa autora: " +
      item.artist +
      "\n" +
      "Técnica: " +
      item.medium +
      "\n" +
      "Data: " +
      item.date +
      "\n" +
      "País: " +
      emoji +
      item.country +
      "\n\n" +
      "Fonte: " +
      item.attribution_url,
    visibility: "public",
    mediaIds: [attachment.id],
    language: "pt",
  });

  return status.url;
}
